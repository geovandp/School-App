import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image, // <-- Tambahan
  Dimensions, // <-- Tambahan
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router"; // <-- Tambahan
import { MaterialCommunityIcons } from "@expo/vector-icons"; // <-- Tambahan
import { Colors } from "../../../constants/Colors";
import HeaderProfile from "../../../components/student/HeaderProfile";
import ScheduleCard from "../../../components/student/ScheduleCard";
import FeatureGrid from "../../../components/student/FeatureGrid";

const { width } = Dimensions.get("window"); // <-- Tambahan

// --- DATA DUMMY SCHOOL EVENT (Tambahan) ---
const SCHOOL_EVENTS = [
  {
    id: "1",
    title: "Penerimaan Mahasiswa/Siswa Baru & Pengenalan Kampus 2026",
    date: "10 Sep 2026",
    image:
      "https://images.unsplash.com/photo-1523580494115-64192846f3dc?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Porseni & Kompetisi Olahraga Antar Kelas Tingkat Nasional",
    date: "15 Sep 2026",
    image:
      "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Seminar Teknologi AI & Masa Depan Pendidikan",
    date: "20 Sep 2026",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
  },
];

export default function StudentHomeScreen() {
  const router = useRouter(); // <-- Tambahan

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* 1. Header Profil */}
        <HeaderProfile />

        {/* 2. Kartu Jadwal Mengambang */}
        <ScheduleCard />

        {/* 3. Grid Fitur Aplikasi */}
        <FeatureGrid />

        {/* 4. Event Banner (Hanya Bagian Ini yang Diganti) */}
        <View style={styles.bannerSection}>
          <View style={styles.sectionHeaderRow}>
            {/* Override margin bawah agar sejajar dengan tombol "Lihat semua" */}
            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>
              School Event
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/announce")}
              activeOpacity={0.7}
            >
              <Text style={styles.seeAllText}>Lihat semua</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventScrollContainer}
            snapToInterval={width * 0.75 + 15}
            decelerationRate="fast"
          >
            {SCHOOL_EVENTS.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.eventCard}
                activeOpacity={0.9}
                onPress={() => router.push("/announce")}
              >
                <Image
                  source={{ uri: event.image }}
                  style={styles.eventImage}
                />
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle} numberOfLines={2}>
                    {event.title}
                  </Text>
                  <View style={styles.eventDateRow}>
                    <MaterialCommunityIcons
                      name="calendar-month-outline"
                      size={14}
                      color="#64748B"
                    />
                    <Text style={styles.eventDate}>{event.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // === STYLING BAWAAN (TIDAK ADA YANG DIUBAH ATAU DIHAPUS) ===
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  bannerSection: {
    paddingHorizontal: 20,
    marginTop: 10,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textMain,
    marginBottom: 15,
  },
  bannerContainer: {
    width: "100%",
    height: 120,
    borderRadius: 15,
    overflow: "hidden",
  },
  bannerPlaceholder: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerText: {
    color: Colors.white,
    fontWeight: "900",
    fontSize: 20,
    letterSpacing: 1,
  },

  // === STYLING TAMBAHAN KHUSUS UNTUK BANNER BARU ===
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primary,
  },
  eventScrollContainer: {
    paddingRight: 20, // Agar ada jarak ekstra saat digeser mentok ke kanan
  },
  eventCard: {
    width: width * 0.75, // Mengambil 75% lebar layar
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginRight: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  eventImage: {
    width: "100%",
    height: 130,
    resizeMode: "cover",
  },
  eventInfo: {
    padding: 12,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
    lineHeight: 20,
  },
  eventDateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventDate: {
    fontSize: 11,
    color: "#64748B",
    marginLeft: 4,
    fontWeight: "500",
  },
});
