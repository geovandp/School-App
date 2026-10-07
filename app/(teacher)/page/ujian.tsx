import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Tipe Data untuk Ujian
type ExamStatus = "Aktif" | "Dijadwalkan" | "Selesai";

type ExamRecord = {
    id: string;
    subject: string;
    className: string;
    date: string;
    time: string;
    duration: string;
    status: ExamStatus;
    participants: string; // misal: "30/30 Siswa" atau "Belum mulai"
};

// Data Dummy Ujian
const examsData: ExamRecord[] = [
    {
        id: "e1",
        subject: "Bahasa Indonesia: Teks Hikayat",
        className: "Kelas X IPA 1",
        date: "16 Sep 2026",
        time: "07:30 - 09:00",
        duration: "90 Menit",
        status: "Aktif",
        participants: "28/30 Siswa Mengerjakan",
    },
    {
        id: "e2",
        subject: "Bahasa Indonesia: Menulis Puisi",
        className: "Kelas X IPS 2",
        date: "18 Sep 2026",
        time: "09:30 - 11:00",
        duration: "90 Menit",
        status: "Dijadwalkan",
        participants: "Belum mulai",
    },
    {
        id: "e3",
        subject: "Ujian Tengah Semester",
        className: "Kelas XI IPA 3",
        date: "10 Sep 2026",
        time: "11:30 - 13:00",
        duration: "120 Menit",
        status: "Selesai",
        participants: "30/30 Selesai",
    },
];

export default function TeacherExamPage() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [exams, setExams] = useState<ExamRecord[]>(examsData);

    // Helper untuk Warna Status Ujian
    const getStatusStyle = (status: ExamStatus) => {
        switch (status) {
            case "Aktif":
                return { bg: "#CAFFBF", text: "#000", icon: "access-point-network" }; // Hijau
            case "Dijadwalkan":
                return { bg: "#FDFFB6", text: "#000", icon: "calendar-clock" }; // Kuning
            case "Selesai":
                return { bg: "#E0E0E0", text: "#000", icon: "check-all" }; // Abu-abu
            default:
                return { bg: "#FFF", text: "#000", icon: "file-document" };
        }
    };

    // Handler untuk Tombol Aksi per Card Ujian
    const handleAction = (exam: ExamRecord) => {
        if (exam.status === "Aktif") {
            Alert.alert("Pantau Ujian", `Masuk ke dashboard live monitoring untuk ${exam.className}?`);
        } else if (exam.status === "Selesai") {
            Alert.alert("Hasil Ujian", `Membuka rekap nilai ujian ${exam.className}...`);
        } else {
            Alert.alert("Edit Jadwal", `Ingin mengubah jadwal atau soal untuk kelas ${exam.className}?`);
        }
    };

    // Render Komponen Card Ujian
    const renderExamCard = ({ item }: { item: ExamRecord }) => {
        const statusStyle = getStatusStyle(item.status);

        return (
            <View style={styles.card}>
                {/* Header Card: Kategori & Status */}
                <View style={styles.cardHeader}>
                    <View style={styles.classBadge}>
                        <Text style={styles.classBadgeText}>{item.className}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                        <MaterialCommunityIcons name={statusStyle.icon as any} size={14} color={statusStyle.text} />
                        <Text style={[styles.statusText, { color: statusStyle.text }]}>{item.status}</Text>
                    </View>
                </View>

                {/* Info Utama Ujian */}
                <Text style={styles.subjectText}>{item.subject}</Text>

                <View style={styles.metaRow}>
                    <MaterialCommunityIcons name="calendar-month-outline" size={16} color="#555" />
                    <Text style={styles.metaText}>{item.date} • {item.time}</Text>
                </View>

                <View style={styles.metaRow}>
                    <MaterialCommunityIcons name="timer-outline" size={16} color="#555" />
                    <Text style={styles.metaText}>Durasi: {item.duration}</Text>
                </View>

                <View style={styles.divider} />

                {/* Footer Card: Partisipan & Action Button */}
                <View style={styles.cardFooter}>
                    <View style={styles.participantBox}>
                        <MaterialCommunityIcons name="account-group" size={18} color="#000" />
                        <Text style={styles.participantText}>{item.participants}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.actionButton}
                        activeOpacity={0.8}
                        onPress={() => handleAction(item)}
                    >
                        <Text style={styles.actionButtonText}>
                            {item.status === "Aktif" ? "Pantau" : item.status === "Selesai" ? "Nilai" : "Edit"}
                        </Text>
                        <MaterialCommunityIcons
                            name={item.status === "Aktif" ? "monitor-eye" : item.status === "Selesai" ? "clipboard-list" : "pencil"}
                            size={16}
                            color="#FFF"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View
            style={[
                styles.container,
                { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }
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
                <Text style={styles.pageTitle}>Ujian Siswa</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Tombol Buat Ujian Baru (Floating-like Header Action) */}
            <View style={styles.headerActionContainer}>
                <TouchableOpacity
                    style={styles.createButton}
                    activeOpacity={0.8}
                    onPress={() => router.push("/page/create_ujian")}
                >
                    <View style={styles.createIconBox}>
                        <MaterialCommunityIcons name="plus-thick" size={24} color="#000" />
                    </View>
                    <View style={styles.createTextContainer}>
                        <Text style={styles.createButtonText}>Buat Ujian Baru</Text>
                        <Text style={styles.createButtonSubtext}>Pilihan ganda atau esai</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Title Section List */}
            <View style={styles.listHeader}>
                <Text style={styles.sectionTitle}>Daftar Ujian Anda</Text>
                <MaterialCommunityIcons name="filter-variant" size={24} color="#000" />
            </View>

            {/* Daftar Ujian */}
            <FlatList
                data={exams}
                keyExtractor={(item) => item.id}
                renderItem={renderExamCard}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
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
    headerActionContainer: {
        padding: 20,
        paddingBottom: 10,
    },
    createButton: {
        backgroundColor: "#4361EE", // Biru Akses
        borderRadius: 16,
        borderWidth: 3,
        borderColor: "#000",
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    createIconBox: {
        width: 48,
        height: 48,
        backgroundColor: "#CAFFBF",
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    createTextContainer: {
        flex: 1,
    },
    createButtonText: {
        fontSize: 16,
        fontWeight: "900",
        color: "#FFF",
        textTransform: "uppercase",
    },
    createButtonSubtext: {
        fontSize: 13,
        fontWeight: "600",
        color: "#E0E0E0",
        marginTop: 2,
    },
    listHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "900",
        color: "#000",
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        gap: 16,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        borderWidth: 3,
        borderColor: "#000",
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    classBadge: {
        backgroundColor: "#9BF6FF", // Biru muda
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: "#000",
    },
    classBadgeText: {
        fontSize: 11,
        fontWeight: "900",
        color: "#000",
        textTransform: "uppercase",
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: "#000",
        gap: 4,
    },
    statusText: {
        fontSize: 11,
        fontWeight: "900",
        textTransform: "uppercase",
    },
    subjectText: {
        fontSize: 18,
        fontWeight: "900",
        color: "#000",
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 4,
    },
    metaText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#555",
    },
    divider: {
        height: 2,
        backgroundColor: "#000",
        marginVertical: 12,
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    participantBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#F0F0F0",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: "#000",
    },
    participantText: {
        fontSize: 12,
        fontWeight: "800",
        color: "#000",
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#000",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        gap: 6,
    },
    actionButtonText: {
        fontSize: 12,
        fontWeight: "900",
        color: "#FFF",
        textTransform: "uppercase",
    },
});