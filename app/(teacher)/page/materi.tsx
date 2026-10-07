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
  color: string;
};

// 2. Data Dummy Materi Minggu Ini
const dummyMateri: MateriItem[] = [
  {
    id: "1",
    mapel: "Matematika Lanjut",
    kelas: "11-A",
    hari: "Senin, 14 Sep",
    waktu: "08:00 - 09:30",
    judulMateri: "Turunan Fungsi Aljabar",
    status: "Selesai",
    color: "#CAFFBF", // Hijau pastel
  },
  {
    id: "2",
    mapel: "Fisika Dasar",
    kelas: "10-C",
    hari: "Rabu, 16 Sep",
    waktu: "10:00 - 11:30",
    judulMateri: "Hukum Newton I, II, dan III",
    status: "Belum Diajarkan",
    color: "#FDFFB6", // Kuning pastel
  },
  {
    id: "3",
    mapel: "Matematika Wajib",
    kelas: "10-B",
    hari: "Kamis, 17 Sep",
    waktu: "07:15 - 08:45",
    judulMateri: "Sistem Persamaan Linear Dua Variabel",
    status: "Belum Diajarkan",
    color: "#9BF6FF", // Cyan pastel
  },
  {
    id: "4",
    mapel: "Fisika Dasar",
    kelas: "10-A",
    hari: "Jumat, 18 Sep",
    waktu: "13:00 - 14:30",
    judulMateri: "Gerak Parabola dan Melingkar",
    status: "Belum Diajarkan",
    color: "#FFC6FF", // Pink/Ungu pastel
  },
];

export default function MateriMingguIniPage() {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: MateriItem }) => {
    const isSelesai = item.status === "Selesai";

    return (
      <View style={[styles.card, { backgroundColor: item.color }]}>
        {/* Bagian Atas Card: Kelas dan Waktu */}
        <View style={styles.cardHeader}>
          <View style={styles.badgeKelas}>
            <Text style={styles.badgeKelasText}>Kelas {item.kelas}</Text>
          </View>
          <View style={styles.waktuContainer}>
            <MaterialCommunityIcons name="calendar-clock-outline" size={14} color="#555" />
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
              name={isSelesai ? "check-circle" : "clock-outline"}
              size={18}
              color={isSelesai ? "#3B8312" : "#D97706"}
            />
            <Text
              style={[
                styles.statusText,
                { color: isSelesai ? "#3B8312" : "#D97706" },
              ]}
            >
              {item.status}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <MaterialCommunityIcons name="book-open-page-variant" size={16} color="#000" />
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
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
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
    backgroundColor: "#FDFBF7",
  },
  // --- Header ---
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderBottomColor: "#000",
    backgroundColor: "#FFF",
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)", // Menggunakan boxShadow terbaru
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000",
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
    fontSize: 18,
    fontWeight: "900",
    color: "#000",
  },
  summaryBadge: {
    backgroundColor: "#000",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  summaryBadgeText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "700",
  },
  // --- List & Card ---
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#000",
    padding: 16,
    boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)", // Menggunakan boxShadow terbaru
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  badgeKelas: {
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
  },
  badgeKelasText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#000",
  },
  waktuContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  waktuText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#444",
  },
  mapelText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#333",
    marginBottom: 4,
  },
  judulText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000",
    lineHeight: 26,
    marginBottom: 16,
  },
  // --- Card Footer ---
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: "rgba(0,0,0,0.1)",
    paddingTop: 12,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "800",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
    boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#000",
  },
});