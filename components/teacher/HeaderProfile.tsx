import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TeacherHeader() {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.welcomeText}>Selamat Datang,</Text>
        <Text style={styles.nameText}>Bapak Budi, S.Pd</Text>
      </View>
      <View style={styles.headerNavContainer}>
        <TouchableOpacity 
          style={styles.iconButton} 
          activeOpacity={0.7}
          onPress={() => router.push('/(teacher)/page/notifikasi')}
        >
          <MaterialCommunityIcons name="bell-outline" size={22} color="#1E293B" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton} 
          activeOpacity={0.7}
          onPress={() => router.push('/(teacher)/page/profile')}
        >
          <MaterialCommunityIcons name="account-outline" size={22} color="#1E293B" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: "transparent", // Menyatu dengan background utama F8FAFC
  },
  headerNavContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12, // Memberikan jarak yang lebih modern antar tombol
  },
  welcomeText: {
    fontSize: 13,
    color: "#64748B", // Abu-abu kebiruan (Slate) untuk meta text
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A", // Hitam elegan, tidak terlalu pekat
    marginTop: 2,
  },
  // Menggabungkan styling notifikasi dan profil menjadi satu class yang seragam
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14, // Sudut melengkung halus
    backgroundColor: "#FFFFFF", // Putih bersih
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9", // Border sangat tipis dan halus
    // --- Soft Elevation / Soft Shadow ---
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
});