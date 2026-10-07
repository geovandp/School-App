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

// Ambil ukuran lebar layar HP
const { width } = Dimensions.get("window");
// Atur lebar kartu (85% dari layar) agar konten muat dengan baik
const CARD_WIDTH = width * 0.85;
const SPACING = 16;

// Data dummy yang sudah disesuaikan dengan struktur baru
const schoolEvents = [
  {
    id: "1",
    image: "https://picsum.photos/400/200?random=1",
    category: "Program Unggulan",
    date: "16 Sep 2026",
    title: "PROGRAM MBG 2026",
    fullDetail: "Program Makan Bergizi Gratis (MBG) untuk seluruh siswa guna meningkatkan konsentrasi dan kesehatan.",
    color: "#FDFFB6",
  },
  {
    id: "2",
    image: "https://picsum.photos/400/200?random=2",
    category: "Lomba & Seni",
    date: "20 Sep 2026",
    title: "PORSENI Tingkat Daerah",
    fullDetail: "Pekan Olahraga dan Seni antar kelas. Siapkan perwakilan kelasmu untuk berbagai lomba menarik!",
    color: "#9BF6FF",
  },
  {
    id: "3",
    image: "https://picsum.photos/400/200?random=3",
    category: "Perayaan",
    date: "15 Okt 2026",
    title: "HUT Sekolah Ke-45",
    fullDetail: "Perayaan puncak ulang tahun sekolah dengan berbagai bazar, penampilan band, dan pameran karya siswa.",
    color: "#FFC6FF",
  },
];

export default function SchoolEventCarousel() {
  return (
    <View style={styles.bannerSection}>
      <Text style={styles.sectionTitle}>School Event</Text>

      <FlatList
        data={schoolEvents}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        // Pengaturan Snap (Magnet)
        snapToInterval={CARD_WIDTH + SPACING}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 10,
          gap: SPACING,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.bannerContainer,
              { width: CARD_WIDTH, backgroundColor: item.color },
            ]}
            onPress={() => alert(`Buka event: ${item.title}`)}
          >
            {/* 
              Saya mengganti `selectedInfo` menjadi `item` karena kita
              mengambil datanya dari list (schoolEvents).
            */}
            <View style={styles.cardContent}>
              <Image source={{ uri: item.image }} style={styles.modalImage} />

              <View style={styles.textContainer}>
                <View style={styles.modalMetaRow}>
                  <View style={styles.modalCategoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                  <View style={styles.dateRow}>
                    <MaterialCommunityIcons name="calendar-outline" size={14} color="#666" />
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
    marginTop: 13,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  // --- Gaya Pembungkus Kartu ---
  bannerContainer: {
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 16,
    boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
    // Memastikan isi kartu tidak meluber keluar dari border radius
    overflow: "hidden", 
  },
  cardContent: {
    width: "100%",
  },
  // --- Gaya dari struktur kode Anda ---
  modalImage: {
    width: "100%",
    height: 140, // Tinggi gambar diatur agar proporsional
    borderBottomWidth: 3, // Garis pemisah antara gambar dan teks
    borderColor: "#000",
    backgroundColor: "#E4E4E4", // Warna dasar sebelum gambar ter-load
  },
  textContainer: {
    padding: 16, // Jarak teks dari tepi layar
  },
  modalMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalCategoryBadge: {
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#000",
    textTransform: "uppercase",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
  },
  dateText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#555",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000",
    marginBottom: 6,
  },
  modalFullDetail: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
    lineHeight: 18,
  },
});