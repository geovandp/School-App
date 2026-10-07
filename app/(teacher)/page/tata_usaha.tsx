import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Dummy Data Menu Tata Usaha
const tuMenus = [
    { id: "1", title: "Pengajuan\nSurat", icon: "email-fast-outline", color: "#CAFFBF" },
    { id: "2", title: "Legalisir\nDokumen", icon: "file-document-check-outline", color: "#9BF6FF" },
    { id: "3", title: "Administrasi\nKeuangan", icon: "cash-register", color: "#FFD6A5" },
    { id: "4", title: "Pusat\nBantuan", icon: "face-agent", color: "#FFADAD" },
];

// Dummy Data Riwayat Pengajuan
const riwayatPengajuan = [
    { id: "REQ-01", type: "Surat Keterangan Aktif", date: "28 Sep 2026", status: "Diproses", statusColor: "#FDFFB6" },
    { id: "REQ-02", type: "Legalisir Ijazah", date: "22 Sep 2026", status: "Selesai", statusColor: "#CAFFBF" },
    { id: "REQ-03", type: "Surat Pengantar", date: "15 Sep 2026", status: "Ditolak", statusColor: "#FFADAD" },
];

export default function TataUsahaPage() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }]}>
            
            {/* Header Halaman */}
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>E-TU TATA USAHA</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Banner Info */}
                <View style={[styles.infoBanner, { backgroundColor: "#FDFFB6" }]}>
                    <View style={styles.bannerIcon}>
                        <MaterialCommunityIcons name="card-account-mail-outline" size={32} color="#000" />
                    </View>
                    <View style={styles.bannerTextContainer}>
                        <Text style={styles.bannerTitle}>Layanan Administrasi</Text>
                        <Text style={styles.bannerDesc}>Jam Operasional Layanan TU: 07:00 - 15:00 WIB. Pengajuan di luar jam akan diproses esok hari.</Text>
                    </View>
                </View>

                {/* Grid Menu TU */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Layanan Tersedia</Text>
                </View>
                <View style={styles.menuGrid}>
                    {tuMenus.map((menu) => (
                        <TouchableOpacity key={menu.id} style={styles.menuItem} activeOpacity={0.8}>
                            <View style={[styles.menuIconContainer, { backgroundColor: menu.color }]}>
                                <MaterialCommunityIcons name={menu.icon as any} size={32} color="#000" />
                            </View>
                            <Text style={styles.menuItemText}>{menu.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Riwayat Pengajuan */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Riwayat Pengajuan</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>Lihat Semua</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.listContainer}>
                    {riwayatPengajuan.map((item) => (
                        <View key={item.id} style={styles.historyCard}>
                            <View style={styles.historyIcon}>
                                <MaterialCommunityIcons name="file-document-outline" size={24} color="#000" />
                            </View>
                            <View style={styles.historyMeta}>
                                <Text style={styles.historyType}>{item.type}</Text>
                                <Text style={styles.historyDate}>
                                    <MaterialCommunityIcons name="calendar-blank" size={12} color="#555" /> {item.date}
                                </Text>
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
    pageTitle: {
        fontSize: 18,
        fontWeight: "900",
        color: "#000",
        textAlign: "center",
        flex: 1,
    },
    scrollContent: {
        paddingTop: 20,
        paddingBottom: 24,
    },
    infoBanner: {
        marginHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 16,
        borderWidth: 3,
        borderColor: "#000",
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    bannerIcon: {
        width: 56,
        height: 56,
        backgroundColor: "#FFF",
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    bannerTextContainer: {
        flex: 1,
    },
    bannerTitle: {
        fontSize: 16,
        fontWeight: "900",
        color: "#000",
        textTransform: "uppercase",
        marginBottom: 4,
    },
    bannerDesc: {
        fontSize: 12,
        fontWeight: "700",
        color: "#555",
        lineHeight: 18,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginHorizontal: 20,
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
    menuGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 32,
        gap: 16,
    },
    menuItem: {
        width: "47%",
        backgroundColor: "#FFF",
        borderRadius: 16,
        borderWidth: 3,
        borderColor: "#000",
        padding: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    menuIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    menuItemText: {
        fontSize: 13,
        fontWeight: "800",
        color: "#000",
        textAlign: "center",
        textTransform: "uppercase",
    },
    listContainer: {
        paddingHorizontal: 20,
        gap: 12,
    },
    historyCard: {
        flexDirection: "row",
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
    historyIcon: {
        width: 40,
        height: 40,
        backgroundColor: "#F0F0F0",
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    historyMeta: {
        flex: 1,
        gap: 4,
    },
    historyType: {
        fontSize: 14,
        fontWeight: "900",
        color: "#000",
    },
    historyDate: {
        fontSize: 12,
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
        fontSize: 10,
        fontWeight: "900",
        color: "#000",
        textTransform: "uppercase",
    },
});