import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Tipe Data
type Room = {
    id: string;
    name: string;
    code: string;
};

type StudentAttendanceRecord = {
    id: string;
    roomId: string;
    studentName: string;
    date1: string; // misal: "H" (Hadir), "S" (Sakit), "I" (Izin), "A" (Alpa)
    date2: string;
    date3: string;
    date4: string;
};

// 1. Data Dummy Ruang Kelas
const roomsData: Room[] = [
    { id: "r1", name: "Ruang 101", code: "Kelas X IPA 1" },
    { id: "r2", name: "Ruang 204", code: "Kelas X IPS 2" },
    { id: "r3", name: "Ruang 302", code: "Kelas XI IPA 3" },
];

// 2. Data Dummy Tabel Kehadiran Siswa per Ruangan (Format: Nama | Tanggal X)
const studentAttendanceData: StudentAttendanceRecord[] = [
    // Ruang 101
    { id: "s1", roomId: "r1", studentName: "Ahmad Fauzi", date1: "H", date2: "H", date3: "S", date4: "H" },
    { id: "s2", roomId: "r1", studentName: "Bunga Citra", date1: "H", date2: "H", date3: "H", date4: "H" },
    { id: "s3", roomId: "r1", studentName: "Chandra Wijaya", date1: "I", date2: "H", date3: "H", date4: "A" },
    { id: "s4", roomId: "r1", studentName: "Dewi Lestari", date1: "H", date2: "H", date3: "H", date4: "H" },
    { id: "s5", roomId: "r1", studentName: "Eko Prasetyo", date1: "H", date2: "S", date3: "H", date4: "H" },

    // Ruang 204
    { id: "s6", roomId: "r2", studentName: "Fajar Nugraha", date1: "H", date2: "H", date3: "H", date4: "H" },
    { id: "s7", roomId: "r2", studentName: "Gita Gutawa", date1: "H", date2: "A", date3: "H", date4: "H" },
    { id: "s8", roomId: "r2", studentName: "Hadi Purnomo", date1: "S", date2: "H", date3: "H", date4: "H" },

    // Ruang 302
    { id: "s9", roomId: "r3", studentName: "Indah Permata", date1: "H", date2: "H", date3: "H", date4: "H" },
    { id: "s10", roomId: "r3", studentName: "Joko Anwar", date1: "H", date2: "H", date3: "I", date4: "H" },
    { id: "s11", roomId: "r3", studentName: "Kartika Sari", date1: "H", date2: "H", date3: "H", date4: "S" },
];

export default function KehadiranSiswaPage() {
    const insets = useSafeAreaInsets();
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    // Fungsi Navigasi Kembali / Back
    const handleBack = () => {
        if (selectedRoom) {
            setSelectedRoom(null); // Kembali ke list ruang kelas
        } else {
            router.back(); // Kembali dari halaman kehadiran
        }
    };

    const currentStudents = selectedRoom
        ? studentAttendanceData.filter((item) => item.roomId === selectedRoom.id)
        : [];

    // Helper untuk mewarnai status kehadiran di tabel
    const getStatusBadgeStyle = (status: string) => {
        switch (status) {
            case "H":
                return { bg: "#CAFFBF", text: "#000" }; // Hadir (Hijau)
            case "S":
                return { bg: "#FDFFB6", text: "#000" }; // Sakit (Kuning)
            case "I":
                return { bg: "#9BF6FF", text: "#000" }; // Izin (Biru)
            case "A":
                return { bg: "#FFADAD", text: "#000" }; // Alpa (Merah)
            default:
                return { bg: "#FFF", text: "#000" };
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
            {/* Header Halaman */}
            <View style={styles.pageHeader}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBack}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>
                    {selectedRoom ? selectedRoom.name : "Kehadiran Siswa"}
                </Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Subtitle / Keterangan Alur */}
            <View style={styles.subHeaderContainer}>
                <Text style={styles.subHeaderTitle}>
                    {selectedRoom
                        ? `Rekapitulasi Kehadiran - ${selectedRoom.code} (${selectedRoom.name})`
                        : "Silakan pilih salah satu ruang kelas berikut:"}
                </Text>
            </View>

            {/* ALUR 1: LIST DATA RUANG KELAS */}
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
                                <MaterialCommunityIcons name="google-classroom" size={24} color="#000" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.roomName}>{item.name}</Text>
                                <Text style={styles.roomCode}>{item.code}</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={24} color="#000" />
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* ALUR 2: TABEL (Nama | Tanggal X | Tanggal X | Tanggal X | Tanggal X) */}
            {selectedRoom && (
                <View style={styles.tableWrapper}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                        <View style={styles.tableContainer}>
                            {/* Header Tabel */}
                            <View style={styles.tableHeaderRow}>
                                <View style={[styles.cellHeader, styles.colName]}>
                                    <Text style={styles.headerText}>Nama Siswa</Text>
                                </View>
                                <View style={[styles.cellHeader, styles.colDate]}>
                                    <Text style={styles.headerText}>01 Sep</Text>
                                </View>
                                <View style={[styles.cellHeader, styles.colDate]}>
                                    <Text style={styles.headerText}>02 Sep</Text>
                                </View>
                                <View style={[styles.cellHeader, styles.colDate]}>
                                    <Text style={styles.headerText}>03 Sep</Text>
                                </View>
                                <View style={[styles.cellHeader, styles.colDate]}>
                                    <Text style={styles.headerText}>04 Sep</Text>
                                </View>
                            </View>

                            {/* Baris Data Siswa */}
                            <FlatList
                                data={currentStudents}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <View
                                        style={[
                                            styles.tableRow,
                                            index % 2 === 1 ? styles.rowAlternate : null,
                                        ]}
                                    >
                                        <View style={[styles.cellBody, styles.colName]}>
                                            <Text style={styles.bodyTextName} numberOfLines={1}>
                                                {item.studentName}
                                            </Text>
                                        </View>
                                        {/* Tanggal 1 */}
                                        <View style={[styles.cellBody, styles.colDate]}>
                                            <View style={[styles.statusBadge, { backgroundColor: getStatusBadgeStyle(item.date1).bg }]}>
                                                <Text style={styles.bodyTextStatus}>{item.date1}</Text>
                                            </View>
                                        </View>
                                        {/* Tanggal 2 */}
                                        <View style={[styles.cellBody, styles.colDate]}>
                                            <View style={[styles.statusBadge, { backgroundColor: getStatusBadgeStyle(item.date2).bg }]}>
                                                <Text style={styles.bodyTextStatus}>{item.date2}</Text>
                                            </View>
                                        </View>
                                        {/* Tanggal 3 */}
                                        <View style={[styles.cellBody, styles.colDate]}>
                                            <View style={[styles.statusBadge, { backgroundColor: getStatusBadgeStyle(item.date3).bg }]}>
                                                <Text style={styles.bodyTextStatus}>{item.date3}</Text>
                                            </View>
                                        </View>
                                        {/* Tanggal 4 */}
                                        <View style={[styles.cellBody, styles.colDate]}>
                                            <View style={[styles.statusBadge, { backgroundColor: getStatusBadgeStyle(item.date4).bg }]}>
                                                <Text style={styles.bodyTextStatus}>{item.date4}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    </ScrollView>
                </View>
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
    // Card Ruang Kelas (Alur 1)
    cardRoom: {
        backgroundColor: "#FFC6FF",
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
    // Styling Tabel Kehadiran (Alur 2)
    tableWrapper: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 20,
        borderWidth: 3,
        borderColor: "#000",
        borderRadius: 12,
        backgroundColor: "#FFF",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    tableContainer: {
        minWidth: 480, // Memastikan area tabel cukup luas untuk scroll horizontal
    },
    tableHeaderRow: {
        flexDirection: "row",
        backgroundColor: "#9BF6FF",
        borderBottomWidth: 3,
        borderBottomColor: "#000",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1.5,
        borderBottomColor: "#000",
    },
    rowAlternate: {
        backgroundColor: "#FAFAFA",
    },
    cellHeader: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1.5,
        borderRightColor: "#000",
    },
    cellBody: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1.5,
        borderRightColor: "#000",
    },
    colName: {
        width: 180,
        alignItems: "flex-start",
    },
    colDate: {
        width: 75,
    },
    headerText: {
        fontSize: 12,
        fontWeight: "900",
        color: "#000",
        textTransform: "uppercase",
    },
    bodyTextName: {
        fontSize: 13,
        fontWeight: "800",
        color: "#000",
    },
    statusBadge: {
        width: 32,
        height: 32,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    bodyTextStatus: {
        fontSize: 12,
        fontWeight: "900",
        color: "#000",
    },
});