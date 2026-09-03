import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/Colors";

// --- DATA DUMMY ABSENSI BERTINGKAT (Kelas -> Semester) ---
const ATTENDANCE_DATA: Record<string, Record<string, any>> = {
  "10": {
    "1": {
      overall: {
        percentage: 95,
        totalMeetings: 120,
        present: 114,
        izin: 4,
        sakit: 2,
        alpa: 0,
      },
      subjects: [
        {
          id: "1",
          subject: "Matematika Wajib",
          total: 16,
          present: 16,
          izin: 0,
          sakit: 0,
          alpa: 0,
          percentage: 100,
        },
        {
          id: "2",
          subject: "Bahasa Inggris",
          total: 16,
          present: 15,
          izin: 1,
          sakit: 0,
          alpa: 0,
          percentage: 93.75,
        },
        {
          id: "3",
          subject: "Fisika Dasar",
          total: 16,
          present: 14,
          izin: 1,
          sakit: 1,
          alpa: 0,
          percentage: 87.5,
        },
      ],
    },
    "2": {
      overall: {
        percentage: 92,
        totalMeetings: 120,
        present: 110,
        izin: 5,
        sakit: 3,
        alpa: 2,
      },
      subjects: [
        {
          id: "1",
          subject: "Matematika Wajib",
          total: 16,
          present: 15,
          izin: 1,
          sakit: 0,
          alpa: 0,
          percentage: 93.75,
        },
        {
          id: "2",
          subject: "Bahasa Inggris",
          total: 16,
          present: 14,
          izin: 2,
          sakit: 0,
          alpa: 0,
          percentage: 87.5,
        },
        {
          id: "3",
          subject: "Fisika Dasar",
          total: 16,
          present: 12,
          izin: 1,
          sakit: 1,
          alpa: 2,
          percentage: 75,
        },
        {
          id: "5",
          subject: "Biologi Umum",
          total: 16,
          present: 9,
          izin: 2,
          sakit: 2,
          alpa: 3,
          percentage: 56.25,
        },
      ],
    },
  },
  "11": {
    "1": {
      overall: {
        percentage: 98,
        totalMeetings: 80,
        present: 78,
        izin: 2,
        sakit: 0,
        alpa: 0,
      },
      subjects: [
        {
          id: "1",
          subject: "Pendidikan Agama",
          total: 12,
          present: 12,
          izin: 0,
          sakit: 0,
          alpa: 0,
          percentage: 100,
        },
        {
          id: "2",
          subject: "Matematika Lanjutan",
          total: 12,
          present: 11,
          izin: 1,
          sakit: 0,
          alpa: 0,
          percentage: 91.6,
        },
      ],
    },
    "2": null, // Belum ada data
  },
  "12": {
    "1": null,
    "2": null,
  },
};

const CLASSES = ["10", "11", "12"];
const SEMESTERS = [
  { id: "1", label: "Semester Ganjil" },
  { id: "2", label: "Semester Genap" },
];

export default function AbsensiScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSemester, setSelectedSemester] = useState("1");
  const currentData = ATTENDANCE_DATA[selectedClass]?.[selectedSemester];
  const getProgressColor = (percentage: number) => {
    if (percentage >= 85) return "#10B981";
    if (percentage >= 70) return "#F59E0B";
    return "#EF4444"; // Merah
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
          <MaterialCommunityIcons name="arrow-left" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Kehadiran Siswa</Text>
          <Text style={styles.headerSubtitle}>Riwayat Absensi Akademik</Text>
        </View>
      </View>

      {/* --- FILTER KELAS & SEMESTER --- */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Jenjang Kelas</Text>
        <View style={styles.classRow}>
          {CLASSES.map((cls) => (
            <TouchableOpacity
              key={cls}
              style={[
                styles.classPill,
                selectedClass === cls && styles.classPillActive,
              ]}
              onPress={() => setSelectedClass(cls)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.classPillText,
                  selectedClass === cls && styles.classPillTextActive,
                ]}
              >
                Kelas {cls}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.filterLabel, { marginTop: 5 }]}>
          Periode Semester
        </Text>
        <View style={styles.semesterRow}>
          {SEMESTERS.map((sem) => (
            <TouchableOpacity
              key={sem.id}
              style={[
                styles.semesterTab,
                selectedSemester === sem.id && styles.semesterTabActive,
              ]}
              onPress={() => setSelectedSemester(sem.id)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={
                  sem.id === "1"
                    ? "clock-time-four-outline"
                    : "clock-time-eight-outline"
                }
                size={16}
                color={selectedSemester === sem.id ? Colors.primary : "#94A3B8"}
              />
              <Text
                style={[
                  styles.semesterTabText,
                  selectedSemester === sem.id && styles.semesterTabTextActive,
                ]}
              >
                {sem.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {currentData ? (
          <>
            {/* --- KARTU REKAP KESELURUHAN --- */}
            <LinearGradient
              colors={["#3B8312", "#2A630D"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.summaryCard}
            >
              <View style={styles.summaryTopRow}>
                <View>
                  <Text style={styles.summaryLabel}>TOTAL KEHADIRAN</Text>
                  <View style={styles.percentageRow}>
                    <Text style={styles.summaryPercentage}>
                      {currentData.overall.percentage}
                    </Text>
                    <Text style={styles.summaryPercentSign}>%</Text>
                  </View>
                </View>
                <View style={styles.iconCircle}>
                  <MaterialCommunityIcons
                    name="calendar-check"
                    size={32}
                    color={Colors.primary}
                  />
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>
                    {currentData.overall.izin}
                  </Text>
                  <Text style={styles.statLabel}>Izin (I)</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>
                    {currentData.overall.sakit}
                  </Text>
                  <Text style={styles.statLabel}>Sakit (S)</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: "#FDA4AF" }]}>
                    {currentData.overall.alpa}
                  </Text>
                  <Text style={styles.statLabel}>Alpa (A)</Text>
                </View>
              </View>
            </LinearGradient>

            <Text style={styles.sectionTitle}>Rincian per Mata Pelajaran</Text>

            {/* --- DAFTAR MATA PELAJARAN --- */}
            <View style={styles.listContainer}>
              {currentData.subjects.map((item: any) => {
                const barColor = getProgressColor(item.percentage);

                return (
                  <View key={item.id} style={styles.subjectCard}>
                    <View style={styles.subjectHeader}>
                      <Text style={styles.subjectTitle}>{item.subject}</Text>
                      <Text
                        style={[styles.subjectPercentage, { color: barColor }]}
                      >
                        {item.percentage}%
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailText}>
                        Hadir: {item.present}/{item.total}
                      </Text>
                      <View style={styles.badgeRow}>
                        {item.izin > 0 && (
                          <Text style={[styles.badge, styles.badgeIzin]}>
                            I: {item.izin}
                          </Text>
                        )}
                        {item.sakit > 0 && (
                          <Text style={[styles.badge, styles.badgeSakit]}>
                            S: {item.sakit}
                          </Text>
                        )}
                        {item.alpa > 0 && (
                          <Text style={[styles.badge, styles.badgeAlpa]}>
                            A: {item.alpa}
                          </Text>
                        )}
                      </View>
                    </View>

                    <View style={styles.progressBarBg}>
                      <View
                        style={[
                          styles.progressBarFill,
                          {
                            width: `${item.percentage}%`,
                            backgroundColor: barColor,
                          },
                        ]}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        ) : (
          /* --- TAMPILAN JIKA DATA KOSONG --- */
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <MaterialCommunityIcons
                name="calendar-blank-outline"
                size={50}
                color={Colors.primary}
              />
            </View>
            <Text style={styles.emptyTitle}>Data Belum Tersedia</Text>
            <Text style={styles.emptySubtitle}>
              Riwayat absensi untuk Kelas {selectedClass} Semester{" "}
              {selectedSemester} tidak ditemukan atau belum dimulai.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: "#F8F9FA" },
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
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 2,
},
  filterSection: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#94A3B8",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  classRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
},
  classPill: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent",
  },
  classPillActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  classPillText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748B",
  },
  classPillTextActive: {
    color: "#FFFFFF",
},
  semesterRow: { 
    flexDirection: "row",
    gap: 10,
},
  semesterTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  semesterTabActive: {
    borderColor: Colors.primary,
    backgroundColor: "#F0FDF4",
  },
  semesterTabText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#94A3B8",
    marginLeft: 6,
  },
  semesterTabTextActive: {
    color: Colors.primary,
},
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
},
  summaryCard: {
    borderRadius: 20,
    padding: 22,
    marginBottom: 25,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  summaryTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 4,
  },
  percentageRow: { 
    flexDirection: "row",
    alignItems: "baseline",
},
  summaryPercentage: {
    fontSize: 42,
    fontWeight: "900",
    color: "#FFFFFF",
},
  summaryPercentSign: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 2,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginVertical: 18,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  statItem: {
    alignItems: "center",
},
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 15,
  },

  listContainer: {
    gap: 12,
},
  subjectCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  subjectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  subjectTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1E293B",
    flex: 1
  },
  subjectPercentage: {
    fontSize: 15,
    fontWeight: "bold"
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  detailText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500"
  },
  badgeRow: {
    flexDirection: "row",
    gap: 6,
},
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 10,
    fontWeight: "bold",
    overflow: "hidden",
  },
  badgeIzin: {
    backgroundColor: "#EFF6FF",
    color: "#3B82F6",
},
  badgeSakit: {
    backgroundColor: "#FEFCE8",
    color: "#EAB308",
},
  badgeAlpa: {
    backgroundColor: "#FEF2F2",
    color: "#EF4444",
},
  progressBarBg: {
    height: 6,
    backgroundColor: "#F1F5F9",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
},
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F0FDF4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 20,
  },
});
