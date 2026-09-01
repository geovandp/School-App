import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TeacherHeader() {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.welcomeText}>Selamat Datang,</Text>
        <Text style={styles.nameText}>Bapak Budi, S.Pd</Text>
      </View>
      <View style={styles.headerNavContainer}>
        <TouchableOpacity style={styles.notificationButton}>
          <MaterialCommunityIcons name="bell-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountButton}>
          <MaterialCommunityIcons name="account-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  headerNavContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 20,
    gap: 8,
    paddingTop: 20,
    paddingBottom: 15,
  },
  welcomeText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  nameText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#000",
  },
  notificationButton: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#FFD166", // Kuning pastel
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  accountButton: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#FFD166", // Kuning pastel
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
});