import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AppState,
  TextInput,
  Alert,
  Vibration,
  BackHandler,
  ScrollView,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

// --- DATA DUMMY 20 SOAL (MIX: 10 PILIHAN GANDA & 10 PERHITUNGAN) ---
const EXAM_QUESTIONS = Array.from({ length: 20 }, (_, index) => {
  const isCalculation = index >= 10; // Soal 1-10 Pilihan Ganda, Soal 11-20 Perhitungan/Essay
  return {
    id: index + 1,
    isCalculation: isCalculation,
    question: isCalculation
      ? `Pertanyaan nomor ${index + 1}: Selesaikan perhitungan matematis/fisika berikut dan jabarkan langkah-langkahnya secara rinci:`
      : `Pertanyaan nomor ${index + 1}: Pilihlah analisis konsep dasar yang paling tepat dari materi bab ${Math.floor(index / 3) + 1}?`,
    weight: (index + 1) % 2 === 0 ? 5 : 10,
    options: isCalculation
      ? []
      : [
          `A: Analisis jawaban pertama yang sesuai kaidah teori.`,
          `B: Teori pendukung dari referensi modul pembelajaran.`,
          `C: Kesimpulan logis berdasarkan eksperimen data.`,
          `D: Evaluasi menyeluruh dari proses studi kasus.`,
        ],
  };
});

export default function RuangUjianScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { examTitle } = useLocalSearchParams();

  const [appState, setAppState] = useState(AppState.currentState);
  const [isLocked, setIsLocked] = useState(false);
  const [superVisorPassword, setSuperVisorPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 5;
  const totalPages = Math.ceil(EXAM_QUESTIONS.length / questionsPerPage);

  // State penyimpanan jawaban
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [essayAnswers, setEssayAnswers] = useState<Record<number, string>>({});
  const [evidenceImages, setEvidenceImages] = useState<Record<number, string>>(
    {},
  );

  // Fungsi Pemicu Pelanggaran (Lock & Vibration Intensif)
  const triggerViolationLock = useCallback(() => {
    Vibration.vibrate([1000, 500, 1000, 500, 1000, 500, 1000, 500], true);
    setIsLocked(true);
  }, []);

  // 1. [KEAMANAN AMAN & NYAMAN] Menggunakan useFocusEffect yang longgar saat scrolling
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      return () => {
        // Hanya kunci jika halaman benar-benar ditinggalkan (pindah rute / keluar halaman)
        if (!isActive) {
          triggerViolationLock();
        }
      };
    }, [triggerViolationLock]),
  );

  // 2. Blokir Total Tombol Back Fisik Android
  useEffect(() => {
    const backAction = () => {
      triggerViolationLock();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, [triggerViolationLock]);

  // 3. Deteksi Perubahan Siklus Hidup Aplikasi (AppState Listener)
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.match(/active/) &&
        nextAppState.match(/inactive|background/)
      ) {
        triggerViolationLock();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState, triggerViolationLock]);

  // Fungsi Buka Kamera untuk Bukti Perhitungan (Evidence)
  const handleCaptureEvidence = async (questionId: number) => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Izin Ditolak",
        "Akses kamera diperlukan untuk mengambil foto bukti lembar perhitungan.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setEvidenceImages((prev) => ({ ...prev, [questionId]: imageUri }));
    }
  };

  // Fungsi Password Pengawas untuk Membuka Kunci Ujian
  const handleUnlockExam = () => {
    Vibration.cancel();

    if (superVisorPassword === "guru123") {
      setIsLocked(false);
      setSuperVisorPassword("");
      Alert.alert(
        "Berhasil",
        "Ujian dibuka kembali oleh pengawas. Harap fokus!",
      );
    } else {
      Alert.alert("Password Salah", "Kata sandi pengawas tidak valid.");
    }
  };

  // Handler Pilih Jawaban Pilihan Ganda
  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionIndex });
  };

  // Data soal yang tampil di halaman saat ini
  const currentQuestions = EXAM_QUESTIONS.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage,
  );

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      {/* HEADER UJIAN */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {typeof examTitle === "string" ? examTitle : "Ujian Sekolah"}
          </Text>
          <Text style={styles.headerSubtitle}>Sisa Waktu: 01:25:40</Text>
        </View>
        <View style={styles.badgeSecure}>
          <MaterialCommunityIcons
            name="shield-lock"
            size={14}
            color="#DC2626"
          />
          <Text style={styles.badgeText}>Secure Mode Active</Text>
        </View>
      </View>

      {/* KONTEN SOAL (SCROLLVIEW NATURAL & NYAMAN DI IOS/ANDROID) */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <View style={styles.pageIndicatorBox}>
          <Text style={styles.pageIndicatorText}>
            Halaman {currentPage + 1} dari {totalPages} (Soal{" "}
            {currentPage * questionsPerPage + 1} -{" "}
            {Math.min(
              (currentPage + 1) * questionsPerPage,
              EXAM_QUESTIONS.length,
            )}{" "}
            dari 20)
          </Text>
        </View>

        {currentQuestions.map((item, index) => {
          const absoluteNumber = currentPage * questionsPerPage + index + 1;
          const selectedOption = selectedAnswers[item.id];
          const essayText = essayAnswers[item.id] || "";
          const evidenceUri = evidenceImages[item.id];

          return (
            <View key={item.id} style={styles.questionCard}>
              {/* Baris Pertanyaan & Bobot Nilai di Pojok Kanan */}
              <View style={styles.questionTopRow}>
                <Text style={styles.qNum}>
                  Soal No. {absoluteNumber}{" "}
                  {item.isCalculation
                    ? "(Perhitungan + Bukti)"
                    : "(Pilihan Ganda)"}
                </Text>
                <View style={styles.weightBadge}>
                  <Text style={styles.weightText}>Bobot: {item.weight}</Text>
                </View>
              </View>

              <Text style={styles.qText}>{item.question}</Text>

              {/* CABANG TIPE SOAL: PILIHAN GANDA (1-10) ATAU PERHITUNGAN + EVIDENCE (11-20) */}
              {item.isCalculation ? (
                <View style={styles.calculationContainer}>
                  <Text style={styles.labelInstruction}>
                    Jawaban & Langkah Kerja:
                  </Text>
                  <TextInput
                    style={styles.essayInput}
                    multiline
                    numberOfLines={4}
                    placeholder="Ketik jawaban anda dan berikan bukti perhitungan di sini..."
                    placeholderTextColor="#94A3B8"
                    value={essayText}
                    onChangeText={(text) =>
                      setEssayAnswers({ ...essayAnswers, [item.id]: text })
                    }
                  />

                  {/* Tombol Kamera Bukti Perhitungan */}
                  <View style={styles.evidenceBox}>
                    <Text style={styles.labelEvidence}>
                      Foto Lembar Perhitungan (Evidence Kertas):
                    </Text>
                    {evidenceUri ? (
                      <View style={styles.previewContainer}>
                        <Image
                          source={{ uri: evidenceUri }}
                          style={styles.evidenceImage}
                        />
                        <TouchableOpacity
                          style={styles.retakeButton}
                          onPress={() => handleCaptureEvidence(item.id)}
                        >
                          <MaterialCommunityIcons
                            name="camera-retake"
                            size={16}
                            color="#FFFFFF"
                          />
                          <Text style={styles.retakeText}>Foto Ulang</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.cameraButton}
                        onPress={() => handleCaptureEvidence(item.id)}
                        activeOpacity={0.8}
                      >
                        <MaterialCommunityIcons
                          name="camera-plus-outline"
                          size={20}
                          color="#2563EB"
                        />
                        <Text style={styles.cameraButtonText}>
                          Buka Kamera (Foto Lembar Kerja)
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ) : (
                <View style={styles.optionsContainer}>
                  {item.options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    return (
                      <TouchableOpacity
                        key={optIdx}
                        style={[
                          styles.optionItem,
                          isSelected && styles.optionItemActive,
                        ]}
                        onPress={() => handleSelectOption(item.id, optIdx)}
                        activeOpacity={0.8}
                      >
                        <View
                          style={[
                            styles.radioCircle,
                            isSelected && styles.radioCircleActive,
                          ]}
                        >
                          {isSelected && <View style={styles.radioInnerDot} />}
                        </View>
                        <Text
                          style={[
                            styles.optionText,
                            isSelected && styles.optionTextActive,
                          ]}
                        >
                          {opt}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}

        {/* NAVIGASI HALAMAN (SEBELUMNYA / SELANJUTNYA) */}
        <View style={styles.paginationRow}>
          <TouchableOpacity
            style={[
              styles.pageNavButton,
              currentPage === 0 && { opacity: 0.4 },
            ]}
            disabled={currentPage === 0}
            onPress={() => setCurrentPage(currentPage - 1)}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={20}
              color="#1E293B"
            />
            <Text style={styles.pageNavText}>Sebelumnya</Text>
          </TouchableOpacity>

          {currentPage < totalPages - 1 ? (
            <TouchableOpacity
              style={[styles.pageNavButton, styles.pageNavButtonPrimary]}
              onPress={() => setCurrentPage(currentPage + 1)}
            >
              <Text style={[styles.pageNavText, { color: "#FFFFFF" }]}>
                Selanjutnya
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.pageNavButton, { backgroundColor: "#10B981" }]}
              onPress={() =>
                Alert.alert(
                  "Konfirmasi",
                  "Apakah Anda yakin ingin mengakhiri dan mengirimkan jawaban ujian?",
                )
              }
            >
              <Text style={[styles.pageNavText, { color: "#FFFFFF" }]}>
                Kirim Ujian
              </Text>
              <MaterialCommunityIcons
                name="check-bold"
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* --- OVERLAY KUNCI KETIKA KETAHUAN KELUAR APLIKASI --- */}
      {isLocked && (
        <View style={styles.lockOverlay}>
          <View style={styles.lockCard}>
            <View style={styles.lockIconBox}>
              <MaterialCommunityIcons
                name="lock-alert"
                size={40}
                color="#DC2626"
              />
            </View>
            <Text style={styles.lockTitle}>🚨 UJIAN TERKUNCI OTOMATIS!</Text>
            <Text style={styles.lockSubtitle}>
              Sistem mendeteksi tindakan mencurigakan (Tarik notifikasi / Pindah
              layar / Gestur keluar). Perangkat bergetar dan pengawas telah
              dilaporkan!
            </Text>

            <Text style={styles.labelPassword}>
              Masukkan Password Pengawas:
            </Text>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry
              placeholder="Password dari pengawas ruang"
              placeholderTextColor="#94A3B8"
              value={superVisorPassword}
              onChangeText={setSuperVisorPassword}
            />

            <TouchableOpacity
              style={styles.unlockButton}
              onPress={handleUnlockExam}
              activeOpacity={0.8}
            >
              <Text style={styles.unlockButtonText}>
                Buka Kunci & Lanjutkan Ujian
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  headerTitle: { fontSize: 15, fontWeight: "900", color: "#1E293B" },
  headerSubtitle: {
    fontSize: 11,
    color: "#E11D48",
    fontWeight: "bold",
    marginTop: 2,
  },
  badgeSecure: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF1F2",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  badgeText: {
    fontSize: 10,
    color: "#DC2626",
    fontWeight: "bold",
    marginLeft: 4,
  },
  scrollContent: { padding: 16, paddingBottom: 40 },
  pageIndicatorBox: { marginBottom: 14, alignItems: "center" },
  pageIndicatorText: { fontSize: 12, fontWeight: "700", color: "#64748B" },
  questionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  questionTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  qNum: { fontSize: 12, fontWeight: "800", color: "#0284C7" },
  weightBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  weightText: { fontSize: 10, fontWeight: "700", color: "#D97706" },
  qText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    lineHeight: 20,
    marginBottom: 14,
  },

  calculationContainer: { marginTop: 4 },
  labelInstruction: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 6,
  },
  essayInput: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 12,
    fontSize: 13,
    color: "#1E293B",
    textAlignVertical: "top",
    minHeight: 90,
    marginBottom: 14,
  },
  evidenceBox: { borderTopWidth: 1, borderTopColor: "#F1F5F9", paddingTop: 12 },
  labelEvidence: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 8,
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderStyle: "dashed",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  cameraButtonText: { fontSize: 12, fontWeight: "700", color: "#2563EB" },
  previewContainer: { alignItems: "center", gap: 8 },
  evidenceImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  retakeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  retakeText: { color: "#FFFFFF", fontSize: 11, fontWeight: "bold" },

  optionsContainer: { gap: 8 },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  optionItemActive: { backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#94A3B8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioCircleActive: { borderColor: "#2563EB" },
  radioInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2563EB",
  },
  optionText: { fontSize: 13, color: "#334155", flex: 1, fontWeight: "500" },
  optionTextActive: { color: "#1E40AF", fontWeight: "700" },

  paginationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  pageNavButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    gap: 6,
  },
  pageNavButtonPrimary: { backgroundColor: "#2563EB", borderColor: "#2563EB" },
  pageNavText: { fontSize: 13, fontWeight: "bold", color: "#1E293B" },

  lockOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    zIndex: 999,
  },
  lockCard: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  lockIconBox: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFF1F2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  lockTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#DC2626",
    marginBottom: 8,
    textAlign: "center",
  },
  lockSubtitle: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 20,
  },
  labelPassword: {
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  passwordInput: {
    width: "100%",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 14,
    color: "#1E293B",
    marginBottom: 16,
  },
  unlockButton: {
    width: "100%",
    backgroundColor: "#E11D48",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  unlockButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
});
