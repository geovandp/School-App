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
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../constants/Colors";

const INCIDENT_CATEGORIES = [
  {
    id: "bully",
    label: "Perundungan (Bullying)",
    icon: "account-cancel-outline",
  },
  { id: "harass",
    label: "Pelecehan",
    icon: "hand-back-right-off-outline",
},
  {
    id: "rule",
    label: "Pelanggaran Aturan Sekolah",
    icon: "alert-octagon-outline",
  },
  { id: "other",
    label: "Lainnya",
    icon: "help-circle-outline",
},
];

export default function PelaporanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachment, setAttachment] = useState<string | null>(null);

  // --- FUNGSI MENGAKSES KAMERA & GALERI ---
  const handleAttachment = () => {
    Alert.alert(
      "Lampirkan Bukti",
      "Pilih dari mana Anda ingin mengambil bukti foto atau video:",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Buka Kamera",
          onPress: async () => {
            const { status } =
              await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
              Alert.alert(
                "Izin Ditolak",
                "Kami butuh izin akses kamera untuk mengambil foto.",
              );
              return;
            }
            const result = await ImagePicker.launchCameraAsync({
              // PERUBAHAN DI SINI: Gunakan array string sesuai aturan terbaru
              mediaTypes: ["images", "videos"],
              quality: 0.8,
            });
            if (!result.canceled) setAttachment(result.assets[0].uri);
          },
        },
        {
          text: "Buka Galeri / File",
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              // PERUBAHAN DI SINI JUGA
              mediaTypes: ["images", "videos"],
              quality: 0.8,
            });
            if (!result.canceled) setAttachment(result.assets[0].uri);
          },
        },
      ],
    );
  };

  const handleSubmitReport = () => {
    if (!selectedCategory || !location || !description) {
      Alert.alert(
        "Form Belum Lengkap",
        "Mohon lengkapi kategori, lokasi, dan kronologi kejadian.",
      );
      return;
    }

    Alert.alert(
      "Kirim Laporan Rahasia?",
      "Laporan Anda akan dikirim secara anonim ke Guru BK. Anda yakin informasi sudah benar?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Ya, Kirimkan",
          onPress: () => {
            setIsSubmitting(true);
            setTimeout(() => {
              setIsSubmitting(false);
              Alert.alert(
                "Laporan Terkirim",
                "Terima kasih atas keberanian Anda. Laporan ini telah diterima secara rahasia oleh Guru BK. Anda aman.",
                [
                  {
                    text: "Kembali ke Beranda",
                    onPress: () => router.replace("/(student)/(tabs)"),
                  },
                ],
              );
            }, 1500);
          },
        },
      ],
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={28}
              color="#1A1A1A"
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Lapor Kode Etik</Text>
            <Text style={styles.headerSubtitle}>Layanan Pengaduan Siswa</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.trustBanner}>
            <View style={styles.shieldIconBox}>
              <MaterialCommunityIcons
                name="shield-check"
                size={32}
                color="#10B981"
              />
            </View>
            <View style={styles.trustTextContainer}>
              <Text style={styles.trustTitle}>100% Rahasia & Aman</Text>
              <Text style={styles.trustSubtitle}>
                Identitas Anda tidak akan direkam. Laporan ini hanya dapat
                dibaca oleh Guru BK.
              </Text>
            </View>
          </View>

          <Text style={styles.sectionLabel}>
            Pilih Kategori Kejadian <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.categoryContainer}>
            {INCIDENT_CATEGORIES.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === item.id && styles.categoryCardActive,
                ]}
                onPress={() => setSelectedCategory(item.id)}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={24}
                  color={
                    selectedCategory === item.id ? Colors.primary : "#64748B"
                  }
                />
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === item.id && styles.categoryTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionLabel}>
            Lokasi Kejadian <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={20}
              color="#94A3B8"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Contoh: Kantin, Kelas 10A..."
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <Text style={styles.sectionLabel}>
            Kronologi Kejadian <Text style={styles.required}>*</Text>
          </Text>
          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <TextInput
              style={styles.textArea}
              placeholder="Ceritakan dengan detail..."
              multiline={true}
              numberOfLines={5}
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Bagian Bukti Pendukung yang Diperbarui */}
          <Text style={styles.sectionLabel}>Bukti Pendukung (Opsional)</Text>
          {attachment ? (
            <View style={styles.attachedCard}>
              <MaterialCommunityIcons
                name="file-check-outline"
                size={24}
                color="#10B981"
              />
              <Text style={styles.attachedText}>
                Bukti berhasil dilampirkan
              </Text>
              <TouchableOpacity onPress={() => setAttachment(null)}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={24}
                  color="#EF4444"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.attachmentButton}
              onPress={handleAttachment}
            >
              <MaterialCommunityIcons
                name="camera-plus-outline"
                size={24}
                color={Colors.primary}
              />
              <Text style={styles.attachmentText}>
                Unggah Foto / Video Bukti
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmitReport}
            disabled={isSubmitting}
          >
            <MaterialCommunityIcons
              name="send-lock"
              size={20}
              color="#FFFFFF"
            />
            <Text style={styles.submitButtonText}>
              {isSubmitting ? "Mengirim..." : "Kirim Laporan"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backButton: { marginRight: 15, padding: 5 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#1A1A1A" },
  headerSubtitle: { fontSize: 13, color: "#8E8E93", marginTop: 2 },
  contentContainer: { padding: 20, paddingBottom: 30 },
  trustBanner: {
    flexDirection: "row",
    backgroundColor: "#ECFDF5",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#A7F3D0",
    marginBottom: 25,
  },
  shieldIconBox: { marginRight: 15, justifyContent: "center" },
  trustTextContainer: { flex: 1 },
  trustTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#065F46",
    marginBottom: 4,
  },
  trustSubtitle: { fontSize: 12, color: "#047857", lineHeight: 18 },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 10,
    marginTop: 5,
  },
  required: { color: "#EF4444" },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryCardActive: {
    backgroundColor: "#F0FDF4",
    borderColor: Colors.primary,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 8,
    textAlign: "center",
  },
  categoryTextActive: { color: Colors.primary },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  inputIcon: { marginRight: 10 },
  textInput: { flex: 1, paddingVertical: 14, fontSize: 14, color: "#1E293B" },
  textAreaContainer: { alignItems: "flex-start", paddingVertical: 10 },
  textArea: { flex: 1, minHeight: 100, fontSize: 14, color: "#1E293B" },
  attachmentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  attachmentText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primary,
    marginLeft: 10,
  },
  attachedCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#10B981",
    marginBottom: 20,
  },
  attachedText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "bold",
    color: "#065F46",
    marginLeft: 10,
  },
  footer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  submitButton: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: { opacity: 0.7 },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
