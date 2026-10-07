import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  DimensionValue,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/Colors";

// --- DATA DUMMY KPI SISWA ---
const KPI_DATA = {
  overallScore: 88.5,
  status: "Sangat Memuaskan",
  metrics: [
    {
      id: "1",
      title: "Kehadiran (Absensi)",
      score: "96%",
      percentage: 96, // Persentase untuk width
      detail: "Hadir 48 / 50 Hari",
      status: "Baik",
      icon: "account-check-outline",
      color: "#10B981",
      bg: "#F0FDF4",
    },
    {
      id: "2",
      title: "Pengumpulan Tugas",
      score: "85%",
      percentage: 85, // Persentase untuk width
      detail: "17 dari 20 Tugas Tepat Waktu",
      status: "Cukup",
      icon: "file-document-check-outline",
      color: "#3B82F6",
      bg: "#EFF6FF",
    },
    {
      id: "3",
      title: "Poin Pembiasaan & Karakter",
      score: "95 / 100",
      percentage: 95, // Persentase untuk width
      detail: "Minim Pelanggaran",
      status: "Sangat Baik",
      icon: "shield-star-outline",
      color: "#F59E0B",
      bg: "#FEF3C7",
    },
    {
      id: "4",
      title: "Keaktifan Ekstrakurikuler",
      score: "90%",
      percentage: 90, // Persentase untuk width
      detail: "Kehadiran Ekskul Rutin",
      status: "Baik",
      icon: "run-fast",
      color: "#8B5CF6",
      bg: "#F5F3FF",
    },
  ],
  weeklyTrend: [
    { week: "Minggu 1", score: 82 },
    { week: "Minggu 2", score: 85 },
    { week: "Minggu 3", score: 86 },
    { week: "Minggu 4", score: 88.5 },
  ],
};

export default function KpiScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
          <MaterialCommunityIcons name="arrow-left" size={28} color="#1E293B" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Performa Kinerja (KPI)</Text>
          <Text style={styles.headerSubtitle}>
            Evaluasi dan indikator mandiri siswa
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* --- MAIN SUMMARY CARD --- */}
        <LinearGradient
          colors={["#3B8312", "#2A630D"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.summaryCard}
        >
          <View style={styles.summaryTop}>
            <View>
              <Text style={styles.summaryLabel}>SKOR KINERJA KESELURUHAN</Text>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreValue}>{KPI_DATA.overallScore}</Text>
                <Text style={styles.scoreMax}> / 100</Text>
              </View>
            </View>
            <View style={styles.trophyIconBox}>
              <MaterialCommunityIcons
                name="trophy-award"
                size={32}
                color="#FDE047"
              />
            </View>
          </View>

          <View style={styles.statusPill}>
            <MaterialCommunityIcons
              name="check-circle"
              size={16}
              color="#4ADE80"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.statusPillText}>Status: {KPI_DATA.status}</Text>
          </View>

          <Text style={styles.summaryDescription}>
            Skor ini diakumulasikan secara otomatis berdasarkan kehadiran,
            tingkat kepatuhan pengumpulan tugas, dan catatan kedisiplinan Anda
            semester ini.
          </Text>
        </LinearGradient>

        {/* --- SECTION TITLE --- */}
        <Text style={styles.sectionTitle}>RINCIAN INDIKATOR KINERJA</Text>

        {/* --- METRICS LIST --- */}
        <View style={styles.metricsList}>
          {KPI_DATA.metrics.map((item) => {
            // Konversi lebar ke DimensionValue agar TypeScript tidak complain
            const progressWidth: DimensionValue = `${item.percentage}%`;

            return (
              <View key={item.id} style={styles.metricCard}>
                <View
                  style={[styles.metricIconBox, { backgroundColor: item.bg }]}
                >
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={26}
                    color={item.color}
                  />
                </View>

                <View style={styles.metricContent}>
                  <View style={styles.metricHeaderRow}>
                    <Text style={styles.metricTitle}>{item.title}</Text>
                    <Text style={[styles.metricScore, { color: item.color }]}>
                      {item.score}
                    </Text>
                  </View>
                  <Text style={styles.metricDetail}>{item.detail}</Text>

                  <View style={styles.miniStatusBar}>
                    {/* Menggunakan progressWidth bertipe DimensionValue */}
                    <View
                      style={[
                        styles.miniStatusFill,
                        { width: progressWidth, backgroundColor: item.color },
                      ]}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* --- TREND KINERJA MINGGUAN --- */}
        <Text style={[styles.sectionTitle, { marginTop: 25 }]}>
          TREN PERFORMA BULAN INI
        </Text>
        <View style={styles.trendCard}>
          <View style={styles.trendHeader}>
            <MaterialCommunityIcons
              name="chart-line-variant"
              size={20}
              color={Colors.primary}
            />
            <Text style={styles.trendTitle}>Grafik Peningkatan Kinerja</Text>
          </View>

          <View style={styles.trendBarsRow}>
            {KPI_DATA.weeklyTrend.map((trend, index) => {
              const barHeight: DimensionValue = `${trend.score}%`;

              return (
                <View key={index} style={styles.trendBarItem}>
                  <Text style={styles.trendBarValue}>{trend.score}</Text>
                  <View style={styles.trendBarBg}>
                    <View
                      style={[styles.trendBarFill, { height: barHeight }]}
                    />
                  </View>
                  <Text style={styles.trendBarLabel}>{trend.week}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backButton: { marginRight: 15, padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#1E293B" },
  headerSubtitle: { fontSize: 12, color: "#64748B", marginTop: 2 },

  contentContainer: { padding: 20, paddingBottom: 40 },

  summaryCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 25,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  summaryTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  summaryLabel: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  scoreRow: { flexDirection: "row", alignItems: "baseline" },
  scoreValue: { color: "#FFFFFF", fontSize: 44, fontWeight: "900" },
  scoreMax: { fontSize: 16, fontWeight: "600", color: "rgba(255,255,255,0.8)" },
  trophyIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  statusPillText: { color: "#FFFFFF", fontSize: 12, fontWeight: "bold" },

  summaryDescription: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    lineHeight: 18,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#64748B",
    marginBottom: 14,
    letterSpacing: 0.8,
  },

  metricsList: { gap: 14 },
  metricCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    alignItems: "center",
  },
  metricIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  metricContent: { flex: 1 },
  metricHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  metricTitle: { fontSize: 14, fontWeight: "bold", color: "#1E293B" },
  metricScore: { fontSize: 15, fontWeight: "900" },
  metricDetail: { fontSize: 12, color: "#64748B", marginBottom: 8 },

  miniStatusBar: {
    height: 5,
    backgroundColor: "#F1F5F9",
    borderRadius: 3,
    overflow: "hidden",
  },
  miniStatusFill: { height: "100%", borderRadius: 3 },

  trendCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  trendHeader: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  trendTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E293B",
    marginLeft: 8,
  },
  trendBarsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 130,
    paddingTop: 10,
  },
  trendBarItem: { alignItems: "center", flex: 1 },
  trendBarValue: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#64748B",
    marginBottom: 6,
  },
  trendBarBg: {
    width: 24,
    height: 90,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  trendBarFill: {
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 12,
  },
  trendBarLabel: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "600",
    marginTop: 8,
  },
});
