import { useEffect, useRef } from "react";
import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
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
          Pilih peran Anda untuk masuk ke sistem ujian aman
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
            <Text style={styles.buttonText}>Masuk sebagai Siswa</Text>
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

      {/* Bagian Bawah: Branding By Simirda */}
      <Animated.View style={[styles.footerContainer, { opacity: fadeAnim }]}>
        <Text style={styles.footerText}>Secure Exam System</Text>
        <Text style={styles.footerBrand}>By Simirda</Text>
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
  },
  footerText: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "500",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  footerBrand: {
    fontSize: 13,
    color: "#475569",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
