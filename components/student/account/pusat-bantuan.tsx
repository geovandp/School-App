import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Linking,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

const FAQ_LIST = [
  {
    id: "1",
    question: "Bagaimana cara melakukan absensi atau scan QR code?",
    answer:
      "Masuk ke menu 'Scan' pada tab bawah aplikasi, lalu arahkan kamera ke kode QR yang disediakan oleh guru piket atau pengawas di kelas.",
  },
  {
    id: "2",
    question: "Mengapa nilai Evaluasi Guru (EDOM) saya tidak muncul?",
    answer:
      "Pastikan Anda telah menyelesaikan seluruh daftar pertanyaan kuesioner hingga halaman akhir dan menekan tombol kirim. Jika masih terkendala, silakan hubungi bagian akademik.",
  },
  {
    id: "3",
    question: "Bagaimana cara mengubah nomor telepon atau alamat rumah?",
    answer:
      "Anda dapat mengubah data diri melalui menu 'Akun' > 'Edit Profil'. Perhatikan bahwa beberapa data utama seperti NISN bersifat terkunci demi keamanan data sekolah.",
  },
  {
    id: "4",
    question: "Lupa kata sandi akun siswa, bagaimana cara meresetnya?",
    answer:
      "Anda dapat mengubah sandi melalui menu 'Akun' > 'Keamanan Akun'. Jika sudah tidak bisa masuk sama sekali ke aplikasi, silakan laporkan kepada administrator atau guru BK sekolah.",
  },
];

export default function PusatBantuanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>("1");
  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleContactSupport = (type: string) => {
    if (type === "whatsapp") {
      Linking.openURL(
        "https://wa.me/6281234567890?text=Halo%20Admin%20Sekolah,%20saya%20butuh%20bantuan%20terkait%20aplikasi.",
      );
    } else if (type === "email") {
      Linking.openURL(
        "mailto:support@sekolah.sch.id?subject=Kendala%20Aplikasi%20Siswa",
      );
    }
  };

  const filteredFaq = FAQ_LIST.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View
      style={[
        styles.mainWrapper,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="arrow-left" size={26} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pusat Bantuan</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* HERO SEARCH BANNER */}
        <View style={styles.heroBox}>
          <Text style={styles.heroTitle}>Ada yang bisa kami bantu?</Text>
          <Text style={styles.heroSubtitle}>
            Cari topik atau pertanyaan seputar penggunaan aplikasi siswa di
            sini.
          </Text>

          <View style={styles.searchBox}>
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              color="#94A3B8"
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari kendala atau pertanyaan..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* SECTION HUBUNGI LAYANAN BANTUAN */}
        <Text style={styles.sectionTitle}>LAYANAN ADMINISTRASI</Text>
        <View style={styles.supportCardsRow}>
          <TouchableOpacity
            style={styles.supportCard}
            onPress={() => handleContactSupport("whatsapp")}
            activeOpacity={0.8}
          >
            <View
              style={[styles.supportIconBox, { backgroundColor: "#DCFCE7" }]}
            >
              <MaterialCommunityIcons
                name="whatsapp"
                size={24}
                color="#16A34A"
              />
            </View>
            <Text style={styles.supportCardTitle}>WhatsApp Admin</Text>
            <Text style={styles.supportCardSub}>Respon cepat jam kerja</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.supportCard}
            onPress={() => handleContactSupport("email")}
            activeOpacity={0.8}
          >
            <View
              style={[styles.supportIconBox, { backgroundColor: "#E0F2FE" }]}
            >
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="#0284C7"
              />
            </View>
            <Text style={styles.supportCardTitle}>Kirim Email</Text>
            <Text style={styles.supportCardSub}>Kendala sistem & akun</Text>
          </TouchableOpacity>
        </View>

        {/* SECTION FAQ (TANYA JAWAB) */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
          PERTANYAAN UMUM (FAQ)
        </Text>
        <View style={styles.faqContainer}>
          {filteredFaq.length > 0 ? (
            filteredFaq.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <View key={item.id} style={styles.faqItem}>
                  <TouchableOpacity
                    style={styles.faqQuestionRow}
                    onPress={() => toggleAccordion(item.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.faqQuestionText}>{item.question}</Text>
                    <MaterialCommunityIcons
                      name={isExpanded ? "chevron-up" : "chevron-down"}
                      size={20}
                      color="#64748B"
                    />
                  </TouchableOpacity>

                  {isExpanded && (
                    <View style={styles.faqAnswerBox}>
                      <Text style={styles.faqAnswerText}>{item.answer}</Text>
                    </View>
                  )}
                </View>
              );
            })
          ) : (
            <View style={styles.emptySearch}>
              <MaterialCommunityIcons
                name="help-box"
                size={40}
                color="#CBD5E1"
              />
              <Text style={styles.emptySearchText}>
                Tidak ditemukan jawaban yang sesuai.
              </Text>
            </View>
          )}
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: "900", color: "#1E293B" },

  contentContainer: { padding: 20, paddingBottom: 40 },

  heroBox: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.85)",
    marginBottom: 16,
    lineHeight: 18,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
  },
  searchInput: { flex: 1, fontSize: 13, color: "#1E293B", fontWeight: "500" },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#64748B",
    marginBottom: 10,
    letterSpacing: 0.8,
  },

  supportCardsRow: { flexDirection: "row", gap: 12 },
  supportCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  supportIconBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  supportCardTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 2,
  },
  supportCardSub: { fontSize: 10, color: "#64748B", textAlign: "center" },

  faqContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  faqItem: { borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
  faqQuestionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  faqQuestionText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E293B",
    flex: 1,
    marginRight: 10,
  },
  faqAnswerBox: {
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 4,
  },
  faqAnswerText: { fontSize: 12, color: "#475569", lineHeight: 18 },

  emptySearch: { alignItems: "center", padding: 30 },
  emptySearchText: { fontSize: 12, color: "#94A3B8", marginTop: 8 },
});
