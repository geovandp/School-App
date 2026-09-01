import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TeacherFeatureGrid from "../../../components/teacher/FeatureGrid";
import TeacherHeader from "../../../components/teacher/HeaderProfile";
import TeacherScheduleCard from "../../../components/teacher/ScheduleCard";

export default function TeacherHomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />

      {/* 
        stickyHeaderIndices={[1]} 
        Artinya elemen anak ke-1 (indeks 1) yaitu <TeacherScheduleCard /> 
        akan menempel di atas saat discroll melewati header.
      */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        bounces={false}
        stickyHeaderIndices={[1]}
      >
        {/* Indeks 0: Header Profil */}
        <TeacherHeader />

        {/* Indeks 1: Kartu Jadwal (Menempel/Sticky saat scroll) */}
        <TeacherScheduleCard />

        {/* Indeks 2 dst: Konten di bawahnya */}
        <View style={styles.contentBody}>
          <TeacherFeatureGrid />

          <View style={styles.bannerSection}>
            <Text style={styles.sectionTitle}>School Event</Text>
            <TouchableOpacity activeOpacity={0.9} style={styles.bannerContainer}>
              <View style={styles.bannerPlaceholder}>
                <Text style={styles.bannerText}>PROGRAM MBG</Text>
                <Text style={styles.bannerSubText}>Makan Bergizi Gratis 2026</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerSection}>
            <Text style={styles.sectionTitle}>School Event</Text>
            <TouchableOpacity activeOpacity={0.9} style={styles.bannerContainer}>
              <View style={styles.bannerPlaceholder}>
                <Text style={styles.bannerText}>PROGRAM MBG</Text>
                <Text style={styles.bannerSubText}>Makan Bergizi Gratis 2026</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerSection}>
            <Text style={styles.sectionTitle}>School Event</Text>
            <TouchableOpacity activeOpacity={0.9} style={styles.bannerContainer}>
              <View style={styles.bannerPlaceholder}>
                <Text style={styles.bannerText}>PROGRAM MBG</Text>
                <Text style={styles.bannerSubText}>Makan Bergizi Gratis 2026</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerSection}>
            <Text style={styles.sectionTitle}>School Event</Text>
            <TouchableOpacity activeOpacity={0.9} style={styles.bannerContainer}>
              <View style={styles.bannerPlaceholder}>
                <Text style={styles.bannerText}>PROGRAM MBG</Text>
                <Text style={styles.bannerSubText}>Makan Bergizi Gratis 2026</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerSection}>
            <Text style={styles.sectionTitle}>School Event</Text>
            <TouchableOpacity activeOpacity={0.9} style={styles.bannerContainer}>
              <View style={styles.bannerPlaceholder}>
                <Text style={styles.bannerText}>PROGRAM MBG</Text>
                <Text style={styles.bannerSubText}>Makan Bergizi Gratis 2026</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerSection}>
            <Text style={styles.sectionTitle}>School Event</Text>
            <TouchableOpacity activeOpacity={0.9} style={styles.bannerContainer}>
              <View style={styles.bannerPlaceholder}>
                <Text style={styles.bannerText}>PROGRAM MBG</Text>
                <Text style={styles.bannerSubText}>Makan Bergizi Gratis 2026</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFBF7",
  },
  contentBody: {
    marginTop: 10,
  },
  bannerSection: {
    paddingHorizontal: 20,
    marginTop: 5,
    paddingBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000",
    marginBottom: 12,
  },
  bannerContainer: {
    width: "100%",
    height: 110,
    borderRadius: 16,
    backgroundColor: "#FFB703",
    borderWidth: 3,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
    overflow: "hidden",
  },
  bannerPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  bannerText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 20,
    letterSpacing: 1,
  },
  bannerSubText: {
    color: "#333",
    fontWeight: "700",
    fontSize: 12,
    marginTop: 4,
  },
});