import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// --- DUMMY DATA ---
type DocumentItem = {
    id: string;
    title: string;
    category: string;
    date: string;
    size: string;
    type: "pdf" | "docx" | "xlsx";
};

const CATEGORIES = ["Semua", "Surat Masuk", "Surat Keluar", "RPP", "Laporan"];

const documentsData: DocumentItem[] = [
    { id: "d1", title: "Surat Edaran Libur Nasional", category: "Surat Keluar", date: "12 Sep 2026", size: "2.4 MB", type: "pdf" },
    { id: "d2", title: "RPP Matematika Kelas X - SMT 1", category: "RPP", date: "10 Sep 2026", size: "1.1 MB", type: "docx" },
    { id: "d3", title: "Undangan Rapat Komite Sekolah", category: "Surat Masuk", date: "08 Sep 2026", size: "800 KB", type: "pdf" },
    { id: "d4", title: "Rekapitulasi Nilai UTS Kelas XI", category: "Laporan", date: "05 Sep 2026", size: "3.5 MB", type: "xlsx" },
    { id: "d5", title: "SK Pembagian Tugas Mengajar", category: "Surat Keluar", date: "01 Sep 2026", size: "1.8 MB", type: "pdf" },
    { id: "d6", title: "Laporan BOS Triwulan 3", category: "Laporan", date: "28 Agu 2026", size: "5.2 MB", type: "xlsx" },
];

export default function ArsipDokumenPage() {
    const insets = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("Semua");

    const handleBack = () => {
        router.back();
    };

    // Filter Data berdasarkan Pencarian & Kategori
    const filteredDocuments = documentsData.filter((doc) => {
        const matchCategory = activeCategory === "Semua" || doc.category === activeCategory;
        const matchSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    // Helper Ikon berdasarkan Tipe File
    const getFileIcon = (type: string) => {
        switch (type) {
            case "pdf": return { name: "file-pdf-box", color: "#FFADAD" }; // Merah
            case "docx": return { name: "file-word-box", color: "#9BF6FF" }; // Biru
            case "xlsx": return { name: "file-excel-box", color: "#CAFFBF" }; // Hijau
            default: return { name: "file-document-outline", color: "#E0E0E0" };
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }]}>
            
            {/* --- HEADER --- */}
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.pageTitle} numberOfLines={1}>Arsip Dokumen</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* --- SEARCH BAR --- */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBox}>
                    <MaterialCommunityIcons name="magnify" size={24} color="#555" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Cari nama dokumen..."
                        placeholderTextColor="#888"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery("")}>
                            <MaterialCommunityIcons name="close-circle" size={20} color="#555" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* --- FILTER KATEGORI --- */}
            <View style={styles.filterWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity 
                            key={cat} 
                            style={[styles.filterChip, activeCategory === cat && styles.filterChipActive]}
                            onPress={() => setActiveCategory(cat)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.filterChipText, activeCategory === cat && styles.filterChipTextActive]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* --- LIST DOKUMEN --- */}
            <FlatList
                data={filteredDocuments}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <MaterialCommunityIcons name="file-search-outline" size={64} color="#000" />
                        <Text style={styles.emptyStateText}>Dokumen tidak ditemukan.</Text>
                    </View>
                }
                renderItem={({ item }) => {
                    const iconObj = getFileIcon(item.type);
                    return (
                        <TouchableOpacity style={styles.docCard} activeOpacity={0.8}>
                            <View style={[styles.docIconBox, { backgroundColor: iconObj.color }]}>
                                {/* @ts-ignore */}
                                <MaterialCommunityIcons name={iconObj.name} size={32} color="#000" />
                            </View>
                            <View style={styles.docInfo}>
                                <Text style={styles.docTitle} numberOfLines={2}>{item.title}</Text>
                                <Text style={styles.docSub}>
                                    {item.date} • {item.size}
                                </Text>
                                <View style={styles.badgeCategory}>
                                    <Text style={styles.badgeText}>{item.category}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.downloadBtn}>
                                <MaterialCommunityIcons name="download" size={20} color="#000" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    );
                }}
            />

            {/* --- FLOATING ACTION BUTTON (ADD) --- */}
            <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
                <MaterialCommunityIcons name="plus" size={32} color="#FFF" />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FDFBF7",
    },
    
    // Header
    pageHeader: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 3,
        borderBottomColor: "#000", backgroundColor: "#FFF",
    },
    backButton: {
        width: 40, height: 40, backgroundColor: "#FFF", borderWidth: 2,
        borderColor: "#000", borderRadius: 10, justifyContent: "center",
        alignItems: "center", shadowColor: "#000", shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1, elevation: 3,
    },
    pageTitle: { fontSize: 18, fontWeight: "900", color: "#000", textAlign: "center", flex: 1, paddingHorizontal: 10 },

    // Search Bar
    searchContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderWidth: 3,
        borderColor: "#000",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 50,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        elevation: 6,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        fontWeight: "700",
        color: "#000",
        marginLeft: 10,
    },

    // Filter Chips
    filterWrapper: { marginBottom: 16 },
    filterScroll: { paddingHorizontal: 20, gap: 10, paddingBottom: 10, paddingTop: 5 },
    filterChip: {
        paddingVertical: 8, paddingHorizontal: 14, backgroundColor: "#FFF", borderRadius: 12,
        borderWidth: 2, borderColor: "#000",
    },
    filterChipActive: { backgroundColor: "#000" },
    filterChipText: { fontSize: 13, fontWeight: "800", color: "#000" },
    filterChipTextActive: { color: "#FFF" },

    // Document List
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Memberikan ruang agar tidak tertutup FAB
        gap: 16,
    },
    docCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 16,
        borderWidth: 3,
        borderColor: "#000",
        padding: 16,
        gap: 12,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        elevation: 6,
    },
    docIconBox: {
        width: 50,
        height: 50,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    docInfo: {
        flex: 1,
        justifyContent: "center",
    },
    docTitle: { fontSize: 15, fontWeight: "900", color: "#000", marginBottom: 4 },
    docSub: { fontSize: 12, fontWeight: "700", color: "#555", marginBottom: 6 },
    badgeCategory: {
        alignSelf: "flex-start",
        backgroundColor: "#FDFFB6",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: "#000",
    },
    badgeText: { fontSize: 10, fontWeight: "900", color: "#000", textTransform: "uppercase" },
    
    downloadBtn: {
        width: 40,
        height: 40,
        backgroundColor: "#FFF",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },

    // Empty State
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 60,
    },
    emptyStateText: {
        fontSize: 16,
        fontWeight: "800",
        color: "#555",
        marginTop: 16,
    },

    // FAB
    fab: {
        position: "absolute",
        bottom: 30,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: "#4361EE", // Warna aksen biru
        borderRadius: 30,
        borderWidth: 3,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        elevation: 6,
    },
});