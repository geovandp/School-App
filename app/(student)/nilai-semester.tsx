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

// --- DATA DUMMY NILAI ---
type GradeData = { subject: string; score: number; letter: string };
type SemesterData = { "1": GradeData[]; "2": GradeData[] };
type GradesRecord = Record<string, SemesterData>;

const GRADES_DATA: GradesRecord = {
  "10": {
    "1": [
      { subject: "Pendidikan Agama", score: 88, letter: "A" },
      { subject: "Bahasa Indonesia", score: 85, letter: "B+" },
      { subject: "Matematika Wajib", score: 78, letter: "B-" },
      { subject: "Fisika Dasar", score: 82, letter: "B" },
      { subject: "Bahasa Inggris", score: 90, letter: "A" },
    ],
    "2": [
      { subject: "Pendidikan Agama", score: 90, letter: "A" },
      { subject: "Bahasa Indonesia", score: 87, letter: "B+" },
      { subject: "Matematika Wajib", score: 85, letter: "B+" },
      { subject: "Fisika Dasar", score: 88, letter: "A-" },
      { subject: "Bahasa Inggris", score: 92, letter: "A" },
    ],
  },
  "11": {
    "1": [
      { subject: "Pendidikan Agama", score: 92, letter: "A" },
      { subject: "Matematika Peminatan", score: 80, letter: "B" },
      { subject: "Kimia Lanjutan", score: 75, letter: "C+" },
    ],
    "2": [],
  },
  "12": {
    "1": [],
    "2": [],
  },
};

const CLASSES = ["10", "11", "12"];
const SEMESTERS = [
  { id: "1", label: "Semester Ganjil" },
  { id: "2", label: "Semester Genap" },
];

export default function NilaiScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSemester, setSelectedSemester] = useState("1");

  const currentGrades = GRADES_DATA[selectedClass]?.[selectedSemester as "1" | "2"] || [];
  
  const averageScore = currentGrades.length > 0 
    ? (currentGrades.reduce((sum, item) => sum + item.score, 0) / currentGrades.length).toFixed(1)
    : "0.0";

  // Fungsi untuk menentukan warna berdasarkan Predikat (Huruf)
  const getGradeStyle = (letter: string) => {
    if (letter.startsWith("A")) return { bg: "#ECFDF5", text: "#10B981", icon: "arrow-up-bold-circle-outline" }; // Hijau
    if (letter.startsWith("B")) return { bg: "#EFF6FF", text: "#3B82F6", icon: "check-circle-outline" }; // Biru
    if (letter.startsWith("C")) return { bg: "#FFF7ED", text: "#F59E0B", icon: "minus-circle-outline" }; // Oranye
    return { bg: "#FEF2F2", text: "#EF4444", icon: "arrow-down-bold-circle-outline" }; // Merah (D, E)
  };

  // Fungsi memberikan pujian otomatis berdasarkan rata-rata
  const getAverageRemark = (avg: number) => {
    if (avg >= 90) return "Sangat Baik! 🌟";
    if (avg >= 80) return "Memuaskan 👍";
    if (avg >= 70) return "Cukup Baik 🙂";
    return "Tingkatkan Lagi 💪";
  };

  return (
    <View style={[styles.mainWrapper, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Nilai Akademik</Text>
          <Text style={styles.headerSubtitle}>Laporan Hasil Belajar Siswa</Text>
        </View>
      </View>

      {/* --- FILTER SECTION --- */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Jenjang Kelas</Text>
        <View style={styles.classRow}>
          {CLASSES.map((cls) => (
            <TouchableOpacity
              key={cls}
              style={[styles.classPill, selectedClass === cls && styles.classPillActive]}
              onPress={() => setSelectedClass(cls)}
              activeOpacity={0.7}
            >
              <Text style={[styles.classPillText, selectedClass === cls && styles.classPillTextActive]}>
                Kelas {cls}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.filterLabel, { marginTop: 5 }]}>Periode Semester</Text>
        <View style={styles.semesterRow}>
          {SEMESTERS.map((sem) => (
            <TouchableOpacity
              key={sem.id}
              style={[styles.semesterTab, selectedSemester === sem.id && styles.semesterTabActive]}
              onPress={() => setSelectedSemester(sem.id)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons 
                name={sem.id === "1" ? "book-open-page-variant-outline" : "book-check-outline"} 
                size={16} 
                color={selectedSemester === sem.id ? Colors.primary : "#94A3B8"} 
              />
              <Text style={[styles.semesterTabText, selectedSemester === sem.id && styles.semesterTabTextActive]}>
                {sem.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        
        {/* --- KARTU RATA-RATA BERGRADASI --- */}
        {currentGrades.length > 0 && (
          <LinearGradient
            colors={['#3B8312', '#2A630D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.summaryCard}
          >
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryLabel}>Rata-Rata Nilai</Text>
              <View style={styles.remarkBadge}>
                <Text style={styles.remarkText}>{getAverageRemark(Number(averageScore))}</Text>
              </View>
            </View>
            
            <View style={styles.summaryScoreBox}>
              <Text style={styles.summaryScore}>{averageScore}</Text>
            </View>
          </LinearGradient>
        )}

        {/* --- DAFTAR NILAI MATAPELAJARAN --- */}
        {currentGrades.length > 0 ? (
          <View style={styles.gradesList}>
            {currentGrades.map((item, index) => {
              const gradeStyle = getGradeStyle(item.letter);

              return (
                <View key={index} style={styles.gradeCard}>
                  <View style={styles.subjectInfo}>
                    <Text style={styles.subjectTitle}>{item.subject}</Text>
                    <View style={styles.scoreRow}>
                      <Text style={styles.subjectScore}> Skor Akhir: {item.score}</Text>
                    </View>
                  </View>
                  
                  {/* Kotak Huruf Dinamis */}
                  <View style={[styles.gradeLetterBox, { backgroundColor: gradeStyle.bg, borderColor: gradeStyle.text }]}>
                    <Text style={[styles.gradeLetter, { color: gradeStyle.text }]}>{item.letter}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <MaterialCommunityIcons name="text-box-remove-outline" size={50} color={Colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>Belum Ada Nilai</Text>
            <Text style={styles.emptySubtitle}>
              Data nilai untuk Kelas {selectedClass} Semester {selectedSemester} belum dipublikasikan oleh guru.
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
    flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  backButton: { marginRight: 15, padding: 5 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#1A1A1A" },
  headerSubtitle: { fontSize: 13, color: "#8E8E93", marginTop: 2 },
  
  filterSection: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 5, elevation: 2,
  },
  filterLabel: { fontSize: 12, fontWeight: "bold", color: "#94A3B8", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 },
  
  classRow: { flexDirection: "row", gap: 10, marginBottom: 15 },
  classPill: { 
    flex: 1, paddingVertical: 10, alignItems: "center", backgroundColor: "#F1F5F9", borderRadius: 20,
    borderWidth: 1, borderColor: "transparent",
  },
  classPillActive: { backgroundColor: Colors.primary, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
  classPillText: { fontSize: 14, fontWeight: "700", color: "#64748B" },
  classPillTextActive: { color: "#FFFFFF" },
  
  semesterRow: { flexDirection: "row", gap: 10 },
  semesterTab: { 
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 12, 
    borderRadius: 14, backgroundColor: "#F8FAFC", borderWidth: 1, borderColor: "#E2E8F0" 
  },
  semesterTabActive: { borderColor: Colors.primary, backgroundColor: "#F0FDF4" },
  semesterTabText: { fontSize: 13, fontWeight: "700", color: "#94A3B8", marginLeft: 6 },
  semesterTabTextActive: { color: Colors.primary },

  contentContainer: { padding: 20, paddingBottom: 50 },
  
  summaryCard: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    borderRadius: 20, padding: 22, marginBottom: 25,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 15, elevation: 8,
  },
  summaryInfo: { flex: 1 },
  summaryLabel: { color: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: "600", marginBottom: 8, letterSpacing: 0.5 },
  remarkBadge: { 
    backgroundColor: "rgba(255,255,255,0.2)", alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 
  },
  remarkText: { color: "#FFFFFF", fontSize: 13, fontWeight: "bold" },
  summaryScoreBox: { backgroundColor: "#FFFFFF", width: 70, height: 70, borderRadius: 35, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
  summaryScore: { fontSize: 24, fontWeight: "900", color: Colors.primary },

  gradesList: { gap: 14 },
  gradeCard: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    backgroundColor: "#FFFFFF", padding: 18, borderRadius: 16,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  subjectInfo: { flex: 1, paddingRight: 15 },
  subjectTitle: { fontSize: 16, fontWeight: "bold", color: "#1E293B", marginBottom: 6 },
  scoreRow: { flexDirection: "row", alignItems: "center" },
  subjectScore: { fontSize: 13, fontWeight: "600", color: "#64748B" },
  gradeLetterBox: {
    width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center", borderWidth: 1.5,
  },
  gradeLetter: { fontSize: 20, fontWeight: "900" },

  emptyContainer: { alignItems: "center", justifyContent: "center", paddingVertical: 50 },
  emptyIconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#F0FDF4", alignItems: "center", justifyContent: "center", marginBottom: 15 },
  emptyTitle: { fontSize: 18, fontWeight: "bold", color: "#1E293B", marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: "#64748B", textAlign: "center", paddingHorizontal: 20, lineHeight: 20 },
});