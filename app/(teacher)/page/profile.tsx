import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfilePage() {
    const insets = useSafeAreaInsets();

    const handleMenuPress = (menuTitle: string) => {
        Alert.alert("Navigasi", `Membuka halaman ${menuTitle}`);
    };

    const handleLogout = () => {
        Alert.alert("Keluar Akun", "Apakah Anda yakin ingin keluar dari aplikasi?", [
            { text: "Batal", style: "cancel" },
            { text: "Keluar", style: "destructive", onPress: () => router.replace("/") },
        ]);
    };

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
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Profil Akun</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* CARD PROFIL UTAMA */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" }}
                            style={styles.avatarImage}
                        />
                        <View style={styles.roleBadge}>
                            <Text style={styles.roleBadgeText}>GURU</Text>
                        </View>
                    </View>

                    <Text style={styles.profileName}>Ibu Siti Rahmawati, S.Pd.</Text>
                    <Text style={styles.profileEmail}>siti.rahmawati@sekolah.sch.id</Text>

                    <View style={styles.divider} />

                    {/* Informasi Detail (NISN, NIS, Kelas) */}
                    <View style={styles.infoGrid}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>NIP</Text>
                            <Text style={styles.infoValue}>19850723 2010</Text>
                        </View>
                        <View style={styles.infoDivider} />
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Kode Guru</Text>
                            <Text style={styles.infoValue}>GR-045</Text>
                        </View>
                        <View style={styles.infoDivider} />
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Wali Kelas</Text>
                            <Text style={styles.infoValue}>X IPA 1</Text>
                        </View>
                    </View>
                </View>

                {/* MENU PENGATURAN & KEAMANAN */}
                <View style={styles.menuSection}>
                    <Text style={styles.sectionTitle}>Pengaturan Akun</Text>

                    <TouchableOpacity
                        style={styles.menuCard}
                        activeOpacity={0.7}
                        onPress={() => handleMenuPress("Keamanan Akun")}
                    >
                        <View style={[styles.menuIconBox, { backgroundColor: "#ECFDF5" }]}>
                            <MaterialCommunityIcons name="shield-lock-outline" size={22} color="#10B981" />
                        </View>
                        <View style={styles.menuTextBox}>
                            <Text style={styles.menuTitle}>Keamanan Akun</Text>
                            <Text style={styles.menuDesc}>Ubah kata sandi & verifikasi keamanan</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={22} color="#CBD5E1" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuCard}
                        activeOpacity={0.7}
                        onPress={() => handleMenuPress("Pusat Bantuan")}
                    >
                        <View style={[styles.menuIconBox, { backgroundColor: "#FEF3C7" }]}>
                            <MaterialCommunityIcons name="help-circle-outline" size={22} color="#F59E0B" />
                        </View>
                        <View style={styles.menuTextBox}>
                            <Text style={styles.menuTitle}>Pusat Bantuan</Text>
                            <Text style={styles.menuDesc}>FAQ, panduan aplikasi, & hubungi admin</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={22} color="#CBD5E1" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuCard}
                        activeOpacity={0.7}
                        onPress={() => router.push("/(teacher)/page/face-registration")}
                    >
                        <View style={[styles.menuIconBox, { backgroundColor: "#EFF6FF" }]}>
                            <MaterialCommunityIcons name="face-recognition" size={22} color="#3B82F6" />
                        </View>
                        <View style={styles.menuTextBox}>
                            <Text style={styles.menuTitle}>Pendaftaran Wajah AI</Text>
                            <Text style={styles.menuDesc}>Kalibrasi biometrik untuk presensi</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={22} color="#CBD5E1" />
                    </TouchableOpacity>
                </View>

                {/* TOMBOL KELUAR */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    activeOpacity={0.8}
                    onPress={handleLogout}
                >
                    <MaterialCommunityIcons name="logout" size={20} color="#EF4444" />
                    <Text style={styles.logoutButtonText}>Keluar Akun</Text>
                </TouchableOpacity>

            </ScrollView>
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
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
        backgroundColor: "#FFFFFF",
    },
    backButton: {
        padding: 5,
        marginLeft: -5,
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0F172A",
        textAlign: "center",
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 24,
    },
    
    // --- Card Profil Utama ---
    profileCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 24,
        alignItems: "center",
        // Soft Shadow
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 4,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    avatarContainer: {
        position: "relative",
        marginBottom: 16,
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#E2E8F0",
    },
    roleBadge: {
        position: "absolute",
        bottom: 0,
        right: -5,
        backgroundColor: "#FEF3C7", // Amber Soft
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#FFFFFF", // Border putih agar tidak menyatu dengan foto
    },
    roleBadgeText: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#F59E0B",
        letterSpacing: 0.5,
    },
    profileName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0F172A",
        textAlign: "center",
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 13,
        fontWeight: "500",
        color: "#64748B",
        marginBottom: 20,
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#F1F5F9",
        marginBottom: 20,
    },
    
    // --- Informasi Detail (Grid) ---
    infoGrid: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    infoItem: {
        flex: 1,
        alignItems: "center",
    },
    infoDivider: {
        width: 1,
        height: 30,
        backgroundColor: "#F1F5F9",
    },
    infoLabel: {
        fontSize: 11,
        fontWeight: "600",
        color: "#94A3B8",
        textTransform: "uppercase",
        marginBottom: 6,
        letterSpacing: 0.5,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#334155",
    },
    
    // --- Menu Section ---
    menuSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0F172A",
        marginBottom: 16,
    },
    menuCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        // Soft Shadow
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    menuIconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    menuTextBox: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#334155",
        marginBottom: 2,
    },
    menuDesc: {
        fontSize: 12,
        fontWeight: "500",
        color: "#94A3B8",
    },
    
    // --- Logout Button ---
    logoutButton: {
        backgroundColor: "#FEF2F2", // Latar merah sangat soft
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 16,
        borderRadius: 16,
        gap: 8,
        // Soft Shadow
        shadowColor: "#EF4444",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    logoutButtonText: {
        color: "#EF4444",
        fontSize: 15,
        fontWeight: "bold",
    },
});