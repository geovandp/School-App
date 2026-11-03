import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop",
        fullDetail: "Persiapan pementasan drama pendek dan analisis penokohan naskah drama modern karya penulis ternama Indonesia.",
    },
];

export default function TeachingSchedulePage() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

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

    // Fungsi helper untuk badge status dengan warna soft
    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Selesai":
                return { bg: "#F1F5F9", text: "#64748B" }; // Slate
            case "Sedang Berjalan":
                return { bg: "#ECFDF5", text: "#10B981" }; // Emerald
            case "Belum Mulai":
            default:
                return { bg: "#EFF6FF", text: "#3B82F6" }; // Blue Soft
        }
    };

    const renderItem = ({ item }: { item: ScheduleItem }) => {
        const statusStyle = getStatusStyle(item.status);

        return (
            <View style={styles.card}>
                {/* Foto / Banner Jadwal */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.cardImage} />
                    <View style={[styles.statusBadgeOverlay, { backgroundColor: statusStyle.bg }]}>
                        <Text style={[styles.statusText, { color: statusStyle.text }]}>{item.status}</Text>
                    </View>
                </View>

                <View style={styles.cardContent}>
                    {/* Meta Row (Kategori/Ruang & Waktu) */}
                    <View style={styles.modalMetaRow}>
                        <View style={styles.modalCategoryBadge}>
                            <Text style={styles.categoryText}>{item.className} • {item.room}</Text>
                        </View>
                        <View style={styles.dateRow}>
                            <MaterialCommunityIcons name="clock-outline" size={14} color="#64748B" />
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
                            name={item.status === "Selesai" ? "text-box-search-outline" : "arrow-right"}
                            size={18}
                            color="#FFF"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

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
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#1E293B" />
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
        backgroundColor: "#F8FAFC", // Off-white modern
    },
    pageHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
        backgroundColor: "#FFFFFF",
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
    dateContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    dateTextHeader: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#334155",
    },
    subtitleText: {
        fontSize: 13,
        fontWeight: "500",
        color: "#64748B",
        marginTop: 4,
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        gap: 16,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        overflow: "hidden",
        // Soft Shadow
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    imageContainer: {
        height: 140,
        width: "100%",
        backgroundColor: "#E2E8F0",
    },
    cardImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    statusBadgeOverlay: {
        position: "absolute",
        top: 12,
        right: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 11,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 0.5,
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
        backgroundColor: "#EFF6FF", // Soft Blue
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    categoryText: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#3B82F6",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    dateRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    dateText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#64748B",
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0F172A",
        marginBottom: 8,
    },
    modalFullDetail: {
        fontSize: 13,
        fontWeight: "400",
        color: "#475569",
        lineHeight: 20,
        marginBottom: 16,
    },
    actionButton: {
        backgroundColor: "#3B82F6", // Primary Accent Blue
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        borderRadius: 12,
        gap: 8,
        shadowColor: "#3B82F6",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    actionButtonText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "bold",
    },
});