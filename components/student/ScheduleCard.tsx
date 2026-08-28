import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

export default function ScheduleCard() {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <MaterialCommunityIcons
          name="calendar-blank"
          size={80}
          color="#FCE8E8"/>
        <Text style={styles.sleepText}>Z Z Z</Text>
        <Text style={styles.faceText}>- ᴗ -</Text>
      </View>
      <Text style={styles.text}>Jadwal Pelajaran</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: -90,
    borderRadius: 20,
    paddingVertical: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 5,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  sleepText: {
    position: "absolute",
    top: -10,
    left: -20,
    fontSize: 22,
    fontWeight: "900",
    color: "#3B8312",
    transform: [{ rotate: "-15deg" }],
  },
  faceText: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
    color: "#3B8312",
    bottom: 25,
  },
  text: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: "600",
    color: "#3B8312",
  },
});
