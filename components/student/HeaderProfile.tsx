import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";

export default function HeaderProfile() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <View style={styles.profileRow}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=11" }}
          style={styles.image}/>
        <View style={styles.textContainer}>
          <Text style={styles.name}>Geo anak baik</Text>
          <Text style={styles.npm}>Siswa Nakal • 1201220450</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: 240,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  textContainer: {
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
  },
  npm: {
    fontSize: 13,
    color: Colors.white,
    opacity: 0.9,
    marginTop: 2,
  },
});
