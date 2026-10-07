import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../../constants/Colors";

export default function HeaderProfile() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[Colors.primary, "#FFFFFF"]} // Gradasi dari Hijau (Primary) ke Putih
      locations={[0.5, 1]}
      style={[styles.container, { paddingTop: insets.top + 20 }]}
    >
      <Image
        source={require("../../../assets/images/android-icon-foreground.png")}
        style={styles.watermarkLogo}
        resizeMode="contain"
      />

      <View style={styles.profileRow}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=11" }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>Alexander</Text>
          <Text style={styles.npm}>Murid • 666999</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 260,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    overflow: "hidden",
  },

  // 4. TAMBAHKAN STYLE UNTUK WATERMARK LOGO
  watermarkLogo: {
    position: "absolute",
    right: -40,
    top: -10,
    width: 230,
    height: 230,
    opacity: 0.6,
    transform: [{ rotate: "-15deg" }],
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    zIndex: 2,
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
