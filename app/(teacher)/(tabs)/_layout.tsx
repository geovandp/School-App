import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function StudentTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary, // Warna saat menu aktif
        tabBarInactiveTintColor: "#8E8E93", // Warna saat tidak aktif
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      {/* 1. Beranda */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color, focused }) => (
            // Gunakan ikon terisi (solid) saat aktif, dan outline saat tidak aktif
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />

      {/* 2. Timeline */}
      <Tabs.Screen
        name="timeline"
        options={{
          title: "Timeline",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "text-box" : "text-box-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />

      {/* 3. Scan (Tombol Melayang Tengah) */}
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          // Teks "Scan" tetap dibiarkan muncul sesuai gambar
          tabBarIcon: () => (
            <View style={styles.floatingButtonContainer}>
              <View style={styles.floatingButton}>
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={26}
                  color="#FFFFFF"
                />
              </View>
            </View>
          ),
        }}
      />

      {/* 4. Notifikasi */}
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notifikasi",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "bell" : "bell-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />

      {/* 5. Akun */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Akun",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account-circle" : "account-circle-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    height: Platform.OS === "ios" ? 85 : 70,
    paddingBottom: Platform.OS === "ios" ? 25 : 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },
  floatingButtonContainer: {
    position: "absolute",
    top: -30, // Mengangkat tombol ke atas (keluar dari kotak navigasi)
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 6,
  },
});
