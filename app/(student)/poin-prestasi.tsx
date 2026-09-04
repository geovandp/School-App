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

// --- DATA DUMMY POIN & PRESTASI ---
const POIN_DATA = {
  semester: {
    prestasi: 25,
    pelanggaran: 5,
    history: [
      {
        id: "1",
        title: "Membantu Membersihkan Kelas",
        type: "plus",
        points: 5,
        category: "PEMBIASAAN",
        date: "12 Ags 2026",
        note: "Inisiatif menyapu kelas yang kotor setelah jam pelajaran selesai.",
      },
      {
        id: "2",
        title: "Terlambat Masuk Kelas",
        type: "minus",
        points: 5,
        category: "KEDISIPLINAN",
        date: "11 Ags 2026",
        note: "Terlambat 15 menit pada jam pertama (Matematika).",
      },
      {
        id: "3",
        title: "Juara 2 Lomba Pidato Tingkat Kota",
        type: "plus",
        points: 20,
        category: "PRESTASI",
        date: "02 Ags 2026",
        note: "Mewakili sekolah dalam lomba pidato kebangsaan.",
      },
    ],
  },
  all_time: {
    prestasi: 85,
    pelanggaran: 15,
    history: [
      {
        id: "1",
        title: "Membantu Membersihkan Kelas",
        type: "plus",
        points: 5,
        category: "PEMBIASAAN",
        date: "12 Ags 2026",
        note: "Inisiatif menyapu kelas yang kotor setelah jam pelajaran selesai.",
      },
      {
        id: "2",
        title: "Terlambat Masuk Kelas",
        type: "minus",
        points: 5,
        category: "KEDISIPLINAN",
        date: "11 Ags 2026",
        note: "Terlambat 15 menit pada jam pertama (Matematika).",
      },
      {
        id: "3",
        title: "Juara 2 Lomba Pidato Tingkat Kota",
        type: "plus",
        points: 20,
        category: "PRESTASI",
        date: "02 Ags 2026",
        note: "Mewakili sekolah dalam lomba pidato kebangsaan.",
      },
      {
        id: "4",
        title: "Tidak Mengumpulkan Tugas",
        type: "minus",
        points: 10,
        category: "AKADEMIK",
        date: "15 Mei 2025",
        note: "Tugas Sejarah Kemerdekaan tidak dikumpulkan hingga batas waktu akhir semester.",
      },
      {
        id: "5",
        title: "Peserta Olimpiade Sains Nasional",
        type: "plus",
        points: 60,
        category: "PRESTASI",
        date: "10 Mar 2025",
        note: "Berhasil lolos seleksi tingkat provinsi.",
      },
    ],
  },
};

export default function PoinScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"semester" | "all_time">(
    "semester",
  );

  const currentData = POIN_DATA[activeTab];
  const finalScore = 100 - currentData.pelanggaran;

  // Penyesuaian warna ikon agar tetap kontras di atas kotak putih (bukan langsung di atas hijau)
  const getScoreStatus = (score: number) => {
    if (score >= 90)
      return {
        label: "Sangat Baik",
        iconColor: "#10B981",
        icon: "shield-check",
      };
    if (score >= 75)
      return { label: "Baik", iconColor: "#3B82F6", icon: "shield-half-full" };
    if (score >= 60)
      return { label: "Cukup", iconColor: "#F59E0B", icon: "shield-alert" };
    return { label: "Peringatan", iconColor: "#EF4444", icon: "shield-remove" };
  };

  const statusInfo = getScoreStatus(finalScore);

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
          <Text style={styles.headerTitle}>Poin & Prestasi</Text>
          <Text style={styles.headerSubtitle}>
            Akumulasi nilai karakter siswa
          </Text>
        </View>
      </View>

      {/* --- FLOATING PILL TABS --- */}
      <View style={styles.tabContainer}>
        <View style={styles.tabBackground}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "semester" && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab("semester")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "semester" && styles.tabTextActive,
              ]}
            >
              Semester Ini
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "all_time" && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab("all_time")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "all_time" && styles.tabTextActive,
              ]}
            >
              Seluruh Waktu
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* --- SUMMARY CARD DENGAN TEMA APLIKASI (HIJAU) --- */}
        <LinearGradient
          colors={["#3B8312", "#2A630D"]} // Menggunakan gradien hijau yang sama persis dengan Absensi & Nilai
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.summaryCard}
        >
          <View style={styles.summaryTop}>
            <View>
              <Text style={styles.summaryLabel}>NILAI KEDISIPLINAN AKHIR</Text>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreValue}>{finalScore}</Text>
                {/* Teks status diubah menjadi putih agak transparan agar menyatu dengan background hijau */}
                <Text style={styles.scoreStatus}> / {statusInfo.label}</Text>
              </View>
            </View>

            {/* Ikon diletakkan di dalam kotak putih murni agar warnanya (Merah/Kuning/Biru/Hijau) tidak tabrakan dengan latar hijau */}
            <View style={styles.shieldIconBox}>
              <MaterialCommunityIcons
                name={statusInfo.icon as any}
                size={32}
                color={statusInfo.iconColor}
              />
            </View>
          </View>

          <Text style={styles.summaryDescription}>
            Skor standar adalah 100 dan hanya dikurangi oleh poin pelanggaran.
            Kumpulkan prestasi untuk mendapatkan penghargaan khusus di akhir
            semester!
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <View style={styles.statBoxHeader}>
                <MaterialCommunityIcons
                  name="star-shooting"
                  size={18}
                  color="#FFFF"
                />
                <Text style={[styles.statBoxTitle, { color: "#FFFF" }]}>
                  TOTAL PRESTASI
                </Text>
              </View>
              <Text style={styles.statBoxValue}>+{currentData.prestasi}</Text>
            </View>

            <View style={styles.statBox}>
              <View style={styles.statBoxHeader}>
                <MaterialCommunityIcons
                  name="alert-octagon"
                  size={18}
                  color="#FF0000"
                />
                <Text style={[styles.statBoxTitle, { color: "#FF0000" }]}>
                  PELANGGARAN
                </Text>
              </View>
              <Text style={styles.statBoxValue}>
                -{currentData.pelanggaran}
              </Text>
            </View>
          </View>
        </LinearGradient>

        <Text style={styles.sectionTitle}>RIWAYAT AKTIVITAS</Text>

        {/* --- MODERN HISTORY LIST --- */}
        <View style={styles.historyList}>
          {currentData.history.map((item) => {
            const isPlus = item.type === "plus";
            const themeColor = isPlus ? "#10B981" : "#EF4444";
            const bgLight = isPlus ? "#F0FDF4" : "#FEF2F2";

            return (
              <View
                key={item.id}
                style={[styles.historyCard, { borderLeftColor: themeColor }]}
              >
                <View style={styles.historyHeader}>
                  <View style={styles.historyTitleBox}>
                    <Text style={styles.historyTitle}>{item.title}</Text>
                    <View style={styles.tagRow}>
                      <View
                        style={[
                          styles.categoryTag,
                          { backgroundColor: bgLight },
                        ]}
                      >
                        <Text
                          style={[
                            styles.categoryTagText,
                            { color: themeColor },
                          ]}
                        >
                          {item.category}
                        </Text>
                      </View>
                      <MaterialCommunityIcons
                        name="circle-small"
                        size={14}
                        color="#CBD5E1"
                      />
                      <Text style={styles.dateText}>{item.date}</Text>
                    </View>
                  </View>

                  <View
                    style={[styles.pointBadge, { backgroundColor: themeColor }]}
                  >
                    <Text style={styles.historyPoints}>
                      {isPlus ? "+" : "-"}
                      {item.points}
                    </Text>
                  </View>
                </View>

                {item.note && (
                  <View style={styles.noteBubble}>
                    <MaterialCommunityIcons
                      name="format-quote-open"
                      size={20}
                      color="#94A3B8"
                      style={styles.quoteIcon}
                    />
                    <View style={styles.noteContent}>
                      <Text style={styles.noteLabel}>Catatan Pembimbing:</Text>
                      <Text style={styles.noteText}>{item.note}</Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
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
  },
  backButton: { marginRight: 15, padding: 5 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#1E293B" },
  headerSubtitle: { fontSize: 13, color: "#64748B", marginTop: 2 },

  tabContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  tabBackground: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    padding: 6,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
  },
  tabButtonActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  tabText: { fontSize: 13, fontWeight: "700", color: "#64748B" },
  tabTextActive: { color: Colors.primary },

  contentContainer: { padding: 20, paddingBottom: 40 },

  // --- KARTU RINGKASAN SESUAI TEMA APLIKASI ---
  summaryCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 30,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  summaryTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  summaryLabel: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  scoreRow: { flexDirection: "row", alignItems: "baseline" },
  scoreValue: { color: "#FFFFFF", fontSize: 48, fontWeight: "900" },
  scoreStatus: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 6,
    color: "rgba(255,255,255,0.9)",
  }, // Putih agar menyatu

  shieldIconBox: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: "#FFFFFF", // Kotak putih murni
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  summaryDescription: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 25,
  },

  statsRow: { flexDirection: "row", justifyContent: "space-between", gap: 15 },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  statBoxHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  // Warna pastel kuning dan merah muda agar tetap terbaca jelas di atas hijau
  statBoxTitle: {
    fontSize: 11,
    fontWeight: "800",
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  statBoxValue: { fontSize: 26, fontWeight: "900", color: "#FFFFFF" },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#64748B",
    marginBottom: 16,
    letterSpacing: 1,
  },

  historyList: { gap: 16 },
  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    borderLeftWidth: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  historyTitleBox: { flex: 1, paddingRight: 15 },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
    lineHeight: 22,
  },

  tagRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  categoryTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  categoryTagText: { fontSize: 10, fontWeight: "bold", letterSpacing: 0.5 },
  dateText: { fontSize: 12, color: "#94A3B8", fontWeight: "500" },

  pointBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  historyPoints: { fontSize: 16, fontWeight: "900", color: "#FFFFFF" },

  noteBubble: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    padding: 14,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  quoteIcon: { marginRight: 10, marginTop: 2 },
  noteContent: { flex: 1 },
  noteLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#64748B",
    marginBottom: 4,
  },
  noteText: { fontSize: 14, color: "#475569", lineHeight: 22 },
});
