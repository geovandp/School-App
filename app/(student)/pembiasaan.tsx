import React, { useState } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/Colors";

// --- DATA AWAL 7 PEMBIASAAN ---
const INITIAL_HABITS = [
  {
    id: "1",
    title: "Bangun Pagi",
    subtitle: "Sebelum jam 05:00",
    icon: "weather-sunset-up",
    color: "#F59E0B",
    points: 2,
    completed: false,
  },
  {
    id: "2",
    title: "Beribadah",
    subtitle: "Sesuai agama masing-masing",
    icon: "star-shooting",
    color: "#10B981",
    points: 2,
    completed: false,
  },
  {
    id: "3",
    title: "Berolahraga",
    subtitle: "Minimal 15 menit",
    icon: "basketball",
    color: "#EF4444",
    points: 2,
    completed: false,
  },
  {
    id: "4",
    title: "Makan Sehat & Bergizi",
    subtitle: "Sayur, lauk, dan buah",
    icon: "silverware-fork-knife",
    color: "#3B82F6",
    points: 2,
    completed: false,
  },
  {
    id: "5",
    title: "Gemar Belajar",
    subtitle: "Membaca atau mengulang materi",
    icon: "book-open-page-variant",
    color: "#8B5CF6",
    points: 2,
    completed: false,
  },
  {
    id: "6",
    title: "Bermasyarakat",
    subtitle: "Bersosialisasi & berbuat baik",
    icon: "human-greeting-proximity",
    color: "#14B8A6",
    points: 2,
    completed: false,
  },
  {
    id: "7",
    title: "Tidur Cepat",
    subtitle: "Maksimal jam 22:00",
    icon: "weather-night",
    color: "#6366F1",
    points: 2,
    completed: false,
  },
];

export default function PembiasaanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("hari_ini");
  const [habits, setHabits] = useState(INITIAL_HABITS);
  const completedCount = habits.filter((h) => h.completed).length;
  const progressPercentage = (completedCount / habits.length) * 100;

  // Fungsi toggle checkbox
  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit,
      ),
    );
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
          <Text style={styles.headerTitle}>Pembiasaan</Text>
          <Text style={styles.headerSubtitle}>
            Track 7 Karakter Unggul Harian
          </Text>
        </View>
      </View>

      {/* --- TAB SWITCHER (Desain Baru: Underline) --- */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "hari_ini" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("hari_ini")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "hari_ini" && styles.tabTextActive,
            ]}
          >
            Hari Ini
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "rekap" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("rekap")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "rekap" && styles.tabTextActive,
            ]}
          >
            Rekap Bulan Ini
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* --- PROGRESS CARD (Desain Baru: Linear Gradient) --- */}
        <LinearGradient
          colors={["#3B8312", "#2A630D"]} // Menggunakan tema hijau aplikasi
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.progressCard}
        >
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressLabel}>PROGRES HARI INI</Text>
              <View style={styles.progressTextRow}>
                <Text style={styles.progressValue}>{completedCount}</Text>
                <Text style={styles.progressTotal}> / 7 Selesai</Text>
              </View>
            </View>
            <View style={styles.flameIconWrapper}>
              <MaterialCommunityIcons name="fire" size={28} color="#F59E0B" />
            </View>
          </View>

          {/* Progress Bar Track */}
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${progressPercentage}%` },
              ]}
            />
          </View>

          <Text style={styles.motivationalText}>
            {completedCount === 7
              ? "Luar biasa! Semua pembiasaan selesai hari ini! 🎉"
              : "Ayo selesaikan pembiasaanmu hari ini! 💪"}
          </Text>
        </LinearGradient>

        {/* --- HABIT LIST --- */}
        <View style={styles.listContainer}>
          {habits.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.habitCard,
                item.completed && styles.habitCardCompleted,
              ]}
              activeOpacity={0.8}
              onPress={() => toggleHabit(item.id)}
            >
              {/* Icon Box */}
              <View
                style={[styles.iconBox, { backgroundColor: `${item.color}15` }]}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={24}
                  color={item.color}
                />
              </View>

              {/* Text Info */}
              <View style={styles.habitInfo}>
                <Text
                  style={[
                    styles.habitTitle,
                    item.completed && styles.textCompleted,
                  ]}
                >
                  {item.title}
                </Text>
                <Text style={styles.habitSubtitle}>{item.subtitle}</Text>
              </View>

              {/* Points & Checkbox */}
              <View style={styles.actionSection}>
                <View style={styles.pointsBadge}>
                  <MaterialCommunityIcons
                    name="fire"
                    size={14}
                    color="#F59E0B"
                  />
                  <Text style={styles.pointsText}>{item.points}</Text>
                </View>

                <View
                  style={[
                    styles.checkbox,
                    item.completed && styles.checkboxActive,
                  ]}
                >
                  {item.completed && (
                    <MaterialCommunityIcons
                      name="check"
                      size={18}
                      color="#FFFFFF"
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  },
  backButton: { marginRight: 15, padding: 5 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#1A1A1A" },
  headerSubtitle: { fontSize: 13, color: "#8E8E93", marginTop: 2 },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    paddingHorizontal: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabButtonActive: {
    borderBottomColor: Colors.primary, // Garis bawah hijau
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8E8E93",
  },
  tabTextActive: {
    color: Colors.primary,
  },

  scrollContent: { padding: 20, paddingBottom: 50 },

  progressCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  progressLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 5,
  },
  progressTextRow: { flexDirection: "row", alignItems: "baseline" },
  progressValue: { color: "#FFFFFF", fontSize: 32, fontWeight: "bold" },
  progressTotal: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
    fontWeight: "600",
  },
  flameIconWrapper: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 15,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FCD34D",
    borderRadius: 4,
  }, // Warna kuning cerah untuk bar
  motivationalText: { color: "#FFFFFF", fontSize: 13, fontWeight: "500" },

  listContainer: { gap: 12 },
  habitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  habitCardCompleted: {
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  habitInfo: { flex: 1 },
  habitTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  textCompleted: { color: "#94A3B8", textDecorationLine: "line-through" },
  habitSubtitle: { fontSize: 12, color: "#64748B" },

  actionSection: { flexDirection: "row", alignItems: "center" },
  pointsBadge: { flexDirection: "row", alignItems: "center", marginRight: 15 },
  pointsText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#F59E0B",
    marginLeft: 4,
  },

  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  checkboxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
});
