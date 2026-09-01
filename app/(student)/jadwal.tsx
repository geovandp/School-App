import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SCHEDULE_DATA: Record<string, any[]> = {
  Senin: [
    {
      id: "1",
      subject: "Matematika",
      time: "07:00 - 08:30",
      room: "Ruang 101",
      teacher: "Bpk. Budi Santoso",
    },
    {
      id: "2",
      subject: "Fisika",
      time: "08:30 - 10:00",
      room: "Lab IPA 1",
      teacher: "Ibu Siti Aminah",
    },
    { id: "3", subject: "Istirahat", time: "10:00 - 10:30", type: "break" },
    {
      id: "4",
      subject: "Bahasa Indonesia",
      time: "10:30 - 12:00",
      room: "Ruang 101",
      teacher: "Ibu Ratna",
    },
  ],
  Selasa: [
    {
      id: "5",
      subject: "Biologi",
      time: "07:00 - 09:00",
      room: "Lab IPA 2",
      teacher: "Bpk. Anwar",
    },
    {
      id: "6",
      subject: "Sejarah",
      time: "09:00 - 10:00",
      room: "Ruang 101",
      teacher: "Ibu Ningsih",
    },
  ],
  Rabu: [
    {
      id: "7",
      subject: "Pendidikan Agama",
      time: "07:00 - 08:30",
      room: "Masjid/Ruang 101",
      teacher: "Bpk. Ustadz Ali",
    },
    {
      id: "8",
      subject: "Olahraga (PJOK)",
      time: "08:30 - 10:00",
      room: "Lapangan",
      teacher: "Bpk. Doni",
    },
  ],
  Kamis: [
    {
      id: "9",
      subject: "Bahasa Inggris",
      time: "07:00 - 08:30",
      room: "Lab Bahasa",
      teacher: "Mr. John",
    },
    {
      id: "10",
      subject: "Seni Budaya",
      time: "08:30 - 10:00",
      room: "Ruang Kesenian",
      teacher: "Ibu Diana",
    },
  ],
  Jumat: [
    {
      id: "11",
      subject: "Senam Pagi",
      time: "06:30 - 07:30",
      room: "Lapangan",
      type: "event",
    },
    {
      id: "12",
      subject: "Prakarya",
      time: "07:30 - 09:00",
      room: "Ruang 102",
      teacher: "Bpk. Eko",
    },
  ],
};

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState("Senin");
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    // 3. GANTI SafeAreaView menjadi View dengan paddingTop dinamis
    <View
      style={[
        styles.mainWrapper,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}>
      <View style={styles.container}>
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={28}
              color="#1A1A1A"
            />
          </TouchableOpacity>

          <View>
            <Text style={styles.headerTitle}>Jadwal Pelajaran</Text>
            <Text style={styles.headerSubtitle}>Tahun Ajaran 2026/2027</Text>
          </View>
        </View>

        {/* --- PEMILIH HARI --- */}
        <View style={styles.daySelectorContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daySelectorScroll}
          >
            {DAYS.map((day) => {
              const isActive = selectedDay === day;
              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayButton, isActive && styles.dayButtonActive]}
                  onPress={() => setSelectedDay(day)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[styles.dayText, isActive && styles.dayTextActive]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* --- DAFTAR MATA PELAJARAN --- */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scheduleList}
        >
          {SCHEDULE_DATA[selectedDay]?.length > 0 ? (
            SCHEDULE_DATA[selectedDay].map((item) => {
              if (item.type === "break" || item.type === "event") {
                return (
                  <View key={item.id} style={styles.breakCard}>
                    <MaterialCommunityIcons
                      name="coffee-outline"
                      size={20}
                      color="#8E8E93"
                    />
                    <Text style={styles.breakText}>
                      {item.time} - {item.subject}
                    </Text>
                  </View>
                );
              }

              return (
                <View key={item.id} style={styles.card}>
                  <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>
                      {item.time.split(" - ")[0]}
                    </Text>
                    <Text style={styles.timeEndText}>
                      {item.time.split(" - ")[1]}
                    </Text>
                  </View>

                  <View style={styles.verticalDivider} />

                  <View style={styles.infoContainer}>
                    <Text style={styles.subjectText}>{item.subject}</Text>

                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons
                        name="account-outline"
                        size={14}
                        color="#8E8E93"
                      />
                      <Text style={styles.detailText}>{item.teacher}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons
                        name="map-marker-outline"
                        size={14}
                        color="#8E8E93"
                      />
                      <Text style={styles.detailText}>{item.room}</Text>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons
                name="calendar-remove"
                size={60}
                color="#D1D1D6"
              />
              <Text style={styles.emptyText}>
                Tidak ada jadwal untuk hari ini.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // 4. STYLE WRAPPER BARU
  mainWrapper: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 2,
  },
  daySelectorContainer: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  daySelectorScroll: {
    paddingHorizontal: 15,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "#F0F0F0",
  },
  dayButtonActive: {
    backgroundColor: Colors.primary,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8E8E93",
  },
  dayTextActive: {
    color: "#FFFFFF",
  },
  scheduleList: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  timeContainer: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
  timeEndText: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 4,
  },
  verticalDivider: {
    width: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
    marginHorizontal: 15,
    opacity: 0.3,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  subjectText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 13,
    color: "#555555",
    marginLeft: 6,
  },
  breakCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAEAEA",
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#C7C7CC",
  },
  breakText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#8E8E93",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 15,
    color: "#8E8E93",
  },
});
