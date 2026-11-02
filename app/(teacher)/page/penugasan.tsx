import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Room = {
    id: string;
    name: string;
    code: string;
    totalTasks: number;
};

type Task = {
    id: string;
    roomId: string;
    title: string;
    deadline: string;
    status: "Aktif" | "Selesai" | "Draft";
};

type StudentSubmission = {
    id: string;
    taskId: string;
    studentName: string;
    documentName: string;
    submittedAt: string;
    status: "Sudah Dikumpul" | "Belum Kumpul";
};

const roomsData: Room[] = [
    { id: "r1", name: "Ruang 101", code: "Kelas X IPA 1", totalTasks: 2 },
    { id: "r2", name: "Ruang 204", code: "Kelas X IPS 2", totalTasks: 1 },
    { id: "r3", name: "Ruang 302", code: "Kelas XI IPA 3", totalTasks: 2 },
];

const tasksData: Task[] = [
    { id: "t1", roomId: "r1", title: "Membuat Analisis Teks Hikayat", deadline: "5 Sep 2026, 23:59", status: "Aktif" },
    { id: "t2", roomId: "r1", title: "Menulis Puisi Bebas", deadline: "10 Sep 2026, 12:00", status: "Draft" },
    { id: "t3", roomId: "r2", title: "Resensi Buku Novel Remaja", deadline: "3 Sep 2026, 23:59", status: "Selesai" },
    { id: "t4", roomId: "r3", title: "Laporan Praktikum Drama", deadline: "8 Sep 2026, 15:00", status: "Aktif" },
    { id: "t5", roomId: "r3", title: "Kuis Bab 2: Kebahasaan", deadline: "12 Sep 2026, 23:59", status: "Draft" },
];

const submissionsData: StudentSubmission[] = [
    { id: "s1", taskId: "t1", studentName: "Ahmad Fauzi", documentName: "Analisis_Hikayat_Ahmad.pdf", submittedAt: "4 Sep 2026, 14:20", status: "Sudah Dikumpul" },
    { id: "s2", taskId: "t1", studentName: "Bunga Citra", documentName: "Tugas_Hikayat_Bunga.docx", submittedAt: "4 Sep 2026, 15:10", status: "Sudah Dikumpul" },
    { id: "s3", taskId: "t1", studentName: "Chandra Wijaya", documentName: "-", submittedAt: "-", status: "Belum Kumpul" },
    
    { id: "s4", taskId: "t2", studentName: "Ahmad Fauzi", documentName: "-", submittedAt: "-", status: "Belum Kumpul" },
    { id: "s5", taskId: "t2", studentName: "Bunga Citra", documentName: "-", submittedAt: "-", status: "Belum Kumpul" },

    { id: "s6", taskId: "t3", studentName: "Dewi Lestari", documentName: "Resensi_Dewi.pdf", submittedAt: "2 Sep 2026, 10:00", status: "Sudah Dikumpul" },

    { id: "s7", taskId: "t4", studentName: "Eko Prasetyo", documentName: "Drama_Eko.pdf", submittedAt: "4 Sep 2026, 09:15", status: "Sudah Dikumpul" },
    { id: "s8", taskId: "t4", studentName: "Fajar Nugraha", documentName: "Laporan_Fajar.pdf", submittedAt: "4 Sep 2026, 11:30", status: "Sudah Dikumpul" },

    { id: "s9", taskId: "t5", studentName: "Eko Prasetyo", documentName: "-", submittedAt: "-", status: "Belum Kumpul" },
];

export default function PenugasanPage() {
    const insets = useSafeAreaInsets();

    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const handleBack = () => {
        if (selectedTask) {
            setSelectedTask(null);
        } else if (selectedRoom) {
            setSelectedRoom(null);
        } else {
            router.back();
        }
    };

    const handleAddTask = () => {
        Alert.alert("Tambah Tugas", `Membuka form penambahan tugas baru untuk ${selectedRoom?.name}`);
    };

    // Helper warna status tugas
    const getTaskStatusStyle = (status: string) => {
        switch (status) {
            case "Aktif":
                return { bg: "#ECFDF5", text: "#10B981" }; // Emerald
            case "Selesai":
                return { bg: "#F1F5F9", text: "#64748B" }; // Slate
            case "Draft":
            default:
                return { bg: "#FEF3C7", text: "#F59E0B" }; // Amber
        }
    };

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
            {/* Header Halaman Dinamis */}
            <View style={styles.pageHeader}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBack}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>
                    {selectedTask
                        ? "Detail Pengumpulan"
                        : selectedRoom
                        ? selectedRoom.name
                        : "Penugasan Kelas"}
                </Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Subtitle / Breadcrumb Info */}
            <View style={styles.subHeaderContainer}>
                <Text style={styles.subHeaderTitle}>
                    {selectedTask
                        ? `Tugas: ${selectedTask.title}`
                        : selectedRoom
                        ? `Daftar tugas untuk ${selectedRoom.code} (${selectedRoom.name})`
                        : "Silakan pilih salah satu ruangan kelas di bawah ini:"}
                </Text>
            </View>

            {/* ALUR 1: LIST DATA RUANGAN */}
            {!selectedRoom && (
                <FlatList
                    data={roomsData}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.cardRoom}
                            activeOpacity={0.7}
                            onPress={() => setSelectedRoom(item)}
                        >
                            <View style={styles.roomIconBox}>
                                <MaterialCommunityIcons name="door-open" size={22} color="#3B82F6" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.roomName}>{item.name}</Text>
                                <Text style={styles.roomCode}>{item.code}</Text>
                            </View>
                            <View style={styles.badgeTaskCount}>
                                <Text style={styles.badgeTaskText}>{item.totalTasks} Tugas</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* ALUR 2: LIST DATA TUGAS */}
            {selectedRoom && !selectedTask && (
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={tasksData.filter((t) => t.roomId === selectedRoom.id)}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>Belum ada tugas di ruangan ini.</Text>
                        }
                        renderItem={({ item }) => {
                            const taskStatusStyle = getTaskStatusStyle(item.status);
                            return (
                                <TouchableOpacity
                                    style={styles.cardTask}
                                    activeOpacity={0.7}
                                    onPress={() => setSelectedTask(item)}
                                >
                                    <View style={styles.taskHeaderRow}>
                                        <View style={styles.timeBox}>
                                            <MaterialCommunityIcons name="clock-outline" size={14} color="#64748B" />
                                            <Text style={styles.timeText}>{item.deadline}</Text>
                                        </View>
                                        <View style={[styles.statusBadge, { backgroundColor: taskStatusStyle.bg }]}>
                                            <Text style={[styles.statusText, { color: taskStatusStyle.text }]}>{item.status}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.taskTitle}>{item.title}</Text>
                                    <View style={styles.taskFooterRow}>
                                        <Text style={styles.taskFooterLink}>Lihat Pengumpulan Siswa</Text>
                                        <MaterialCommunityIcons name="arrow-right" size={16} color="#3B82F6" />
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />

                    {/* BUTTON TAMBAH TUGAS */}
                    <View style={styles.footerButtonContainer}>
                        <TouchableOpacity
                            style={styles.addButton}
                            activeOpacity={0.8}
                            onPress={handleAddTask}
                        >
                            <MaterialCommunityIcons name="plus" size={20} color="#FFF" />
                            <Text style={styles.addButtonText}>Tambah Tugas Baru</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* ALUR 3: LIST DATA SISWA & DOKUMEN */}
            {selectedTask && (
                <FlatList
                    data={submissionsData.filter((s) => s.taskId === selectedTask.id)}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Belum ada data siswa untuk tugas ini.</Text>
                    }
                    renderItem={({ item }) => {
                        const isSubmitted = item.status === "Sudah Dikumpul";
                        return (
                            <View style={styles.cardStudent}>
                                <View style={styles.studentInfoRow}>
                                    <View style={styles.avatarBox}>
                                        <MaterialCommunityIcons name="account-outline" size={18} color="#334155" />
                                    </View>
                                    <Text style={styles.studentName}>{item.studentName}</Text>
                                    <View
                                        style={[
                                            styles.miniStatusBadge,
                                            {
                                                backgroundColor: isSubmitted ? "#ECFDF5" : "#FEF2F2",
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.miniStatusText,
                                                { color: isSubmitted ? "#10B981" : "#EF4444" },
                                            ]}
                                        >
                                            {item.status}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.documentBox}>
                                    <MaterialCommunityIcons
                                        name={item.documentName !== "-" ? "file-document-outline" : "file-remove-outline"}
                                        size={18}
                                        color={item.documentName !== "-" ? "#3B82F6" : "#94A3B8"}
                                    />
                                    <Text
                                        style={[
                                            styles.documentNameText,
                                            item.documentName === "-" && { color: "#94A3B8", fontStyle: "italic" },
                                        ]}
                                    >
                                        {item.documentName}
                                    </Text>
                                </View>

                                <View style={styles.submissionTimeRow}>
                                    <MaterialCommunityIcons name="calendar-clock-outline" size={14} color="#64748B" />
                                    <Text style={styles.submissionTimeText}>
                                        Dikumpul: {item.submittedAt}
                                    </Text>
                                </View>
                            </View>
                        );
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC", // Off-white modern background
    },
    pageHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    backButton: {
        padding: 6,
        borderRadius: 8,
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0F172A",
        textAlign: "center",
        flex: 1,
    },
    subHeaderContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    subHeaderTitle: {
        fontSize: 13,
        fontWeight: "600",
        color: "#64748B",
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        gap: 12,
    },
    emptyText: {
        textAlign: "center",
        color: "#94A3B8",
        marginTop: 30,
        fontWeight: "500",
    },
    
    // --- Card Ruangan (Alur 1) ---
    cardRoom: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        // Soft Shadow
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    roomIconBox: {
        width: 44,
        height: 44,
        backgroundColor: "#EFF6FF", // Soft Blue
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    roomName: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#0F172A",
    },
    roomCode: {
        fontSize: 12,
        fontWeight: "500",
        color: "#64748B",
        marginTop: 2,
    },
    badgeTaskCount: {
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    badgeTaskText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#475569",
    },

    // --- Card Tugas (Alur 2) ---
    cardTask: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        // Soft Shadow
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    taskHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    timeBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    timeText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#64748B",
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 11,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0F172A",
        marginBottom: 12,
    },
    taskFooterRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 4,
    },
    taskFooterLink: {
        fontSize: 13,
        fontWeight: "600",
        color: "#3B82F6",
    },

    // --- Button Tambah Tugas di Bawah ---
    footerButtonContainer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: "#F8FAFC",
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },
    addButton: {
        backgroundColor: "#3B82F6",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
        shadowColor: "#3B82F6",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    addButtonText: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "bold",
    },

    // --- Card Siswa & Dokumen (Alur 3) ---
    cardStudent: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        // Soft Shadow
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    studentInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
    },
    avatarBox: {
        width: 36,
        height: 36,
        backgroundColor: "#F1F5F9",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    studentName: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#0F172A",
        flex: 1,
    },
    miniStatusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    miniStatusText: {
        fontSize: 11,
        fontWeight: "bold",
    },
    documentBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        gap: 8,
        marginBottom: 10,
    },
    documentNameText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#334155",
        flex: 1,
    },
    submissionTimeRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    submissionTimeText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#64748B",
    },
});