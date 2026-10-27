import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

// --- DATA DUMMY SISWA ---
const STUDENT_DATA = {
  schoolName: "SMAN 1 Peunaron",
  name: "Alexander",
  nisn: "666666",
  kelas: "XII MIPA 1",
  tahunPelajaran: "2026/2027",
  role: "MURID",
};

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const handleLogout = () => {
    Alert.alert(
      "Konfirmasi Keluar",
      "Apakah Anda yakin ingin keluar dari aplikasi?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Keluar",
          style: "destructive",
          onPress: () => {
            router.replace("/login");
          },
        },
      ],
    );
  };

  return (
    <View style={[styles.mainWrapper, { paddingTop: insets.top }]}>
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil Akun</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* --- KARTU PELAJAR DIGITAL (CUSTOM PRIMARY GRADIENT) --- */}
        <LinearGradient
          // Gradasi memadukan Hitam Pekat
          colors={["#0F172A", "#184575", "#396BA0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.idCard}
        >
          {/* Efek Kilau / Overlay Cahaya Halus di Kartu */}
          <View style={styles.cardGlowEffect} />

          {/* Baris Atas: Logo & Nama Sekolah */}
          <View style={styles.cardSchoolHeader}>
            <View style={styles.logoWrapper}>
              <Image
                source={require("@/assets/images/example_logo.png")}
                style={styles.schoolLogo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.cardSchoolText}>{STUDENT_DATA.schoolName}</Text>
          </View>

          {/* Judul Kartu dengan Aksen Modern */}
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>KARTU PELAJAR DIGITAL</Text>
            <View style={styles.cardTitleUnderline} />
          </View>

          <View style={styles.cardBody}>
            {/* Bagian Kiri: Foto Profil & Status */}
            <View style={styles.photoSection}>
              <View style={styles.photoPlaceholder}>
                <MaterialCommunityIcons
                  name="account"
                  size={54}
                  color="#64748B"
                />
              </View>
              <View style={styles.statusLabel}>
                <Text style={styles.statusLabelText}>AKTIF</Text>
              </View>
            </View>

            {/* Bagian Kanan: Informasi Siswa */}
            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nama</Text>
                <Text style={styles.infoValue} numberOfLines={1}>
                  : {STUDENT_DATA.name}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>NISN</Text>
                <Text style={styles.infoValue}>: {STUDENT_DATA.nisn}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Kelas</Text>
                <Text style={styles.infoValue}>: {STUDENT_DATA.kelas}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tahun</Text>
                <Text style={styles.infoValue}>
                  : {STUDENT_DATA.tahunPelajaran}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Role</Text>
                <Text style={styles.infoValue}>: {STUDENT_DATA.role}</Text>
              </View>
            </View>
          </View>

          {/* Ikon Watermark QR di sudut kanan bawah */}
          <View style={styles.qrWatermarkContainer}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={36}
              color="rgba(255,255,255,0.15)"
            />
          </View>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Pengaturan Akun</Text>

        {/* --- MENU LIST --- */}
        <View style={styles.menuContainer}>
          {/* Edit Profile */}
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => router.push("/(student)/profile-akun/edit-profile")}
          >
            <View style={[styles.menuIconBox, { backgroundColor: "#F0FDF4" }]}>
              <MaterialCommunityIcons
                name="account-edit-outline"
                size={22}
                color="#3B8312"
              />
            </View>
            <Text style={styles.menuText}>Edit Profile</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={22}
              color="#CBD5E1"
            />
          </TouchableOpacity>

          {/* Keamanan Akun */}
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => router.push("/(student)/profile-akun/keamanan-akun")}
          >
            <View style={[styles.menuIconBox, { backgroundColor: "#F0FDF4" }]}>
              <MaterialCommunityIcons
                name="shield-lock-outline"
                size={22}
                color="#059669"
              />
            </View>
            <Text style={styles.menuText}>Keamanan Akun</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={22}
              color="#CBD5E1"
            />
          </TouchableOpacity>

          {/* Pusat Bantuan */}
          <TouchableOpacity
            style={[styles.menuItem, { borderBottomWidth: 0 }]}
            activeOpacity={0.7}
            onPress={() => router.push("/(student)/profile-akun/pusat-bantuan")}
          >
            <View style={[styles.menuIconBox, { backgroundColor: "#FFF7ED" }]}>
              <MaterialCommunityIcons
                name="help-circle-outline"
                size={22}
                color="#D97706"
              />
            </View>
            <Text style={styles.menuText}>Pusat Bantuan</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={22}
              color="#CBD5E1"
            />
          </TouchableOpacity>
        </View>

        {/* --- TOMBOL LOGOUT --- */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="logout" size={22} color="#EF4444" />
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1E293B",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  idCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
    shadowColor: "#3B8312",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    overflow: "hidden",
    position: "relative",
  },
  cardGlowEffect: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  cardSchoolHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  logoWrapper: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  schoolLogo: {
    width: 24,
    height: 24,
  },
  cardSchoolText: {
    color: "#F8FAFC",
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 8,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  cardTitleContainer: {
    marginBottom: 16,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },
  cardTitleUnderline: {
    width: "100%",
    height: 1.5,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    marginTop: 6,
    borderRadius: 1,
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center",
  },
  photoSection: {
    alignItems: "center", 
    marginRight: 16,
  },
  photoPlaceholder: {
    width: 76,
    height: 92,
    backgroundColor: "#E2E8F0",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  statusLabel: {
    backgroundColor: "#10B981",
    width: 76,
    paddingVertical: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
  },
  statusLabelText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },
  infoSection: { flex: 1 },
  infoRow: { 
    flexDirection: "row",
    marginBottom: 5,
   },
  infoLabel: { 
    width: 52,
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "600",
  },
  infoValue: { 
    flex: 1,
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  qrWatermarkContainer: {
    position: "absolute",
    bottom: 12,
    right: 15,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 12,
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
    paddingVertical: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#EF4444",
    marginLeft: 8,
  },
});
