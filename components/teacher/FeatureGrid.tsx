import { Colors } from "@/constants/Colors"; // Sesuaikan path ini dengan proyek Anda
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FeatureItem = {
  id: number;
  title: string;
  icon: string;
  route?: string;
};

// Data fitur disesuaikan (tanpa warna kustom per ikon, semua pakai warna primary)
const mainFeatures: FeatureItem[] = [
  { id: 1, title: "Jadwal\nMengajar", icon: "calendar", route: "/page/jadwal_mengajar" },
  { id: 2, title: "Penugasan", icon: "clipboard-list-outline", route: "/page/penugasan" },
  { id: 3, title: "Nilai\nSiswa", icon: "card-bulleted-outline", route: "/page/nilai" },
  { id: 4, title: "Kehadiran\nSiswa", icon: "account-check-outline", route: "/page/kehadiran_siswa" },
  { id: 5, title: "Kalender\nAkademik", icon: "calendar-month-outline", route: "/page/kalender_akademik" },
  { id: 6, title: "Arsip\nDokumen", icon: "folder-multiple-outline", route: "/page/arsip_dokumen" },
  { id: 7, title: "Presensi\nKehadiran", icon: "qrcode-scan", route: "/page/presensi_guru" },
];

const otherFeatures: FeatureItem[] = [
  { id: 101, title: "Arsip\nDokumen", icon: "folder-multiple-outline", route: "/page/arsip_dokumen" },
  { id: 102, title: "Catatan\nKonseling", icon: "account-voice", route: "/page/konseling" },
  { id: 103, title: "Materi\nPelajaran", icon: "book-open-page-variant-outline", route: "/page/materi" },
  { id: 104, title: "Tata\nUsaha", icon: "card-account-mail-outline", route: "/page/tata_usaha" },
  { id: 105, title: "Ujian", icon: "math-compass", route: "/page/ujian" },
  { id: 106, title: "KPI", icon: "chart-box-outline", route: "/page/KPI" },
  { id: 107, title: "Pengajuan\nCuti", icon: "calendar-edit", route: "/page/cuti" },
];

export default function TeacherFeatureGrid() {
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const handleFeaturePress = (item: FeatureItem) => {
    if (modalVisible) {
      setModalVisible(false);
    }

    if (item.route) {
      router.push(item.route as any);
    } else {
      Alert.alert(
        "Info",
        `Halaman "${item.title.replace("\n", " ")}" belum tersedia.`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Utama</Text>

      {/* === GRID BERANDA UTAMA === */}
      <View style={styles.grid}>
        {mainFeatures.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            activeOpacity={0.7}
            onPress={() => handleFeaturePress(item)}
          >
            <View style={styles.iconBox}>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={30}
                color={Colors.primary}
              />
            </View>
            <Text style={styles.itemText} numberOfLines={2}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}

        {/* TOMBOL "LAINNYA" */}
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.iconBox}>
            <MaterialCommunityIcons
              name="view-grid-plus-outline"
              size={30}
              color={Colors.primary}
            />
          </View>
          <Text style={styles.itemText} numberOfLines={2}>
            Lainnya
          </Text>
        </TouchableOpacity>
      </View>

      {/* === MODAL (POPUP) SEMUA FITUR === */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={[
            styles.modalContainer,
            { paddingTop: insets.top, paddingBottom: insets.bottom },
          ]}
        >
          {/* Header Modal */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Menu Lainnya</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <MaterialCommunityIcons
                name="close"
                size={28}
                color={Colors.textMain || "#333"} // Fallback color
              />
            </TouchableOpacity>
          </View>

          {/* Isi Semua Fitur */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.grid, styles.modalGrid]}>
              {otherFeatures.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.item}
                  activeOpacity={0.7}
                  onPress={() => handleFeaturePress(item)}
                >
                  <View style={styles.iconBox}>
                    <MaterialCommunityIcons
                      name={item.icon as any}
                      size={30}
                      color={Colors.primary}
                    />
                  </View>
                  <Text style={styles.itemText} numberOfLines={2}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30, // Disesuaikan dengan referensi
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textMain || "#333", // Fallback color
    marginBottom: 15,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-between" dihapus agar perataannya mirip dengan referensi asli (rata kiri per row)
  },
  item: {
    width: "25%",
    alignItems: "center",
    marginBottom: 20,
  },
  iconBox: {
    width: 60,
    height: 60,
    backgroundColor: Colors.white || "#FFF", // Fallback color
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border || "#E2E8F0", // Fallback color
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 11,
    color: "#333333",
    textAlign: "center",
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border || "#E2E8F0", // Fallback color
    backgroundColor: Colors.white || "#FFF", // Fallback color
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textMain || "#333", // Fallback color
  },
  closeButton: {
    padding: 5,
  },
  modalGrid: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});