import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
// 1. Import router dari expo-router
import { router } from "expo-router";

type FeatureItem = {
  id: number;
  title: string;
  icon: string;
  color: string;
  route?: string; // Menyimpan path Expo Router
};

const mainFeatures: FeatureItem[] = [
  {
    id: 1,
    title: "Jadwal\nMengajar",
    icon: "calendar",
    color: "#9BF6FF",
    route: "/page/jadwal_mengajar",
  },
  {
    id: 2,
    title: "Penugasan",
    icon: "clipboard-list-outline",
    color: "#FDFFB6",
    route: "/page/penugasan",
  },
  {
    id: 3,
    title: "Nilai",
    icon: "card-bulleted-outline",
    color: "#FFADAD",
    route: "/page/nilai",
  },
  {
    id: 4,
    title: "Kehadiran\nSiswa",
    icon: "account-check-outline",
    color: "#CAFFBF",
    route: "/page/kehadiran_siswa",
  },
  {
    id: 5,
    title: "Kalender\nAkademik",
    icon: "calendar-month-outline",
    color: "#FFC6FF",
    route: "/page/kalender_akademik",
  },
  {
    id: 6,
    title: "Pembiasaan",
    icon: "clipboard-text-clock-outline",
    color: "#A0E8AF",
    route: "/page/pembiasaan",
  },
  {
    id: 7,
    title: "Info\nSekolah",
    icon: "bullhorn-outline",
    color: "#E4D4FF",
    route: "/page/info",
  },
  {
    id: 8,
    title: "Lainnya",
    icon: "dots-grid",
    color: "#FFD166",
  },
];

const otherFeatures: FeatureItem[] = [
  {
    id: 101,
    title: "Arsip Dokumen",
    icon: "folder-multiple-outline",
    color: "#FFC6FF",
    route: "/page/arsip",
  },
  {
    id: 102,
    title: "Catatan Konseling",
    icon: "account-voice",
    color: "#9BF6FF",
    route: "/page/konseling",
  },
  {
    id: 103,
    title: "Materi Pelajaran",
    icon: "book-open-page-variant-outline",
    color: "#FFD166",
    route: "/page/materi_pelajaran",
  },
  {
    id: 104,
    title: "Ekstrakulikuler",
    icon: "basketball", // Ikon bola/kegiatan luar kelas yang merepresentasikan ekstrakurikuler
    color: "#FDFFB6",
    route: "/page/ekstrakurikuler",
  },
  {
    id: 105,
    title: "Poin & Prestasi",
    icon: "trophy-outline", // Ikon piala untuk prestasi
    color: "#FFADAD",
    route: "/page/prestasi",
  },
  {
    id: 106,
    title: "KPI",
    icon: "chart-box-outline", // Ikon grafik/kinerja untuk KPI
    color: "#E4D4FF",
    route: "/page/kpi",
  },
  {
    id: 107,
    title: "Tanya Anise",
    icon: "headset", // Ikon bantuan / asisten tanya jawab
    color: "#A0E8AF",
    route: "/page/tanya_anise",
  },
];

export default function TeacherFeatureGrid() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleFeaturePress = (item: FeatureItem) => {
    if (item.id === 8) {
      setModalVisible(true);
      return;
    }

    if (modalVisible) {
      setModalVisible(false);
    }

    if (item.route) {
      router.push(item.route as any);
    } else {
      Alert.alert("Info", `Halaman "${item.title.replace("\n", " ")}" belum tersedia.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Menu Utama</Text>

      <View style={styles.grid}>
        {mainFeatures.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.featureCard, { backgroundColor: item.color }]}
            activeOpacity={0.7}
            onPress={() => handleFeaturePress(item)}
          >
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name={item.icon as any} size={22} color="#000" />
            </View>
            <Text style={styles.featureTitle} numberOfLines={2}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal Muncul dari Bawah */}
      <Modal
        animationType="slide" // Diubah dari "fade" menjadi "slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Menu Lainnya</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <MaterialCommunityIcons name="close" size={20} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalGrid}>
                {otherFeatures.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.modalItemCard, { backgroundColor: item.color }]}
                    activeOpacity={0.7}
                    onPress={() => handleFeaturePress(item)}
                  >
                    <View style={styles.iconBox}>
                      <MaterialCommunityIcons name={item.icon as any} size={22} color="#000" />
                    </View>
                    <Text style={styles.modalItemTitle}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "900", color: "#000", marginBottom: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 10 },
  featureCard: {
    width: "23%",
    minHeight: 88,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 2.5, height: 2.5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconBox: { backgroundColor: "#FFF", padding: 7, borderRadius: 10, borderWidth: 1.5, borderColor: "#000" },
  featureTitle: { fontSize: 10, fontWeight: "800", color: "#000", textAlign: "center", lineHeight: 12 },

  // Modal Styling yang diubah agar menempel di bawah
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end", // Posisi menempel ke bawah layar
    alignItems: "center"
  },
  modalContent: {
    width: "100%",
    maxHeight: "75%",
    backgroundColor: "#FDFBF7",
    borderTopLeftRadius: 24, // Membuat sudut atas melengkung
    borderTopRightRadius: 24,
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: "#000",
    padding: 20
  },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16, borderBottomWidth: 2, borderBottomColor: "#000", paddingBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: "900", color: "#000" },
  closeButton: { backgroundColor: "#FFADAD", width: 32, height: 32, borderRadius: 8, borderWidth: 2, borderColor: "#000", justifyContent: "center", alignItems: "center" },

  modalGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 12, paddingBottom: 20 },
  modalItemCard: {
    width: "48%",
    padding: 14,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  modalItemTitle: { fontSize: 13, fontWeight: "800", color: "#000", flex: 1 },
});