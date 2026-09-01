import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
// 1. Import library Safe Area
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function StudentTabsLayout() {
  // 2. Panggil hook insets untuk mendapatkan ukuran akurat poni/garis bawah layar
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
            // 3. Buat height dan padding dinamis mengikuti insets perangkat
            height: 60 + (insets.bottom > 0 ? insets.bottom : 10),
            paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          },
        ],
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      {/* ... (Bagian Tabs.Screen tidak ada yang berubah, biarkan persis seperti kode Anda) ... */}

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
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    // CATATAN: Untuk tablet/laptop, Anda bisa memberi batasan max-width agar tidak merenggang konyol.
    // Opsional: uncomment kode di bawah ini jika ingin membatasi lebar di Web/Tablet
    // alignSelf: 'center',
    // width: '100%',
    // maxWidth: 600,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },
  floatingButtonContainer: {
    position: "absolute",
    top: -30,
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
