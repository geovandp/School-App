import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

// --- DATA DUMMY BERITA & PENGUMUMAN ---
const NEWS_DATA = [
  {
    id: "1",
    title: "Penerimaan Siswa Baru Jalur Prestasi & Reguler 2027",
    excerpt:
      "Sekolah membuka pendaftaran siswa baru untuk tahun ajaran 2027/2028. Segera persiapkan berkas pendaftaran Anda.",
    category: "PENGUMUMAN",
    date: "4 Sep 2026",
    image:
      "https://images.unsplash.com/photo-1523580494115-64192846f3dc?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "3",
    title: "Juara Umum Lomba Cerdas Cermat Tingkat Provinsi",
    excerpt:
      "Selamat kepada tim Cerdas Cermat SMA yang berhasil membawa pulang piala bergilir Gubernur Jawa Timur.",
    category: "PRESTASI",
    date: "28 Ags 2026",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "Kegiatan Outbound Kelas 10 di Coban Rondo",
    excerpt:
      "Diharapkan seluruh siswa kelas 10 membawa perlengkapan pribadi dan berkumpul di lapangan jam 06:00 pagi.",
    category: "KEGIATAN",
    date: "1 Sep 2026",
    image:
      "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    id: "4",
    title: "Pemberitahuan Jadwal Ujian Tengah Semester (UTS)",
    excerpt:
      "Jadwal UTS semester ganjil akan dimulai pada minggu pertama bulan Oktober. Jadwal lengkap dapat diunduh di portal.",
    category: "AKADEMIK",
    date: "20 Ags 2026",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    id: "5",
    title: "Perubahan Jam Operasional Perpustakaan",
    excerpt:
      "Mulai minggu depan, perpustakaan akan buka hingga pukul 16:30 WIB setiap hari Senin sampai Kamis.",
    category: "PENGUMUMAN",
    date: "18 Ags 2026",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
];

const CATEGORIES = ["Semua", "PENGUMUMAN", "PRESTASI", "AKADEMIK", "KEGIATAN"];

export default function BeritaScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState("Semua");
  const featuredNews = NEWS_DATA.filter((news) => news.featured);

  // Logika Filter Berita
  const filteredNews = NEWS_DATA.filter((news) => {
    if (activeCategory === "Semua") return !news.featured; // Sembunyikan yg featured dari list bawah jika di tab "Semua"
    return news.category === activeCategory;
  });

  const handleReadMore = (title: string) => {
    alert(`Membuka rincian berita:\n\n"${title}"`);
  };

  // Styling Kategori yang Premium (Soft Background, Bold Text)
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case "PENGUMUMAN":
        return { bg: "#FEE2E2", text: "#EF4444" };
      case "PRESTASI":
        return { bg: "#FEF3C7", text: "#F59E0B" };
      case "AKADEMIK":
        return { bg: "#DBEAFE", text: "#3B82F6" };
      default:
        return { bg: "#D1FAE5", text: "#10B981" };
    }
  };

  return (
    <View style={[styles.mainWrapper, { paddingTop: insets.top }]}>
      {/* --- MODERN HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="arrow-left" size={28} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seputar Sekolah</Text>
        <TouchableOpacity style={styles.searchButton}>
          <MaterialCommunityIcons name="magnify" size={24} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* --- CAROUSEL BERITA SOROTAN --- */}
        {activeCategory === "Semua" && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionHeading}>Sorotan Utama</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredScroll}
              snapToInterval={width * 0.85 + 20}
              decelerationRate="fast"
            >
              {featuredNews.map((news) => {
                const catStyle = getCategoryStyle(news.category);
                return (
                  <TouchableOpacity
                    key={news.id}
                    style={styles.featuredCard}
                    activeOpacity={0.9}
                    onPress={() => handleReadMore(news.title)}
                  >
                    <Image
                      source={{ uri: news.image }}
                      style={styles.featuredImage}
                    />

                    {/* Gradient Overlay Lebih Lembut */}
                    <LinearGradient
                      colors={["transparent", "rgba(15, 23, 42, 0.9)"]}
                      style={styles.featuredGradient}
                    />

                    {/* Glassmorphism Category Badge */}
                    <View style={styles.glassBadge}>
                      <Text style={styles.glassBadgeText}>{news.category}</Text>
                    </View>

                    <View style={styles.featuredContent}>
                      <Text style={styles.featuredTitle} numberOfLines={2}>
                        {news.title}
                      </Text>
                      <View style={styles.featuredMeta}>
                        <MaterialCommunityIcons
                          name="clock-outline"
                          size={14}
                          color="#94A3B8"
                        />
                        <Text style={styles.featuredMetaText}>{news.date}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* --- FILTER KATEGORI (PILL TABS) --- */}
        <View style={styles.filterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.filterPill,
                    isActive && styles.filterPillActive,
                  ]}
                  onPress={() => setActiveCategory(cat)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      isActive && styles.filterPillTextActive,
                    ]}
                  >
                    {cat === "Semua" ? "Terkini" : cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* --- DAFTAR BERITA TERKINI --- */}
        <View style={styles.newsList}>
          {filteredNews.length > 0 ? (
            filteredNews.map((news) => {
              const catStyle = getCategoryStyle(news.category);
              return (
                <TouchableOpacity
                  key={news.id}
                  style={styles.newsItemCard}
                  activeOpacity={0.7}
                  onPress={() => handleReadMore(news.title)}
                >
                  <Image
                    source={{ uri: news.image }}
                    style={styles.newsItemImage}
                  />

                  <View style={styles.newsItemContent}>
                    <View style={styles.newsItemHeader}>
                      <View
                        style={[
                          styles.softBadge,
                          { backgroundColor: catStyle.bg },
                        ]}
                      >
                        <Text
                          style={[
                            styles.softBadgeText,
                            { color: catStyle.text },
                          ]}
                        >
                          {news.category}
                        </Text>
                      </View>
                      <Text style={styles.newsItemDate}>{news.date}</Text>
                    </View>

                    <Text style={styles.newsItemTitle} numberOfLines={2}>
                      {news.title}
                    </Text>
                    <Text style={styles.newsItemExcerpt} numberOfLines={2}>
                      {news.excerpt}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons
                name="text-box-search-outline"
                size={50}
                color="#CBD5E1"
              />
              <Text style={styles.emptyTitle}>Belum Ada Berita</Text>
              <Text style={styles.emptySubtitle}>
                Tidak ada informasi untuk kategori {activeCategory} saat ini.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: "#F8FAFC" }, // Off-white modern background

  // Header Super Bersih
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#F8FAFC",
  },
  backButton: { padding: 5, marginLeft: -5 },
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: 0.5,
  },
  searchButton: { padding: 5, marginRight: -5 },

  scrollContent: { paddingBottom: 50 },

  // --- FEATURED CAROUSEL ---
  featuredSection: { marginTop: 10, marginBottom: 15 },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  featuredScroll: { paddingHorizontal: 20, paddingBottom: 15 }, // paddingBottom untuk ruang bayangan

  featuredCard: {
    width: width * 0.85,
    height: 220,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginRight: 20,
    overflow: "hidden",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  featuredImage: { width: "100%", height: "100%", resizeMode: "cover" },
  featuredGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
  },

  glassBadge: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  glassBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  featuredContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 8,
    lineHeight: 24,
  },
  featuredMeta: { flexDirection: "row", alignItems: "center" },
  featuredMetaText: {
    fontSize: 12,
    color: "#CBD5E1",
    marginLeft: 6,
    fontWeight: "600",
  },

  // --- FILTER KATEGORI ---
  filterSection: { marginBottom: 20 },
  filterScroll: { paddingHorizontal: 20, gap: 10 },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "transparent",
  },
  filterPillActive: {
    backgroundColor: "#0F172A",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  filterPillText: { fontSize: 13, fontWeight: "700", color: "#64748B" },
  filterPillTextActive: { color: "#FFFFFF" },

  // --- LIST BERITA TERKINI ---
  newsList: { paddingHorizontal: 20, gap: 16 },

  newsItemCard: {
    flexDirection: "row",
    backgroundColor: "transparent", // Tanpa background putih, menyatu dengan layout
    alignItems: "center",
  },
  newsItemImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    resizeMode: "cover",
    backgroundColor: "#E2E8F0",
  },

  newsItemContent: { flex: 1, marginLeft: 16 },
  newsItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  softBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  softBadgeText: { fontSize: 9, fontWeight: "900", letterSpacing: 0.5 },

  newsItemDate: { fontSize: 11, color: "#94A3B8", fontWeight: "600" },
  newsItemTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    lineHeight: 22,
    marginBottom: 4,
  },
  newsItemExcerpt: { fontSize: 13, color: "#64748B", lineHeight: 18 },

  // Empty State
  emptyState: { alignItems: "center", paddingVertical: 40 },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginTop: 12,
  },
  emptySubtitle: { fontSize: 13, color: "#94A3B8", marginTop: 4 },
});
