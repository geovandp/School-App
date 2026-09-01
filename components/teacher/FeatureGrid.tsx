import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const features = [
  { id: "1", title: "Absensi", icon: "account-check", color: "#A0E8AF" }, // Hijau
  { id: "2", title: "Nilai", icon: "clipboard-text", color: "#FFADAD" },   // Pink
  { id: "3", title: "Tugas", icon: "book-open-variant", color: "#FDFFB6" }, // Kuning
  { id: "4", title: "Jadwal", icon: "calendar-clock", color: "#9BF6FF" },  // Biru
  { id: "5", title: "Jadwal", icon: "calendar-clock", color: "#9BF6FF" },  // Biru
  { id: "6", title: "Jadwal", icon: "calendar-clock", color: "#9BF6FF" },  // Biru
  { id: "7", title: "Jadwal", icon: "calendar-clock", color: "#9BF6FF" },  // Biru
  { id: "8", title: "Jadwal", icon: "calendar-clock", color: "#9BF6FF" },  // Biru
];

export default function TeacherFeatureGrid() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Menu Utama</Text>
      <View style={styles.grid}>
        {features.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.featureCard, { backgroundColor: item.color }]}
            activeOpacity={0.8}
          >
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name={item.icon as any} size={28} color="#000" />
            </View>
            <Text style={styles.featureTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  featureCard: {
    width: "48%",
    padding: 16,
    borderRadius: 16,
    borderWidth: 2.5,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    alignItems: "flex-start",
  },
  iconBox: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#000",
  },
});