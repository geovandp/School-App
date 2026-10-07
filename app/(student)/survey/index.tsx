import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../../constants/Colors";

// --- DATA DUMMY GURU SEMESTER INI ---
const TEACHERS_LIST = [
  {
    id: "G001",
    name: "Bpk. Sudirman, S.Pd., M.Si.",
    subject: "Matematika Wajib",
    status: "pending",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: "G002",
    name: "Ibu Ningsih, M.Pd.",
    subject: "Bahasa Indonesia",
    status: "completed",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: "G003",
    name: "Bpk. Anwar, S.Kom.",
    subject: "Informatika",
    status: "pending",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

export default function SurveiListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.mainWrapper, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={28} color="#1E293B" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Pengisian Survey Guru</Text>
          <Text style={styles.headerSubtitle}>Silahkan pilih guru untuk dinilai</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {TEACHERS_LIST.map((teacher) => {
          const isCompleted = teacher.status === "completed";
          return (
            <View
              key={teacher.id}
              style={[
                styles.teacherCard,
                isCompleted && styles.teacherCardCompleted,
              ]}
            >
              <Image
                source={{ uri: teacher.image }}
                style={styles.teacherImage}
              />

              <View style={styles.teacherInfo}>
                <Text style={styles.teacherName}>{teacher.name}</Text>
                <Text style={styles.subjectText}>{teacher.subject}</Text>

                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: isCompleted ? "#D1FAE5" : "#FEF3C7" },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: isCompleted ? "#059669" : "#D97706" },
                    ]}
                  >
                    {isCompleted ? "Sudah Dinilai" : "Belum Dinilai"}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  { backgroundColor: isCompleted ? "#F1F5F9" : Colors.primary },
                ]}
                disabled={isCompleted}
                onPress={() => {
                  router.push({
                    pathname: "/(student)/survey/[id]",
                    params: {
                      id: teacher.id,
                      name: teacher.name,
                      subject: teacher.subject,
                    },
                  });
                }}
              >
                <MaterialCommunityIcons
                  name={isCompleted ? "check-all" : "pencil-outline"}
                  size={20}
                  color={isCompleted ? "#94A3B8" : "#FFFFFF"}
                />
              </TouchableOpacity>
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
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 18, fontWeight: "900", color: "#1E293B" },
  headerSubtitle: { fontSize: 12, color: "#64748B" },
  contentContainer: { padding: 20 },
  infoBanner: {
    flexDirection: "row",
    backgroundColor: "#ECFDF5",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: "#065F46",
    marginLeft: 10,
    lineHeight: 18,
  },
  teacherCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  teacherCardCompleted: { opacity: 0.7 },
  teacherImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E2E8F0",
  },
  teacherInfo: {
    flex: 1,
    marginLeft: 15,
  },
  teacherName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1E293B",
},
  subjectText: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 6
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "bold",
},
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
