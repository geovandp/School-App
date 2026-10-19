import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Data Khusus PKSP Siti Aminah
const teacherProfile = {
    name: "Siti Aminah, S.Pd",
    nip: "19850723 201001 2 014",
    subject: "Matematika",
};

// Akumulasi Skor PKSP Siti Aminah dari Rekan Penilai
const pkspScoreData = {
    desember: { score: 91.5, status: "Sangat Baik", evaluatorsCount: 5 },
    juni: { score: 88.0, status: "Baik", evaluatorsCount: 5 },
    tahunan: { score: 89.75, status: "Sangat Baik", evaluatorsCount: 10 },
};

// Daftar Rekan Kerja Pembagian Tugas untuk Dinilai oleh Siti Aminah
const peersAssignedToSiti = [
    { id: "p1", name: "Budi Santoso, M.Pd", nip: "19820311 200801 1 005", status: "Selesai", scoreGiven: 92 },
    { id: "p2", name: "Dewi Lestari, S.Si", nip: "19900115 201402 2 008", status: "Draft", completedItems: 32 },
    { id: "p3", name: "Ahmad Dahlan, S.Kom", nip: "19880520 201101 1 012", status: "Belum", completedItems: 0 },
    { id: "p4", name: "Rina Wijaya, S.Pd", nip: "19920810 201801 2 003", status: "Belum", completedItems: 0 },
];

const instrumentCategories = [
    { id: "cat1", title: "Pedagogik (18 Butir)", itemsCount: 18 },
    { id: "cat2", title: "Kepribadian (14 Butir)", itemsCount: 14 },
    { id: "cat3", title: "Sosial (12 Butir)", itemsCount: 12 },
    { id: "cat4", title: "Profesional (20 Butir)", itemsCount: 20 },
];

export default function PkspDashboardPage() {
    const insets = useSafeAreaInsets();

    const [selectedPeriod, setSelectedPeriod] = useState<"desember" | "juni" | "tahunan">("desember");
    const [selectedPeer, setSelectedPeer] = useState<any>(null);
    const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);

    const handleBack = () => {
        router.back();
    };

    const getPerformanceStyle = (score: number) => {
        if (score >= 90) return { color: "#CAFFBF", status: "Sangat Baik" };
        if (score >= 80) return { color: "#9BF6FF", status: "Baik" };
        if (score >= 70) return { color: "#FDFFB6", status: "Cukup" };
        return { color: "#FFADAD", status: "Perlu Bimbingan" };
    };

    const currentScore = pkspScoreData[selectedPeriod];

    const openAssessment = (peer: any) => {
        setSelectedPeer(peer);
        setIsAssessmentModalOpen(true);
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }]}>
            
            {/* HEADER */}
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.pageTitle} numberOfLines={1}>Dashboard PKSP</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* BANNER NAMA */}
                <View style={styles.userCard}>
                    <MaterialCommunityIcons name="account-star-outline" size={28} color="#000" />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.userName}>{teacherProfile.name}</Text>
                        <Text style={styles.userSub}>NIP. {teacherProfile.nip}</Text>
                    </View>
                </View>

                {/* FILTER PERIODE PENILAIAN */}
                <Text style={styles.sectionTitle}>Periode Hasil PKSP</Text>
                <View style={styles.periodTabContainer}>
                    <TouchableOpacity
                        style={[styles.periodTab, selectedPeriod === "desember" && styles.periodTabActive]}
                        onPress={() => setSelectedPeriod("desember")}
                    >
                        <Text style={[styles.periodTabText, selectedPeriod === "desember" && styles.periodTabTextActive]}>
                            Sem. Des
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.periodTab, selectedPeriod === "juni" && styles.periodTabActive]}
                        onPress={() => setSelectedPeriod("juni")}
                    >
                        <Text style={[styles.periodTabText, selectedPeriod === "juni" && styles.periodTabTextActive]}>
                            Sem. Juni
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.periodTab, selectedPeriod === "tahunan" && styles.periodTabActive]}
                        onPress={() => setSelectedPeriod("tahunan")}
                    >
                        <Text style={[styles.periodTabText, selectedPeriod === "tahunan" && styles.periodTabTextActive]}>
                            Tahunan
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* SKOR PKSP SITI AMINAH */}
                <View style={styles.highlightRow}>
                    <View style={[styles.highlightCard, { backgroundColor: "#BDB2FF", flex: 1.2 }]}>
                        <View style={styles.cardIconBox}>
                            <MaterialCommunityIcons name="trophy-award" size={28} color="#000" />
                        </View>
                        <Text style={styles.highlightValue}>{currentScore.score}</Text>
                        <Text style={styles.highlightLabel}>Skor PKSP Saya ({selectedPeriod.toUpperCase()})</Text>
                        
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: `${currentScore.score}%`, backgroundColor: getPerformanceStyle(currentScore.score).color }]} />
                        </View>
                        <Text style={styles.targetText}>Dari {currentScore.evaluatorsCount} Rekan Penilai</Text>
                    </View>

                    <View style={styles.highlightColumn}>
                        <View style={[styles.smallCard, { backgroundColor: "#9BF6FF" }]}>
                            <Text style={styles.smallCardValue}>64</Text>
                            <Text style={styles.smallCardLabel}>Instrumen PKSP</Text>
                        </View>
                        <View style={[styles.smallCard, { backgroundColor: getPerformanceStyle(currentScore.score).color }]}>
                            <Text style={styles.smallCardValue}>{currentScore.status}</Text>
                            <Text style={styles.smallCardLabel}>Predikat Kinerja</Text>
                        </View>
                    </View>
                </View>

                {/* PENILAIAN SEJAWAT (PENILAIAN ANTAR TEMAN SITI AMINAH) */}
                <View style={styles.sectionHeaderRow}>
                    <View>
                        <Text style={styles.sectionTitle}>Penilaian Sejawat</Text>
                        <Text style={styles.sectionSubtitle}>Siti Aminah menilai pegawai pembagian</Text>
                    </View>
                    <View style={styles.countBadge}>
                        <Text style={styles.countBadgeText}>{peersAssignedToSiti.length} Pegawai</Text>
                    </View>
                </View>

                {peersAssignedToSiti.map((peer) => {
                    const isDone = peer.status === "Selesai";
                    const isDraft = peer.status === "Draft";

                    return (
                        <View key={peer.id} style={styles.listCard}>
                            <View style={styles.listCardHeader}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.className}>{peer.name}</Text>
                                    <Text style={styles.teacherName}>NIP. {peer.nip}</Text>
                                </View>

                                <View style={[
                                    styles.statusBadge, 
                                    { backgroundColor: isDone ? "#CAFFBF" : isDraft ? "#FDFFB6" : "#FFADAD" }
                                ]}>
                                    <Text style={styles.statusText}>{peer.status}</Text>
                                </View>
                            </View>

                            <View style={styles.peerActionRow}>
                                <Text style={styles.progressValueText}>
                                    {isDone ? "64 / 64 Instrumen" : `${peer.completedItems || 0} / 64 Instrumen`}
                                </Text>

                                <TouchableOpacity
                                    style={[styles.assessButton, { backgroundColor: isDone ? "#E0E0E0" : "#9BF6FF" }]}
                                    onPress={() => openAssessment(peer)}
                                >
                                    <Text style={styles.assessButtonText}>
                                        {isDone ? "Lihat/Edit" : isDraft ? "Lanjutkan" : "Mulai Nilai"}
                                    </Text>
                                    <MaterialCommunityIcons name="chevron-right" size={18} color="#000" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })}

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* MODAL 64 INSTRUMEN */}
            <Modal
                visible={isAssessmentModalOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsAssessmentModalOpen(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.modalTitle}>Evaluasi PKSP Sejawat</Text>
                                <Text style={styles.modalSubtitle}>Menilai: {selectedPeer?.name}</Text>
                            </View>
                            <TouchableOpacity style={styles.closeBtn} onPress={() => setIsAssessmentModalOpen(false)}>
                                <MaterialCommunityIcons name="close" size={22} color="#000" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: 16 }}>
                            <Text style={styles.modalSectionTitle}>Instrumen Penilaian (64 Butir):</Text>
                            
                            {instrumentCategories.map((cat, idx) => (
                                <TouchableOpacity key={cat.id} style={styles.categoryCard} activeOpacity={0.8}>
                                    <View style={styles.categoryNum}>
                                        <Text style={styles.categoryNumText}>{idx + 1}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.categoryTitle}>{cat.title}</Text>
                                        <Text style={styles.categorySub}>{cat.itemsCount} Indikator Evaluasi</Text>
                                    </View>
                                    <MaterialCommunityIcons name="square-edit-outline" size={22} color="#000" />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <TouchableOpacity 
                            style={styles.submitModalBtn}
                            onPress={() => {
                                setIsAssessmentModalOpen(false);
                                alert("Draft Penilaian PKSP Berhasil Disimpan!");
                            }}
                        >
                            <Text style={styles.submitModalBtnText}>Simpan Draft Penilaian</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FDFBF7" },
    pageHeader: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 3,
        borderBottomColor: "#000", backgroundColor: "#FFF",
    },
    backButton: {
        width: 40, height: 40, backgroundColor: "#FFF", borderWidth: 2,
        borderColor: "#000", borderRadius: 10, justifyContent: "center", alignItems: "center",
        shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, elevation: 3,
    },
    pageTitle: { fontSize: 18, fontWeight: "900", color: "#000", textAlign: "center", flex: 1 },
    scrollContent: { padding: 20 },
    userCard: {
        flexDirection: "row", alignItems: "center", backgroundColor: "#FDFFB6",
        padding: 14, borderRadius: 12, borderWidth: 3, borderColor: "#000", marginBottom: 20, gap: 12,
    },
    userName: { fontSize: 16, fontWeight: "900", color: "#000" },
    userSub: { fontSize: 12, fontWeight: "700", color: "#555" },
    periodTabContainer: {
        flexDirection: "row", backgroundColor: "#FFF", borderRadius: 12,
        borderWidth: 3, borderColor: "#000", padding: 4, marginBottom: 20, gap: 4,
    },
    periodTab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 8 },
    periodTabActive: { backgroundColor: "#CAFFBF", borderWidth: 2, borderColor: "#000" },
    periodTabText: { fontSize: 12, fontWeight: "800", color: "#555" },
    periodTabTextActive: { color: "#000", fontWeight: "900" },
    sectionTitle: { fontSize: 18, fontWeight: "900", color: "#000", marginBottom: 12 },
    sectionSubtitle: { fontSize: 12, fontWeight: "700", color: "#666", marginTop: -8, marginBottom: 12 },
    sectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 24, marginBottom: 12 },
    countBadge: { backgroundColor: "#FFF", borderWidth: 2, borderColor: "#000", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
    countBadgeText: { fontSize: 12, fontWeight: "900", color: "#000" },
    highlightRow: { flexDirection: "row", gap: 16 },
    highlightCard: { borderRadius: 16, borderWidth: 3, borderColor: "#000", padding: 16, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 6 },
    cardIconBox: { width: 48, height: 48, backgroundColor: "#FFF", borderRadius: 12, borderWidth: 2, borderColor: "#000", justifyContent: "center", alignItems: "center", marginBottom: 16 },
    highlightValue: { fontSize: 36, fontWeight: "900", color: "#000" },
    highlightLabel: { fontSize: 12, fontWeight: "700", color: "#333", marginTop: 4 },
    progressBarBg: { height: 12, backgroundColor: "#FFF", borderRadius: 6, borderWidth: 2, borderColor: "#000", marginTop: 16, overflow: "hidden" },
    progressBarFill: { height: "100%", borderRightWidth: 2, borderColor: "#000" },
    targetText: { fontSize: 11, fontWeight: "700", color: "#333", marginTop: 8, textAlign: "right" },
    highlightColumn: { flex: 1, gap: 16 },
    smallCard: { flex: 1, borderRadius: 16, borderWidth: 3, borderColor: "#000", padding: 14, justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 6 },
    smallCardValue: { fontSize: 20, fontWeight: "900", color: "#000" },
    smallCardLabel: { fontSize: 11, fontWeight: "700", color: "#333", marginTop: 2 },
    listCard: { backgroundColor: "#FFF", borderRadius: 16, borderWidth: 3, borderColor: "#000", padding: 16, marginBottom: 14, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 6 },
    listCardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
    className: { fontSize: 15, fontWeight: "900", color: "#000" },
    teacherName: { fontSize: 12, fontWeight: "700", color: "#555", marginTop: 2 },
    statusBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8, borderWidth: 2, borderColor: "#000" },
    statusText: { fontSize: 11, fontWeight: "900", color: "#000" },
    peerActionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTopWidth: 2, borderTopColor: "#F0F0F0" },
    progressValueText: { fontSize: 12, fontWeight: "800", color: "#555" },
    assessButton: { flexDirection: "row", alignItems: "center", borderWidth: 2, borderColor: "#000", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, gap: 4 },
    assessButtonText: { fontSize: 12, fontWeight: "900", color: "#000" },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
    modalContent: { backgroundColor: "#FDFBF7", borderTopLeftRadius: 24, borderTopRightRadius: 24, borderWidth: 3, borderColor: "#000", padding: 20, maxHeight: "80%" },
    modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 12, borderBottomWidth: 2, borderBottomColor: "#000" },
    modalTitle: { fontSize: 18, fontWeight: "900", color: "#000" },
    modalSubtitle: { fontSize: 13, fontWeight: "700", color: "#555", marginTop: 2 },
    closeBtn: { width: 36, height: 36, backgroundColor: "#FFF", borderWidth: 2, borderColor: "#000", borderRadius: 8, justifyContent: "center", alignItems: "center" },
    modalSectionTitle: { fontSize: 14, fontWeight: "900", color: "#000", marginBottom: 12 },
    categoryCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFF", borderWidth: 2, borderColor: "#000", borderRadius: 12, padding: 12, marginBottom: 10, gap: 12 },
    categoryNum: { width: 32, height: 32, backgroundColor: "#FDFFB6", borderWidth: 2, borderColor: "#000", borderRadius: 8, justifyContent: "center", alignItems: "center" },
    categoryNumText: { fontSize: 14, fontWeight: "900", color: "#000" },
    categoryTitle: { fontSize: 14, fontWeight: "900", color: "#000" },
    categorySub: { fontSize: 11, fontWeight: "700", color: "#666" },
    submitModalBtn: { backgroundColor: "#CAFFBF", borderWidth: 3, borderColor: "#000", borderRadius: 12, paddingVertical: 14, alignItems: "center", marginTop: 12, shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1 },
    submitModalBtnText: { fontSize: 15, fontWeight: "900", color: "#000" },
});