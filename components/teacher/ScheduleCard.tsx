import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TeacherScheduleCard() {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>JADWAL HARI INI</Text>
        </View>
        <Text style={styles.timeText}>08:00 - 09:30</Text>
      </View>
      <Text style={styles.subjectTitle}>Matematika Lanjutan</Text>
      <Text style={styles.classInfo}>Kelas XII IPA 1 • Ruang 302</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    backgroundColor: "#E4D4FF", // Ungu pastel
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  badge: {
    backgroundColor: "#000",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "900",
  },
  timeText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#333",
  },
  subjectTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000",
    marginBottom: 6,
  },
  classInfo: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
});