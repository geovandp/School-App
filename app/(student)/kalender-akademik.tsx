import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";

const { width } = Dimensions.get("window");

// --- DATA KONSTANTA ---
const ACADEMIC_YEARS = ["2026/2027", "2025/2026", "2024/2025", "2023/2024"];
const WEEKDAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const LEGEND = [
  { code: "UTS", label: "UTS / UAS", color: "#8B5CF6" }, // Ungu pastel
  { code: "SMT", label: "Semester Antara", color: "#FBBF24" }, // Kuning mustard
  { code: "KRS", label: "KRS / KPRS", color: "#38BDF8" }, // Biru langit
  {
    code: "LHR",
    label: "Libur Hari Raya",
    color: "#FECACA",
    textColor: "#EF4444",
  }, // Merah muda
  { code: "MT", label: "Minggu Tenang", color: "#34D399" }, // Hijau mint
];

// Simulasi Event
const MOCK_EVENTS: Record<string, string> = {
  "2026-07-06": "UTS",
  "2026-07-07": "UTS",
  "2026-07-08": "UTS",
  "2026-07-09": "UTS",
  "2026-07-10": "UTS",
  "2026-07-28": "SMT",
  "2026-07-29": "SMT",
  "2026-08-03": "KRS",
  "2026-08-04": "KRS",
  "2026-08-17": "LHR",
  "2026-09-04": "KRS", // Simulasi kegiatan di hari ini
  "2026-10-05": "UTS",
  "2026-10-06": "UTS",
  "2026-10-07": "UTS",
  "2026-12-24": "LHR",
  "2026-12-25": "LHR",
  "2027-01-01": "LHR",
};

export default function KalenderScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedYear, setSelectedYear] = useState("2026/2027");

  // Deteksi Hari Ini
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const generateCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const MONTHS = [
    { name: "Juli", year: 2026, monthIndex: 6 },
    { name: "Agustus", year: 2026, monthIndex: 7 },
    { name: "September", year: 2026, monthIndex: 8 },
    { name: "Oktober", year: 2026, monthIndex: 9 },
    { name: "November", year: 2026, monthIndex: 10 },
    { name: "Desember", year: 2026, monthIndex: 11 },
    { name: "Januari", year: 2027, monthIndex: 0 },
    { name: "Februari", year: 2027, monthIndex: 1 },
  ];

  // Mengambil daftar acara untuk satu bulan
  const getEventsForMonth = (year: number, monthIndex: number) => {
    const events: { date: number; label: string; color: string }[] = [];
    const prefix = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;

    Object.keys(MOCK_EVENTS).forEach((dateStr) => {
      if (dateStr.startsWith(prefix)) {
        const dateNum = parseInt(dateStr.split("-")[2], 10);
        const legendData = LEGEND.find((l) => l.code === MOCK_EVENTS[dateStr]);
        if (legendData) {
          // Hindari duplikasi label acara yang sama berturut-turut di UI
          if (!events.find((e) => e.label === legendData.label)) {
            events.push({
              date: dateNum,
              label: legendData.label,
              color: legendData.color,
            });
          }
        }
      }
    });
    return events;
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
          <Text style={styles.headerTitle}>Kalender Akademik</Text>
          <Text style={styles.headerSubtitle}>
            Jadwal Kegiatan & Hari Libur
          </Text>
        </View>
      </View>

      {/* --- TAHUN AJARAN --- */}
      <View style={styles.yearSelectorContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollPadding}
        >
          {ACADEMIC_YEARS.map((year) => {
            const isActive = selectedYear === year;
            return (
              <TouchableOpacity
                key={year}
                style={[styles.yearButton, isActive && styles.yearButtonActive]}
                onPress={() => setSelectedYear(year)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.yearText, isActive && styles.yearTextActive]}
                >
                  {year}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* --- KETERANGAN (LEGEND) HORIZONTAL --- */}
        <View style={styles.legendWrapper}>
          <Text style={styles.sectionLabel}>Keterangan Warna:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.legendScroll}
          >
            {LEGEND.map((item) => (
              <View key={item.code} style={styles.legendPill}>
                <View
                  style={[styles.legendDot, { backgroundColor: item.color }]}
                />
                <Text style={styles.legendLabel}>{item.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* --- KALENDER BULANAN --- */}
        <View style={styles.calendarList}>
          {MONTHS.map((monthData, index) => {
            const days = generateCalendarDays(
              monthData.year,
              monthData.monthIndex,
            );
            const monthEvents = getEventsForMonth(
              monthData.year,
              monthData.monthIndex,
            );

            // Cek apakah bulan ini adalah bulan sekarang untuk memberikan penanda unik
            const isCurrentMonth =
              today.getFullYear() === monthData.year &&
              today.getMonth() === monthData.monthIndex;

            return (
              <View
                key={index}
                style={[
                  styles.monthCard,
                  isCurrentMonth && styles.monthCardActive,
                ]}
              >
                {/* Header Bulan */}
                <View
                  style={[
                    styles.monthHeader,
                    isCurrentMonth && styles.monthHeaderActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.monthTitle,
                      isCurrentMonth && { color: "#FFFFFF" },
                    ]}
                  >
                    {monthData.name} {monthData.year}
                  </Text>
                  {isCurrentMonth && (
                    <View style={styles.currentMonthBadge}>
                      <Text style={styles.currentMonthText}>Bulan Ini</Text>
                    </View>
                  )}
                </View>

                <View style={styles.monthBody}>
                  {/* Hari (Min-Sab) */}
                  <View style={styles.weekdaysRow}>
                    {WEEKDAYS.map((day, idx) => (
                      <Text
                        key={idx}
                        style={[
                          styles.weekdayText,
                          idx === 0 && styles.textSunday,
                        ]}
                      >
                        {day}
                      </Text>
                    ))}
                  </View>

                  {/* Grid Tanggal */}
                  <View style={styles.daysGrid}>
                    {days.map((date, idx) => {
                      if (!date)
                        return (
                          <View key={`empty-${idx}`} style={styles.dayCell} />
                        );

                      const dateString = `${monthData.year}-${String(monthData.monthIndex + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
                      const eventCode = MOCK_EVENTS[dateString];
                      const eventConfig = LEGEND.find(
                        (l) => l.code === eventCode,
                      );

                      const isSunday = idx % 7 === 0;
                      const isToday = dateString === todayString;

                      return (
                        <View key={idx} style={styles.dayCell}>
                          <View
                            style={[
                              styles.dayCircle,
                              eventConfig && {
                                backgroundColor: eventConfig.color,
                              },
                              isToday && !eventConfig && styles.dayCircleToday,
                            ]}
                          >
                            <Text
                              style={[
                                styles.dayText,
                                isSunday &&
                                  !eventConfig &&
                                  !isToday &&
                                  styles.textSunday,
                                eventConfig && {
                                  color: eventConfig.textColor || "#FFFFFF",
                                  fontWeight: "bold",
                                },
                                isToday &&
                                  !eventConfig && {
                                    color: "#FFFFFF",
                                    fontWeight: "bold",
                                  },
                              ]}
                            >
                              {date}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>

                  {/* DAFTAR AGENDA INFORMATIF DI BAWAH KALENDER */}
                  {monthEvents.length > 0 && (
                    <View style={styles.eventListContainer}>
                      <View style={styles.eventDivider} />
                      <Text style={styles.eventListTitle}>
                        Agenda Bulan Ini:
                      </Text>
                      {monthEvents.map((evt, eIdx) => (
                        <View key={eIdx} style={styles.eventRow}>
                          <View
                            style={[
                              styles.eventDot,
                              { backgroundColor: evt.color },
                            ]}
                          />
                          <Text style={styles.eventText}>{evt.label}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            );
          })}
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backButton: { marginRight: 15, padding: 5 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#1E293B" },
  headerSubtitle: { fontSize: 13, color: "#64748B", marginTop: 2 },

  yearSelectorContainer: { backgroundColor: "#FFFFFF", paddingBottom: 15 },
  scrollPadding: { paddingHorizontal: 20 },
  yearButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "#F1F5F9",
  },
  yearButtonActive: { backgroundColor: Colors.primary },
  yearText: { fontSize: 14, fontWeight: "700", color: "#64748B" },
  yearTextActive: { color: "#FFFFFF" },

  contentContainer: { padding: 20, paddingBottom: 40 },

  legendWrapper: { marginBottom: 20 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#64748B",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  legendScroll: { paddingRight: 20 },
  legendPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  legendLabel: { fontSize: 12, color: "#334155", fontWeight: "600" },

  calendarList: { gap: 20 },
  monthCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  monthCardActive: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
    shadowOpacity: 0.1,
    shadowColor: Colors.primary,
    elevation: 3,
  },

  monthHeader: {
    backgroundColor: "#F8FAFC",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  monthHeaderActive: { backgroundColor: Colors.primary, borderBottomWidth: 0 },
  monthTitle: { fontSize: 16, fontWeight: "bold", color: "#1E293B" },
  currentMonthBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentMonthText: { fontSize: 10, fontWeight: "bold", color: "#FFFFFF" },

  monthBody: { padding: 15 },
  weekdaysRow: { flexDirection: "row", marginBottom: 10 },
  weekdayText: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "#94A3B8",
  },
  textSunday: { color: "#EF4444" },

  daysGrid: { flexDirection: "row", flexWrap: "wrap" },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  dayCircle: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  dayCircleToday: { backgroundColor: Colors.primary },
  dayText: { fontSize: 13, color: "#334155", fontWeight: "600" },

  eventListContainer: { marginTop: 15 },
  eventDivider: { height: 1, backgroundColor: "#F1F5F9", marginBottom: 12 },
  eventListTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#64748B",
    marginBottom: 8,
  },
  eventRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  eventDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  eventText: { fontSize: 13, color: "#475569", fontWeight: "500" },
});
