import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

const { width } = Dimensions.get("window");
const FEATURES = [
  { id: 1, title: "Jadwal\nPelajaran",
    icon: "calendar",
    color: Colors.primary
},
  {
    id: 2,
    title: "Tugas",
    icon: "list-box",
    color: Colors.primary,
  },
  {
    id: 3,
    title: "Pengembangan\nKarakter ...",
    icon: "fire",
    color: Colors.primary,
  },
  {
    id: 4,
    title: "Survey",
    icon: "clipboard-list-outline",
    color: Colors.primary,
  },
  {
    id: 5,
    title: "Pelaporan\nKode Etik",
    icon: "shield-alert-outline",
    color: Colors.primary,
  },
  {
    id: 6,
    title: "Presensi\nSiswa",
    icon: "qrcode-scan",
    color: Colors.primary,
  },
  {
    id: 7,
    title: "Nilai\nSiswa",
    icon: "card-bulleted-outline",
    color: Colors.primary,
  },
  {
    id: 8,
    title: "Lainnya",
    icon: "view-grid-plus-outline",
    color: Colors.primary,
  },
];

export default function FeatureGrid() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitur Aplikasi</Text>
      <View style={styles.grid}>
        {FEATURES.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            activeOpacity={0.7}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={30}
                color={item.color}/>
            </View>
            <Text style={styles.itemText} numberOfLines={2}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textMain,
    marginBottom: 15,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    width: (width - 40) / 4 - 10,
    alignItems: "center",
    marginBottom: 20,
  },
  iconBox: {
    width: 60,
    height: 60,
    backgroundColor: Colors.white,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 11,
    color: "#333333",
    textAlign: "center",
    fontWeight: "500",
  },
});
