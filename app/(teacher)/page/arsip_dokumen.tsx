import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// --- STRUKTUR DATA ARSIP ASN ---
type DocumentItem = {
    id: string;
    title: string;
    category: "Arsip Utama" | "Arsip Kondisional";
    subCategory: string;
    date: string;
    size: string;
    type: "pdf" | "docx" | "xlsx";
};

const CATEGORIES = ["Semua", "Arsip Utama", "Arsip Kondisional"];

// Daftar Dokumen Default Sesuai Regulasi Kepegawaian ASN
const initialDocuments: DocumentItem[] = [
    { id: "d1", title: "SK CPNS / Pengangkatan PPPK", category: "Arsip Utama", subCategory: "Riwayat CPNS / PPPK", date: "15 Jan 2022", size: "2.4 MB", type: "pdf" },
    { id: "d2", title: "SK PNS 100%", category: "Arsip Utama", subCategory: "Riwayat PNS", date: "20 Feb 2024", size: "1.8 MB", type: "pdf" },
    { id: "d3", title: "Surat Pernyataan Melaksanakan Tugas (SPMT)", category: "Arsip Utama", subCategory: "Riwayat SPMT", date: "01 Feb 2022", size: "900 KB", type: "pdf" },
    { id: "d4", title: "SK Kenaikan Pangkat (SKKP) / Golongan", category: "Arsip Utama", subCategory: "Riwayat Golongan", date: "10 Apr 2025", size: "3.1 MB", type: "pdf" },
    { id: "d5", title: "Ijazah Terakhir & Transkrip Nilai", category: "Arsip Utama", subCategory: "Riwayat Pendidikan", date: "12 Aug 2020", size: "4.5 MB", type: "pdf" },
    { id: "d6", title: "Hasil Evaluasi Kinerja / SKP Tahunan", category: "Arsip Kondisional", subCategory: "Riwayat SKP / Kinerja", date: "02 Jan 2026", size: "1.5 MB", type: "pdf" },
    { id: "d7", title: "KTP, Kartu Keluarga, & NPWP", category: "Arsip Kondisional", subCategory: "Riwayat Keluarga & Identitas", date: "15 Jun 2023", size: "2.0 MB", type: "pdf" },
];

export default function ArsipDokumenPage() {
    const insets = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);

    // State untuk Modal Upload Dokumen Baru
    const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
    const [newDocTitle, setNewDocTitle] = useState("");
    const [newDocCategory, setNewDocCategory] = useState<"Arsip Utama" | "Arsip Kondisional">("Arsip Utama");
    const [newDocSub, setNewDocSub] = useState("Riwayat Pendidikan");

    const handleBack = () => {
        router.back();
    };

    // Filter Data berdasarkan Pencarian & Kategori Utama
    const filteredDocuments = documents.filter((doc) => {
        const matchCategory = activeCategory === "Semua" || doc.category === activeCategory;
        const matchSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            doc.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
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

    // Fungsi Tambah Arsip Baru
    const handleSaveNewDocument = () => {
        if (!newDocTitle.trim()) {
            Alert.alert("Perhatian", "Nama/Judul dokumen wajib diisi!");
            return;
        }

        const newEntry: DocumentItem = {
            id: Date.now().toString(),
            title: newDocTitle,
            category: newDocCategory,
            subCategory: newDocSub,
            date: "Hari Ini",
            size: "1.2 MB",
            type: "pdf",
        };

        setDocuments([newEntry, ...documents]);
        setNewDocTitle("");
        setIsUploadModalVisible(false);
        Alert.alert("Berhasil", "Dokumen kepegawaian baru berhasil ditambahkan ke arsip.");
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }]}>
            
            {/* --- HEADER --- */}
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.pageTitle} numberOfLines={1}>Arsip Kepegawaian ASN</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* --- SEARCH BAR --- */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBox}>
                    <MaterialCommunityIcons name="magnify" size={24} color="#555" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Cari dokumen utama atau kondisional..."
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

            {/* --- FILTER KATEGORI UTAMA / KONDISIONAL --- */}
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
                        <Text style={styles.emptyStateText}>Arsip dokumen tidak ditemukan.</Text>
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
                                    {item.subCategory} • {item.date}
                                </Text>
                                <View style={[styles.badgeCategory, { backgroundColor: item.category === "Arsip Utama" ? "#CAFFBF" : "#FDFFB6" }]}>
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

            {/* --- FLOATING ACTION BUTTON (TAMBAH ARSIP) --- */}
            <TouchableOpacity 
                style={styles.fab} 
                activeOpacity={0.8}
                onPress={() => setIsUploadModalVisible(true)}
            >
                <MaterialCommunityIcons name="plus" size={32} color="#FFF" />
            </TouchableOpacity>

            {/* --- MODAL UPLOAD ARSIP BARU --- */}
            <Modal
                visible={isUploadModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsUploadModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Unggah Dokumen Kepegawaian</Text>
                        <Text style={styles.modalSub}>Tambahkan dokumen ke arsip utama atau kondisional Anda.</Text>
                        
                        <Text style={styles.labelModal}>Nama Dokumen / SK</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Contoh: SK Kenaikan Pangkat Terakhir"
                            placeholderTextColor="#888"
                            value={newDocTitle}
                            onChangeText={setNewDocTitle}
                        />

                        <Text style={styles.labelModal}>Kategori Utama</Text>
                        <View style={styles.rowCategoryModal}>
                            {(["Arsip Utama", "Arsip Kondisional"] as const).map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    style={[styles.chipModal, newDocCategory === cat && styles.chipModalActive]}
                                    onPress={() => setNewDocCategory(cat)}
                                >
                                    <Text style={[styles.chipModalText, newDocCategory === cat && styles.chipModalTextActive]}>
                                        {cat}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.labelModal}>Jenis Riwayat</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Contoh: Riwayat Golongan / SKP / Keluarga"
                            placeholderTextColor="#888"
                            value={newDocSub}
                            onChangeText={setNewDocSub}
                        />

                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setIsUploadModalVisible(false)}>
                                <Text style={styles.modalBtnCancelText}>Batal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtnUpload} onPress={handleSaveNewDocument}>
                                <Text style={styles.modalBtnUploadText}>Simpan Berkas</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FDFBF7" },
    
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
    pageTitle: { fontSize: 17, fontWeight: "900", color: "#000", textAlign: "center", flex: 1, paddingHorizontal: 5 },

    // Search Bar
    searchContainer: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
    searchBox: {
        flexDirection: "row", alignItems: "center", backgroundColor: "#FFF",
        borderWidth: 3, borderColor: "#000", borderRadius: 12, paddingHorizontal: 12, height: 50,
        shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 6,
    },
    searchInput: { flex: 1, fontSize: 13, fontWeight: "700", color: "#000", marginLeft: 10 },

    // Filter Chips
    filterWrapper: { marginBottom: 16 },
    filterScroll: { paddingHorizontal: 20, gap: 10, paddingBottom: 10, paddingTop: 5 },
    filterChip: {
        paddingVertical: 8, paddingHorizontal: 16, backgroundColor: "#FFF", borderRadius: 12,
        borderWidth: 2, borderColor: "#000",
    },
    filterChipActive: { backgroundColor: "#000" },
    filterChipText: { fontSize: 13, fontWeight: "800", color: "#000" },
    filterChipTextActive: { color: "#FFF" },

    // Document List
    listContainer: { paddingHorizontal: 20, paddingBottom: 100, gap: 16 },
    docCard: {
        flexDirection: "row", alignItems: "center", backgroundColor: "#FFF",
        borderRadius: 16, borderWidth: 3, borderColor: "#000", padding: 16, gap: 12,
        shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 6,
    },
    docIconBox: {
        width: 50, height: 50, borderRadius: 12, borderWidth: 2, borderColor: "#000",
        justifyContent: "center", alignItems: "center",
    },
    docInfo: { flex: 1, justifyContent: "center" },
    docTitle: { fontSize: 15, fontWeight: "900", color: "#000", marginBottom: 4 },
    docSub: { fontSize: 11, fontWeight: "700", color: "#555", marginBottom: 6 },
    badgeCategory: {
        alignSelf: "flex-start", paddingVertical: 3, paddingHorizontal: 8,
        borderRadius: 6, borderWidth: 1.5, borderColor: "#000",
    },
    badgeText: { fontSize: 10, fontWeight: "900", color: "#000", textTransform: "uppercase" },
    
    downloadBtn: {
        width: 40, height: 40, backgroundColor: "#FFF", borderRadius: 10,
        borderWidth: 2, borderColor: "#000", justifyContent: "center", alignItems: "center",
    },

    // Empty State
    emptyState: { alignItems: "center", justifyContent: "center", paddingTop: 60 },
    emptyStateText: { fontSize: 15, fontWeight: "800", color: "#555", marginTop: 16 },

    // FAB
    fab: {
        position: "absolute", bottom: 50, right: 20, width: 60, height: 60,
        backgroundColor: "#4361EE", borderRadius: 30, borderWidth: 3, borderColor: "#000",
        justifyContent: "center", alignItems: "center",
        shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 6,
    },

    // Modal Styles
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 20 },
    modalContent: {
        backgroundColor: "#FFF", borderRadius: 16, borderWidth: 3, borderColor: "#000",
        padding: 20, width: "100%", maxWidth: 420, shadowColor: "#000", shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1, elevation: 6,
    },
    modalTitle: { fontSize: 18, fontWeight: "900", color: "#000", marginBottom: 4 },
    modalSub: { fontSize: 12, fontWeight: "700", color: "#555", marginBottom: 16 },
    labelModal: { fontSize: 13, fontWeight: "800", color: "#000", marginBottom: 6, marginTop: 10 },
    modalInput: {
        backgroundColor: "#F9F6EE", borderWidth: 2, borderColor: "#000", borderRadius: 10,
        paddingHorizontal: 12, paddingVertical: 10, fontSize: 13, fontWeight: "700", color: "#000",
    },
    rowCategoryModal: { flexDirection: "row", gap: 10, marginTop: 4 },
    chipModal: {
        flex: 1, paddingVertical: 10, borderWidth: 2, borderColor: "#000", borderRadius: 8,
        alignItems: "center", backgroundColor: "#F9F6EE",
    },
    chipModalActive: { backgroundColor: "#CAFFBF" },
    chipModalText: { fontSize: 12, fontWeight: "800", color: "#000" },
    chipModalTextActive: { color: "#000" },
    modalButtonRow: { flexDirection: "row", gap: 12, marginTop: 24 },
    modalBtnCancel: {
        flex: 1, paddingVertical: 12, borderWidth: 2, borderColor: "#000", borderRadius: 10,
        alignItems: "center", backgroundColor: "#FFF",
    },
    modalBtnCancelText: { fontSize: 13, fontWeight: "900", color: "#000" },
    modalBtnUpload: {
        flex: 1, paddingVertical: 12, borderWidth: 2, borderColor: "#000", borderRadius: 10,
        alignItems: "center", backgroundColor: "#4361EE",
    },
    modalBtnUploadText: { fontSize: 13, fontWeight: "900", color: "#FFF" },
});