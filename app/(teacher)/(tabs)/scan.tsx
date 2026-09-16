import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ScanScreen() {
  const router = useRouter();

  // State Izin Kamera
  const [permission, requestPermission] = useCameraPermissions();

  // State Presensi
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // State Waktu dan Lokasi
  const [currentTime, setCurrentTime] = useState(new Date());
  const [locationText, setLocationText] = useState("Mendeteksi lokasi...");

  // Effect untuk Jam Real-time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer); // Cleanup saat unmount
  }, []);

  // Effect untuk Deteksi Lokasi Real-time (DIperbaiki)
  // Effect untuk Deteksi Lokasi Real-time
  useEffect(() => {
    let isMounted = true; // Penanda agar state tidak update saat komponen mati

    const fetchLocation = async () => {
      try {
        let { status: existingStatus } = await Location.getForegroundPermissionsAsync();

        if (existingStatus !== "granted") {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            if (isMounted) setLocationText("Izin lokasi ditolak");
            return;
          }
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        let geocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (isMounted) {
          if (geocode.length > 0) {
            const currentPlace = geocode[0];
            const city = currentPlace.city || currentPlace.subregion || "Lokasi";
            const region = currentPlace.region || "Tidak diketahui";
            setLocationText(`${city}, ${region}`);
          } else {
            setLocationText("Detail lokasi tidak ditemukan");
          }
        }
      } catch (error) {
        if (isMounted) setLocationText("Gagal melacak lokasi");
      }
    };

    // Gunakan setTimeout biasa tanpa InteractionManager
    const timeout = setTimeout(() => {
      if (isMounted) {
        fetchLocation();
      }
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, []);

  // Format tanggal dan jam
  const formattedTime = currentTime.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const formattedDate = currentTime.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Presensi Berhasil!");

      setTimeout(() => {
        setSuccessMessage(null);
        router.back();
      }, 2000);
    }, 1500);
  };

  if (!permission) {
    return <View style={styles.centerContainer}><ActivityIndicator size="large" color="#000" /></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.permissionText}>Kami butuh izin untuk mengakses kamera.</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Izinkan Kamera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerOverlay}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Presensi</Text>
      </View>

      <CameraView
        style={StyleSheet.absoluteFill}
        facing="front"
        // onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        // barcodeScannerSettings={{
        //   barcodeTypes: ["qr"],
        // }}
      >
        <View style={styles.overlay}>
          <View style={styles.unfocusedContainer} />

          <View style={styles.middleContainer}>
            <View style={styles.unfocusedContainer} />

            <View style={styles.focusedContainer}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />

              {isLoading && (
                <View style={styles.popupOverlay}>
                  <ActivityIndicator size="large" color="#000" />
                  <Text style={styles.popupText}>Memproses...</Text>
                </View>
              )}

              {successMessage && (
                <View style={styles.popupOverlaySuccess}>
                  <MaterialCommunityIcons name="check-decagram" size={32} color="#000" />
                  <Text style={styles.successText}>{successMessage}</Text>
                </View>
              )}
            </View>

            <View style={styles.unfocusedContainer} />
          </View>

          <View style={styles.unfocusedContainer}>
            <View style={styles.bottomInfoCard}>
              <View style={styles.dateTimeHeader}>
                <Text style={styles.dateText}>{formattedDate}</Text>
                <Text style={styles.timeText}>{formattedTime}</Text>
              </View>
              <View style={styles.locationBadge}>
                {locationText === "Mendeteksi lokasi..." ? (
                  <ActivityIndicator size="small" color="#E63946" />
                ) : (
                  <MaterialCommunityIcons name="map-marker-radius" size={16} color="#E63946" />
                )}
                <Text style={styles.locationText} numberOfLines={1}>{locationText}</Text>
              </View>
            </View>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FDFBF7", padding: 20 },
  headerOverlay: { position: "absolute", top: 50, left: 20, right: 20, zIndex: 10, flexDirection: "row", alignItems: "center" },
  backButton: { width: 44, height: 44, backgroundColor: "#FFF", borderWidth: 2, borderColor: "#000", borderRadius: 12, justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3 },
  headerTitle: { marginLeft: 16, fontSize: 18, fontWeight: "900", color: "#FFF", textShadowColor: "rgba(0, 0, 0, 0.75)", textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 },
  permissionText: { fontSize: 16, fontWeight: "700", textAlign: "center", marginBottom: 20 },
  permissionButton: { backgroundColor: "#CAFFBF", paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8, borderWidth: 2, borderColor: "#000" },
  permissionButtonText: { fontWeight: "900", fontSize: 16 },
  overlay: { flex: 1 },
  unfocusedContainer: { flex: 1, justifyContent: "flex-end", paddingBottom: 20},
  middleContainer: { flexDirection: "row", height: 250 },
  focusedContainer: { width: 250, justifyContent: "center", alignItems: "center", position: "relative" },
  corner: {},
  topLeft: { top: 0, left: 0, borderBottomWidth: 0, borderRightWidth: 0 },
  topRight: { top: 0, right: 0, borderBottomWidth: 0, borderLeftWidth: 0 },
  bottomLeft: { bottom: 0, left: 0, borderTopWidth: 0, borderRightWidth: 0 },
  bottomRight: { bottom: 0, right: 0, borderTopWidth: 0, borderLeftWidth: 0 },
  popupOverlay: { backgroundColor: "#FDFFB6", padding: 16, borderRadius: 12, borderWidth: 2, borderColor: "#000", alignItems: "center" },
  popupOverlaySuccess: { backgroundColor: "#CAFFBF", padding: 16, borderRadius: 12, borderWidth: 2, borderColor: "#000", alignItems: "center" },
  popupText: { marginTop: 8, fontSize: 14, fontWeight: "800", color: "#000" },
  successText: { marginTop: 8, fontSize: 16, fontWeight: "900", color: "#000" },
  bottomInfoCard: { backgroundColor: "#FFF", marginHorizontal: 20, marginBottom: 40, padding: 16, borderRadius: 16, borderWidth: 3, borderColor: "#000", shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 6, alignItems: "center" },
  dateTimeHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: 10, paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: "#E0E0E0" },
  dateText: { fontSize: 14, fontWeight: "800", color: "#000" },
  timeText: { fontSize: 16, fontWeight: "900", color: "#4361EE" },
  locationBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#F0F0F0", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1.5, borderColor: "#000", gap: 6, maxWidth: "100%" },
  locationText: { fontSize: 13, fontWeight: "800", color: "#000", flexShrink: 1 },
});