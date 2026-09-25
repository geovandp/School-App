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
  Switch,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

export default function KeamananAkunScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Peringatan", "Mohon isi semua kolom kata sandi!");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Gagal", "Kata sandi baru dan konfirmasi sandi tidak cocok.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Peringatan", "Kata sandi baru minimal harus 6 karakter.");
      return;
    }

    // Simulasi Berhasil Ubah Password
    Alert.alert(
      "Berhasil",
      "Kata sandi akun Anda berhasil diperbarui. Silakan gunakan sandi baru untuk login selanjutnya.",
      [
        {
          text: "OK",
          onPress: () => {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
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
          <Text style={styles.headerTitle}>Keamanan Akun</Text>
          <View style={{ width: 30 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* INFO BOX */}
          <View style={styles.infoBox}>
            <MaterialCommunityIcons
              name="shield-lock-outline"
              size={22}
              color="#0284C7"
            />
            <Text style={styles.infoText}>
              Lindungi akun anda dengan memperbarui kata sandi secara
              berkala dan mengaktifkan fitur pengaman tambahan.
            </Text>
          </View>

          {/* SECTION 1: UBAH KATA SANDI */}
          <Text style={styles.sectionTitle}>UBAH KATA SANDI</Text>
          <View style={styles.cardContainer}>
            {/* Sandi Lama */}
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Kata Sandi Lama</Text>
              <View style={styles.inputBox}>
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={20}
                  color="#94A3B8"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  secureTextEntry={!showOld}
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  placeholder="Masukkan sandi lama"
                  placeholderTextColor="#94A3B8"
                />
                <TouchableOpacity onPress={() => setShowOld(!showOld)}>
                  <MaterialCommunityIcons
                    name={showOld ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#94A3B8"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sandi Baru */}
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Kata Sandi Baru</Text>
              <View style={styles.inputBox}>
                <MaterialCommunityIcons
                  name="lock-reset"
                  size={20}
                  color="#94A3B8"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  secureTextEntry={!showNew}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Minimal 6 karakter"
                  placeholderTextColor="#94A3B8"
                />
                <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                  <MaterialCommunityIcons
                    name={showNew ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#94A3B8"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Konfirmasi Sandi Baru */}
            <View style={[styles.formGroup, { marginBottom: 20 }]}>
              <Text style={styles.inputLabel}>Konfirmasi Kata Sandi Baru</Text>
              <View style={styles.inputBox}>
                <MaterialCommunityIcons
                  name="lock-check-outline"
                  size={20}
                  color="#94A3B8"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  secureTextEntry={!showConfirm}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Ulangi sandi baru"
                  placeholderTextColor="#94A3B8"
                />
                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                  <MaterialCommunityIcons
                    name={showConfirm ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#94A3B8"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleChangePassword}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="key-change"
                size={18}
                color="#FFFFFF"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.submitButtonText}>Perbarui Kata Sandi</Text>
            </TouchableOpacity>
          </View>

          {/* SECTION 2: PENGATURAN KEAMANAN TAMBAHAN */}
          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
            PENGATURAN TAMBAHAN
          </Text>
          <View style={styles.cardContainer}>
            {/* Biometrik / Sidik Jari */}
            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <MaterialCommunityIcons
                  name="fingerprint"
                  size={22}
                  color={Colors.primary}
                  style={{ marginRight: 12 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.switchTitle}>Login Biometrik</Text>
                  <Text style={styles.switchSub}>
                    Gunakan sidik jari atau Face ID untuk masuk cepat
                  </Text>
                </View>
              </View>
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: "#CBD5E1", true: Colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.divider} />

            {/* Verifikasi Dua Langkah */}
            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <MaterialCommunityIcons
                  name="cellphone-key"
                  size={22}
                  color="#F59E0B"
                  style={{ marginRight: 12 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.switchTitle}>
                    Verifikasi Masuk Perangkat
                  </Text>
                  <Text style={styles.switchSub}>
                    Konfirmasi via SMS/Email saat login di perangkat baru
                  </Text>
                </View>
              </View>
              <Switch
                value={twoFactorEnabled}
                onValueChange={setTwoFactorEnabled}
                trackColor={{ false: "#CBD5E1", true: Colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
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

  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2FE",
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#BAE6FD",
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: "#0369A1",
    marginLeft: 10,
    lineHeight: 18,
    fontWeight: "500",
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#64748B",
    marginBottom: 8,
    letterSpacing: 0.8,
  },

  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },

  formGroup: { marginBottom: 14 },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: { marginRight: 10 },
  textInput: { flex: 1, fontSize: 14, color: "#1E293B", fontWeight: "500" },

  submitButton: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  switchInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  switchTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 2,
  },
  switchSub: {
    fontSize: 11,
    color: "#64748B",
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 14,
  },
});
