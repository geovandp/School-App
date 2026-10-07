import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../../constants/Colors";

// 15 PERTANYAAN EDOM
const SURVEY_QUESTIONS = [
  {
    id: 1,
    type: "scale",
    text: "Guru menjelaskan materi pelajaran dengan sangat jelas dan mudah dipahami.",
  },
  {
    id: 2,
    type: "scale",
    text: "Guru menggunakan metode pembelajaran yang interaktif dan tidak membosankan.",
  },
  {
    id: 3,
    type: "scale",
    text: "Guru memberikan kesempatan kepada siswa untuk bertanya dan berdiskusi di kelas.",
  },
  {
    id: 4,
    type: "scale",
    text: "Guru masuk dan keluar kelas tepat waktu sesuai dengan jadwal pelajaran.",
  },
  {
    id: 5,
    type: "scale",
    text: "Guru memberikan umpan balik (feedback) yang jelas terhadap tugas atau ujian.",
  },
  {
    id: 6,
    type: "scale",
    text: "Guru bersikap objektif, adil, dan tidak pilih kasih dalam memberikan penilaian.",
  },
  {
    id: 7,
    type: "scale",
    text: "Guru mampu menciptakan suasana kelas yang tertib dan kondusif untuk belajar.",
  },
  {
    id: 8,
    type: "scale",
    text: "Guru menunjukkan penguasaan materi pelajaran yang sangat baik.",
  },
  {
    id: 9,
    type: "scale",
    text: "Guru peduli dan memotivasi perkembangan akademik serta karakter siswa.",
  },
  {
    id: 10,
    type: "scale",
    text: "Guru merespons pertanyaan atau kebingungan siswa dengan sabar dan ramah.",
  },
  // Halaman 2
  {
    id: 11,
    type: "scale",
    text: "Guru menyampaikan Rencana Pembelajaran di awal pertemuan atau semester.",
  },
  {
    id: 12,
    type: "scale",
    text: "Guru memanfaatkan teknologi atau media pembelajaran pendukung dengan baik.",
  },
  {
    id: 13,
    type: "scale",
    text: "Guru memberikan tugas dengan porsi yang wajar dan sesuai dengan materi.",
  },
  {
    id: 14,
    type: "scale",
    text: "Secara keseluruhan, saya merasa puas dengan kinerja guru ini dalam mengajar.",
  },
  {
    id: 15,
    type: "text",
    text: "Berikan kritik, saran, atau masukan membangun untuk Bapak/Ibu guru ini.",
  },
];

const QUESTIONS_PER_PAGE = 10;

export default function SurveyFormScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id, name, subject } = useLocalSearchParams(); // Menangkap data guru dari halaman sebelumnya

  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(SURVEY_QUESTIONS.length / QUESTIONS_PER_PAGE);
  const currentQuestions = SURVEY_QUESTIONS.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE,
  );

  const handleSelectRating = (questionId: number, rating: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: rating }));
  };

  const handleTextChange = (questionId: number, text: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: text }));
  };

  const handleNextPage = () => {
    // Validasi: Pastikan semua pertanyaan di halaman saat ini sudah dijawab
    const unAnswered = currentQuestions.some(
      (q) =>
        !answers[q.id] || (q.type === "text" && answers[q.id].trim() === ""),
    );
    if (unAnswered) {
      Alert.alert(
        "Belum Lengkap",
        "Mohon isi semua pertanyaan di halaman ini sebelum melanjutkan.",
      );
      return;
    }
    setCurrentPage(2);
  };

  const handleSubmit = () => {
    // Validasi halaman terakhir
    const unAnswered = currentQuestions.some(
      (q) =>
        !answers[q.id] || (q.type === "text" && answers[q.id].trim() === ""),
    );
    if (unAnswered) {
      Alert.alert(
        "Belum Lengkap",
        "Mohon isi semua sisa pertanyaan termasuk saran sebelum mengirimkan.",
      );
      return;
    }

    Alert.alert(
      "Berhasil Dikirim!",
      `Evaluasi untuk ${name} telah disimpan. Terima kasih atas partisipasi Anda.`,
      [{ text: "Selesai", onPress: () => router.replace("/survey") }],
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
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
            onPress={() => {
              currentPage === 2 ? setCurrentPage(1) : router.back();
            }}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={28}
              color="#1E293B"
            />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.headerSubtitle}>{subject}</Text>
          </View>
        </View>

        {/* PROGRESS BAR */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Halaman {currentPage} dari {totalPages}
          </Text>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: currentPage === 1 ? "50%" : "100%" },
              ]}
            />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {currentQuestions.map((item, index) => {
            const actualQuestionNumber =
              (currentPage - 1) * QUESTIONS_PER_PAGE + index + 1;

            return (
              <View
                key={item.id}
                style={[
                  styles.questionCard,
                  item.type === "text" && styles.feedbackCard,
                ]}
              >
                <View style={styles.questionHeader}>
                  <View
                    style={[
                      styles.questionNumberBox,
                      item.type === "text" && { backgroundColor: "#F59E0B" },
                    ]}
                  >
                    <Text style={styles.questionNumberText}>
                      {actualQuestionNumber}
                    </Text>
                  </View>
                  <Text style={styles.questionText}>{item.text}</Text>
                </View>

                {/* Tipe Pertanyaan Skala 1-5 */}
                {item.type === "scale" && (
                  <>
                    <View style={styles.scaleRow}>
                      {[1, 2, 3, 4, 5].map((score) => {
                        const isSelected = answers[item.id] === score;
                        return (
                          <TouchableOpacity
                            key={score}
                            style={[
                              styles.scaleButton,
                              isSelected && styles.scaleButtonActive,
                            ]}
                            onPress={() => handleSelectRating(item.id, score)}
                            activeOpacity={0.7}
                          >
                            <Text
                              style={[
                                styles.scaleButtonText,
                                isSelected && styles.scaleButtonTextActive,
                              ]}
                            >
                              {score}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <View style={styles.scaleLabels}>
                      <Text style={styles.scaleLabelText}>Sangat Kurang</Text>
                      <Text style={styles.scaleLabelText}>Sangat Baik</Text>
                    </View>
                  </>
                )}

                {/* Tipe Pertanyaan Teks / Saran */}
                {item.type === "text" && (
                  <TextInput
                    style={styles.textInput}
                    placeholder="Tuliskan masukan Anda di sini..."
                    placeholderTextColor="#94A3B8"
                    multiline={true}
                    numberOfLines={5}
                    textAlignVertical="top"
                    value={answers[item.id] || ""}
                    onChangeText={(text) => handleTextChange(item.id, text)}
                  />
                )}
              </View>
            );
          })}

          {/* BUTTON NAVIGASI BAWAH */}
          <View style={styles.bottomNavRow}>
            {currentPage === 2 && (
              <TouchableOpacity
                style={styles.prevButton}
                onPress={() => setCurrentPage(1)}
              >
                <Text style={styles.prevButtonText}>Sebelumnya</Text>
              </TouchableOpacity>
            )}

            {currentPage === 1 ? (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextPage}
              >
                <Text style={styles.nextButtonText}>Selanjutnya</Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={20}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Kirim Evaluasi</Text>
                <MaterialCommunityIcons
                  name="send-check"
                  size={20}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 16, fontWeight: "900", color: "#1E293B" },
  headerSubtitle: { fontSize: 12, color: "#64748B" },

  progressContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
  },
  progressText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "#E2E8F0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: { height: "100%", backgroundColor: Colors.primary },

  contentContainer: { padding: 20, paddingBottom: 40 },

  questionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  feedbackCard: { borderColor: "#FEF3C7", borderWidth: 1.5 },

  questionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  questionNumberBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
  questionNumberText: { color: "#FFFFFF", fontSize: 12, fontWeight: "900" },
  questionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    lineHeight: 22,
  },

  scaleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  scaleButton: {
    width: "18%",
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  scaleButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  scaleButtonText: { fontSize: 16, fontWeight: "700", color: "#64748B" },
  scaleButtonTextActive: { color: "#FFFFFF" },

  scaleLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  scaleLabelText: { fontSize: 10, color: "#94A3B8", fontWeight: "600" },

  textInput: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: "#334155",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    minHeight: 120,
  },

  bottomNavRow: { flexDirection: "row", gap: 15, marginTop: 10 },
  prevButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
  },
  prevButtonText: { color: "#64748B", fontSize: 14, fontWeight: "bold" },

  nextButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  nextButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },

  submitButton: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#10B981",
    alignItems: "center",
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
});
