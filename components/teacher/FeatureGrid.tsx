import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// 7 Fitur Utama + 1 Tombol Lainnya
const mainFeatures = [
  {
    id: 1,
    title: "Jadwal\nPelajaran",
    icon: "calendar",
    color: "#9BF6FF", // Biru pastel
  },
  { 
    id: 2, 
    title: "Tugas", 
    icon: "clipboard-list-outline", 
    color: "#FDFFB6" // Kuning pastel
  },
  {
    id: 3,
    title: "Pembiasaan",
    icon: "clipboard-text-clock-outline",
    color: "#CAFFBF", // Hijau muda pastel
  },
  {
    id: 4,
    title: "Nilai\nSiswa",
    icon: "card-bulleted-outline",
    color: "#FFADAD", // Pink pastel
  },
  {
    id: 5,
    title: "Kalender\nAkademik",
    icon: "calendar-month-outline",
    color: "#A0E8AF", // Hijau pastel
  },
  {
    id: 6,
    title: "Info",
    icon: "bullhorn-outline",
    color: "#FFC6FF", // Pink magenta pastel
  },
  {
    id: 7,
    title: "Ekstra",
    icon: "account-group-outline",
    color: "#E4D4FF", // Ungu pastel
  },
  {
    id: 8,
    title: "Lainnya",
    icon: "dots-grid", // Tombol pemicu modal
    color: "#FFD166", // Kuning tua pastel
  },
];

// Fitur-fitur tambahan yang akan muncul di dalam Modal saat "Lainnya" diklik
const otherFeatures = [
  { id: 9, title: "Presensi Siswa", icon: "qrcode-scan", color: "#9BF6FF" },
  { id: 10, title: "Tanya Anise", icon: "robot-outline", color: "#FDFFB6" },
  { id: 11, title: "Poin & Prestasi", icon: "trophy-award", color: "#CAFFBF" },
  { id: 12, title: "Pelaporan Kode Etik", icon: "shield-alert-outline", color: "#FFADAD" },
  { id: 13, title: "Pelaporan Kode Etik", icon: "shield-alert-outline", color: "#FFADAD" },
  { id: 14, title: "Pelaporan Kode Etik", icon: "shield-alert-outline", color: "#FFADAD" },
  { id: 15, title: "Pelaporan Kode Etik", icon: "shield-alert-outline", color: "#FFADAD" },
  { id: 16, title: "Pelaporan Kode Etik", icon: "shield-alert-outline", color: "#FFADAD" },
  { id: 17, title: "Pelaporan Kode Etik", icon: "shield-alert-outline", color: "#FFADAD" },
  { id: 18, title: "Pelaporan Kode Etik", icon: "shield-alert-outline", color: "#FFADAD" },
];

export default function TeacherFeatureGrid() {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = (id: number, title: string) => {
    if (id === 8) {
      // Jika tombol "Lainnya" ditekan, buka modal
      setModalVisible(true);
    } else {
      console.log(`Menu ${title} diklik`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Menu Utama</Text>
      
      {/* Grid Utama (8 Menu) */}
      <View style={styles.grid}>
        {mainFeatures.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.featureCard, { backgroundColor: item.color }]}
            activeOpacity={0.8}
            onPress={() => handlePress(item.id, item.title)}
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

      {/* Modal Popup untuk Fitur Lainnya (Gaya Neo-Brutalism) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            {/* Header Modal */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Menu Lainnya</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <MaterialCommunityIcons name="close" size={20} color="#000" />
              </TouchableOpacity>
            </View>

            {/* List Fitur Tambahan */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalGrid}>
                {otherFeatures.map((item) => (
                  <TouchableOpacity 
                    key={item.id} 
                    style={[styles.featureCard, { backgroundColor: item.color }]}
                    activeOpacity={0.8}
                    onPress={() => {
                      console.log(`Menu tambahan ${item.title} diklik`);
                      setModalVisible(false);
                    }}
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
            </ScrollView>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },
  featureCard: {
    width: "23%", // 4 kolom per baris
    minHeight: 88,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#000",
    
    // Solid Shadow Neo-Brutalism
    shadowColor: "#000",
    shadowOffset: { width: 2.5, height: 2.5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
    
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconBox: {
    backgroundColor: "#FFF",
    padding: 7,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#000",
  },
  featureTitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#000",
    textAlign: "center",
    lineHeight: 12,
  },

  // Styling untuk Modal Neo-Brutalism
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background trans gelap di belakang modal
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxHeight: "70%",
    backgroundColor: "#FDFBF7", // Warna krem khas tema
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#000",
    padding: 20,
    
    // Solid Shadow untuk Modal
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000",
  },
  closeButton: {
    backgroundColor: "#FFADAD",
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  modalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 8, // Jarak antar card di dalam modal
    paddingBottom: 10,
  },
});