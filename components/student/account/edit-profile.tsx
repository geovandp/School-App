import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

export default function EditProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState({
    name: "Alexander",
    nisn: "666999",
    email: "alexander@student.sch.id",
    phone: "081234567890",
    address: "Jl. Merdeka No. 45",
    birthDate: "14 Agustus 2008",
  });
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=11");
  const handlePickImage = () => {
    Alert.alert("Ubah Foto Profil", "Pilih sumber foto:", [
      {
        text: "Kamera",
        onPress: () => Alert.alert("Info", "Fitur kamera akan segera dibuka."),
      },
      {
        text: "Galeri Foto",
        onPress: () => {
          setAvatar("https://i.pravatar.cc/150?img=25");
          Alert.alert("Berhasil", "Foto profil berhasil diperbarui.");
        },
      },
      { text: "Batal", style: "cancel" },
    ]);
  };

  const handleSave = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      Alert.alert("Peringatan", "Mohon lengkapi data yang wajib diisi!");
      return;
    }

    Alert.alert("Berhasil", "Perubahan profil Anda berhasil disimpan.", [
      { text: "OK", onPress: () => router.back() },
    ]);
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
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={26}
              color="#1E293B"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profil Siswa</Text>
          <View style={{ width: 30 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* FOTO PROFIL SECTION */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
              <TouchableOpacity
                style={styles.cameraIconButton}
                onPress={handlePickImage}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons
                  name="camera"
                  size={18}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.avatarSubText}>
              Ketuk ikon kamera untuk mengganti foto
            </Text>
          </View>

          {/* FORM INPUTS */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Nama Lengkap</Text>
            <View style={styles.inputBox}>
              <MaterialCommunityIcons
                name="account-outline"
                size={20}
                color="#94A3B8"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                placeholder="Masukkan nama lengkap"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>
              NISN (Nomor Induk Siswa Nasional)
            </Text>
            <View style={[styles.inputBox, styles.disabledInputBox]}>
              <MaterialCommunityIcons
                name="card-account-details-outline"
                size={20}
                color="#CBD5E1"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.textInput, { color: "#94A3B8" }]}
                value={formData.nisn}
                editable={false}
              />
              <Text style={styles.lockText}>Terkunci</Text>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Email Sekolah</Text>
            <View style={styles.inputBox}>
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color="#94A3B8"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                keyboardType="email-address"
                placeholder="email@student.sch.id"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Nomor Telepon / WhatsApp</Text>
            <View style={styles.inputBox}>
              <MaterialCommunityIcons
                name="phone-outline"
                size={20}
                color="#94A3B8"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                value={formData.phone}
                onChangeText={(text) =>
                  setFormData({ ...formData, phone: text })
                }
                keyboardType="phone-pad"
                placeholder="08123456789"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Tanggal Lahir</Text>
            <View style={styles.inputBox}>
              <MaterialCommunityIcons
                name="calendar-range"
                size={20}
                color="#94A3B8"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                value={formData.birthDate}
                onChangeText={(text) =>
                  setFormData({ ...formData, birthDate: text })
                }
                placeholder="DD Bulan YYYY"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Alamat Rumah</Text>
            <View
              style={[
                styles.inputBox,
                { height: 90, alignItems: "flex-start", paddingTop: 12 },
              ]}
            >
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={20}
                color="#94A3B8"
                style={styles.inputIcon}
              />
              <TextInput
                style={[
                  styles.textInput,
                  { height: 70, textAlignVertical: "top" },
                ]}
                value={formData.address}
                onChangeText={(text) =>
                  setFormData({ ...formData, address: text })
                }
                multiline={true}
                placeholder="Masukkan alamat lengkap"
              />
            </View>
          </View>

          {/* SIMPAN BUTTON */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="content-save-check-outline"
              size={20}
              color="#FFFFFF"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
          </TouchableOpacity>
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: "900", color: "#1E293B" },

  contentContainer: { padding: 20, paddingBottom: 40 },

  avatarSection: { alignItems: "center", marginBottom: 25 },
  avatarContainer: { position: "relative", marginBottom: 8 },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    backgroundColor: "#E2E8F0",
  },
  cameraIconButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2.5,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  avatarSubText: { fontSize: 12, color: "#64748B", fontWeight: "500" },

  formGroup: { marginBottom: 16 },
  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    height: 52,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  disabledInputBox: { backgroundColor: "#F1F5F9", borderColor: "#E2E8F0" },
  inputIcon: { marginRight: 10 },
  textInput: { flex: 1, fontSize: 14, color: "#1E293B", fontWeight: "500" },
  lockText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#94A3B8",
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  saveButton: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
