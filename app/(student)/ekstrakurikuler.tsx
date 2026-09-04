import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";

// --- DATA DUMMY EKSKUL (MENGGUNAKAN GAMBAR) ---
// Catatan: Saya menggunakan URL gambar dari internet untuk contoh.
// Nantinya Anda bisa menggantinya dengan gambar lokal menggunakan require('@/assets/...').
const EKSKUL_DATA = [
  {
    id: "e1",
    name: "Pramuka",
    schedule: "Jumat, 14:00 - 16:00",
    location: "Lapangan Utama",
    coach: "Bpk. Sudirman",
    color: "#8B5CF6",
    image:
      "https://images.unsplash.com/photo-1523580494115-64192846f3dc?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "e2",
    name: "Paskibra",
    schedule: "Rabu, 15:00 - 17:00",
    location: "Lapangan Utama",
    coach: "Ibu Ningsih",
    color: "#EF4444",
    image:
      "https://images.unsplash.com/photo-1532372320921-654854581fdb?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "e3",
    name: "Futsal",
    schedule: "Selasa, 15:30 - 17:30",
    location: "Lapangan Olahraga",
    coach: "Bpk. Doni",
    color: "#F59E0B",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "e4",
    name: "Paduan Suara",
    schedule: "Kamis, 14:00 - 16:00",
    location: "Ruang Kesenian",
    coach: "Ibu Diana",
    color: "#3B82F6",
    image:
      "https://images.unsplash.com/photo-1516280440502-a2f00a7b46d7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "e5",
    name: "KIR (Ilmiah Remaja)",
    schedule: "Sabtu, 09:00 - 11:00",
    location: "Lab IPA",
    coach: "Bpk. Anwar",
    color: "#10B981",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
  },
];

export default function EkstrakurikulerScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"tersedia" | "saya">("tersedia");
  // Simulasi user sudah diterima di ekskul Pramuka
  const [myEkskul, setMyEkskul] = useState([
    { ...EKSKUL_DATA[0], status: "accepted" },
  ]);
  const availableEkskul = EKSKUL_DATA.filter(
    (e) => !myEkskul.find((my) => my.id === e.id),
  );

  const handleRegister = (ekskul: any) => {
    Alert.alert(
      "Daftar Ekstrakurikuler",
      `Apakah Anda yakin ingin mendaftar kegiatan ${ekskul.name}?`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Ya, Daftar",
          onPress: () => {
            setMyEkskul((prev) => [...prev, { ...ekskul, status: "pending" }]);
            Alert.alert(
              "Berhasil Mendaftar",
              "Pendaftaran Anda sedang diproses oleh pembina. Silakan cek status di tab 'Ekskul Saya'.",
              [{ text: "Lihat Status", onPress: () => setActiveTab("saya") }],
            );
          },
        },
      ],
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
          <MaterialCommunityIcons name="arrow-left" size={28} color="#1E293B" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Ekstrakurikuler</Text>
          <Text style={styles.headerSubtitle}>Kembangkan bakat & minatmu</Text>
        </View>
      </View>

      {/* --- TAB SWITCHER --- */}
      <View style={styles.tabContainer}>
        <View style={styles.tabBackground}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "tersedia" && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab("tersedia")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "tersedia" && styles.tabTextActive,
              ]}
            >
              Ekskul Tersedia
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "saya" && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab("saya")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "saya" && styles.tabTextActive,
              ]}
            >
              Ekskul Saya
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* === TAB 1: EKSKUL TERSEDIA === */}
        {activeTab === "tersedia" && (
          <View style={styles.listContainer}>
            {availableEkskul.length > 0 ? (
              availableEkskul.map((item) => (
                <View key={item.id} style={styles.modernCard}>
                  {/* Bagian Gambar (Banner Header) */}
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.cardImage}
                    />
                    {/* Overlay Tipis pada gambar */}
                    <View style={styles.imageOverlay} />
                    <View
                      style={[
                        styles.categoryTag,
                        { backgroundColor: item.color },
                      ]}
                    >
                      <Text style={styles.categoryTagText}>{item.name}</Text>
                    </View>
                  </View>

                  {/* Bagian Konten/Informasi */}
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardSubtitle}>
                      Pembina: {item.coach}
                    </Text>

                    <View style={styles.detailsBox}>
                      <View style={styles.detailRow}>
                        <MaterialCommunityIcons
                          name="calendar-clock-outline"
                          size={18}
                          color="#64748B"
                        />
                        <Text style={styles.detailText}>{item.schedule}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <MaterialCommunityIcons
                          name="map-marker-outline"
                          size={18}
                          color="#64748B"
                        />
                        <Text style={styles.detailText}>{item.location}</Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleRegister(item)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.actionButtonText}>
                        Daftar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={60}
                  color="#10B981"
                />
                <Text style={styles.emptyTitle}>Wah, Luar Biasa!</Text>
                <Text style={styles.emptySubtitle}>
                  Kamu sudah mendaftar semua ekstrakurikuler yang tersedia.
                </Text>
              </View>
            )}
          </View>
        )}

        {/* === TAB 2: EKSKUL SAYA === */}
        {activeTab === "saya" && (
          <View style={styles.listContainer}>
            {myEkskul.length > 0 ? (
              myEkskul.map((item) => (
                <View
                  key={item.id}
                  style={[
                    styles.modernCard,
                    {
                      borderColor:
                        item.status === "accepted" ? "#10B981" : "#FBBF24",
                      borderWidth: 1.5,
                    },
                  ]}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.cardImage}
                    />
                    <View style={styles.imageOverlay} />

                    {/* Floating Status Badge di atas gambar */}
                    {item.status === "pending" ? (
                      <View style={[styles.floatingBadge, styles.badgePending]}>
                        <MaterialCommunityIcons
                          name="clock-outline"
                          size={14}
                          color="#D97706"
                        />
                        <Text style={styles.badgeTextPending}> Menunggu</Text>
                      </View>
                    ) : (
                      <View
                        style={[styles.floatingBadge, styles.badgeAccepted]}
                      >
                        <MaterialCommunityIcons
                          name="check-decagram"
                          size={14}
                          color="#059669"
                        />
                        <Text style={styles.badgeTextAccepted}> Diterima</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardSubtitle}>
                      Pembina: {item.coach}
                    </Text>

                    <View style={styles.detailsBox}>
                      <View style={styles.detailRow}>
                        <MaterialCommunityIcons
                          name="calendar-clock-outline"
                          size={18}
                          color="#64748B"
                        />
                        <Text style={styles.detailText}>{item.schedule}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <MaterialCommunityIcons
                          name="map-marker-outline"
                          size={18}
                          color="#64748B"
                        />
                        <Text style={styles.detailText}>{item.location}</Text>
                      </View>
                    </View>

                    {item.status === "accepted" && (
                      <View style={styles.syncInfoBox}>
                        <MaterialCommunityIcons
                          name="calendar-sync"
                          size={18}
                          color={Colors.primary}
                        />
                        <Text style={styles.syncInfoText}>
                          Jadwal sudah ditambahkan otomatis.
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons
                  name="basketball-hoop-outline"
                  size={60}
                  color="#CBD5E1"
                />
                <Text style={styles.emptyTitle}>Belum Ada Kegiatan</Text>
                <Text style={styles.emptySubtitle}>
                  Yuk, jelajahi ekskul yang tersedia dan kembangkan bakatmu!
                </Text>
                <TouchableOpacity
                  style={styles.exploreButton}
                  onPress={() => setActiveTab("tersedia")}
                >
                  <Text style={styles.exploreButtonText}>
                    Lihat Ekskul Tersedia
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
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
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  tabBackground: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: { fontSize: 13, fontWeight: "600", color: "#64748B" },
  tabTextActive: { color: Colors.primary },

  contentContainer: { padding: 20, paddingBottom: 40 },
  listContainer: { gap: 20 },

  // Desain Kartu Modern
  modernCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  imageContainer: { width: "100%", height: 140, position: "relative" },
  cardImage: { width: "100%", height: "100%", resizeMode: "cover" },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.15)",
  }, // Sedikit gelap agar gambar elegan

  categoryTag: {
    position: "absolute",
    bottom: 12,
    left: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  categoryTagText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  floatingBadge: {
    position: "absolute",
    top: 12,
    right: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  badgePending: { backgroundColor: "#FEF3C7" },
  badgeTextPending: { fontSize: 11, fontWeight: "bold", color: "#D97706" },
  badgeAccepted: { backgroundColor: "#D1FAE5" },
  badgeTextAccepted: { fontSize: 11, fontWeight: "bold", color: "#059669" },

  cardBody: { padding: 20 },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
    marginBottom: 15,
  },

  detailsBox: {
    backgroundColor: "#F8FAFC",
    padding: 15,
    borderRadius: 14,
    gap: 10,
    marginBottom: 20,
  },
  detailRow: { flexDirection: "row", alignItems: "center" },
  detailText: {
    fontSize: 13,
    color: "#475569",
    marginLeft: 10,
    fontWeight: "500",
  },

  actionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },

  syncInfoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  syncInfoText: {
    fontSize: 12,
    color: "#15803D",
    marginLeft: 8,
    fontWeight: "600",
    flex: 1,
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginTop: 15,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 25,
  },
  exploreButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
  },
  exploreButtonText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 14 },
});
