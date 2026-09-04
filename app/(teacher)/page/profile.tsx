import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
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
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
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
                            <Text style={styles.infoLabel}>NISN</Text>
                            <Text style={styles.infoValue}>0051283910</Text>
                        </View>
                        <View style={styles.infoDivider} />
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>NIS</Text>
                            <Text style={styles.infoValue}>2211045</Text>
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
                        activeOpacity={0.8}
                        onPress={() => handleMenuPress("Keamanan Akun")}
                    >
                        <View style={[styles.menuIconBox, { backgroundColor: "#CAFFBF" }]}>
                            <MaterialCommunityIcons name="shield-lock-outline" size={22} color="#000" />
                        </View>
                        <View style={styles.menuTextBox}>
                            <Text style={styles.menuTitle}>Keamanan Akun</Text>
                            <Text style={styles.menuDesc}>Ubah kata sandi & verifikasi keamanan</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={22} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuCard}
                        activeOpacity={0.8}
                        onPress={() => handleMenuPress("Pusat Bantuan")}
                    >
                        <View style={[styles.menuIconBox, { backgroundColor: "#FDFFB6" }]}>
                            <MaterialCommunityIcons name="help-circle-outline" size={22} color="#000" />
                        </View>
                        <View style={styles.menuTextBox}>
                            <Text style={styles.menuTitle}>Pusat Bantuan</Text>
                            <Text style={styles.menuDesc}>FAQ, panduan aplikasi, & hubungi admin</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={22} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* TOMBOL KELUAR */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    activeOpacity={0.8}
                    onPress={handleLogout}
                >
                    <MaterialCommunityIcons name="logout" size={20} color="#FFF" />
                    <Text style={styles.logoutButtonText}>Keluar Akun</Text>
                </TouchableOpacity>

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
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 24,
    },
    // Card Profil Utama
    profileCard: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 20,
        borderWidth: 3,
        borderColor: "#000",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
        marginBottom: 24,
    },
    avatarContainer: {
        position: "relative",
        marginBottom: 14,
    },
    avatarImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: "#000",
    },
    roleBadge: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#FFD166",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#000",
    },
    roleBadgeText: {
        fontSize: 10,
        fontWeight: "900",
        color: "#000",
    },
    profileName: {
        fontSize: 18,
        fontWeight: "900",
        color: "#000",
        textAlign: "center",
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 13,
        fontWeight: "600",
        color: "#555",
        marginBottom: 16,
    },
    divider: {
        width: "100%",
        height: 2,
        backgroundColor: "#000",
        marginBottom: 16,
    },
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
        width: 2,
        height: 30,
        backgroundColor: "#000",
    },
    infoLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: "#666",
        textTransform: "uppercase",
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 13,
        fontWeight: "900",
        color: "#000",
    },
    // Menu Section
    menuSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "900",
        color: "#000",
        marginBottom: 12,
    },
    menuCard: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 14,
        borderWidth: 3,
        borderColor: "#000",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
    },
    menuIconBox: {
        width: 42,
        height: 42,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    menuTextBox: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 15,
        fontWeight: "900",
        color: "#000",
    },
    menuDesc: {
        fontSize: 11,
        fontWeight: "600",
        color: "#555",
        marginTop: 2,
    },
    // Logout Button
    logoutButton: {
        backgroundColor: "#FF6B6B",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 14,
        borderRadius: 14,
        borderWidth: 3,
        borderColor: "#000",
        gap: 8,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    logoutButtonText: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "900",
    },
});