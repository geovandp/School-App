import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScheduleItem = {
    id: string;
    time: string;
    subject: string;
    className: string;
    room: string;
    status: "Selesai" | "Sedang Berjalan" | "Belum Mulai";
    statusColor: string;
};

const scheduleData: ScheduleItem[] = [
    {
        id: "1",
        time: "07:30 - 09:00",
        subject: "Bahasa Indonesia",
        className: "Kelas X IPA 1",
        room: "Ruang 101",
        status: "Selesai",
        statusColor: "#FFF",
    },
    {
        id: "2",
        time: "09:30 - 11:00",
        subject: "Bahasa Indonesia",
        className: "Kelas X IPS 2",
        room: "Ruang 204",
        status: "Sedang Berjalan",
        statusColor: "#CAFFBF",
    },
    {
        id: "3",
        time: "11:30 - 13:00",
        subject: "Bahasa Indonesia",
        className: "Kelas XI IPA 3",
        room: "Ruang 302",
        status: "Belum Mulai",
        statusColor: "#FDFFB6",
    },
];

export default function TeachingSchedulePage() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();

    const handleActionButton = (item: ScheduleItem) => {
        if (item.status === "Selesai") {
            Alert.alert("Lihat Jurnal", `Menampilkan jurnal mengajar kelas ${item.className}`);
        } else if (item.status === "Sedang Berjalan") {
            Alert.alert("Kelas Aktif", `Masuk ke sesi mengajar ${item.className}`);
        } else {
            Alert.alert("Mulai Kelas", `Apakah Anda ingin memulai kelas ${item.className}?`, [
                { text: "Batal", style: "cancel" },
                { text: "Mulai", onPress: () => console.log("Kelas Dimulai") },
            ]);
        }
    };

    const renderItem = ({ item }: { item: ScheduleItem }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.timeBox}>
                    <MaterialCommunityIcons name="clock-outline" size={16} color="#000" />
                    <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.subjectText}>{item.subject}</Text>
                <View style={styles.roomInfoRow}>
                    <MaterialCommunityIcons name="google-classroom" size={18} color="#000" />
                    <Text style={styles.classText}>{item.className}</Text>
                    <Text style={styles.dotSeparator}>•</Text>
                    <MaterialCommunityIcons name="door-open" size={18} color="#000" />
                    <Text style={styles.roomText}>{item.room}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.8}
                onPress={() => handleActionButton(item)}
            >
                <Text style={styles.actionButtonText}>
                    {item.status === "Selesai" ? "Lihat Jurnal" : "Mulai Kelas"}
                </Text>
                <MaterialCommunityIcons
                    name={item.status === "Selesai" ? "text-box-search-outline" : "arrow-right-bold"}
                    size={18}
                    color="#FFF"
                />
            </TouchableOpacity>
        </View>
    );

    return (
        /* PERBAIKAN DILAKUKAN DI SINI: Tambahkan paddingBottom: insets.bottom */
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
                <Text style={styles.pageTitle}>Nilai</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>Selasa, 1 September 2026</Text>
                <Text style={styles.subtitleText}>Anda memiliki 3 jadwal hari ini.</Text>
            </View>

            <FlatList
                data={scheduleData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
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
        fontSize: 20,
        fontWeight: "900",
        color: "#000",
    },
    dateContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    dateText: {
        fontSize: 18,
        fontWeight: "800",
        color: "#000",
    },
    subtitleText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#555",
        marginTop: 4,
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24, // Padding tambahan ruang scroll bagian bawah
        gap: 16,
    },
    card: {
        backgroundColor: "#9BF6FF",
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
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    timeBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#000",
        gap: 6,
    },
    timeText: {
        fontSize: 13,
        fontWeight: "800",
        color: "#000",
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#000",
    },
    statusText: {
        fontSize: 11,
        fontWeight: "900",
        color: "#000",
        textTransform: "uppercase",
    },
    infoSection: {
        marginBottom: 16,
        backgroundColor: "#FFF",
        padding: 12,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#000",
    },
    subjectText: {
        fontSize: 22,
        fontWeight: "900",
        color: "#000",
        marginBottom: 6,
    },
    roomInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    classText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#000",
    },
    dotSeparator: {
        fontSize: 14,
        fontWeight: "900",
        color: "#000",
        marginHorizontal: 4,
    },
    roomText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#000",
    },
    actionButton: {
        backgroundColor: "#000",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000",
        gap: 8,
    },
    actionButtonText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "800",
    },
});