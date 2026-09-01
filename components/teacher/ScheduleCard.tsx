import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const scheduleData = [
  {
    id: "1",
    time: "08:00 - 09:30",
    subject: "Matematika Lanjutan",
    classInfo: "Kelas XII IPA 1 • Ruang 302",
    bgColor: "#E4D4FF", // Ungu pastel
    status: "Berlangsung", // Ungu pastel
  },
  {
    id: "2",
    time: "10:00 - 11:30",
    subject: "Fisika Dasar",
    classInfo: "Kelas XII IPA 2 • Lab Fisika",
    bgColor: "#FDFFB6", // Kuning pastel
    status: "Akan Datang",
  },
  {
    id: "3",
    time: "10:00 - 11:30",
    subject: "Fisika Dasar",
    classInfo: "Kelas XII IPA 2 • Lab Fisika",
    bgColor: "#FDFFB6", // Kuning pastel
    status: "Akan Datang",
  },
];

export default function TeacherScheduleCard() {
  return (
    <View style={styles.outerWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {scheduleData.map((item) => (
          <View
            key={item.id}
            style={[styles.cardContainer, { backgroundColor: item.bgColor }]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>

            <Text style={styles.subjectTitle}>{item.subject}</Text>
            <Text style={styles.classInfo}>{item.classInfo}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    width: "100%",
    backgroundColor: "#FFF",
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    gap: 14, // Jarak antar card
  },
  cardContainer: {
    width: 295, // Ukuran lebar card agar muat & memberi clue bisa di-scroll
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
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