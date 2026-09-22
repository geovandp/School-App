import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { documentDirectory, EncodingType, writeAsStringAsync } from "expo-file-system";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import { router } from "expo-router";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import {
    Alert,
    FlatList,
    Modal,
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
    date1: string;
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

// 2. Data Dummy Tabel Kehadiran
const studentAttendanceData: StudentAttendanceRecord[] = [
    { id: "s1", roomId: "r1", studentName: "Ahmad Fauzi", date1: "H", date2: "H", date3: "S", date4: "H" },
    { id: "s2", roomId: "r1", studentName: "Bunga Citra", date1: "H", date2: "H", date3: "H", date4: "H" },
    { id: "s3", roomId: "r1", studentName: "Chandra Wijaya", date1: "I", date2: "H", date3: "H", date4: "A" },
    { id: "s4", roomId: "r1", studentName: "Dewi Lestari", date1: "H", date2: "H", date3: "H", date4: "H" },
    { id: "s5", roomId: "r1", studentName: "Eko Prasetyo", date1: "H", date2: "S", date3: "H", date4: "H" },
    { id: "s6", roomId: "r2", studentName: "Fajar Nugraha", date1: "H", date2: "H", date3: "H", date4: "H" },
    { id: "s7", roomId: "r2", studentName: "Gita Gutawa", date1: "H", date2: "A", date3: "H", date4: "H" },
    { id: "s8", roomId: "r2", studentName: "Hadi Purnomo", date1: "S", date2: "H", date3: "H", date4: "H" },
    { id: "s9", roomId: "r3", studentName: "Indah Permata", date1: "H", date2: "H", date3: "H", date4: "H" },
    { id: "s10", roomId: "r3", studentName: "Joko Anwar", date1: "H", date2: "H", date3: "I", date4: "H" },
    { id: "s11", roomId: "r3", studentName: "Kartika Sari", date1: "H", date2: "H", date3: "H", date4: "S" },
];

const PERIOD_OPTIONS = ["Harian", "Mingguan", "Bulanan", "Triwulan", "Per Semester"];

export default function KehadiranSiswaPage() {
    const insets = useSafeAreaInsets();
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    // State untuk Modal Export
    const [isExportModalVisible, setExportModalVisible] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState("Harian");

    const handleBack = () => {
        if (selectedRoom) {
            setSelectedRoom(null);
        } else {
            router.back();
        }
    };

    const currentStudents = selectedRoom
        ? studentAttendanceData.filter((item) => item.roomId === selectedRoom.id)
        : [];

    const getStatusBadgeStyle = (status: string) => {
        switch (status) {
            case "H": return { bg: "#CAFFBF", text: "#000" };
            case "S": return { bg: "#FDFFB6", text: "#000" };
            case "I": return { bg: "#9BF6FF", text: "#000" };
            case "A": return { bg: "#FFADAD", text: "#000" };
            default: return { bg: "#FFF", text: "#000" };
        }
    };

    // --- FUNGSI EXPORT PDF ---
    const handleExportPDF = async () => {
        try {
            // Note: Data bisa disesuaikan/di-fetch ulang berdasarkan selectedPeriod
            let htmlContent = `
                <html>
                <head>
                    <style>
                        body { font-family: sans-serif; padding: 20px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #000; padding: 10px; text-align: center; }
                        th { background-color: #9BF6FF; }
                        .name-col { text-align: left; }
                    </style>
                </head>
                <body>
                    <h2>Laporan Kehadiran - ${selectedRoom?.code}</h2>
                    <p>Periode: <b>${selectedPeriod}</b></p>
                    <table>
                        <tr>
                            <th class="name-col">Nama Siswa</th>
                            <th>01 Sep</th><th>02 Sep</th><th>03 Sep</th><th>04 Sep</th>
                        </tr>
                        ${currentStudents.map(student => `
                            <tr>
                                <td class="name-col">${student.studentName}</td>
                                <td>${student.date1}</td>
                                <td>${student.date2}</td>
                                <td>${student.date3}</td>
                                <td>${student.date4}</td>
                            </tr>
                        `).join('')}
                    </table>
                </body>
                </html>
            `;

            const { uri } = await Print.printToFileAsync({ html: htmlContent });
            await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
            setExportModalVisible(false);
        } catch (error) {
            Alert.alert("Error", "Gagal mengekspor PDF");
        }
    };

    // --- FUNGSI EXPORT EXCEL (CSV) ---
    const handleExportExcel = async () => {
        try {
            // Gunakan 'as any' untuk mem-bypass error TypeScript pada library
            const fs: any = FileSystem;
            
            // Gunakan cacheDirectory untuk file sementara (export)
            const dirUri = fs.documentDirectory || fs.cacheDirectory;

            if (!dirUri) {
                Alert.alert("Error", "Direktori penyimpanan tidak tersedia di perangkat ini.");
                return;
            }

            // Buat header CSV
            let csvString = `Nama Siswa,01 Sep,02 Sep,03 Sep,04 Sep\n`;
            
            // Loop data siswa
            currentStudents.forEach(student => {
                csvString += `${student.studentName},${student.date1},${student.date2},${student.date3},${student.date4}\n`;
            });

            // Tentukan lokasi file
            const fileName = `Kehadiran_${selectedRoom?.name.replace(" ", "_")}_${selectedPeriod}.csv`;
            const fileUri = `${dirUri}${fileName}`;

            // Tulis file dan bagikan
            await fs.writeAsStringAsync(fileUri, csvString, { encoding: fs.EncodingType.UTF8 });
            await Sharing.shareAsync(fileUri, { mimeType: 'text/csv' });
            
            setExportModalVisible(false);
        } catch (error) {
            Alert.alert("Error", "Gagal mengekspor Excel/CSV");
            console.log(error);
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }]}>

            {/* Header Halaman */}
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.pageTitle} numberOfLines={1}>
                    {selectedRoom ? selectedRoom.name : "Kehadiran Siswa"}
                </Text>

                {/* Tombol Export Muncul Jika Kelas Dipilih */}
                {selectedRoom ? (
                    <TouchableOpacity style={styles.exportButton} onPress={() => setExportModalVisible(true)} activeOpacity={0.7}>
                        <MaterialCommunityIcons name="export" size={24} color="#000" />
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 40 }} />
                )}
            </View>

            <View style={styles.subHeaderContainer}>
                <Text style={styles.subHeaderTitle}>
                    {selectedRoom
                        ? `Rekapitulasi Kehadiran - ${selectedRoom.code}`
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
                        <TouchableOpacity style={styles.cardRoom} activeOpacity={0.8} onPress={() => setSelectedRoom(item)}>
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

            {/* ALUR 2: TABEL KEHADIRAN */}
            {selectedRoom && (
                <View style={styles.tableWrapper}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                        <View style={styles.tableContainer}>
                            {/* Header Tabel */}
                            <View style={styles.tableHeaderRow}>
                                <View style={[styles.cellHeader, styles.colName]}>
                                    <Text style={styles.headerText}>Nama Siswa</Text>
                                </View>
                                <View style={[styles.cellHeader, styles.colDate]}><Text style={styles.headerText}>01 Sep</Text></View>
                                <View style={[styles.cellHeader, styles.colDate]}><Text style={styles.headerText}>02 Sep</Text></View>
                                <View style={[styles.cellHeader, styles.colDate]}><Text style={styles.headerText}>03 Sep</Text></View>
                                <View style={[styles.cellHeader, styles.colDate]}><Text style={styles.headerText}>04 Sep</Text></View>
                            </View>

                            {/* Baris Data Siswa */}
                            <FlatList
                                data={currentStudents}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <View style={[styles.tableRow, index % 2 === 1 ? styles.rowAlternate : null]}>
                                        <View style={[styles.cellBody, styles.colName]}>
                                            <Text style={styles.bodyTextName} numberOfLines={1}>{item.studentName}</Text>
                                        </View>
                                        <View style={[styles.cellBody, styles.colDate]}>
                                            <View style={[styles.statusBadge, { backgroundColor: getStatusBadgeStyle(item.date1).bg }]}>
                                                <Text style={styles.bodyTextStatus}>{item.date1}</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.cellBody, styles.colDate]}>
                                            <View style={[styles.statusBadge, { backgroundColor: getStatusBadgeStyle(item.date2).bg }]}>
                                                <Text style={styles.bodyTextStatus}>{item.date2}</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.cellBody, styles.colDate]}>
                                            <View style={[styles.statusBadge, { backgroundColor: getStatusBadgeStyle(item.date3).bg }]}>
                                                <Text style={styles.bodyTextStatus}>{item.date3}</Text>
                                            </View>
                                        </View>
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

            {/* MODAL EXPORT */}
            <Modal visible={isExportModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Export Data</Text>
                            <TouchableOpacity onPress={() => setExportModalVisible(false)}>
                                <MaterialCommunityIcons name="close" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalSubtitle}>Pilih Periode Export:</Text>
                        <View style={styles.periodContainer}>
                            {PERIOD_OPTIONS.map((period) => (
                                <TouchableOpacity
                                    key={period}
                                    style={[styles.periodBadge, selectedPeriod === period && styles.periodBadgeActive]}
                                    onPress={() => setSelectedPeriod(period)}
                                >
                                    <Text style={[styles.periodText, selectedPeriod === period && styles.periodTextActive]}>
                                        {period}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.modalSubtitle}>Pilih Format File:</Text>
                        <View style={styles.exportActionsRow}>
                            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#FFADAD" }]} onPress={handleExportPDF} activeOpacity={0.8}>
                                <MaterialCommunityIcons name="file-pdf-box" size={28} color="#000" />
                                <Text style={styles.actionBtnText}>PDF</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#CAFFBF" }]} onPress={handleExportExcel} activeOpacity={0.8}>
                                <MaterialCommunityIcons name="microsoft-excel" size={28} color="#000" />
                                <Text style={styles.actionBtnText}>Excel</Text>
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
        borderColor: "#000", borderRadius: 10, justifyContent: "center",
        alignItems: "center", shadowColor: "#000", shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1, shadowRadius: 0, elevation: 3,
    },
    exportButton: {
        width: 40, height: 40, backgroundColor: "#FFC6FF", borderWidth: 2,
        borderColor: "#000", borderRadius: 10, justifyContent: "center",
        alignItems: "center", shadowColor: "#000", shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1, shadowRadius: 0, elevation: 3,
    },
    pageTitle: { fontSize: 18, fontWeight: "900", color: "#000", textAlign: "center", flex: 1, paddingHorizontal: 10 },
    subHeaderContainer: { paddingHorizontal: 20, paddingVertical: 16 },
    subHeaderTitle: { fontSize: 14, fontWeight: "700", color: "#333" },
    listContainer: { paddingHorizontal: 20, paddingBottom: 24, gap: 16 },

    // Card Ruang
    cardRoom: {
        backgroundColor: "#FFC6FF", borderRadius: 16, padding: 16, borderWidth: 3,
        borderColor: "#000", flexDirection: "row", alignItems: "center", gap: 12,
        shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 6,
    },
    roomIconBox: {
        width: 44, height: 44, backgroundColor: "#FFF", borderRadius: 10, borderWidth: 2,
        borderColor: "#000", justifyContent: "center", alignItems: "center",
    },
    roomName: { fontSize: 16, fontWeight: "900", color: "#000" },
    roomCode: { fontSize: 12, fontWeight: "700", color: "#333", marginTop: 2 },

    // Tabel
    tableWrapper: {
        flex: 1, marginHorizontal: 20, marginBottom: 20, borderWidth: 3, borderColor: "#000",
        borderRadius: 12, backgroundColor: "#FFF", overflow: "hidden", shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 6,
    },
    tableContainer: { minWidth: 480 },
    tableHeaderRow: { flexDirection: "row", backgroundColor: "#9BF6FF", borderBottomWidth: 3, borderBottomColor: "#000" },
    tableRow: { flexDirection: "row", borderBottomWidth: 1.5, borderBottomColor: "#000" },
    rowAlternate: { backgroundColor: "#FAFAFA" },
    cellHeader: { paddingVertical: 12, paddingHorizontal: 10, justifyContent: "center", alignItems: "center", borderRightWidth: 1.5, borderRightColor: "#000" },
    cellBody: { paddingVertical: 10, paddingHorizontal: 10, justifyContent: "center", alignItems: "center", borderRightWidth: 1.5, borderRightColor: "#000" },
    colName: { width: 180, alignItems: "flex-start" },
    colDate: { width: 75 },
    headerText: { fontSize: 12, fontWeight: "900", color: "#000", textTransform: "uppercase" },
    bodyTextName: { fontSize: 13, fontWeight: "800", color: "#000" },
    statusBadge: { width: 32, height: 32, borderRadius: 6, borderWidth: 1.5, borderColor: "#000", justifyContent: "center", alignItems: "center" },
    bodyTextStatus: { fontSize: 12, fontWeight: "900", color: "#000" },

    // Modal Export
    modalOverlay: {
        flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 20
    },
    modalContent: {
        width: "100%", backgroundColor: "#FFF", borderRadius: 16, borderWidth: 3, borderColor: "#000",
        padding: 20, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 6,
    },
    modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
    modalTitle: { fontSize: 20, fontWeight: "900", color: "#000" },
    modalSubtitle: { fontSize: 14, fontWeight: "800", color: "#000", marginBottom: 10, marginTop: 10 },

    periodContainer: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 10 },
    periodBadge: {
        paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, borderWidth: 2, borderColor: "#000", backgroundColor: "#FFF"
    },
    periodBadgeActive: { backgroundColor: "#000" },
    periodText: { fontSize: 12, fontWeight: "800", color: "#000" },
    periodTextActive: { color: "#FFF" },

    exportActionsRow: { flexDirection: "row", gap: 16, marginTop: 10 },
    actionBtn: {
        flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
        padding: 12, borderRadius: 12, borderWidth: 3, borderColor: "#000", gap: 8,
        shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, elevation: 3,
    },
    actionBtnText: { fontSize: 16, fontWeight: "900", color: "#000" }
});