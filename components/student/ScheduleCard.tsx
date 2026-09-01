import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router"; // Untuk navigasi saat kartu diklik

const SCHEDULE_DATA: Record<string, any[]> = {
  Senin: [
    {
      id: "1",
      subject: "Matematika Lanjutan",
      time: "07:00 - 08:30",
      room: "Ruang 101",
      teacher: "Bpk. Budi",
    },
    {
      id: "2",
      subject: "Fisika Dasar",
      time: "08:30 - 10:00",
      room: "Lab IPA 1",
      teacher: "Ibu Siti",
    },
  ],
  Selasa: [
    {
      id: "3",
      subject: "Biologi Umum",
      time: "19:00 - 20:00",
      room: "Lab IPA 2",
      teacher: "Bpk. Anwar",
    },
  ],
  Rabu: [
    {
      id: "4",
      subject: "Pendidikan Agama",
      time: "07:00 - 08:30",
      room: "Ruang 101",
      teacher: "Ustadz Ali",
    },
  ],
  Kamis: [
    {
      id: "5",
      subject: "Bahasa Inggris",
      time: "07:00 - 08:30",
      room: "Lab Bahasa",
      teacher: "Mr. John",
    },
  ],
  Jumat: [
    {
      id: "6",
      subject: "Prakarya",
      time: "07:30 - 09:00",
      room: "Ruang 102",
      teacher: "Bpk. Eko",
    },
  ],
  Sabtu: [],
  Minggu: [],
};

export default function ScheduleCard() {
  const router = useRouter();
  const now = new Date();
  const daysMap = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const currentDayName = daysMap[now.getDay()];
  const currentTimeString = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // Simulasi testing jika ingin dipaksa tampil:
  // const currentDayName = "Selasa";
  // const currentTimeString = "08:30";

  const todaySchedules = SCHEDULE_DATA[currentDayName] || [];
  const currentActiveSchedule = todaySchedules.find((item) => {
    const [startTime, endTime] = item.time.split(" - ");
    return currentTimeString >= startTime && currentTimeString <= endTime;
  });

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => router.push("/jadwal")} // Mengarahkan ke halaman jadwal lengkap saat diklik
    >
      {currentActiveSchedule ? (
        // === TAMPILAN KETIKA ADA PELAJARAN BERLANGSUNG ===
        <View style={styles.contentContainer}>
          <View style={styles.topRow}>
            <View style={styles.badgeWrapper}>
              <View style={styles.pulseDot} />
              <Text style={styles.badgeText}>SEDANG BERLANGSUNG</Text>
            </View>
            <View style={styles.timeContainer}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={13}
                color="#555"
              />
              <Text style={styles.timeText}>{currentActiveSchedule.time}</Text>
            </View>
          </View>

          <Text style={styles.subjectTitle} numberOfLines={1}>
            {currentActiveSchedule.subject}
          </Text>

          <View style={styles.footerRow}>
            <View style={styles.infoBadge}>
              <MaterialCommunityIcons
                name="door"
                size={13}
                color={Colors.primary}
              />
              <Text style={styles.infoText}>{currentActiveSchedule.room}</Text>
            </View>
            <View style={styles.infoBadge}>
              <MaterialCommunityIcons
                name="account-school-outline"
                size={13}
                color={Colors.primary}
              />
              <Text style={styles.infoText}>
                {currentActiveSchedule.teacher}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        // === TAMPILAN KETIKA LIBUR / KOSONG ===
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBox}>
            <MaterialCommunityIcons
              name="calendar-check-outline"
              size={28}
              color={Colors.primary}
            />
          </View>
          <View style={styles.emptyTextWrapper}>
            <Text style={styles.emptyTitle}>Tidak ada jadwal saat ini</Text>
            <Text style={styles.emptySubtitle}>
              Ketuk untuk melihat seluruh jadwal pelajaran
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: -90,
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 15,
    elevation: 6,
    borderLeftWidth: 5,
    borderLeftColor: Colors.primary, // Aksen garis hijau elegan di sisi kiri
  },
  contentContainer: {
    width: "100%",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  badgeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FDF4", // Hijau sangat soft
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginRight: 6,
  },
  badgeText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555555",
    marginLeft: 4,
  },
  subjectTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 10,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  infoBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  infoText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#475569",
    marginLeft: 5,
  },
  emptyContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  emptyIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#F0FDF4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  emptyTextWrapper: {
    flex: 1,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  emptySubtitle: {
    fontSize: 12,
    color: "#64748B",
  },
});
