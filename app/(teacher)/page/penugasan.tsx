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

// Tipe Data untuk Alur
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
    statusColor: string;
};

type StudentSubmission = {
    id: string;
    taskId: string;
    studentName: string;
    documentName: string;
    submittedAt: string;
    status: "Sudah Dikumpul" | "Belum Kumpul";
};

// 1. Data Dummy 3 Ruangan
const roomsData: Room[] = [
    { id: "r1", name: "Ruang 101", code: "Kelas X IPA 1", totalTasks: 2 },
    { id: "r2", name: "Ruang 204", code: "Kelas X IPS 2", totalTasks: 1 },
    { id: "r3", name: "Ruang 302", code: "Kelas XI IPA 3", totalTasks: 2 },
];

// 2. Data Dummy Tugas Berdasarkan Ruangan
const tasksData: Task[] = [
    { id: "t1", roomId: "r1", title: "Membuat Analisis Teks Hikayat", deadline: "5 Sep 2026, 23:59", status: "Aktif", statusColor: "#CAFFBF" },
    { id: "t2", roomId: "r1", title: "Menulis Puisi Bebas", deadline: "10 Sep 2026, 12:00", status: "Draft", statusColor: "#FDFFB6" },
    { id: "t3", roomId: "r2", title: "Resensi Buku Novel Remaja", deadline: "3 Sep 2026, 23:59", status: "Selesai", statusColor: "#FFADAD" },
    { id: "t4", roomId: "r3", title: "Laporan Praktikum Drama", deadline: "8 Sep 2026, 15:00", status: "Aktif", statusColor: "#CAFFBF" },
    { id: "t5", roomId: "r3", title: "Kuis Bab 2: Kebahasaan", deadline: "12 Sep 2026, 23:59", status: "Draft", statusColor: "#FDFFB6" },
];

// 3. Data Dummy Siswa & Dokumen Tugas
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
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
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

            {/* ALUR 1: LIST DATA RUANGAN (3 SAJA) */}
            {!selectedRoom && (
                <FlatList
                    data={roomsData}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.cardRoom}
                            activeOpacity={0.8}
                            onPress={() => setSelectedRoom(item)}
                        >
                            <View style={styles.roomIconBox}>
                                <MaterialCommunityIcons name="door-open" size={24} color="#000" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.roomName}>{item.name}</Text>
                                <Text style={styles.roomCode}>{item.code}</Text>
                            </View>
                            <View style={styles.badgeTaskCount}>
                                <Text style={styles.badgeTaskText}>{item.totalTasks} Tugas</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={24} color="#000" />
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* ALUR 2: LIST DATA TUGAS, WAKTU, STATUS */}
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
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.cardTask}
                                activeOpacity={0.8}
                                onPress={() => setSelectedTask(item)}
                            >
                                <View style={styles.taskHeaderRow}>
                                    <View style={styles.timeBox}>
                                        <MaterialCommunityIcons name="clock-outline" size={14} color="#000" />
                                        <Text style={styles.timeText}>{item.deadline}</Text>
                                    </View>
                                    <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
                                        <Text style={styles.statusText}>{item.status}</Text>
                                    </View>
                                </View>
                                <Text style={styles.taskTitle}>{item.title}</Text>
                                <View style={styles.taskFooterRow}>
                                    <Text style={styles.taskFooterLink}>Lihat Pengumpulan Siswa</Text>
                                    <MaterialCommunityIcons name="arrow-right-bold" size={16} color="#000" />
                                </View>
                            </TouchableOpacity>
                        )}
                    />

                    {/* BUTTON TAMBAH TUGAS (DI BAWAH SENDIRI KHUSUS ALUR 2) */}
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

            {/* ALUR 3: LIST DATA SISWA, DOKUMEN TUGAS, WAKTU PENGUMPULAN */}
            {selectedTask && (
                <FlatList
                    data={submissionsData.filter((s) => s.taskId === selectedTask.id)}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Belum ada data siswa untuk tugas ini.</Text>
                    }
                    renderItem={({ item }) => (
                        <View style={styles.cardStudent}>
                            <View style={styles.studentInfoRow}>
                                <View style={styles.avatarBox}>
                                    <MaterialCommunityIcons name="account" size={18} color="#000" />
                                </View>
                                <Text style={styles.studentName}>{item.studentName}</Text>
                                <View
                                    style={[
                                        styles.miniStatusBadge,
                                        {
                                            backgroundColor:
                                                item.status === "Sudah Dikumpul" ? "#CAFFBF" : "#FFADAD",
                                        },
                                    ]}
                                >
                                    <Text style={styles.miniStatusText}>{item.status}</Text>
                                </View>
                            </View>

                            <View style={styles.documentBox}>
                                <MaterialCommunityIcons
                                    name={item.documentName !== "-" ? "file-document-outline" : "file-remove-outline"}
                                    size={18}
                                    color="#555"
                                />
                                <Text
                                    style={[
                                        styles.documentNameText,
                                        item.documentName === "-" && { color: "#888", fontStyle: "italic" },
                                    ]}
                                >
                                    {item.documentName}
                                </Text>
                            </View>

                            <View style={styles.submissionTimeRow}>
                                <MaterialCommunityIcons name="calendar-clock" size={14} color="#666" />
                                <Text style={styles.submissionTimeText}>
                                    Dikumpul: {item.submittedAt}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            )}
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
        fontSize: 14,
        fontWeight: "700",
        color: "#333",
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        gap: 16,
    },
    emptyText: {
        textAlign: "center",
        color: "#777",
        marginTop: 30,
        fontWeight: "600",
    },
    // Style Card Ruangan (Alur 1)
    cardRoom: {
        backgroundColor: "#9BF6FF",
        borderRadius: 16,
        padding: 16,
        borderWidth: 3,
        borderColor: "#000",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    roomIconBox: {
        width: 44,
        height: 44,
        backgroundColor: "#FFF",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    roomName: {
        fontSize: 16,
        fontWeight: "900",
        color: "#000",
    },
    roomCode: {
        fontSize: 12,
        fontWeight: "700",
        color: "#333",
        marginTop: 2,
    },
    badgeTaskCount: {
        backgroundColor: "#FFF",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#000",
    },
    badgeTaskText: {
        fontSize: 11,
        fontWeight: "800",
        color: "#000",
    },
    // Style Card Tugas (Alur 2)
    cardTask: {
        backgroundColor: "#FFC6FF",
        borderRadius: 16,
        padding: 16,
        borderWidth: 3,
        borderColor: "#000",
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    taskHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    timeBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#000",
        gap: 4,
    },
    timeText: {
        fontSize: 11,
        fontWeight: "800",
        color: "#000",
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#000",
    },
    statusText: {
        fontSize: 10,
        fontWeight: "900",
        color: "#000",
        textTransform: "uppercase",
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: "900",
        color: "#000",
        marginBottom: 12,
    },
    taskFooterRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 6,
        backgroundColor: "#FFF",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#000",
    },
    taskFooterLink: {
        fontSize: 12,
        fontWeight: "800",
        color: "#000",
    },
    // Style Button Tambah Tugas di Bawah
    footerButtonContainer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: "#FDFBF7",
        borderTopWidth: 2,
        borderTopColor: "#000",
    },
    addButton: {
        backgroundColor: "#000",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#000",
        gap: 8,
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
    },
    addButtonText: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "900",
    },
    // Style Card Siswa & Dokumen (Alur 3)
    cardStudent: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 16,
        borderWidth: 3,
        borderColor: "#000",
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    studentInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
    },
    avatarBox: {
        width: 32,
        height: 32,
        backgroundColor: "#E2F0CB",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    studentName: {
        fontSize: 15,
        fontWeight: "900",
        color: "#000",
        flex: 1,
    },
    miniStatusBadge: {
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: "#000",
    },
    miniStatusText: {
        fontSize: 10,
        fontWeight: "800",
        color: "#000",
    },
    documentBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F7F7F7",
        padding: 10,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: "#000",
        gap: 8,
        marginBottom: 8,
    },
    documentNameText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#000",
        flex: 1,
    },
    submissionTimeRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    submissionTimeText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#555",
    },
});