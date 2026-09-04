import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";
import {
    Alert,
    FlatList,
    Image,
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
    image: string;
    fullDetail: string;
};

const scheduleData: ScheduleItem[] = [
    {
        id: "1",
        time: "07:30 - 09:00",
        subject: "Bahasa Indonesia: Teks Hikayat",
        className: "Kelas X IPA 1",
        room: "Ruang 101",
        status: "Selesai",
        statusColor: "#FFF",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop",
        fullDetail: "Pembelajaran membahas struktur dan unsur intrinsik dalam teks hikayat Melayu klasik. Siswa aktif berdiskusi dan mencatat pokok-pokok cerita.",
    },
    {
        id: "2",
        time: "09:30 - 11:00",
        subject: "Bahasa Indonesia: Menulis Puisi",
        className: "Kelas X IPS 2",
        room: "Ruang 204",
        status: "Sedang Berjalan",
        statusColor: "#CAFFBF",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop",
        fullDetail: "Sesi praktik langsung penulisan puisi bebas dengan memperhatikan unsur imaji, diksi, dan rima. Guru membimbing siswa secara bergantian.",
    },
    {
        id: "3",
        time: "11:30 - 13:00",
        subject: "Bahasa Indonesia: Drama Teater",
        className: "Kelas XI IPA 3",
        room: "Ruang 302",
        status: "Belum Mulai",
        statusColor: "#FDFFB6",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop",
        fullDetail: "Persiapan pementasan drama pendek dan analisis penokohan naskah drama modern karya penulis ternama Indonesia.",
    },
];

export default function TeachingSchedulePage() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();

    const handleActionButton = (item: ScheduleItem) => {
        if (item.status === "Selesai") {
            Alert.alert("Lihat Materi", `Menampilkan jurnal mengajar kelas ${item.className}`);
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
            {/* Foto / Banner Jadwal */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={[styles.statusBadgeOverlay, { backgroundColor: item.statusColor }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>

            <View style={styles.cardContent}>
                {/* Meta Row (Kategori/Ruang & Waktu) */}
                <View style={styles.modalMetaRow}>
                    <View style={styles.modalCategoryBadge}>
                        <Text style={styles.categoryText}>{item.className} • {item.room}</Text>
                    </View>
                    <View style={styles.dateRow}>
                        <MaterialCommunityIcons name="clock-outline" size={14} color="#666" />
                        <Text style={styles.dateText}>{item.time}</Text>
                    </View>
                </View>

                {/* Judul & Detail */}
                <Text style={styles.modalTitle}>{item.subject}</Text>
                <Text style={styles.modalFullDetail}>{item.fullDetail}</Text>

                {/* Tombol Aksi */}
                <TouchableOpacity
                    style={styles.actionButton}
                    activeOpacity={0.8}
                    onPress={() => handleActionButton(item)}
                >
                    <Text style={styles.actionButtonText}>
                        {item.status === "Selesai" ? "Lihat Materi" : "Mulai Kelas"}
                    </Text>
                    <MaterialCommunityIcons
                        name={item.status === "Selesai" ? "text-box-search-outline" : "arrow-right-bold"}
                        size={18}
                        color="#FFF"
                    />
                </TouchableOpacity>
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
                <Text style={styles.pageTitle}>Jadwal Mengajar</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.dateContainer}>
                <Text style={styles.dateTextHeader}>Selasa, 1 September 2026</Text>
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
        fontSize: 18,
        fontWeight: "900",
        color: "#000",
        textAlign: "center",
        flex: 1,
    },
    dateContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    dateTextHeader: {
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
        paddingBottom: 24,
        gap: 16,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        borderWidth: 3,
        borderColor: "#000",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    imageContainer: {
        height: 150,
        width: "100%",
        borderBottomWidth: 3,
        borderBottomColor: "#000",
        backgroundColor: "#EEE",
    },
    cardImage: {
        width: "100%",
        height: "100%",
    },
    statusBadgeOverlay: {
        position: "absolute",
        top: 12,
        right: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#000",
    },
    statusText: {
        fontSize: 10,
        fontWeight: "900",
        color: "#000",
        textTransform: "uppercase",
    },
    cardContent: {
        padding: 16,
    },
    modalMetaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    modalCategoryBadge: {
        backgroundColor: "#9BF6FF",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: "#000",
    },
    categoryText: {
        fontSize: 10,
        fontWeight: "900",
        color: "#000",
        textTransform: "uppercase",
    },
    dateRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    dateText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#555",
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: "900",
        color: "#000",
        marginBottom: 8,
    },
    modalFullDetail: {
        fontSize: 13,
        fontWeight: "600",
        color: "#444",
        lineHeight: 18,
        marginBottom: 16,
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