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
import { Colors } from "@/constants/Colors";

const EXAM_SUBJECTS = [
  {
    id: "EX-01",
    name: "Ujian Tengah Semester - Matematika Wajib",
    duration: "90 Menit",
    status: "available",
    teacher: "Bpk. Sudirman",
  },
  {
    id: "EX-02",
    name: "Ujian Harian - Bahasa Indonesia",
    duration: "60 Menit",
    status: "completed",
    teacher: "Ibu Ningsih",
  },
  {
    id: "EX-03",
    name: "Ujian Akhir Semester - Informatika",
    duration: "120 Menit",
    status: "locked",
    teacher: "Bpk. Anwar",
  },
];

export default function ListUjianScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
        >
          <MaterialCommunityIcons name="arrow-left" size={26} color="#1E293B" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Ujian</Text>
          <Text style={styles.headerSubtitle}>
            Pilih ujian sesuai dengan jadwal.
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.warningBanner}>
          <MaterialCommunityIcons
            name="shield-alert"
            size={22}
            color="#E11D48"
          />
          <Text style={styles.warningText}>
            Perhatian: Mode Ujian Aman (Secure Exam) aktif. Dilarang keluar
            aplikasi atau membuka layar lain selama ujian berlangsung!
          </Text>
        </View>

        {EXAM_SUBJECTS.map((exam) => {
          const isAvailable = exam.status === "available";
          const isCompleted = exam.status === "completed";

          return (
            <View
              key={exam.id}
              style={[styles.examCard, isCompleted && { opacity: 0.7 }]}
            >
              <View style={styles.examIconBox}>
                <MaterialCommunityIcons
                  name={isCompleted ? "check-decagram" : "file-document-edit"}
                  size={26}
                  color={isCompleted ? "#10B981" : "#E11D48"}
                />
              </View>

              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.examTitle}>{exam.name}</Text>
                <Text style={styles.examSub}>
                  Pengampu: {exam.teacher} • {exam.duration}
                </Text>

                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: isCompleted
                        ? "#D1FAE5"
                        : isAvailable
                          ? "#FFE4E6"
                          : "#F1F5F9",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color: isCompleted
                          ? "#059669"
                          : isAvailable
                            ? "#E11D48"
                            : "#64748B",
                      },
                    ]}
                  >
                    {isCompleted
                      ? "Sudah Selesai"
                      : isAvailable
                        ? "Siap Dikerjakan"
                        : "Belum Dimulai"}
                  </Text>
                </View>
              </View>

              {isAvailable && (
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => {
                    router.push({
                      pathname: "/(student)/ujian/ruang-ujian",
                      params: {
                        examTitle: exam.name,
                      },
                    });
                  }}
                >
                  <Text style={styles.startText}>Mulai</Text>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={18}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 18, fontWeight: "900", color: "#1E293B" },
  headerSubtitle: { fontSize: 12, color: "#64748B" },
  contentContainer: { padding: 20 },
  warningBanner: {
    flexDirection: "row",
    backgroundColor: "#FFF1F2",
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FECDD3",
    alignItems: "center",
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: "#9F1239",
    marginLeft: 10,
    lineHeight: 18,
    fontWeight: "500",
  },
  examCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  examIconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#FFF1F2",
    alignItems: "center",
    justifyContent: "center",
  },
  examTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 2,
  },
  examSub: { fontSize: 11, color: "#64748B", marginBottom: 8 },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: { fontSize: 10, fontWeight: "bold" },
  startButton: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginLeft: 8,
  },
  startText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 2,
  },
});
