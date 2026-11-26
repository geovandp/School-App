import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker"; // Import komponen kalender
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActionSheetIOS,
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function IzinSakitScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState<"sakit" | "izin">("sakit");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [reason, setReason] = useState("");
  const [attachment, setAttachment] = useState<{
    uri: string;
    name: string;
    type: "image" | "doc";
  } | null>(null);
  const formatDateString = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handler Perubahan Tanggal Mulai
  const onChangeStartDate = (event: any, selectedDate?: Date) => {
    setShowStartPicker(Platform.OS === "ios");
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  // Handler Perubahan Tanggal Selesai
  const onChangeEndDate = (event: any, selectedDate?: Date) => {
    setShowEndPicker(Platform.OS === "ios");
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  // Fungsi Ambil Foto Surat dari Kamera
  const handleCaptureCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Izin Ditolak",
        "Akses kamera diperlukan untuk memotret surat.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAttachment({
        uri: result.assets[0].uri,
        name: "surat-keterangan-kamera.jpg",
        type: "image",
      });
    }
  };

  // Fungsi Pilih File Dokumen / Gambar dari Galeri/Penyimpanan
  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setAttachment({
          uri: file.uri,
          name: file.name || "dokumen-surat",
          type: file.mimeType?.includes("image") ? "image" : "doc",
        });
      }
    } catch (error) {
      console.log("Gagal memilih file:", error);
    }
  };

  // Handler Menu Tunggal Pilihan Bukti Surat
  const handleOpenAttachmentOptions = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Batal", "Ambil Foto dari Kamera", "Pilih File / Galeri"],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) handleCaptureCamera();
          else if (buttonIndex === 2) handlePickDocument();
        },
      );
    } else {
      Alert.alert(
        "Lampirkan Bukti Surat",
        "Pilih sumber lampiran surat izin/sakit Anda:",
        [
          { text: "Batal", style: "cancel" },
          { text: "Kamera HP", onPress: handleCaptureCamera },
          { text: "Galeri / File PDF", onPress: handlePickDocument },
        ],
        { cancelable: true },
      );
    }
  };

  // Fungsi Submit Pengajuan
  const handleSubmit = () => {
    if (!reason.trim()) {
      Alert.alert(
        "Peringatan",
        "Harap isi keterangan alasan ketidakhadiran Anda.",
      );
      return;
    }
    if (!attachment) {
      Alert.alert("Peringatan", "Harap lampirkan bukti surat (Sakit/Izin).");
      return;
    }

    Alert.alert(
      "Berhasil Dikirim",
      `Pengajuan ${category.toUpperCase()} Anda (${formatDateString(startDate)} s.d. ${formatDateString(endDate)}) telah dikirim ke Wali Kelas & Guru Piket.`,
      [{ text: "OK", onPress: () => router.back() }],
    );
  };

  return (
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
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Pengajuan Izin & Sakit</Text>
          <Text style={styles.headerSubtitle}>Form ketidakhadiran siswa</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* PILIHAN KATEGORI (SAKIT / IZIN) */}
        <Text style={styles.label}>Pilih Keterangan:</Text>
        <View style={styles.categoryRow}>
          <TouchableOpacity
            style={[
              styles.categoryCard,
              category === "sakit" && styles.categoryCardSakitActive,
            ]}
            onPress={() => setCategory("sakit")}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="hospital-box-outline"
              size={24}
              color={category === "sakit" ? "#E11D48" : "#64748B"}
            />
            <Text
              style={[
                styles.categoryText,
                category === "sakit" && styles.categoryTextSakitActive,
              ]}
            >
              Sakit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryCard,
              category === "izin" && styles.categoryCardIzinActive,
            ]}
            onPress={() => setCategory("izin")}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="clipboard-account-outline"
              size={24}
              color={category === "izin" ? "#2563EB" : "#64748B"}
            />
            <Text
              style={[
                styles.categoryText,
                category === "izin" && styles.categoryTextIzinActive,
              ]}
            >
              Izin
            </Text>
          </TouchableOpacity>
        </View>

        {/* RENTANG TANGGAL (MEMUNCULKAN KALENDER SAAT DIKLIK) */}
        <View style={styles.dateRow}>
          {/* Dari Tanggal */}
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.label}>Dari Tanggal:</Text>
            <TouchableOpacity
              style={styles.inputBox}
              onPress={() => setShowStartPicker(true)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="calendar-start"
                size={18}
                color="#64748B"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.dateText}>{formatDateString(startDate)}</Text>
            </TouchableOpacity>
          </View>

          {/* Sampai Tanggal */}
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.label}>Sampai Tanggal:</Text>
            <TouchableOpacity
              style={styles.inputBox}
              onPress={() => setShowEndPicker(true)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="calendar-end"
                size={18}
                color="#64748B"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.dateText}>{formatDateString(endDate)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Komponen Native DateTimePicker (Mulai) */}
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onChangeStartDate}
          />
        )}

        {/* Komponen Native DateTimePicker (Selesai) */}
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onChangeEndDate}
          />
        )}

        {/* KETERANGAN / ALASAN */}
        <Text style={styles.label}>Keterangan / Alasan:</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          placeholder="Tuliskan alasan detail (contoh: Demam dan disarankan istirahat oleh dokter / Acara keluarga)..."
          placeholderTextColor="#94A3B8"
          value={reason}
          onChangeText={setReason}
        />

        {/* BUKTI SURAT (1 TOMBOL UTAMA UNTUK KAMERA / FILE) */}
        <Text style={styles.label}>Bukti Surat:</Text>

        {attachment ? (
          <View style={styles.attachmentPreviewCard}>
            {attachment.type === "image" ? (
              <Image
                source={{ uri: attachment.uri }}
                style={styles.previewImage}
              />
            ) : (
              <View style={styles.docPreviewBox}>
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={36}
                  color="#2563EB"
                />
                <Text style={styles.docNameText} numberOfLines={1}>
                  {attachment.name}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.removeFileButton}
              onPress={() => setAttachment(null)}
            >
              <MaterialCommunityIcons
                name="delete-outline"
                size={18}
                color="#EF4444"
              />
              <Text style={styles.removeFileText}>Hapus / Ganti Lampiran</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.singleUploadBtn}
            onPress={handleOpenAttachmentOptions}
            activeOpacity={0.85}
          >
            <View style={styles.uploadIconCircle}>
              <MaterialCommunityIcons
                name="attachment"
                size={22}
                color="#2563EB"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.uploadCardTitle}>Unggah Bukti Surat</Text>
              <Text style={styles.uploadCardSub}>
                Ketuk untuk ambil foto kamera atau pilih file PDF/Galeri
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="#94A3B8"
            />
          </TouchableOpacity>
        )}

        {/* TOMBOL KIRIM PENGAJUAN */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.submitButtonText}>Kirim</Text>
          <MaterialCommunityIcons
            name="send"
            size={18}
            color="#FFFFFF"
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#F8FAFC",
},
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
  },
  backButton: { marginRight: 15 },
  headerTitle: { 
    fontSize: 17,
    fontWeight: "900",
    color: "#1E293B",
  },
  headerSubtitle: { 
    fontSize: 12,
    color: "#64748B",
  },
  contentContainer: { padding: 20 },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 8,
    marginTop: 14,
  },
  categoryRow: { 
    flexDirection: "row",
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 8,
  },
  categoryCardSakitActive: {
    backgroundColor: "#FFF1F2",
    borderColor: "#FECDD3",
  },
  categoryCardIzinActive: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
  },
  categoryText: { 
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B"
  },
  categoryTextSakitActive: { 
    color: "#E11D48",
    fontWeight: "bold",
  },
  categoryTextIzinActive: { 
    color: "#2563EB", 
    fontWeight: "bold" 
  },
  dateRow: { 
    flexDirection: "row",
    marginTop: 4,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  dateText: { 
    fontSize: 13,
    color: "#1E293B",
    fontWeight: "600",
  },
  textArea: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 12,
    fontSize: 13,
    color: "#1E293B",
    textAlignVertical: "top",
    minHeight: 100,
  },
  singleUploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderStyle: "dashed",
    borderRadius: 14,
    padding: 16,
    gap: 12,
    marginTop: 4,
  },
  uploadIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadCardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 2,
  },
  uploadCardSub: { 
    fontSize: 11,
    color: "#64748B",
  },
  attachmentPreviewCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    marginTop: 4,
  },
  previewImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    resizeMode: "cover",
    marginBottom: 10,
  },
  docPreviewBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  docNameText: { 
    fontSize: 13,
    fontWeight: "700",
    color: "#1E293B",
    flex: 1
  },
  removeFileButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 4,
  },
  removeFileText: { 
    fontSize: 12, 
    fontWeight: "bold", 
    color: "#EF4444" 
  },
  submitButton: {
    backgroundColor: "#2563EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 28,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: { 
    color: "#FFFFFF", 
    fontSize: 15, 
    fontWeight: "bold" 
  },
});
