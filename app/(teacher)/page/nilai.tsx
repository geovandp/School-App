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

type StudentTaskRecord = {
    id: string;
    roomId: string;
    studentName: string;
    tugas1: string;
    tugas2: string;
    tugas3: string;
    tugas4: string;
};

// 1. Data Dummy 3 Ruangan Saja
const roomsData: Room[] = [
    { id: "r1", name: "Ruang 101", code: "Kelas X IPA 1" },
    { id: "r2", name: "Ruang 204", code: "Kelas X IPS 2" },
    { id: "r3", name: "Ruang 302", code: "Kelas XI IPA 3" },
];

// 2. Data Dummy Tabel Siswa & Tugas per Ruangan (format: Nama | Tugas 1 | Tugas 2 | Tugas 3 | Tugas 4)
const studentTasksData: StudentTaskRecord[] = [
    // Ruang 101
    { id: "s1", roomId: "r1", studentName: "Ahmad Fauzi", tugas1: "85", tugas2: "90", tugas3: "78", tugas4: "88" },
    { id: "s2", roomId: "r1", studentName: "Bunga Citra", tugas1: "92", tugas2: "88", tugas3: "95", tugas4: "90" },
    { id: "s3", roomId: "r1", studentName: "Chandra Wijaya", tugas1: "75", tugas2: "80", tugas3: "70", tugas4: "82" },
    { id: "s4", roomId: "r1", studentName: "Dewi Lestari", tugas1: "88", tugas2: "85", tugas3: "90", tugas4: "87" },
    { id: "s5", roomId: "r1", studentName: "Eko Prasetyo", tugas1: "60", tugas2: "70", tugas3: "65", tugas4: "72" },

    // Ruang 204
    { id: "s6", roomId: "r2", studentName: "Fajar Nugraha", tugas1: "80", tugas2: "75", tugas3: "82", tugas4: "79" },
    { id: "s7", roomId: "r2", studentName: "Gita Gutawa", tugas1: "95", tugas2: "92", tugas3: "96", tugas4: "94" },
    { id: "s8", roomId: "r2", studentName: "Hadi Purnomo", tugas1: "70", tugas2: "68", tugas3: "75", tugas4: "73" },

    // Ruang 302
    { id: "s9", roomId: "r3", studentName: "Indah Permata", tugas1: "90", tugas2: "91", tugas3: "89", tugas4: "93" },
    { id: "s10", roomId: "r3", studentName: "Joko Anwar", tugas1: "82", tugas2: "84", tugas3: "80", tugas4: "85" },
    { id: "s11", roomId: "r3", studentName: "Kartika Sari", tugas1: "88", tugas2: "89", tugas3: "85", tugas4: "90" },
];

export default function PenugasanPage() {
    const insets = useSafeAreaInsets();
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    // Fungsi Kembali / Back
    const handleBack = () => {
        if (selectedRoom) {
            setSelectedRoom(null); // Kembali ke list 3 ruangan
        } else {
            router.back(); // Kembali dari halaman penugasan
        }
    };

    const currentStudents = selectedRoom 
        ? studentTasksData.filter((item) => item.roomId === selectedRoom.id) 
        : [];

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
                    {selectedRoom ? selectedRoom.name : "Penugasan Kelas"}
                </Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Subtitle / Keterangan Alur */}
            <View style={styles.subHeaderContainer}>
                <Text style={styles.subHeaderTitle}>
                    {selectedRoom
                        ? `Tabel Rekapitulasi Tugas - ${selectedRoom.code} (${selectedRoom.name})`
                        : "Silakan pilih salah satu dari 3 ruangan kelas berikut:"}
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
                            <MaterialCommunityIcons name="chevron-right" size={24} color="#000" />
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* ALUR 2: TABEL (Nama | Tugas 1 | Tugas 2 | Tugas 3 | Tugas 4) */}
            {selectedRoom && (
                <View style={styles.tableWrapper}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                        <View style={styles.tableContainer}>
                            {/* Header Tabel */}
                            <View style={styles.tableHeaderRow}>
                                <View style={[styles.cellHeader, styles.colName]}>
                                    <Text style={styles.headerText}>Nama Siswa</Text>
                                </View>
                                <View style={[styles.cellHeader, styles.colTask]}>
                                    <Text style={styles.headerText}>Tugas 1</Text>
                                </View>
                                <View style={[styles.cellHeader, styles.colTask]}>
                                    <Text style={styles.headerText}>Tugas 2</Text>
                                </View>
                                <View style={[styles.cellHeader, styles.colTask]}>
                                    <Text style={styles.headerText}>Tugas 3</Text>
                                </View>
                                <View style={[styles.cellHeader, styles.colTask]}>
                                    <Text style={styles.headerText}>Tugas 4</Text>
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
                                        <View style={[styles.cellBody, styles.colTask]}>
                                            <Text style={styles.bodyTextScore}>{item.tugas1}</Text>
                                        </View>
                                        <View style={[styles.cellBody, styles.colTask]}>
                                            <Text style={styles.bodyTextScore}>{item.tugas2}</Text>
                                        </View>
                                        <View style={[styles.cellBody, styles.colTask]}>
                                            <Text style={styles.bodyTextScore}>{item.tugas3}</Text>
                                        </View>
                                        <View style={[styles.cellBody, styles.colTask]}>
                                            <Text style={styles.bodyTextScore}>{item.tugas4}</Text>
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
    // Card Ruangan (Alur 1)
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
    // Styling Tabel Alur 2
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
        minWidth: 500, // Menjamin tabel cukup luas untuk scroll horizontal jika layar kecil
    },
    tableHeaderRow: {
        flexDirection: "row",
        backgroundColor: "#FFC6FF",
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
        paddingVertical: 12,
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
    colTask: {
        width: 85,
    },
    headerText: {
        fontSize: 13,
        fontWeight: "900",
        color: "#000",
        textTransform: "uppercase",
    },
    bodyTextName: {
        fontSize: 13,
        fontWeight: "800",
        color: "#000",
    },
    bodyTextScore: {
        fontSize: 13,
        fontWeight: "700",
        color: "#333",
    },
});