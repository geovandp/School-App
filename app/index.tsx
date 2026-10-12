import { useEffect, useRef } from "react";
import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  // Fungsi untuk membuka WhatsApp Helpdesk IT Sekolah
  const handleOpenWhatsApp = () => {
    const phoneNumber = "6281234567890";
    const message =
      "Halo Helpdesk IT Sekolah, saya membutuhkan bantuan terkait aplikasi ujian Simirda.";
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          return Linking.openURL(
            `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
          );
        }
      })
      .catch((err) => console.error("Gagal membuka WhatsApp:", err));
  };

  return (
    <View style={styles.container}>
      {/* Konten Utama dengan Animasi */}
      <Animated.View
        style={[
          styles.contentWrapper,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Ikon Header / Logo Aplikasi */}
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="school-outline"
            size={48}
            color="#2563EB"
          />
        </View>

        <Text style={styles.title}>SMAN Sederajat</Text>
        <Text style={styles.subtitle}>
          Pilih peran anda untuk masuk ke dalam sistem
        </Text>

        <TouchableOpacity
          style={[styles.button, styles.studentButton]}
          onPress={() => router.push("/(student)/(tabs)")}
          activeOpacity={0.85}
        >
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons
              name="account-school-outline"
              size={22}
              color="#FFFFFF"
            />
            <Text style={styles.buttonText}>Masuk sebagai Murid</Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.teacherButton]}
          onPress={() => router.push("/(teacher)/(tabs)")}
          activeOpacity={0.85}
        >
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons
              name="account-tie-outline"
              size={22}
              color="#FFFFFF"
            />
            <Text style={styles.buttonText}>Masuk sebagai Guru</Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Bagian Bawah: Footer Link WhatsApp & Branding */}
      <Animated.View style={[styles.footerContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={handleOpenWhatsApp} activeOpacity={0.7}>
          <Text style={styles.footerLinkText}>Hubungi Helpdesk IT Sekolah</Text>
        </TouchableOpacity>
        <Text style={styles.footerBrand}>Simirda by Nexora</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    marginTop: 40,
  },
  iconContainer: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 36,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  studentButton: {
    backgroundColor: "#2563EB",
  },
  teacherButton: {
    backgroundColor: "#059669",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  footerContainer: {
    alignItems: "center",
    marginBottom: 10,
    gap: 4,
  },
  footerLinkText: {
    fontSize: 12,
    color: "#484C53",
    fontWeight: "700",
    marginBottom: 2,
    textDecorationLine: "underline",
    letterSpacing: 0.5,
  },
  footerBrand: {
    fontSize: 13,
    color: "#475569",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
