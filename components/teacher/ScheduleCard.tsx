import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const scheduleData = [
  {
    id: "1",
    time: "08:00 - 09:30",
    subject: "Matematika Lanjutan",
    classInfo: "Kelas XII IPA 1 • Ruang 302",
    status: "Berlangsung",
  },
  {
    id: "2",
    time: "10:00 - 11:30",
    subject: "Fisika Dasar",
    classInfo: "Kelas XII IPA 2 • Lab Fisika",
    status: "Akan Datang",
  },
  {
    id: "3",
    time: "11:30 - 13:00",
    subject: "Istirahat & Sholat",
    classInfo: "Area Sekolah",
    status: "Akan Datang",
  },
];

const CARD_WIDTH = 295; // Lebar card
const CARD_GAP = 14;   // Jarak antar card

export default function TeacherScheduleCard() {
  
  // Fungsi untuk menentukan warna badge berdasarkan status
  const getStatusStyle = (status: string) => {
    if (status === "Berlangsung") {
      return { bg: "#ECFDF5", text: "#10B981" }; // Emerald / Hijau Lembut
    }
    return { bg: "#F8FAFC", text: "#64748B" }; // Slate / Abu-abu Lembut
  };

  return (
    <View style={styles.outerWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        snapToInterval={CARD_WIDTH + CARD_GAP} 
        decelerationRate="fast"              
        snapToAlignment="start"
      >
        {scheduleData.map((item) => {
          const statusStyle = getStatusStyle(item.status);
          
          return (
            <View key={item.id} style={styles.cardContainer}>
              <View style={styles.cardHeader}>
                <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
                  <Text style={[styles.badgeText, { color: statusStyle.text }]}>
                    {item.status}
                  </Text>
                </View>
                
                <View style={styles.timeWrapper}>
                  <MaterialCommunityIcons name="clock-outline" size={14} color="#64748B" />
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </View>

              <Text style={styles.subjectTitle}>{item.subject}</Text>
              
              <View style={styles.classInfoWrapper}>
                <MaterialCommunityIcons name="map-marker-radius-outline" size={16} color="#94A3B8" />
                <Text style={styles.classInfo}>{item.classInfo}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    width: "100%",
    // Menghapus background putih dan border radius bawah agar menyatu mulus dengan layar utama
    backgroundColor: "transparent", 
    paddingTop: 5,
    paddingBottom: 25,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    gap: CARD_GAP, 
  },
  cardContainer: {
    width: CARD_WIDTH, 
    borderRadius: 16,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1F5F9", // Border tipis abu-abu terang
    // --- Soft Shadow ---
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  timeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A", // Dark Slate
    marginBottom: 8,
    lineHeight: 24,
  },
  classInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  classInfo: {
    fontSize: 13,
    fontWeight: "500",
    color: "#64748B",
  },
});