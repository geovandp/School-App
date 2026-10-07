import { MaterialCommunityIcons } from "@expo/vector-icons";
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
    
    // State Filter Periode (Default: Harian)
    const [activePeriod, setActivePeriod] = useState("Harian");
    
    // State untuk Modal Export (sekarang hanya pilih format PDF/Excel)
    const [isExportModalVisible, setExportModalVisible] = useState(false);

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

    // Helper untuk mengubah header kolom berdasarkan filter yang dipilih
    const getColumns = () => {
        switch (activePeriod) {
            case "Mingguan": return ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"];
            case "Bulanan": return ["Bulan 1", "Bulan 2", "Bulan 3", "Bulan 4"];
            case "Triwulan": return ["Triwulan 1", "Triwulan 2", "Triwulan 3", "Triwulan 4"];
            case "Per Semester": return ["Semester 1", "Semester 2", "Semester 3", "Semester 4"];
            case "Harian":
            default: return ["01 Sep", "02 Sep", "03 Sep", "04 Sep"];
        }
    };

    const columns = getColumns();

    // --- FUNGSI EXPORT PDF ---
    const handleExportPDF = async () => {
        try {
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
                    <p>Periode Filter: <b>${activePeriod}</b></p>
                    <table>
                        <tr>
                            <th class="name-col">Nama Siswa</th>
                            <th>${columns[0]}</th><th>${columns[1]}</th><th>${columns[2]}</th><th>${columns[3]}</th>
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
            const fs: any = FileSystem;
            const dirUri = fs.documentDirectory || fs.cacheDirectory;

            if (!dirUri) {
                Alert.alert("Error", "Direktori penyimpanan tidak tersedia di perangkat ini.");
                return;
            }

            // Header CSV dinamis mengikuti filter
            let csvString = `Nama Siswa,${columns[0]},${columns[1]},${columns[2]},${columns[3]}\n`;
            
            // Loop data siswa
            currentStudents.forEach(student => {
                csvString += `${student.studentName},${student.date1},${student.date2},${student.date3},${student.date4}\n`;
            });

            const fileName = `Kehadiran_${selectedRoom?.name.replace(" ", "_")}_${activePeriod.replace(" ", "")}.csv`;
            const fileUri = `${dirUri}${fileName}`;

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

            {/* ALUR 2: FILTER & TABEL KEHADIRAN */}
            {selectedRoom && (
                <View style={{ flex: 1 }}>
                    {/* Chip Filters (Harian, Mingguan, dll) */}
                    <View style={styles.filterWrapper}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                            {PERIOD_OPTIONS.map((period) => (
                                <TouchableOpacity 
                                    key={period} 
                                    style={[styles.filterChip, activePeriod === period && styles.filterChipActive]}
                                    onPress={() => setActivePeriod(period)}
                                >
                                    <Text style={[styles.filterChipText, activePeriod === period && styles.filterChipTextActive]}>
                                        {period}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Tabel Data */}
                    <View style={styles.tableWrapper}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                            <View style={styles.tableContainer}>
                                {/* Header Tabel (Dinamis dari state) */}
                                <View style={styles.tableHeaderRow}>
                                    <View style={[styles.cellHeader, styles.colName]}>
                                        <Text style={styles.headerText}>Nama Siswa</Text>
                                    </View>
                                    <View style={[styles.cellHeader, styles.colDate]}><Text style={styles.headerText}>{columns[0]}</Text></View>
                                    <View style={[styles.cellHeader, styles.colDate]}><Text style={styles.headerText}>{columns[1]}</Text></View>
                                    <View style={[styles.cellHeader, styles.colDate]}><Text style={styles.headerText}>{columns[2]}</Text></View>
                                    <View style={[styles.cellHeader, styles.colDate]}><Text style={styles.headerText}>{columns[3]}</Text></View>
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
                </View>
            )}

            {/* MODAL EXPORT FORMAT SAJA */}
            <Modal visible={isExportModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Export Data {activePeriod}</Text>
                            <TouchableOpacity onPress={() => setExportModalVisible(false)}>
                                <MaterialCommunityIcons name="close" size={24} color="#000" />
                            </TouchableOpacity>
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
    
    // Filters UI
    filterWrapper: { marginBottom: 16 },
    filterScroll: { paddingHorizontal: 20, gap: 10 },
    filterChip: {
        paddingVertical: 8, paddingHorizontal: 14, backgroundColor: "#FFF", borderRadius: 12,
        borderWidth: 2, borderColor: "#000",
    },
    filterChipActive: { backgroundColor: "#000" },
    filterChipText: { fontSize: 13, fontWeight: "800", color: "#000" },
    filterChipTextActive: { color: "#FFF" },

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
    colDate: { width: 90 }, // Sedikit diperlebar agar muat tulisan "Semester X"
    headerText: { fontSize: 11, fontWeight: "900", color: "#000", textTransform: "uppercase", textAlign: "center" },
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
    modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
    modalTitle: { fontSize: 20, fontWeight: "900", color: "#000" },
    modalSubtitle: { fontSize: 14, fontWeight: "800", color: "#000", marginBottom: 10, marginTop: 10 },
    
    exportActionsRow: { flexDirection: "row", gap: 16, marginTop: 10 },
    actionBtn: {
        flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
        padding: 12, borderRadius: 12, borderWidth: 3, borderColor: "#000", gap: 8,
        shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, elevation: 3,
    },
    actionBtnText: { fontSize: 16, fontWeight: "900", color: "#000" }
});