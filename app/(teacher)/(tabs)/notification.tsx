import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// 1. Tipe Data Materi
type MateriItem = {
  id: string;
  mapel: string;
  kelas: string;
  hari: string;
  waktu: string;
  judulMateri: string;
  status: "Selesai" | "Belum Diajarkan";
};

// 2. Data Dummy Materi Minggu Ini (Warna spesifik dihilangkan dari data, diatur di UI)
const dummyMateri: MateriItem[] = [
  {
    id: "1",
    mapel: "Matematika Lanjut",
    kelas: "11-A",
    hari: "Senin, 14 Sep",
    waktu: "08:00 - 09:30",
    judulMateri: "Turunan Fungsi Aljabar",
    status: "Selesai",
  },
  {
    id: "2",
    mapel: "Fisika Dasar",
    kelas: "10-C",
    hari: "Rabu, 16 Sep",
    waktu: "10:00 - 11:30",
    judulMateri: "Hukum Newton I, II, dan III",
    status: "Belum Diajarkan",
  },
  {
    id: "3",
    mapel: "Matematika Wajib",
    kelas: "10-B",
    hari: "Kamis, 17 Sep",
    waktu: "07:15 - 08:45",
    judulMateri: "Sistem Persamaan Linear Dua Variabel",
    status: "Belum Diajarkan",
  },
  {
    id: "4",
    mapel: "Fisika Dasar",
    kelas: "10-A",
    hari: "Jumat, 18 Sep",
    waktu: "13:00 - 14:30",
    judulMateri: "Gerak Parabola dan Melingkar",
    status: "Belum Diajarkan",
  },
];

export default function MateriMingguIniPage() {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: MateriItem }) => {
    const isSelesai = item.status === "Selesai";

    return (
      <View style={styles.card}>
        {/* Bagian Atas Card: Kelas dan Waktu */}
        <View style={styles.cardHeader}>
          <View style={styles.badgeKelas}>
            <Text style={styles.badgeKelasText}>Kelas {item.kelas}</Text>
          </View>
          <View style={styles.waktuContainer}>
            <MaterialCommunityIcons name="calendar-month-outline" size={14} color="#64748B" />
            <Text style={styles.waktuText}>
              {item.hari} • {item.waktu}
            </Text>
          </View>
        </View>

        {/* Isi Materi */}
        <Text style={styles.mapelText}>{item.mapel}</Text>
        <Text style={styles.judulText}>{item.judulMateri}</Text>

        {/* Bagian Bawah: Status & Aksi */}
        <View style={styles.cardFooter}>
          <View style={styles.statusContainer}>
            <MaterialCommunityIcons
              name={isSelesai ? "check-decagram" : "clock-outline"}
              size={18}
              color={isSelesai ? "#10B981" : "#F59E0B"} // Emerald vs Amber
            />
            <Text
              style={[
                styles.statusText,
                { color: isSelesai ? "#10B981" : "#F59E0B" },
              ]}
            >
              {item.status}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <MaterialCommunityIcons name="book-open-page-variant-outline" size={16} color="#3B82F6" />
            <Text style={styles.actionButtonText}>Modul</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: Math.max(insets.bottom, 16),
        },
      ]}
    >
      {/* Header Halaman */}
      <View style={styles.pageHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Materi Minggu Ini</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Info Minggu */}
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>14 Sep - 20 Sep 2026</Text>
        <View style={styles.summaryBadge}>
          <Text style={styles.summaryBadgeText}>{dummyMateri.length} Sesi</Text>
        </View>
      </View>

      {/* Daftar Materi */}
      <FlatList
        data={dummyMateri}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Off-white modern
  },
  
  // --- Header ---
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    zIndex: 10,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "center",
    flex: 1,
  },
  
  // --- Sub Header ---
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#334155",
  },
  summaryBadge: {
    backgroundColor: "#EFF6FF", // Blue Soft
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  summaryBadgeText: {
    color: "#3B82F6",
    fontSize: 12,
    fontWeight: "bold",
  },
  
  // --- List & Card ---
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    padding: 16,
    // Soft Shadow
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Ubah ke center agar rata
    marginBottom: 12,
  },
  badgeKelas: {
    backgroundColor: "#F1F5F9", // Slate-100
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeKelasText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#475569",
    letterSpacing: 0.5,
  },
  waktuContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  waktuText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  mapelText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3B82F6", // Primary Blue
    marginBottom: 4,
  },
  judulText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    lineHeight: 26,
    marginBottom: 16,
  },
  
  // --- Card Footer ---
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 12,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF", // Blue Soft
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#3B82F6",
  },
});