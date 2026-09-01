import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

const { width } = Dimensions.get("window");

//DATA SEMUA FITUR
const ALL_FEATURES = [
  {
    id: 1,
    title: "Jadwal\nPelajaran",
    icon: "calendar",
    color: Colors.primary,
  },
  { id: 2, title: "Tugas", icon: "list-box", color: Colors.primary },
  {
    id: 3,
    title: "Pembiasaan",
    icon: "clipboard-text-clock-outline",
    color: Colors.primary,
  },
  {
    id: 4,
    title: "Nilai\nSiswa",
    icon: "card-bulleted-outline",
    color: Colors.primary,
  },
  {
    id: 5,
    title: "Pelaporan\nKode Etik",
    icon: "shield-alert-outline",
    color: Colors.primary,
  },
  {
    id: 6,
    title: "Presensi\nSiswa",
    icon: "qrcode-scan",
    color: Colors.primary,
  },
  {
    id: 7,
    title: "Tanya\nAnise",
    icon: "robot-outline",
    color: Colors.primary,
  },
  {
    id: 8,
    title: "Pengumuman\nSekolah",
    icon: "bullhorn-outline",
    color: Colors.primary,
  },
  {
    id: 9,
    title: "Kalender\nAkademik",
    icon: "calendar-month-outline",
    color: Colors.primary,
  },
  {
    id: 10,
    title: "Ekstrakurikuler",
    icon: "account-group-outline",
    color: Colors.primary,
  },
  {
    id: 11,
    title: "Poin & Prestasi",
    icon: "trophy-award",
    color: Colors.primary,
  },
];

//DATA FITUR UTAMA (Hanya ambil 7 fitur pertama untuk beranda)
const MAIN_FEATURES = ALL_FEATURES.slice(0, 7);

export default function FeatureGrid() {
  // 3. STATE UNTUK MENGONTROL MODAL
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitur Aplikasi</Text>

      {/* === GRID BERANDA UTAMA === */}
      <View style={styles.grid}>
        {MAIN_FEATURES.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            activeOpacity={0.7}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={30}
                color={item.color}/>
            </View>
            <Text style={styles.itemText} numberOfLines={2}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}

        {/* 4. TOMBOL "LAINNYA" (Hardcoded sebagai item ke-8) */}
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)} // Aksi membuka modal
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
        onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView style={styles.modalContainer}>
          {/* Header Modal */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Semua Fitur</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <MaterialCommunityIcons
                name="close"
                size={28}
                color={Colors.textMain}
              />
            </TouchableOpacity>
          </View>

          {/* Isi Semua Fitur */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.grid, styles.modalGrid]}>
              {ALL_FEATURES.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.item}
                  activeOpacity={0.7}
                  onPress={() => {
                    setModalVisible(false);
                    // Tambahkan aksi navigasi Anda di sini nantinya
                  }}
                >
                  <View style={styles.iconBox}>
                    <MaterialCommunityIcons
                      name={item.icon as any}
                      size={30}
                      color={item.color}
                    />
                  </View>
                  <Text style={styles.itemText} numberOfLines={2}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textMain,
    marginBottom: 15,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    
  },
  item: {
    width: "25%",
    alignItems: "center",
    marginBottom: 20,
  },
  iconBox: {
    width: 60,
    height: 60,
    backgroundColor: Colors.white,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
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

  // 5. TAMBAHAN STYLE UNTUK MODAL
  modalContainer: {
    flex: 1,
    backgroundColor: "#FAFAFA", // Bisa diganti Colors.background
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textMain,
  },
  closeButton: {
    padding: 5,
  },
  modalGrid: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
