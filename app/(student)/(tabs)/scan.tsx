import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isFocused = useIsFocused();
  const router = useRouter();

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Kami membutuhkan akses kamera untuk melakukan absensi QR Code.
        </Text>
        <Button
          onPress={requestPermission}
          title="Izinkan Kamera"
          color={Colors.primary}
        />
      </View>
    );
  }

  const verifyAttendanceToServer = (qrData: string) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);

        if (qrData) {
          resolve({
            status: "success",
            message: `Absensi berhasil: ${qrData}`,
          });
        } else {
          reject({ status: "error", message: "QR Code tidak valid!" });
        }
      }, 1000);
    });
  };

  const handleBarcodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (scanned || isLoading) return;

    setScanned(true);

    try {
      const response: any = await verifyAttendanceToServer(data);

      // Tampilkan pesan sukses di layar
      setSuccessMessage(response.message);

      // Tunggu 1.5 detik lalu reset state dan kembali ke Beranda
      setTimeout(() => {
        setScanned(false); // Reset state agar tidak nyangkut saat dibuka kembali
        setSuccessMessage(null);
        router.replace("/(student)/(tabs)");
      }, 1500);
    } catch (error: any) {
      setSuccessMessage("Gagal memproses QR Code");
      setTimeout(() => {
        setScanned(false);
        setSuccessMessage(null);
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      {isFocused ? (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        >
          <View style={styles.overlay}>
            <View style={styles.unfocusedContainer}></View>
            <View style={styles.middleContainer}>
              <View style={styles.unfocusedContainer}></View>
              <View style={styles.focusedContainer}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />

                {/* Indikator Loading */}
                {isLoading && (
                  <View style={styles.popupOverlay}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text style={styles.popupText}>Memproses...</Text>
                  </View>
                )}

                {/* Pesan Sukses Menggantikan Alert */}
                {successMessage && (
                  <View style={styles.popupOverlay}>
                    <Text style={styles.successText}>{successMessage}</Text>
                  </View>
                )}
              </View>
              <View style={styles.unfocusedContainer}></View>
            </View>
            <View style={styles.unfocusedContainer}></View>
          </View>
        </CameraView>
      ) : (
        <View style={styles.container} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF",
  },
  permissionText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  middleContainer: {
    flexDirection: "row",
    flex: 1.5,
  },
  focusedContainer: {
    flex: 4,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#3B8312",
    borderWidth: 4,
  },
  topLeft: { top: 0, left: 0, borderBottomWidth: 0, borderRightWidth: 0 },
  topRight: { top: 0, right: 0, borderBottomWidth: 0, borderLeftWidth: 0 },
  bottomLeft: { bottom: 0, left: 0, borderTopWidth: 0, borderRightWidth: 0 },
  bottomRight: { bottom: 0, right: 0, borderTopWidth: 0, borderLeftWidth: 0 },
  popupOverlay: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    width: "80%",
  },
  popupText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
  },
  successText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#3B8312",
    textAlign: "center",
  },
  subText: {
    marginTop: 4,
    fontSize: 11,
    color: "#666",
  },
});
