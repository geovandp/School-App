import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Tipe data untuk Riwayat Presensi
type AttendanceHistory = {
    id: string;
    date: string;
    time: string;
    status: "Hadir" | "Terlambat" | "Tidak Hadir";
    statusColor: string;
};

// Data dummy riwayat presensi
const historyData: AttendanceHistory[] = [
    {
        id: "1",
        date: "Selasa, 15 September 2026",
        time: "06:45 WIB",
        status: "Hadir",
        statusColor: "#CAFFBF", // Hijau
    },
    {
        id: "2",
        date: "Senin, 14 September 2026",
        time: "07:15 WIB",
        status: "Terlambat",
        statusColor: "#FDFFB6", // Kuning
    },
    {
        id: "3",
        date: "Jumat, 11 September 2026",
        time: "-",
        status: "Tidak Hadir",
        statusColor: "#FFADAD", // Merah
    },
];

export default function AttendancePage() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    // State untuk jam real-time
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Format tanggal dan jam
    const formattedTime = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const formattedDate = "Rabu, 16 September 2026"; // Berdasarkan konteks saat ini

    const handleScanFace = () => {
        // Navigasi ke halaman scan yang ada di dalam grup (tabs)
        router.push("/(teacher)/(tabs)/scan");
    };

    const renderHistoryItem = ({ item }: { item: AttendanceHistory }) => (
        <View style={styles.historyCard}>
            <View style={styles.historyMeta}>
                <Text style={styles.historyDate}>{item.date}</Text>
                <Text style={styles.historyTime}>
                    <MaterialCommunityIcons name="clock-outline" size={14} color="#555" /> {item.time}
                </Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
                <Text style={styles.statusText}>{item.status}</Text>
            </View>
        </View>
    );

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top,
                    paddingBottom: Math.max(insets.bottom, 16)
                }
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
                <Text style={styles.pageTitle}>Presensi Harian</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.contentContainer}>
                

                {/* Tombol Scan Wajah */}
                <TouchableOpacity
                    style={styles.scanButton}
                    activeOpacity={0.8}
                    onPress={handleScanFace}
                >
                    <View style={styles.scanIconContainer}>
                        <MaterialCommunityIcons name="face-recognition" size={64} color="#FFF" />
                    </View>
                    <Text style={styles.scanButtonText}>Scan Wajah Untuk Hadir</Text>
                    <Text style={styles.scanButtonSubtext}>Pastikan pencahayaan cukup</Text>
                </TouchableOpacity>

                {/* Riwayat Presensi */}
                <View style={styles.historyHeader}>
                    <Text style={styles.sectionTitle}>Riwayat Presensi</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>Lihat Semua</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={historyData}
                keyExtractor={(item) => item.id}
                renderItem={renderHistoryItem}
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
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    infoCard: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 16,
        borderWidth: 3,
        borderColor: "#000",
        alignItems: "center",
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    dateText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#555",
        textTransform: "uppercase",
    },
    timeText: {
        fontSize: 48,
        fontWeight: "900",
        color: "#000",
        marginVertical: 5,
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: "#000",
        marginTop: 10,
        gap: 6,
    },
    locationText: {
        fontSize: 13,
        fontWeight: "800",
        color: "#000",
    },
    scanButton: {
        backgroundColor: "#4361EE",
        borderRadius: 16,
        borderWidth: 3,
        borderColor: "#000",
        paddingVertical: 24,
        alignItems: "center",
        marginBottom: 32,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    scanIconContainer: {
        marginBottom: 10,
    },
    scanButtonText: {
        fontSize: 18,
        fontWeight: "900",
        color: "#FFF",
        textTransform: "uppercase",
    },
    scanButtonSubtext: {
        fontSize: 13,
        fontWeight: "600",
        color: "#E0E0E0",
        marginTop: 4,
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
        paddingBottom: 24,
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