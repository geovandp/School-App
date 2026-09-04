import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TeacherTabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Matikan label bawaan agar tidak berantakan
        tabBarStyle: [
          styles.tabBar,
          {
            // Tambah sedikit tinggi tab bar agar muat untuk tombol + teks
            height: 75 + (insets.bottom > 0 ? insets.bottom : 10),
            paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          },
        ],
      }}
    >
      {/* 1. Beranda */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.menuContainer}>
              <View
                style={[
                  styles.floatingButton,
                  focused ? styles.activeButton : styles.inactiveButton,
                ]}
              >
                <MaterialCommunityIcons name="home" size={24} color="#000" />
              </View>
              <Text style={[styles.menuLabel, focused && styles.menuLabelActive]}>
                Beranda
              </Text>
            </View>
          ),
        }}
      />

      {/* 2. Timeline */}
      <Tabs.Screen
        name="timeline"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.menuContainer}>
              <View
                style={[
                  styles.floatingButton,
                  focused ? styles.activeButton : styles.inactiveButton,
                ]}
              >
                <MaterialCommunityIcons name="note" size={24} color="#000" />
              </View>
              <Text style={[styles.menuLabel, focused && styles.menuLabelActive]}>
                Notes
              </Text>
            </View>
          ),
        }}
      />

      {/* 3. Scan (Lebih besar, ditarik lebih ke atas) */}
      <Tabs.Screen
        name="scan"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.scanContainer}>
              <View
                style={[
                  styles.floatingScanButton,
                  focused ? styles.activeButtonScan : styles.inactiveButtonScan,
                ]}
              >
                <MaterialCommunityIcons name="qrcode-scan" size={32} color="#000" />
              </View>
              <Text style={[styles.menuLabel, focused && styles.menuLabelActive, { marginTop: 8 }]}>
                Scan
              </Text>
            </View>
          ),
        }}
      />

      {/* 4. Notifikasi */}
      <Tabs.Screen
        name="notification"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.menuContainer}>
              <View
                style={[
                  styles.floatingButton,
                  focused ? styles.activeButton : styles.inactiveButton,
                ]}
              >
                <MaterialCommunityIcons name="book-open-page-variant-outline" size={24} color="#000" />
              </View>
              <Text style={[styles.menuLabel, focused && styles.menuLabelActive]}>
                Materi
              </Text>
            </View>
          ),
        }}
      />

      {/* 5. Profil */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.menuContainer}>
              <View
                style={[
                  styles.floatingButton,
                  focused ? styles.activeButton : styles.inactiveButton,
                ]}
              >
                <MaterialCommunityIcons name="assistant" size={24} color="#000" />
              </View>
              <Text style={[styles.menuLabel, focused && styles.menuLabelActive]}>
                Anise
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 3,
    borderTopColor: "#000",
    elevation: 0,
    shadowColor: "transparent",
  },
  
  // Container untuk masing-masing menu (Icon + Teks)
  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 65, // Memberi ruang agar teks tidak terpotong
  },
  scanContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30, // Tombol scan ditarik lebih ke atas
    width: 70,
  },

  // Teks Label
  menuLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#8E8E93",
    marginTop: 6, // Jarak teks dengan kotak
  },
  menuLabelActive: {
    color: "#000",
    fontWeight: "900", // Teks menjadi sangat tebal (Brutalism) saat aktif
  },

  // Tombol Normal (4 Menu Samping)
  floatingButton: {
    width: 48,
    height: 48,
    borderRadius: 12, // Kotak melengkung
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: "#000",
    
    // Solid Shadow
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  activeButton: {
    backgroundColor: "#FFE156", // Kuning saat aktif
  },
  inactiveButton: {
    backgroundColor: "#FFFFFF", // Putih saat mati
  },

  // Tombol Scan (Tengah)
  floatingScanButton: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#000",
    
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  activeButtonScan: {
    backgroundColor: "#A0E8AF", // Tetap hijau saat ditekan
  },
  inactiveButtonScan: {
    backgroundColor: "#A0E8AF", // Hijau pastel
  },
});