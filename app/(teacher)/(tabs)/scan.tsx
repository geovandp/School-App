import { Colors } from "@/constants/Colors"; // Sesuaikan dengan file warna Anda
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ScanScreen() {
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [locationText, setLocationText] = useState("Mendeteksi lokasi...");
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer); 
  }, []);

  useEffect(() => {
    let isMounted = true; 

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

        if (isMounted) {
          setCoordinates({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }

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
    return <View style={styles.centerContainer}><ActivityIndicator size="large" color={Colors.primary} /></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
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
          <MaterialCommunityIcons name="arrow-left" size={24} color="#1E293B" />
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
      />
      
      <View style={styles.overlay}>
        <View style={styles.unfocusedContainer} />

        <View style={styles.middleContainer}>
          <View style={styles.unfocusedContainer} />

          <View style={styles.focusedContainer}>
            {/* Sudut area pindai gaya modern (putih tipis) */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

            {isLoading && (
              <View style={styles.popupOverlay}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.popupText}>Memproses...</Text>
              </View>
            )}

            {successMessage && (
              <View style={styles.popupOverlaySuccess}>
                <MaterialCommunityIcons name="check-decagram-outline" size={36} color="#10B981" />
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
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <MaterialCommunityIcons name="map-marker-radius-outline" size={18} color={Colors.primary} />
              )}
              <Text style={styles.locationText} numberOfLines={1}>{locationText}</Text>
            </View>
            
            {coordinates && (
              <View style={styles.coordinatesRow}>
                <Text style={styles.coordinatesText}>Lat: {coordinates.latitude.toFixed(6)}</Text>
                <Text style={styles.coordinatesText}>Long: {coordinates.longitude.toFixed(6)}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8FAFC", padding: 20 },
  
  // -- Izin Kamera --
  permissionContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8FAFC", padding: 20 },
  permissionText: { fontSize: 16, fontWeight: "600", color: "#334155", textAlign: "center", marginBottom: 20 },
  permissionButton: { backgroundColor: Colors.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  permissionButtonText: { fontWeight: "bold", fontSize: 15, color: "#FFF" },
  
  // -- Header Atas --
  headerOverlay: { position: "absolute", top: 50, left: 20, right: 20, zIndex: 10, flexDirection: "row", alignItems: "center" },
  backButton: { 
    width: 44, 
    height: 44, 
    backgroundColor: "rgba(255, 255, 255, 0.9)", 
    borderRadius: 22, 
    justifyContent: "center", 
    alignItems: "center", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 
  },
  headerTitle: { marginLeft: 16, fontSize: 18, fontWeight: "bold", color: "#FFF", textShadowColor: "rgba(0, 0, 0, 0.5)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  
  // -- Area Scanner --
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  unfocusedContainer: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end", paddingBottom: 20 },
  middleContainer: { flexDirection: "row", height: 250 },
  focusedContainer: { width: 250, justifyContent: "center", alignItems: "center", position: "relative" },
  
  // Bingkai Kamera Tipis Putih
  corner: { position: "absolute", width: 40, height: 40, borderColor: "#FFF", borderWidth: 3 },
  topLeft: { top: 0, left: 0, borderBottomWidth: 0, borderRightWidth: 0 },
  topRight: { top: 0, right: 0, borderBottomWidth: 0, borderLeftWidth: 0 },
  bottomLeft: { bottom: 0, left: 0, borderTopWidth: 0, borderRightWidth: 0 },
  bottomRight: { bottom: 0, right: 0, borderTopWidth: 0, borderLeftWidth: 0 },
  
  // -- Popup Modern --
  popupOverlay: { backgroundColor: "#FFFFFF", padding: 16, borderRadius: 16, alignItems: "center", width: "80%" },
  popupOverlaySuccess: { backgroundColor: "#ECFDF5", padding: 16, borderRadius: 16, alignItems: "center", width: "80%" },
  popupText: { marginTop: 8, fontSize: 14, fontWeight: "600", color: "#334155" },
  successText: { marginTop: 8, fontSize: 15, fontWeight: "bold", color: "#10B981", textAlign: "center" },
  
  // -- Info Card Bawah --
  bottomInfoCard: { 
    backgroundColor: "#FFFFFF", 
    marginHorizontal: 20, 
    marginBottom: 40, 
    padding: 20, 
    borderRadius: 20, 
    shadowColor: "#0F172A", 
    shadowOffset: { width: 0, height: 10 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 15, 
    elevation: 8, 
    alignItems: "center" 
  },
  dateTimeHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
  dateText: { fontSize: 14, fontWeight: "600", color: "#334155" },
  timeText: { fontSize: 18, fontWeight: "bold", color: Colors.primary }, // Gunakan warna aksen
  
  locationBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#F8FAFC", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, gap: 8, maxWidth: "100%" },
  locationText: { fontSize: 13, fontWeight: "600", color: "#475569", flexShrink: 1 },
  
  coordinatesRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 16, marginTop: 12 },
  coordinatesText: { fontSize: 12, fontWeight: "500", color: "#94A3B8" },
});