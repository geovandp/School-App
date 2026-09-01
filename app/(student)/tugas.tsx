import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";

// --- DATA DUMMY TUGAS ---
const ASSIGNMENTS = [
  {
    id: "1",
    title: "Latihan Soal Trigonometri",
    subject: "Matematika Lanjutan",
    deadline: "1 Sep 2026 • 23:59",
    status: "pending", // Belum dikerjakan
  },
  {
    id: "2",
    title: "Makalah Sejarah Kemerdekaan",
    subject: "Sejarah",
    deadline: "28 Aug 2026 • 12:00",
    status: "submitted", // Sudah dikumpulkan
  },
  {
    id: "3",
    title: "Praktikum Enzim Pencernaan",
    subject: "Biologi Umum",
    deadline: "30 Aug 2026 • 10:00",
    status: "late", // Terlambat
  },
  {
    id: "4",
    title: "Reading Comprehension Chapter 3",
    subject: "Bahasa Inggris",
    deadline: "5 Sep 2026 • 23:59",
    status: "pending",
  },
];

export default function AssignmentScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Fungsi pembantu untuk menentukan warna dan teks badge berdasarkan status
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "submitted":
        return {
          bgColor: "#ECFDF5", // Hijau muda
          textColor: "#10B981", // Hijau tua
          borderColor: "#10B981",
          text: "SUDAH DIKUMPULKAN",
          icon: "check-circle",
        };
      case "late":
        return {
          bgColor: "#FEF2F2", // Merah muda
          textColor: "#EF4444", // Merah tua
          borderColor: "#EF4444",
          text: "TERLAMBAT",
          icon: "alert-circle",
        };
      case "pending":
      default:
        return {
          bgColor: "#FEFCE8", // Kuning muda
          textColor: "#EAB308", // Kuning tua
          borderColor: "#EAB308",
          text: "BELUM DIKERJAKAN",
          icon: "clock-outline",
        };
    }
  };

  return (
    <View
      style={[
        styles.mainWrapper,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="arrow-left" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Tugas Siswa</Text>
          <Text style={styles.headerSubtitle}>Daftar Deadline Tugas</Text>
        </View>
      </View>

      {/* --- DAFTAR TUGAS --- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      >
        {ASSIGNMENTS.map((item) => {
          const statusConfig = getStatusStyle(item.status);

          return (
            <View
              key={item.id}
              style={[
                styles.card,
                { borderLeftColor: statusConfig.borderColor },
              ]}
            >
              {/* Baris Atas: Mata Pelajaran & Badge Status */}
              <View style={styles.cardHeader}>
                <Text style={styles.subjectText}>{item.subject}</Text>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: statusConfig.bgColor },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      { color: statusConfig.textColor },
                    ]}
                  >
                    {statusConfig.text}
                  </Text>
                </View>
              </View>

              {/* Judul Tugas */}
              <Text style={styles.titleText}>{item.title}</Text>

              {/* Baris Bawah: Deadline */}
              <View style={styles.deadlineRow}>
                <MaterialCommunityIcons
                  name={statusConfig.icon as any}
                  size={16}
                  color={statusConfig.textColor}
                />
                <Text
                  style={[
                    styles.deadlineText,
                    { color: statusConfig.textColor },
                  ]}
                >
                  Tenggat: {item.deadline}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 2,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 6, // Garis warna di sebelah kiri kartu
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  subjectText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    flex: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  deadlineRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  deadlineText: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },
});
