import { Colors } from "@/constants/Colors"; // Pastikan path ini sesuai
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TeacherTabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: [
          styles.tabBar,
          {
            // Buat height dan padding dinamis mengikuti insets perangkat
            height: 60 + (insets.bottom > 0 ? insets.bottom : 10),
            paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          },
        ],
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      {/* 1. Beranda */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "home" : "home-outline"} 
              size={28} 
              color={color} 
            />
          ),
        }}
      />

      {/* 2. Timeline / Notes */}
      <Tabs.Screen
        name="timeline"
        options={{
          title: "Notes",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "note-text" : "note-text-outline"} 
              size={28} 
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

      {/* 4. Notifikasi / Materi */}
      <Tabs.Screen
        name="notification"
        options={{
          title: "Materi",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "book-open-page-variant" : "book-open-page-variant-outline"} 
              size={28} 
              color={color} 
            />
          ),
        }}
      />

      {/* 5. Profil / Simirda */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Simirda",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "robot-happy" : "robot-happy-outline"} 
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
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
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
    top: -30, // Mengangkat tombol agar setengah melayang
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButton: {
    width: 58,
    height: 58,
    borderRadius: 29, // Membuat bentuk menjadi bulat sempurna
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    // Shadow menyesuaikan warna primer
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 6,
  },
});