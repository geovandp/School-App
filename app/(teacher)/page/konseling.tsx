import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Daftar Kategori Laporan
const KATEGORI_OPSI = [
  "Konsumsi Minuman Beralkohol",
  "Merokok",
  "Perundungan",
  "Pengerusakan Fasilitas",
  "Pelecehan",
  "Berkelahi / Tawuran",
  "Bolos",
  "Lainnya",
];

export default function LaporKodeEtikPage() {
  const insets = useSafeAreaInsets();

  // State untuk menyimpan input pengguna
  const [kategori, setKategori] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [kronologi, setKronologi] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Fungsi asli untuk membuka galeri ponsel
  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("Maaf, kami membutuhkan izin akses galeri untuk mengunggah foto.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], 
      allowsEditing: true, 
      aspect: [4, 3], 
      quality: 0.7, 
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!kategori) {
      alert("Mohon pilih kategori laporan terlebih dahulu.");
      return;
    }
    if (!lokasi.trim() || !kronologi.trim()) {
      alert("Mohon isi lokasi dan kronologi kejadian.");
      return;
    }
    
    alert("Laporan berhasil dikirim!");
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: Math.max(insets.bottom, 16),
          },
        ]}
      >
        {/* Header */}
        <View style={styles.pageHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Lapor Kode Etik</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Form Content */}
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.warningBox}>
            <MaterialCommunityIcons name="shield-alert-outline" size={24} color="#000" />
            <Text style={styles.warningText}>
              Laporan Anda bersifat rahasia dan akan ditindaklanjuti oleh tim kedisiplinan.
            </Text>
          </View>

          {/* Opsi Kategori */}
          <Text style={styles.inputLabel}>Kategori Kejadian <Text style={styles.requiredAsterisk}>*</Text></Text>
          <View style={styles.kategoriContainer}>
            {KATEGORI_OPSI.map((item) => {
              const isSelected = kategori === item;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.kategoriChip, isSelected && styles.kategoriChipSelected]}
                  onPress={() => setKategori(item)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.kategoriText, isSelected && styles.kategoriTextSelected]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Input Lokasi */}
          <Text style={styles.inputLabel}>Lokasi Kejadian <Text style={styles.requiredAsterisk}>*</Text></Text>
          <TextInput
            style={styles.textInput}
            placeholder="Contoh: Kantin Sekolah, Lorong Kelas 10..."
            placeholderTextColor="#888"
            value={lokasi}
            onChangeText={setLokasi}
          />

          {/* Input Kronologi */}
          <Text style={styles.inputLabel}>Kronologi <Text style={styles.requiredAsterisk}>*</Text></Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Ceritakan secara detail apa yang terjadi..."
            placeholderTextColor="#888"
            value={kronologi}
            onChangeText={setKronologi}
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
          />

          {/* Input Foto (Opsional) */}
          <Text style={styles.inputLabel}>Unggah Foto Bukti (Opsional)</Text>
          <TouchableOpacity 
            style={styles.uploadBox} 
            activeOpacity={0.7}
            onPress={handlePickImage}
          >
            {imageUri ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: imageUri }} style={styles.previewImage} />
                <View style={styles.changeImageBadge}>
                  <MaterialCommunityIcons name="refresh" size={16} color="#FFF" />
                  <Text style={styles.changeImageText}>Ganti Foto</Text>
                </View>
              </View>
            ) : (
              <View style={styles.uploadPlaceholder}>
                <MaterialCommunityIcons name="camera-plus-outline" size={32} color="#555" />
                <Text style={styles.uploadText}>Ketuk untuk memilih foto</Text>
              </View>
            )}
          </TouchableOpacity>
        </ScrollView>

        {/* Tombol Kirim */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.8} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Kirim Laporan</Text>
            <MaterialCommunityIcons name="send-check" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFBF7",
  },
  // --- Header ---
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderBottomColor: "#000",
    backgroundColor: "#FFF",
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000",
    textAlign: "center",
    flex: 1,
  },
  // --- Scroll Content ---
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  warningBox: {
    flexDirection: "row",
    backgroundColor: "#FDFFB6",
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: "center",
    boxShadow: "3px 3px 0px rgba(0, 0, 0, 1)",
  },
  warningText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 13,
    fontWeight: "700",
    color: "#000",
    lineHeight: 18,
  },
  // --- Opsi Kategori (Chip Buttons) ---
  kategoriContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Agar otomatis turun ke baris bawah jika tidak muat
    gap: 10,
    marginBottom: 20,
  },
  kategoriChip: {
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
  },
  kategoriChipSelected: {
    backgroundColor: "#9BF6FF", // Warna cyan pastel saat ditekan
    boxShadow: "0px 0px 0px rgba(0, 0, 0, 1)", // Hilangkan bayangan seolah ditekan
    transform: [{ translateX: 2 }, { translateY: 2 }], // Efek tombol masuk
  },
  kategoriText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },
  kategoriTextSelected: {
    fontWeight: "900",
    color: "#000",
  },
  // --- Form Inputs ---
  inputLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: "#000",
    marginBottom: 8,
  },
  requiredAsterisk: {
    color: "#FF595E",
  },
  textInput: {
    backgroundColor: "#FFF",
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 20,
    boxShadow: "3px 3px 0px rgba(0, 0, 0, 1)",
  },
  textArea: {
    height: 120,
    paddingTop: 16, 
  },
  // --- Upload Box ---
  uploadBox: {
    backgroundColor: "#E4D4FF",
    borderWidth: 3,
    borderColor: "#000",
    borderStyle: "dashed",
    borderRadius: 12,
    height: 160,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  uploadPlaceholder: {
    alignItems: "center",
  },
  uploadText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#555",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  changeImageBadge: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  changeImageText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
  },
  // --- Bottom Button ---
  bottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#FDFBF7",
  },
  submitButton: {
    backgroundColor: "#A0E8AF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 14,
    paddingVertical: 16,
    gap: 8,
    boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#000",
  },
});