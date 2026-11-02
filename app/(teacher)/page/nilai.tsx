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

const roomsData: Room[] = [
    { id: "r1", name: "Ruang 101", code: "Kelas X IPA 1" },
    { id: "r2", name: "Ruang 204", code: "Kelas X IPS 2" },
    { id: "r3", name: "Ruang 302", code: "Kelas XI IPA 3" },
];

const studentTasksData: StudentTaskRecord[] = [
    { id: "s1", roomId: "r1", studentName: "Ahmad Fauzi", tugas1: "85", tugas2: "90", tugas3: "78", tugas4: "88" },
    { id: "s2", roomId: "r1", studentName: "Bunga Citra", tugas1: "92", tugas2: "88", tugas3: "95", tugas4: "90" },
    { id: "s3", roomId: "r1", studentName: "Chandra Wijaya", tugas1: "75", tugas2: "80", tugas3: "70", tugas4: "82" },
    { id: "s4", roomId: "r1", studentName: "Dewi Lestari", tugas1: "88", tugas2: "85", tugas3: "90", tugas4: "87" },
    { id: "s5", roomId: "r1", studentName: "Eko Prasetyo", tugas1: "60", tugas2: "70", tugas3: "65", tugas4: "72" },

    { id: "s6", roomId: "r2", studentName: "Fajar Nugraha", tugas1: "80", tugas2: "75", tugas3: "82", tugas4: "79" },
    { id: "s7", roomId: "r2", studentName: "Gita Gutawa", tugas1: "95", tugas2: "92", tugas3: "96", tugas4: "94" },
    { id: "s8", roomId: "r2", studentName: "Hadi Purnomo", tugas1: "70", tugas2: "68", tugas3: "75", tugas4: "73" },

    { id: "s9", roomId: "r3", studentName: "Indah Permata", tugas1: "90", tugas2: "91", tugas3: "89", tugas4: "93" },
    { id: "s10", roomId: "r3", studentName: "Joko Anwar", tugas1: "82", tugas2: "84", tugas3: "80", tugas4: "85" },
    { id: "s11", roomId: "r3", studentName: "Kartika Sari", tugas1: "88", tugas2: "89", tugas3: "85", tugas4: "90" },
];

export default function PenugasanPage() {
    const insets = useSafeAreaInsets();
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    const handleBack = () => {
        if (selectedRoom) {
            setSelectedRoom(null);
        } else {
            router.back();
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
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#1E293B" />
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
                            <MaterialCommunityIcons name="chevron-right" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* ALUR 2: TABEL NILAI */}
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

    // --- Styling Tabel Alur 2 ---
    tableWrapper: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        // Soft Shadow
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    tableContainer: {
        minWidth: 500,
    },
    tableHeaderRow: {
        flexDirection: "row",
        backgroundColor: "#F8FAFC",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    rowAlternate: {
        backgroundColor: "#FAFAFA",
    },
    cellHeader: {
        paddingVertical: 14,
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "#F1F5F9",
    },
    cellBody: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "#F1F5F9",
    },
    colName: {
        width: 180,
        alignItems: "flex-start",
    },
    colTask: {
        width: 85,
    },
    headerText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#475569",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    bodyTextName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#0F172A",
    },
    bodyTextScore: {
        fontSize: 14,
        fontWeight: "500",
        color: "#334155",
    },
});