import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// 1. IMPORT DOCUMENT PICKER
import * as DocumentPicker from "expo-document-picker";
import { Colors } from "../../constants/Colors";

const INITIAL_ASSIGNMENTS = [
  {
    id: "1",
    title: "Latihan Soal Trigonometri",
    subject: "Matematika Lanjutan",
    deadlineDate: "2026-09-01T23:59:00",
    status: "pending",
  },
  {
    id: "2",
    title: "Makalah Sejarah Kemerdekaan",
    subject: "Sejarah",
    deadlineDate: "2026-08-28T12:00:00",
    status: "submitted",
  },
  {
    id: "3",
    title: "Praktikum Enzim Pencernaan",
    subject: "Biologi Umum",
    deadlineDate: "2026-08-30T10:00:00",
    status: "late",
  },
  {
    id: "4",
    title: "Reading Comprehension Chapter 3",
    subject: "Bahasa Inggris",
    deadlineDate: "2026-09-05T23:59:00",
    status: "pending",
  },
];

export default function AssignmentScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);

  const sortedAssignments = [...assignments].sort((a, b) => {
    return (
      new Date(a.deadlineDate).getTime() - new Date(b.deadlineDate).getTime()
    );
  });

  const formatDeadline = (isoString: string) => {
    const dateObj = new Date(isoString);
    const optionsDate: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return `${dateObj.toLocaleDateString("id-ID", optionsDate)} • ${dateObj.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`;
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "submitted":
        return {
          bgColor: "#ECFDF5",
          textColor: "#10B981",
          borderColor: "#10B981",
          text: "SUDAH DIKUMPULKAN",
          icon: "check-circle",
        };
      case "submitted_late":
        return {
          bgColor: "#FFF7ED",
          textColor: "#F97316",
          borderColor: "#F97316",
          text: "DIKUMPULKAN TERLAMBAT",
          icon: "alert-circle-check",
        };
      case "late":
        return {
          bgColor: "#FEF2F2",
          textColor: "#EF4444",
          borderColor: "#EF4444",
          text: "TERLAMBAT",
          icon: "alert-circle",
        };
      case "pending":
      default:
        return {
          bgColor: "#FEFCE8",
          textColor: "#EAB308",
          borderColor: "#EAB308",
          text: "BELUM DIKERJAKAN",
          icon: "clock-outline",
        };
    }
  };

  // 2. FUNGSI UNTUK MEMBUKA PENGELOLA FILE & VALIDASI
  const handleSubmitTask = async (
    taskId: string,
    taskTitle: string,
    currentStatus: string,
  ) => {
    try {
      // Membuka File Picker bawaan HP
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Mengizinkan semua tipe file (gambar, pdf, docx, dll)
        copyToCacheDirectory: true,
      });

      // Jika user menekan tombol "Back" atau batal memilih file
      if (result.canceled) {
        return;
      }

      // Mendapatkan data file yang dipilih
      const file = result.assets[0];
      const fileSizeInMB = (file.size ?? 0) / (1024 * 1024); // Konversi Bytes ke MB

      // Validasi Batas Ukuran 10MB
      if (fileSizeInMB > 10) {
        Alert.alert(
          "Ukuran Terlalu Besar",
          `File "${file.name}" berukuran ${fileSizeInMB.toFixed(1)} MB.\nMaksimal ukuran file adalah 10 MB. Silakan pilih file lain.`,
        );
        return;
      }

      // Konfirmasi Pengumpulan File
      Alert.alert(
        "Konfirmasi Upload",
        `Apakah Anda yakin ingin mengumpulkan file:\n\n📄 ${file.name}\n\nUntuk tugas "${taskTitle}"?`,
        [
          { text: "Batal", style: "cancel" },
          {
            text: "Kumpulkan",
            onPress: () => {
              // Update status di UI
              setAssignments((prevAssignments) =>
                prevAssignments.map((task) => {
                  if (task.id === taskId) {
                    const newStatus =
                      currentStatus === "late" ? "submitted_late" : "submitted";
                    return { ...task, status: newStatus };
                  }
                  return task;
                }),
              );
              Alert.alert("Berhasil!", "File tugas Anda berhasil diunggah.");
            },
          },
        ],
      );
    } catch (error) {
      Alert.alert("Gagal", "Terjadi kesalahan saat membuka pengelola file.");
    }
  };

  return (
    <View
      style={[
        styles.mainWrapper,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
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
          <Text style={styles.headerSubtitle}>Daftar Deadline Tugas Siswa</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      >
        {sortedAssignments.map((item) => {
          const statusConfig = getStatusStyle(item.status);
          const isTaskDone =
            item.status === "submitted" || item.status === "submitted_late";

          return (
            <View
              key={item.id}
              style={[
                styles.card,
                { borderLeftColor: statusConfig.borderColor },
              ]}
            >
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

              <Text style={styles.titleText}>{item.title}</Text>

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
                  Tenggat: {formatDeadline(item.deadlineDate)}
                </Text>
              </View>

              {!isTaskDone && (
                <View style={styles.actionContainer}>
                  <View style={styles.divider} />

                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons
                      name="information-outline"
                      size={14}
                      color="#64748B"
                    />
                    <Text style={styles.infoText}>
                      Mendukung File / Foto (Maks. 10 MB)
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.submitButton,
                      item.status === "late" && styles.submitButtonLate,
                    ]}
                    activeOpacity={0.8}
                    onPress={() =>
                      handleSubmitTask(item.id, item.title, item.status)
                    }
                  >
                    <MaterialCommunityIcons
                      name="cloud-upload-outline"
                      size={18}
                      color="#FFFFFF"
                    />
                    <Text style={styles.submitButtonText}>
                      {item.status === "late"
                        ? "Tetap Kumpulkan"
                        : "Upload File Tugas"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: "#F8F9FA" },
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
  backButton: { marginRight: 15, padding: 5 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#1A1A1A" },
  headerSubtitle: { fontSize: 14, color: "#8E8E93", marginTop: 2 },
  listContainer: { padding: 20, paddingBottom: 40 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 6,
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
  subjectText: { fontSize: 13, fontWeight: "600", color: "#64748B", flex: 1 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 10,
  },
  badgeText: { fontSize: 10, fontWeight: "bold" },
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
  deadlineText: { fontSize: 13, fontWeight: "600", marginLeft: 6 },

  actionContainer: { marginTop: 15 },
  divider: { height: 1, backgroundColor: "#F1F5F9", marginBottom: 10 },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  infoText: {
    fontSize: 12,
    color: "#64748B",
    marginLeft: 6,
    fontWeight: "500",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
  },
  submitButtonLate: { backgroundColor: "#EF4444" },
  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 8,
  },
});
