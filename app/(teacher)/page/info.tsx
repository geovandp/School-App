import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SchoolInfoItem = {
    id: string;
    title: string;
    date: string;
    image: string;
    description: string;
    fullDetail: string;
    category: "Pengumuman" | "Kegiatan" | "Prestasi";
};

// Data Dummy Info Sekolah
const schoolInfoData: SchoolInfoItem[] = [
    {
        id: "1",
        title: "Penerimaan Beasiswa Prestasi Siswa Semester Ganjil 2026",
        date: "03 September 2026",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
        description: "Pendaftaran program beasiswa prestasi akademik dan non-akademik telah dibuka untuk seluruh siswa kelas X hingga XII.",
        fullDetail: "Program beasiswa prestasi tahun ajaran 2026/2027 resmi dibuka mulai tanggal 3 hingga 20 September 2026. Syarat pendaftaran meliputi nilai rapor rata-rata minimal 85, melampirkan sertifikat kejuaraan (jika ada), serta surat rekomendasi dari wali kelas. Formulir dapat diambil di ruang tata usaha atau diunduh melalui portal sekolah.",
        category: "Pengumuman",
    },
    {
        id: "2",
        title: "Kegiatan Studi Banding & Peluncuran Projek P5",
        date: "01 September 2026",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
        description: "Siswa kelas XI mengikuti rangkaian kegiatan studi banding dan pameran hasil karya Projek Penguatan Profil Pelajar Pancasila.",
        fullDetail: "Sebagai bagian dari kurikulum merdeka, kegiatan Projek Penguatan Profil Pelajar Pancasila (P5) mengangkat tema 'Kewirausahaan dan Kearifan Lokal'. Acara ini diisi dengan pameran produk daur ulang kreatif serta pementasan seni tradisional oleh perwakilan kelompok siswa di aula utama sekolah.",
        category: "Kegiatan",
    },
    {
        id: "3",
        title: "Tim Olimpiade Sains Sekolah Raih Medali Emas Nasional",
        date: "28 Agustus 2026",
        image: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?q=80&w=600&auto=format&fit=crop",
        description: "Kebanggaan datang kembali setelah perwakilan siswa berhasil menyabet juara pertama dalam ajang Olimpiade Sains tingkat nasional.",
        fullDetail: "Prestasi membanggakan kembali ditorehkan oleh tim olimpiade sains sekolah. Medali emas berhasil diraih pada bidang Matematika dan Fisika dalam kompetisi sains nasional yang diselenggarakan di Jakarta. Kepala sekolah menyampaikan apresiasi tinggi kepada para siswa dan guru pembimbing.",
        category: "Prestasi",
    },
];

export default function InfoSekolahPage() {
    const insets = useSafeAreaInsets();
    const [selectedInfo, setSelectedInfo] = useState<SchoolInfoItem | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenDetail = (item: SchoolInfoItem) => {
        setSelectedInfo(item);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedInfo(null);
    };

    const renderCardItem = ({ item }: { item: SchoolInfoItem }) => (
        <View style={styles.card}>
            {/* Foto / Banner Info */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                </View>
            </View>

            {/* Konten Card */}
            <View style={styles.cardContent}>
                <View style={styles.dateRow}>
                    <MaterialCommunityIcons name="calendar-outline" size={14} color="#666" />
                    <Text style={styles.dateText}>{item.date}</Text>
                </View>

                <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>

                {/* Tombol Detail */}
                <TouchableOpacity
                    style={styles.detailButton}
                    activeOpacity={0.8}
                    onPress={() => handleOpenDetail(item)}
                >
                    <Text style={styles.detailButtonText}>Baca Selengkapnya</Text>
                    <MaterialCommunityIcons name="arrow-right" size={16} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top,
                    paddingBottom: Math.max(insets.bottom, 16),
                },
            ]}
        >
            {/* Header Halaman */}
            <View style={styles.pageHeader}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Info Sekolah</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Subtitle */}
            <View style={styles.subHeaderContainer}>
                <Text style={styles.subHeaderTitle}>Pengumuman & Berita Terbaru</Text>
            </View>

            {/* List Data Card */}
            <FlatList
                data={schoolInfoData}
                keyExtractor={(item) => item.id}
                renderItem={renderCardItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            {/* MODAL INFO / DETAIL */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* Header Modal */}
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalHeaderTitle}>Detail Informasi</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={handleCloseModal}
                            >
                                <MaterialCommunityIcons name="close" size={20} color="#000" />
                            </TouchableOpacity>
                        </View>

                        {/* Konten Detail di dalam Modal */}
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {selectedInfo && (
                                <View>
                                    <Image source={{ uri: selectedInfo.image }} style={styles.modalImage} />
                                    
                                    <View style={styles.modalMetaRow}>
                                        <View style={styles.modalCategoryBadge}>
                                            <Text style={styles.categoryText}>{selectedInfo.category}</Text>
                                        </View>
                                        <View style={styles.dateRow}>
                                            <MaterialCommunityIcons name="calendar-outline" size={14} color="#666" />
                                            <Text style={styles.dateText}>{selectedInfo.date}</Text>
                                        </View>
                                    </View>

                                    <Text style={styles.modalTitle}>{selectedInfo.title}</Text>
                                    <Text style={styles.modalFullDetail}>{selectedInfo.fullDetail}</Text>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FDFBF7",
    },
    pageHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 3,
        borderBottomColor: "#000",
        backgroundColor: "#FFF",
    },
    backButton: {
        width: 40,
        height: 40,
        backgroundColor: "#FFF",
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 3,
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: "900",
        color: "#000",
        textAlign: "center",
        flex: 1,
    },
    subHeaderContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    subHeaderTitle: {
        fontSize: 16,
        fontWeight: "900",
        color: "#000",
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        gap: 16,
    },
    // Styling Card
    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        borderWidth: 3,
        borderColor: "#000",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    imageContainer: {
        height: 160,
        width: "100%",
        borderBottomWidth: 3,
        borderBottomColor: "#000",
        backgroundColor: "#EEE",
    },
    cardImage: {
        width: "100%",
        height: "100%",
    },
    categoryBadge: {
        position: "absolute",
        top: 12,
        right: 12,
        backgroundColor: "#FFD166",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#000",
    },
    categoryText: {
        fontSize: 10,
        fontWeight: "900",
        color: "#000",
        textTransform: "uppercase",
    },
    cardContent: {
        padding: 16,
    },
    dateRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginBottom: 6,
    },
    dateText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#555",
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "900",
        color: "#000",
        marginBottom: 6,
    },
    cardDesc: {
        fontSize: 13,
        fontWeight: "600",
        color: "#444",
        marginBottom: 14,
        lineHeight: 18,
    },
    detailButton: {
        backgroundColor: "#000",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000",
        gap: 6,
    },
    detailButtonText: {
        color: "#FFF",
        fontSize: 13,
        fontWeight: "800",
    },
    // Styling Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    modalContent: {
        width: "100%",
        maxHeight: "85%",
        backgroundColor: "#FDFBF7",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderWidth: 3,
        borderBottomWidth: 0,
        borderColor: "#000",
        padding: 20,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        borderBottomWidth: 2,
        borderBottomColor: "#000",
        paddingBottom: 10,
    },
    modalHeaderTitle: {
        fontSize: 18,
        fontWeight: "900",
        color: "#000",
    },
    closeButton: {
        backgroundColor: "#FFADAD",
        width: 32,
        height: 32,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    modalImage: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#000",
        marginBottom: 14,
    },
    modalMetaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    modalCategoryBadge: {
        backgroundColor: "#FFD166",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#000",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "900",
        color: "#000",
        marginBottom: 10,
        lineHeight: 24,
    },
    modalFullDetail: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        lineHeight: 22,
        paddingBottom: 20,
    },
});