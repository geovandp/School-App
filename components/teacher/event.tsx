import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.85;
const SPACING = 16;

const schoolEvents = [
  {
    id: "1",
    image: "https://picsum.photos/400/200?random=1",
    category: "Program Unggulan",
    date: "16 Sep 2026",
    title: "PROGRAM MBG 2026",
    fullDetail: "Program Makan Bergizi Gratis (MBG) untuk seluruh siswa guna meningkatkan konsentrasi dan kesehatan.",
  },
  {
    id: "2",
    image: "https://picsum.photos/400/200?random=2",
    category: "Lomba & Seni",
    date: "20 Sep 2026",
    title: "PORSENI Tingkat Daerah",
    fullDetail: "Pekan Olahraga dan Seni antar kelas. Siapkan perwakilan kelasmu untuk berbagai lomba menarik!",
  },
  {
    id: "3",
    image: "https://picsum.photos/400/200?random=3",
    category: "Perayaan",
    date: "15 Okt 2026",
    title: "HUT Sekolah Ke-45",
    fullDetail: "Perayaan puncak ulang tahun sekolah dengan berbagai bazar, penampilan band, dan pameran karya siswa.",
  },
];

export default function SchoolEventCarousel() {
  return (
    <View style={styles.bannerSection}>
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>School Event</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.seeAllText}>Lihat semua</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={schoolEvents}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 20, // Menambah ruang bawah untuk shadow
          gap: SPACING,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.bannerContainer, { width: CARD_WIDTH }]}
            onPress={() => alert(`Buka event: ${item.title}`)}
          >
            <View style={styles.cardContent}>
              <Image source={{ uri: item.image }} style={styles.modalImage} />

              <View style={styles.textContainer}>
                <View style={styles.modalMetaRow}>
                  {/* Soft Badge untuk Kategori */}
                  <View style={styles.modalCategoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                  
                  <View style={styles.dateRow}>
                    <MaterialCommunityIcons name="calendar-month-outline" size={14} color="#64748B" />
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                </View>

                <Text style={styles.modalTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.modalFullDetail} numberOfLines={2}>
                  {item.fullDetail}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bannerSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A", // Dark Slate
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3B82F6", // Primary Blue (Warna Aksen Aplikasi)
  },
  
  // --- Gaya Pembungkus Kartu (Clean UI) ---
  bannerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    overflow: "hidden", 
    // Soft Shadow
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardContent: {
    width: "100%",
  },
  modalImage: {
    width: "100%",
    height: 140, 
    resizeMode: "cover",
    backgroundColor: "#E2E8F0", 
  },
  textContainer: {
    padding: 16,
  },
  modalMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  
  // Soft Badge
  modalCategoryBadge: {
    backgroundColor: "#F1F5F9", // Slate-100
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#475569", // Slate-600
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 6,
  },
  modalFullDetail: {
    fontSize: 13,
    fontWeight: "400",
    color: "#475569",
    lineHeight: 20,
  },
});