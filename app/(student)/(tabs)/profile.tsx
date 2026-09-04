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
import { Colors } from "@/constants/Colors";

// --- DATA DUMMY SISWA ---
const STUDENT_DATA = {
  schoolName: "SMAN 1 Peunaron",
  name: "Giovan Deo Pratama",
  nisn: "666666",
  nis: "999999",
  kelas: "XII MIPA 1",
  role: "SISWA",
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
            // Logika logout disini (hapus token, dll)
            router.replace("/login"); // Arahkan kembali ke halaman login
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
        {/* --- KARTU PELAJAR DIGITAL (RFID READY) --- */}
        <LinearGradient
          colors={["#2A4B54", "#172A30"]} // Warna Teal gelap menyerupai referensi gambar
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.idCard}
        >
          {/* Baris Atas: Logo & Nama Sekolah */}
          <View style={styles.cardSchoolHeader}>
            {/* Ganti ikon dengan Image logo lokal */}
            <Image
              source={require("@/assets/images/example_logo.png")}
              style={styles.schoolLogo}
              resizeMode="contain"
            />
            <Text style={styles.cardSchoolText}>{STUDENT_DATA.schoolName}</Text>
          </View>

          {/* Judul Kartu */}
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>KARTU PELAJAR DIGITAL</Text>
            <View style={styles.cardTitleUnderline} />
          </View>

          <View style={styles.cardBody}>
            {/* Bagian Kiri: Foto Profil */}
            <View style={styles.photoSection}>
              <View style={styles.photoPlaceholder}>
                <MaterialCommunityIcons
                  name="account"
                  size={60}
                  color="#CBD5E1"
                />
              </View>
              {/* Label Status / Absen (Warna Pink/Merah seperti referensi) */}
              <View style={styles.statusLabel}>
                <Text style={styles.statusLabelText}>AKTIF</Text>
              </View>
            </View>

            {/* Bagian Kanan: Informasi Siswa */}
            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nama</Text>
                <Text style={styles.infoValue}>: {STUDENT_DATA.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>NISN</Text>
                <Text style={styles.infoValue}>: {STUDENT_DATA.nisn}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>NIS</Text>
                <Text style={styles.infoValue}>: {STUDENT_DATA.nis}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Kelas</Text>
                <Text style={styles.infoValue}>: {STUDENT_DATA.kelas}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Role</Text>
                <Text style={styles.infoValue}>: {STUDENT_DATA.role}</Text>
              </View>
            </View>
          </View>

          {/* Ikon QR Code di sudut kanan bawah */}
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={24}
            color="rgba(255,255,255,0.2)"
            style={styles.qrWatermark}
          />
        </LinearGradient>

        <Text style={styles.sectionTitle}>Pengaturan Akun</Text>

        {/* --- MENU LIST --- */}
        <View style={styles.menuContainer}>
          {/* Edit Profile */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={[styles.menuIconBox, { backgroundColor: "#EFF6FF" }]}>
              <MaterialCommunityIcons
                name="account-edit-outline"
                size={22}
                color="#3B82F6"
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
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={[styles.menuIconBox, { backgroundColor: "#F0FDF4" }]}>
              <MaterialCommunityIcons
                name="shield-lock-outline"
                size={22}
                color="#10B981"
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
          >
            <View style={[styles.menuIconBox, { backgroundColor: "#FFF7ED" }]}>
              <MaterialCommunityIcons
                name="help-circle-outline"
                size={22}
                color="#F59E0B"
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
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#1E293B" },

  contentContainer: { padding: 20, paddingBottom: 40 },

  // --- KARTU PELAJAR STYLES ---
  idCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    overflow: "hidden", // Agar watermark QR tidak keluar batas
  },
  cardSchoolHeader: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 12 
  },
  schoolLogo: {
    width: 20,
    height: 20,
    borderRadius: 4, // Opsional jika ingin sedikit melengkung
  },
  cardSchoolText: { 
    color: "#E2E8F0", 
    fontSize: 11, 
    fontWeight: "bold", 
    marginLeft: 6, 
    textTransform: "uppercase" 
  },
  cardTitleContainer: {
    marginBottom: 20,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  cardTitleUnderline: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginTop: 8,
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center",
  },
  // Foto & Label
  photoSection: { alignItems: "center", marginRight: 15 },
  photoPlaceholder: {
    width: 80,
    height: 95,
    backgroundColor: "#F1F5F9",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  statusLabel: {
    backgroundColor: "#F43F5E", // Warna Pink/Merah menyala
    width: 80,
    paddingVertical: 6,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: "center",
  },
  statusLabelText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },
  // Info Text
  infoSection: { flex: 1 },
  infoRow: { flexDirection: "row", marginBottom: 6 },
  infoLabel: { width: 50, color: "#E2E8F0", fontSize: 12, fontWeight: "600" },
  infoValue: { flex: 1, color: "#FFFFFF", fontSize: 12, fontWeight: "bold" },
  qrWatermark: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
  // --- MENU STYLES ---
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 12,
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 25,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
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
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#334155"
  },
  // --- LOGOUT BUTTON ---
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#EF4444",
    marginLeft: 8,
  },
});
