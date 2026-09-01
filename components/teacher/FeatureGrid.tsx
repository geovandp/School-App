import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Modal,
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
    route: "/page/jadwal_mengajar", // Path ke (teacher)/page/jadwal_mengajar.tsx
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
    title: "Info",
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

export default function TeacherFeatureGrid() {
  const [modalVisible, setModalVisible] = useState(false);

  // 2. Fungsi Eksekusi Navigasi
  const handleFeaturePress = (item: FeatureItem) => {
    if (item.id === 8) {
      setModalVisible(true);
      return;
    }

    if (modalVisible) {
      setModalVisible(false);
    }

    if (item.route) {
      // Pindah halaman menggunakan Expo Router
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

      {/* Modal */}
      <Modal
        animationType="fade"
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
            {/* Isi modal disesuaikan kebutuhan */}
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
  modalOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "center", alignItems: "center", padding: 20 },
  modalContent: { width: "100%", maxHeight: "70%", backgroundColor: "#FDFBF7", borderRadius: 20, borderWidth: 3, borderColor: "#000", padding: 20 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16, borderBottomWidth: 2, borderBottomColor: "#000", paddingBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: "900", color: "#000" },
  closeButton: { backgroundColor: "#FFADAD", width: 32, height: 32, borderRadius: 8, borderWidth: 2, borderColor: "#000", justifyContent: "center", alignItems: "center" },
});