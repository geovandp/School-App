import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    TextInput,
    Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Data Guru Sesuai Konteks Baru
const teacherProfile = {
    name: "Transjana Catur Isaputro, S.ST, S.ST",
    nip: "198605062022211021",
    subject: "Produktif / Mapel Kejuruan",
    additionalTask: "Wakil Kepala Sekolah (Waka) & Wali Kelas",
    menteeCount: 18, // Target bimbingan siswa sebagai guru wali
};

export default function KpiDefaultPage() {
    const insets = useSafeAreaInsets();

    // State untuk Modal Upload Perangkat KBM (Perencanaan)
    const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
    const [fileName, setFileName] = useState("Perangkat_KBM_Semester_Ini.pdf");

    // State untuk Evaluasi / Catatan Harian (Evaluasi)
    const [evaluationNotes, setEvaluationNotes] = useState([
        { id: "e1", date: "19 Okt 2026", note: "Tingkatkan ketepatan waktu rekapitulasi penugasan harian siswa." },
        { id: "e2", date: "18 Okt 2026", note: "Pencapaian JP minggu ini terpenuhi 100% di Lab Komputer." }
    ]);
    const [newNote, setNewNote] = useState("");

    const handleBack = () => {
        router.back();
    };

    const handleUploadKbm = () => {
        Alert.alert("Berhasil", `Berkas digital "${fileName}" berhasil diunggah ke sistem Perencanaan KBM.`);
        setIsUploadModalVisible(false);
    };

    const handleAddEvaluation = () => {
        if (!newNote.trim()) return;
        const entry = {
            id: Date.now().toString(),
            date: "Hari ini",
            note: newNote,
        };
        setEvaluationNotes([entry, ...evaluationNotes]);
        setNewNote("");
        Alert.alert("Catatan Ditambahkan", "Evaluasi harian terekam secara digital.");
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }]}>

            {/* HEADER */}
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.pageTitle} numberOfLines={1}>KPI & Kinerja Guru</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* PROFIL GURU & TUGAS TAMBAHAN */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarBox}>
                        <MaterialCommunityIcons name="account-tie" size={40} color="#000" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.profileName}>{teacherProfile.name}</Text>
                        <Text style={styles.profileSub}>NIP. {teacherProfile.nip}</Text>
                        <View style={styles.badgeTask}>
                            <Text style={styles.badgeTaskText}>{teacherProfile.additionalTask}</Text>
                        </View>
                    </View>
                </View>

                {/* BANNER SHORTCUT KE DASHBOARD PKSP */}
                <TouchableOpacity
                    style={styles.pkspBanner}
                    activeOpacity={0.85}
                    onPress={() => router.push("/(teacher)/page/PkspDashboard")}
                >
                    <View style={styles.pkspBannerIcon}>
                        <MaterialCommunityIcons name="clipboard-account-outline" size={32} color="#000" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                            <Text style={styles.pkspBannerTitle}>Instrumen Penilaian PKSP</Text>
                            
                        </View>
                        <Text style={styles.pkspBannerSub}>Penilaian Kinerja & Sejawat Berbasis Digital</Text>
                    </View>
                    <MaterialCommunityIcons name="arrow-right-bold-circle" size={28} color="#000" />
                </TouchableOpacity>

                {/* 1. PERENCANAAN */}
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>1. Perencanaan KBM (e-File)</Text>
                    <TouchableOpacity style={styles.smallActionButton} onPress={() => setIsUploadModalVisible(true)}>
                        <MaterialCommunityIcons name="cloud-upload" size={16} color="#000" />
                        <Text style={styles.smallActionText}>Upload Berkas</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardBox}>
                    <View style={styles.rowItem}>
                        <MaterialCommunityIcons name="file-document-check" size={24} color="#4361EE" />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.cardItemTitle}>Perangkat KBM & Silabus</Text>
                            <Text style={styles.cardItemSub}>Status: Terunggah & Terverifikasi Sistem</Text>
                        </View>
                        <View style={styles.statusDone}>
                            <Text style={styles.statusDoneText}>OK</Text>
                        </View>
                    </View>
                </View>

                {/* 2. PEMBIMBINGAN */}
                <Text style={styles.sectionTitle}>2. Pembimbingan & Tugas Tambahan</Text>
                <View style={styles.cardBox}>
                    <View style={styles.rowItem}>
                        <MaterialCommunityIcons name="account-group" size={24} color="#7209B7" />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.cardItemTitle}>Wali Kelas / Guru Wali</Text>
                            <Text style={styles.cardItemSub}>Membimbing {teacherProfile.menteeCount} Murid binaan aktif.</Text>
                        </View>
                        <Text style={styles.boldScore}>100%</Text>
                    </View>
                    <View style={[styles.rowItem, { borderTopWidth: 2, borderTopColor: "#EEE", marginTop: 12, paddingTop: 12 }]}>
                        <MaterialCommunityIcons name="briefcase-outline" size={24} color="#F77F00" />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.cardItemTitle}>Tugas Tambahan Institusional</Text>
                            <Text style={styles.cardItemSub}>{teacherProfile.additionalTask}</Text>
                        </View>
                        <View style={styles.statusDone}>
                            <Text style={styles.statusDoneText}>Aktif</Text>
                        </View>
                    </View>
                </View>

                {/* 3. PELAKSANAAN KBM */}
                <Text style={styles.sectionTitle}>3. Pelaksanaan KBM (Kelas / Lab)</Text>
                <View style={styles.cardBox}>
                    <View style={styles.rowItem}>
                        <MaterialCommunityIcons name="timer-check" size={24} color="#2A9D8F" />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.cardItemTitle}>Pencapaian Jam Pelajaran (JP) Mingguan</Text>
                            <Text style={styles.cardItemSub}>Terlaksana masuk kelas/lab tepat waktu sesuai jadwal.</Text>
                        </View>
                        <Text style={styles.boldScore}>32 / 32 JP</Text>
                    </View>
                </View>

                {/* 4. PENILAIAN */}
                {/* 4. PENILAIAN */}
                <Text style={styles.sectionTitle}>4. Penilaian & Pengembangan</Text>
                <View style={styles.cardBox}>
                    <Text style={styles.cardItemTitle}>Rekap Aktivitas Evaluasi Siswa</Text>
                    <Text style={[styles.cardItemSub, { marginTop: 4, marginBottom: 12 }]}>
                        Quiz, Penugasan Harian, Ulangan Harian, UTS/UAS terintegrasi.
                    </Text>
                    <View style={styles.progressRow}>
                        <View style={styles.progressBarBgList}>
                            <View style={[styles.progressBarFillList, { width: "95%", backgroundColor: "#CAFFBF" }]} />
                        </View>
                        <Text style={styles.progressValueText}>95%</Text>
                    </View>
                </View>

                {/* 5. EVALUASI (DIGITAL LOGS) */}
                <Text style={styles.sectionTitle}>5. Evaluasi & Catatan Perbaikan Harian</Text>
                <View style={styles.cardBox}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputNote}
                            placeholder="Tulis catatan/evaluasi harian..."
                            placeholderTextColor="#888"
                            value={newNote}
                            onChangeText={setNewNote}
                        />
                        <TouchableOpacity style={styles.addButton} onPress={handleAddEvaluation}>
                            <MaterialCommunityIcons name="plus" size={20} color="#FFF" />
                        </TouchableOpacity>
                    </View>

                    {evaluationNotes.map((item) => (
                        <View key={item.id} style={styles.noteItem}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                                <Text style={styles.noteDate}>{item.date}</Text>
                                <Text style={styles.noteTag}>Underline / Perbaikan</Text>
                            </View>
                            <Text style={styles.noteText}>{item.note}</Text>
                        </View>
                    ))}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* MODAL UPLOAD BERKAS */}
            <Modal
                visible={isUploadModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsUploadModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Upload e-File Perangkat KBM</Text>
                        <Text style={styles.modalSub}>Pilih berkas digital perangkat pembelajaran Anda (Silabus, RPP/Modul Ajar).</Text>

                        <TextInput
                            style={styles.modalInput}
                            value={fileName}
                            onChangeText={setFileName}
                        />

                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setIsUploadModalVisible(false)}>
                                <Text style={styles.modalBtnCancelText}>Batal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtnUpload} onPress={handleUploadKbm}>
                                <Text style={styles.modalBtnUploadText}>Unggah Sekarang</Text>
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
    profileCard: {
        flexDirection: "row", alignItems: "center", backgroundColor: "#FFF",
        padding: 16, borderRadius: 16, borderWidth: 3, borderColor: "#000",
        marginBottom: 16, gap: 16, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 6,
    },
    avatarBox: {
        width: 60, height: 60, backgroundColor: "#FFB5A7", borderRadius: 16,
        borderWidth: 2, borderColor: "#000", justifyContent: "center", alignItems: "center",
    },
    profileName: { fontSize: 16, fontWeight: "900", color: "#000" },
    profileSub: { fontSize: 12, fontWeight: "700", color: "#555", marginTop: 2 },
    badgeTask: { backgroundColor: "#FDFFB6", borderWidth: 1.5, borderColor: "#000", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, alignSelf: "flex-start", marginTop: 6 },
    badgeTaskText: { fontSize: 10, fontWeight: "900", color: "#000" },

    // PKSP BANNER
    pkspBanner: {
        flexDirection: "row", alignItems: "center", backgroundColor: "#BDB2FF",
        padding: 16, borderRadius: 16, borderWidth: 3, borderColor: "#000",
        marginBottom: 20, gap: 12, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 6,
    },
    pkspBannerIcon: {
        width: 48, height: 48, backgroundColor: "#FFF", borderRadius: 12, borderWidth: 2, borderColor: "#000", justifyContent: "center", alignItems: "center",
    },
    pkspBannerTitle: { fontSize: 15, fontWeight: "900", color: "#000" },
    pkspBannerSub: { fontSize: 11, fontWeight: "700", color: "#333", marginTop: 2 },
    badgeNew: { backgroundColor: "#CAFFBF", borderWidth: 2, borderColor: "#000", paddingHorizontal: 6, paddingVertical: 1, borderRadius: 6 },
    badgeNewText: { fontSize: 10, fontWeight: "900", color: "#000" },

    sectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, marginTop: 10 },
    sectionTitle: { fontSize: 16, fontWeight: "900", color: "#000", marginBottom: 10, marginTop: 15 },
    smallActionButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#9BF6FF", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 2, borderColor: "#000", gap: 4 },
    smallActionText: { fontSize: 11, fontWeight: "900", color: "#000" },

    cardBox: { backgroundColor: "#FFF", borderRadius: 16, borderWidth: 3, borderColor: "#000", padding: 16, marginBottom: 10, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 4 },
    rowItem: { flexDirection: "row", alignItems: "center" },
    cardItemTitle: { fontSize: 14, fontWeight: "900", color: "#000" },
    cardItemSub: { fontSize: 11, fontWeight: "700", color: "#555", marginTop: 2 },
    statusDone: { backgroundColor: "#CAFFBF", borderWidth: 2, borderColor: "#000", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    statusDoneText: { fontSize: 11, fontWeight: "900", color: "#000" },
    boldScore: { fontSize: 15, fontWeight: "900", color: "#000" },

    progressRow: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 8 },
    progressBarBgList: { flex: 1, height: 12, backgroundColor: "#F0F0F0", borderRadius: 6, borderWidth: 2, borderColor: "#000", overflow: "hidden" },
    progressBarFillList: { height: "100%", borderRightWidth: 2, borderColor: "#000" },
    progressValueText: { fontSize: 13, fontWeight: "900", color: "#000", width: 35, textAlign: "right" },

    inputContainer: { flexDirection: "row", gap: 8, marginBottom: 12 },
    inputNote: { flex: 1, backgroundColor: "#F9F6EE", borderWidth: 2, borderColor: "#000", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, fontSize: 13, fontWeight: "700", color: "#000" },
    addButton: { backgroundColor: "#4361EE", borderWidth: 2, borderColor: "#000", borderRadius: 10, width: 42, justifyContent: "center", alignItems: "center" },
    noteItem: { backgroundColor: "#FFF", borderWidth: 2, borderColor: "#000", borderRadius: 10, padding: 10, marginBottom: 8 },
    noteDate: { fontSize: 10, fontWeight: "900", color: "#555" },
    noteTag: { fontSize: 9, fontWeight: "900", color: "#E63946", backgroundColor: "#FFE5E5", paddingHorizontal: 6, borderRadius: 4 },
    noteText: { fontSize: 12, fontWeight: "700", color: "#333", marginTop: 2 },

    // MODAL
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 20 },
    modalContent: { backgroundColor: "#FFF", borderRadius: 16, borderWidth: 3, borderColor: "#000", padding: 20, width: "100%", maxWidth: 400, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 6 },
    modalTitle: { fontSize: 18, fontWeight: "900", color: "#000", marginBottom: 6 },
    modalSub: { fontSize: 12, fontWeight: "700", color: "#555", marginBottom: 16 },
    modalInput: { backgroundColor: "#F9F6EE", borderWidth: 2, borderColor: "#000", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 13, fontWeight: "700", color: "#000", marginBottom: 20 },
    modalButtonRow: { flexDirection: "row", gap: 12 },
    modalBtnCancel: { flex: 1, paddingVertical: 12, borderWidth: 2, borderColor: "#000", borderRadius: 10, alignItems: "center", backgroundColor: "#FFF" },
    modalBtnCancelText: { fontSize: 13, fontWeight: "900", color: "#000" },
    modalBtnUpload: { flex: 1, paddingVertical: 12, borderWidth: 2, borderColor: "#000000", borderRadius: 10, alignItems: "center", backgroundColor: "#CAFFBF" },
    modalBtnUploadText: { fontSize: 13, fontWeight: "900", color: "#000" },
});