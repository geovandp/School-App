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

const roomsData: Room[] = [
    { id: "r1", name: "Ruang 101", code: "Kelas X IPA 1" },
    { id: "r2", name: "Ruang 204", code: "Kelas X IPS 2" },
    { id: "r3", name: "Ruang 302", code: "Kelas XI IPA 3" },
];

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
    const [activePeriod, setActivePeriod] = useState("Harian");
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

    // Helper warna status kehadiran dengan gaya soft minimalis
    const getStatusBadgeStyle = (status: string) => {
        switch (status) {
            case "H": return { bg: "#ECFDF5", text: "#10B981" }; // Hadir (Emerald)
            case "S": return { bg: "#FEF3C7", text: "#F59E0B" }; // Sakit (Amber)
            case "I": return { bg: "#EFF6FF", text: "#3B82F6" }; // Izin (Blue)
            case "A": return { bg: "#FEF2F2", text: "#EF4444" }; // Alpa (Red)
            default: return { bg: "#F1F5F9", text: "#64748B" };
        }
    };

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

    const handleExportPDF = async () => {
        try {
            let htmlContent = `
                <html>
                <head>
                    <style>
                        body { font-family: sans-serif; padding: 20px; color: #0F172A; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #E2E8F0; padding: 10px; text-align: center; }
                        th { background-color: #F8FAFC; color: #475569; }
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

    const handleExportExcel = async () => {
        try {
            const fs: any = FileSystem;
            const dirUri = fs.documentDirectory || fs.cacheDirectory;

            if (!dirUri) {
                Alert.alert("Error", "Direktori penyimpanan tidak tersedia di perangkat ini.");
                return;
            }

            let csvString = `Nama Siswa,${columns[0]},${columns[1]},${columns[2]},${columns[3]}\n`;
            
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
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }]}>
            
            {/* Header Halaman */}
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#1E293B" />
                </TouchableOpacity>
                
                <Text style={styles.pageTitle} numberOfLines={1}>
                    {selectedRoom ? selectedRoom.name : "Kehadiran Siswa"}
                </Text>
                
                {selectedRoom ? (
                    <TouchableOpacity style={styles.exportButton} onPress={() => setExportModalVisible(true)} activeOpacity={0.7}>
                        <MaterialCommunityIcons name="export-variant" size={20} color="#3B82F6" />
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
                        <TouchableOpacity style={styles.cardRoom} activeOpacity={0.7} onPress={() => setSelectedRoom(item)}>
                            <View style={styles.roomIconBox}>
                                <MaterialCommunityIcons name="google-classroom" size={22} color="#3B82F6" />
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

            {/* ALUR 2: FILTER & TABEL KEHADIRAN */}
            {selectedRoom && (
                <View style={{ flex: 1 }}>
                    {/* Chip Filters */}
                    <View style={styles.filterWrapper}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                            {PERIOD_OPTIONS.map((period) => (
                                <TouchableOpacity 
                                    key={period} 
                                    style={[styles.filterChip, activePeriod === period && styles.filterChipActive]}
                                    onPress={() => setActivePeriod(period)}
                                    activeOpacity={0.7}
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
                                <View style={styles.tableHeaderRow}>
                                    <View style={[styles.cellHeader, styles.colName]}>
                                        <Text style={styles.headerText}>Nama Siswa</Text>
                                    </View>
                                    <View style={[styles.cellHeader, styles.colDate]}><Text style={styles.headerText}>{columns[0]}</Text></View>
                                    <View style={[styles.cellHeader, styles.colDate]}><Text style={styles.headerText}>{columns[1]}</Text></View>
                                    <View style={[styles.cellHeader, styles.colDate]}><Text style={styles.headerText}>{columns[2]}</Text></View>
                                    <View style={[styles.cellHeader, styles.colDate]}><Text style={styles.headerText}>{columns[3]}</Text></View>
                                </View>

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
                                                    <Text style={[styles.bodyTextStatus, { color: getStatusBadgeStyle(item.date1).text }]}>{item.date1}</Text>
                                                </View>
                                            </View>
                                            <View style={[styles.cellBody, styles.colDate]}>
                                                <View style={[styles.statusBadge, { backgroundColor: getStatusBadgeStyle(item.date2).bg }]}>
                                                    <Text style={[styles.bodyTextStatus, { color: getStatusBadgeStyle(item.date2).text }]}>{item.date2}</Text>
                                                </View>
                                            </View>
                                            <View style={[styles.cellBody, styles.colDate]}>
                                                <View style={[styles.statusBadge, { backgroundColor: getStatusBadgeStyle(item.date3).bg }]}>
                                                    <Text style={[styles.bodyTextStatus, { color: getStatusBadgeStyle(item.date3).text }]}>{item.date3}</Text>
                                                </View>
                                            </View>
                                            <View style={[styles.cellBody, styles.colDate]}>
                                                <View style={[styles.statusBadge, { backgroundColor: getStatusBadgeStyle(item.date4).bg }]}>
                                                    <Text style={[styles.bodyTextStatus, { color: getStatusBadgeStyle(item.date4).text }]}>{item.date4}</Text>
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

            {/* MODAL EXPORT */}
            <Modal visible={isExportModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Export Data {activePeriod}</Text>
                            <TouchableOpacity onPress={() => setExportModalVisible(false)}>
                                <MaterialCommunityIcons name="close" size={22} color="#64748B" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalSubtitle}>Pilih Format File:</Text>
                        <View style={styles.exportActionsRow}>
                            <TouchableOpacity style={styles.actionBtnPDF} onPress={handleExportPDF} activeOpacity={0.8}>
                                <MaterialCommunityIcons name="file-pdf-box" size={24} color="#EF4444" />
                                <Text style={styles.actionBtnTextPDF}>PDF</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.actionBtnExcel} onPress={handleExportExcel} activeOpacity={0.8}>
                                <MaterialCommunityIcons name="microsoft-excel" size={24} color="#10B981" />
                                <Text style={styles.actionBtnTextExcel}>Excel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8FAFC" },
    pageHeader: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9", backgroundColor: "#FFFFFF",
    },
    backButton: { padding: 6, borderRadius: 8 },
    exportButton: {
        width: 36, height: 36, backgroundColor: "#EFF6FF", borderRadius: 18,
        justifyContent: "center", alignItems: "center",
    },
    pageTitle: { fontSize: 18, fontWeight: "bold", color: "#0F172A", textAlign: "center", flex: 1, paddingHorizontal: 10 },
    subHeaderContainer: { paddingHorizontal: 20, paddingVertical: 16 },
    subHeaderTitle: { fontSize: 13, fontWeight: "600", color: "#64748B" },
    listContainer: { paddingHorizontal: 20, paddingBottom: 24, gap: 12 },
    
    // Card Ruang
    cardRoom: {
        backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, borderWidth: 1,
        borderColor: "#F1F5F9", flexDirection: "row", alignItems: "center", gap: 12,
        shadowColor: "#0F172A", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2,
    },
    roomIconBox: {
        width: 44, height: 44, backgroundColor: "#EFF6FF", borderRadius: 12,
        justifyContent: "center", alignItems: "center",
    },
    roomName: { fontSize: 15, fontWeight: "bold", color: "#0F172A" },
    roomCode: { fontSize: 12, fontWeight: "500", color: "#64748B", marginTop: 2 },
    
    // Filters UI
    filterWrapper: { marginBottom: 16 },
    filterScroll: { paddingHorizontal: 20, gap: 8 },
    filterChip: {
        paddingVertical: 8, paddingHorizontal: 14, backgroundColor: "#FFFFFF", borderRadius: 20,
        borderWidth: 1, borderColor: "#E2E8F0",
    },
    filterChipActive: { backgroundColor: "#3B82F6", borderColor: "#3B82F6" },
    filterChipText: { fontSize: 13, fontWeight: "600", color: "#64748B" },
    filterChipTextActive: { color: "#FFFFFF" },

    // Tabel
    tableWrapper: {
        flex: 1, marginHorizontal: 20, marginBottom: 20, borderWidth: 1, borderColor: "#F1F5F9",
        borderRadius: 16, backgroundColor: "#FFFFFF", overflow: "hidden", shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2,
    },
    tableContainer: { minWidth: 480 },
    tableHeaderRow: { flexDirection: "row", backgroundColor: "#F8FAFC", borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },
    tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
    rowAlternate: { backgroundColor: "#FAFAFA" },
    cellHeader: { paddingVertical: 14, paddingHorizontal: 12, justifyContent: "center", alignItems: "center", borderRightWidth: 1, borderRightColor: "#F1F5F9" },
    cellBody: { paddingVertical: 12, paddingHorizontal: 12, justifyContent: "center", alignItems: "center", borderRightWidth: 1, borderRightColor: "#F1F5F9" },
    colName: { width: 180, alignItems: "flex-start" },
    colDate: { width: 85 },
    headerText: { fontSize: 12, fontWeight: "bold", color: "#475569", textTransform: "uppercase", textAlign: "center", letterSpacing: 0.5 },
    bodyTextName: { fontSize: 14, fontWeight: "600", color: "#0F172A" },
    statusBadge: { width: 30, height: 30, borderRadius: 8, justifyContent: "center", alignItems: "center" },
    bodyTextStatus: { fontSize: 12, fontWeight: "bold" },

    // Modal Export
    modalOverlay: {
        flex: 1, backgroundColor: "rgba(15, 23, 42, 0.4)", justifyContent: "center", alignItems: "center", padding: 20
    },
    modalContent: {
        width: "100%", maxWidth: 340, backgroundColor: "#FFFFFF", borderRadius: 20,
        padding: 24, shadowColor: "#0F172A", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 5,
    },
    modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
    modalTitle: { fontSize: 16, fontWeight: "bold", color: "#0F172A" },
    modalSubtitle: { fontSize: 13, fontWeight: "500", color: "#64748B", marginBottom: 16 },
    
    exportActionsRow: { flexDirection: "row", gap: 12 },
    actionBtnPDF: {
        flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
        padding: 12, borderRadius: 12, backgroundColor: "#FEF2F2", gap: 8,
    },
    actionBtnTextPDF: { fontSize: 14, fontWeight: "bold", color: "#EF4444" },
    actionBtnExcel: {
        flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
        padding: 12, borderRadius: 12, backgroundColor: "#ECFDF5", gap: 8,
    },
    actionBtnTextExcel: { fontSize: 14, fontWeight: "bold", color: "#10B981" }
});