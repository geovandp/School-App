import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AttendanceHistory = {
    id: string;
    date: string;
    checkIn: string;
    checkOut: string;
    status: string;
    statusColor: string;
};

const calculateStatus = (checkIn: string, checkOut: string) => {
    if (checkIn === "-" && checkOut === "-") {
        return { status: "A (Alpa)", statusColor: "#FFADAD" }; 
    }
    if (checkIn > "07:00" || checkOut === "-" || (checkOut !== "-" && checkOut < "15:30")) {
        return { status: "TAPT", statusColor: "#FDFFB6" }; 
    }
    return { status: "H (Hadir)", statusColor: "#CAFFBF" }; 
};

const historyData: AttendanceHistory[] = [
    { id: "1", date: "2026-09-21", checkIn: "06:15", checkOut: "15:30", ...calculateStatus("06:15", "15:30") },
    { id: "2", date: "2026-09-22", checkIn: "07:28", checkOut: "-", ...calculateStatus("07:28", "-") },
    { id: "3", date: "2026-09-23", checkIn: "-", checkOut: "-", ...calculateStatus("-", "-") },
];

const StatBox = ({ title, value, valueColor = "#000" }: { title: string, value: string | number, valueColor?: string }) => (
    <View style={styles.statBox}>
        <Text style={styles.statTitle}>{title}</Text>
        <Text style={[styles.statValue, { color: valueColor }]}>{value}</Text>
    </View>
);

export default function AttendancePage() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const [currentTime, setCurrentTime] = useState(new Date());
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleScanFace = () => {
        router.push("/(teacher)/(tabs)/scan");
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }]}>
            
            {/* Header Halaman (Tetap Fixed di atas) */}
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Presensi Harian</Text>
                
                {/* Tombol Scan Wajah kini menjadi Icon di sudut kanan atas */}
                <TouchableOpacity style={styles.scanIconButton} onPress={handleScanFace} activeOpacity={0.7}>
                    <MaterialCommunityIcons name="face-recognition" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* ScrollView membungkus seluruh konten */}
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                <View style={styles.contentContainer}>
                    {/* Kartu Statistik Rekapitulasi */}
                    <View style={styles.recapCard}>
                        <View style={styles.recapHeader}>
                            <Text style={styles.recapTitle}>Rekap Bulan Ini</Text>
                        </View>

                        <View style={styles.statsRow}>
                            <StatBox title="HADIR" value={4} />
                            <StatBox title="TERLAMBAT" value={0} valueColor="#F4A261" />
                            <StatBox title="TIDAK HADIR" value={0} valueColor="#E76F51" />
                        </View>

                        {isDetailOpen && (
                            <View style={styles.detailContainer}>
                                <View style={styles.statsRow}>
                                    <StatBox title="PLG AWAL (PA)" value={0} valueColor="#F4A261" />
                                    <StatBox title="PULANG (P)" value={0} />
                                    <StatBox title="KEMBALI" value={0} />
                                </View>
                                <View style={styles.statsRow}>
                                    <StatBox title="TAM" value={0} valueColor="#E76F51" />
                                    <StatBox title="TAP" value={0} valueColor="#E76F51" />
                                    <StatBox title="TAMP" value={0} valueColor="#E76F51" />
                                </View>
                                <View style={styles.statsRow}>
                                    <StatBox title="SAKIT" value={0} valueColor="#2A9D8F" />
                                    <StatBox title="IZIN" value={0} valueColor="#E9C46A" />
                                    <StatBox title="ALPA" value={0} valueColor="#E76F51" />
                                </View>
                            </View>
                        )}

                        <TouchableOpacity 
                            style={styles.toggleButton} 
                            onPress={() => setIsDetailOpen(!isDetailOpen)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.toggleButtonText}>
                                {isDetailOpen ? "Tutup Detail" : "Lihat Detail"}
                            </Text>
                            <MaterialCommunityIcons 
                                name={isDetailOpen ? "chevron-up" : "chevron-down"} 
                                size={20} 
                                color="#555" 
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Judul Riwayat Presensi */}
                    <View style={styles.historyHeader}>
                        <Text style={styles.sectionTitle}>Riwayat Presensi</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>Lihat Semua</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* List Item dirender dengan Map ke dalam ScrollView */}
                <View style={styles.listContainer}>
                    {historyData.map((item) => (
                        <View key={item.id} style={styles.historyCard}>
                            <View style={styles.historyMeta}>
                                <Text style={styles.historyDate}>{item.date}</Text>
                                <View style={styles.timeContainer}>
                                    <Text style={styles.historyTime}>
                                        <MaterialCommunityIcons name="login" size={14} color="#555" /> In: {item.checkIn}
                                    </Text>
                                    <Text style={styles.historyTime}>
                                        <MaterialCommunityIcons name="logout" size={14} color="#555" /> Out: {item.checkOut}
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
                                <Text style={styles.statusText}>{item.status}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
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
    // Gaya untuk Icon Button Scan Baru
    scanIconButton: {
        width: 40,
        height: 40,
        backgroundColor: "#4361EE",
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
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    recapCard: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        borderWidth: 3,
        borderColor: "#000",
        padding: 16,
        marginBottom: 32,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    recapHeader: {
        marginBottom: 16,
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: "#F0F0F0",
        paddingBottom: 10,
    },
    recapTitle: {
        fontSize: 16,
        fontWeight: "900",
        color: "#000",
        textTransform: "uppercase",
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    statBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    statTitle: {
        fontSize: 10,
        fontWeight: "800",
        color: "#777",
        marginBottom: 4,
        textAlign: "center",
    },
    statValue: {
        fontSize: 22,
        fontWeight: "900",
    },
    detailContainer: {
        marginTop: 8,
        paddingTop: 16,
        borderTopWidth: 2,
        borderTopColor: "#F0F0F0",
        gap: 8,
    },
    toggleButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        paddingTop: 12,
        borderTopWidth: 2,
        borderTopColor: "#F0F0F0",
        gap: 4,
    },
    toggleButtonText: {
        fontSize: 12,
        fontWeight: "800",
        color: "#555",
    },
    historyHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "900",
        color: "#000",
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#4361EE",
        textDecorationLine: "underline",
    },
    listContainer: {
        paddingHorizontal: 20,
        gap: 12,
    },
    historyCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#000",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 3,
    },
    historyMeta: {
        flex: 1,
        gap: 4,
    },
    historyDate: {
        fontSize: 14,
        fontWeight: "800",
        color: "#000",
    },
    timeContainer: {
        flexDirection: "row",
        gap: 16,
        marginTop: 4,
    },
    historyTime: {
        fontSize: 13,
        fontWeight: "600",
        color: "#555",
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#000",
    },
    statusText: {
        fontSize: 12,
        fontWeight: "900",
        color: "#000",
        textTransform: "uppercase",
    },
});