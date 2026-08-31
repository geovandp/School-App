import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../../../constants/Colors";
import HeaderProfile from "../../../components/student/HeaderProfile";
import ScheduleCard from "../../../components/student/ScheduleCard";
import FeatureGrid from "../../../components/student/FeatureGrid";

export default function StudentHomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* 1. Header Profil */}
        <HeaderProfile />

        {/* 2. Kartu Jadwal Mengambang */}
        <ScheduleCard />

        {/* 3. Grid Fitur Aplikasi */}
        <FeatureGrid />

        {/* 4. Event Banner (Bisa dipisah juga jika mau) */}
        <View style={styles.bannerSection}>
          <Text style={styles.sectionTitle}>School Event</Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.bannerContainer}>
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerText}>PROGRAM MBG</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  bannerSection: {
    paddingHorizontal: 20,
    marginTop: 10,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textMain,
    marginBottom: 15,
  },
  bannerContainer: {
    width: "100%",
    height: 120,
    borderRadius: 15,
    overflow: "hidden",
  },
  bannerPlaceholder: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerText: {
    color: Colors.white,
    fontWeight: "900",
    fontSize: 20,
    letterSpacing: 1,
  },
});
