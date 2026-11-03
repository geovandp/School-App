import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function FaceRegistrationPage() {
    const insets = useSafeAreaInsets();
    const [isScanning, setIsScanning] = useState(false);
    const [scanComplete, setScanComplete] = useState(false);

    // Konfigurasi Izin Kamera (mengikuti cara di scan.tsx)
    const [permission, requestPermission] = useCameraPermissions();

    const handleStartScan = () => {
        setIsScanning(true);
        // Simulasi proses pemindaian AI dari kamera selama 3 detik
        setTimeout(() => {
            setIsScanning(false);
            setScanComplete(true);
        }, 3000);
    };

    const handleSaveData = () => {
        Alert.alert("Berhasil", "Data wajah AI berhasil didaftarkan untuk sistem presensi!", [
            { text: "OK", onPress: () => router.back() }
        ]);
    };

    const handleRetake = () => {
        setScanComplete(false);
    };

    // Tampilan jika izin kamera masih diproses
    if (!permission) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={styles.loadingText}>Memuat pengaturan kamera...</Text>
            </View>
        );
    }

    // Tampilan jika izin kamera ditolak
    if (!permission.granted) {
        return (
            <View style={styles.centerContainer}>
                <View style={styles.permissionContainer}>
                    <MaterialCommunityIcons name="camera-off" size={60} color="#FF6B6B" />
                    <Text style={styles.permissionTitle}>Akses Kamera Ditolak</Text>
                    <Text style={styles.permissionDesc}>
                        Kami membutuhkan akses kamera untuk mendaftarkan wajah Anda ke dalam sistem AI.
                    </Text>
                    <TouchableOpacity style={styles.primaryButton} onPress={requestPermission}>
                        <Text style={styles.primaryButtonText}>Izinkan Kamera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.secondaryButton, { marginTop: 12 }]} onPress={() => router.back()}>
                        <Text style={styles.secondaryButtonText}>Kembali</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top,
                    paddingBottom: Math.max(insets.bottom, 16),
                },
            ]}
        >
            {/* Header Halaman */}
            <View style={styles.pageHeader}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Pendaftaran Wajah AI</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Konten Utama */}
            <View style={styles.contentContainer}>

                {/* Instruksi Teks */}
                <View style={styles.instructionBox}>
                    <Text style={styles.instructionTitle}>
                        {scanComplete
                            ? "Pemindaian Selesai!"
                            : isScanning
                                ? "Memproses Wajah..."
                                : "Posisikan Wajah Anda"}
                    </Text>
                    <Text style={styles.instructionDesc}>
                        {scanComplete
                            ? "Wajah Anda berhasil dikenali oleh sistem AI. Silakan simpan untuk melanjutkan."
                            : isScanning
                                ? "Harap diam sejenak, AI sedang merekam titik biometrik wajah..."
                                : "Posisikan wajah Anda tepat di dalam bingkai oval di bawah ini dengan pencahayaan yang cukup."}
                    </Text>
                </View>

                {/* AREA SCANNER WAJAH OVAL DENGAN KAMERA ASLI */}
                <View style={styles.scannerContainer}>
                    <View style={styles.scannerWrapper}>
                        <View style={[
                            styles.ovalFrame,
                            isScanning && styles.ovalFrameScanning,
                            scanComplete && styles.ovalFrameComplete
                        ]}>
                            {scanComplete ? (
                                <View style={styles.successIconBox}>
                                    <MaterialCommunityIcons name="check-bold" size={50} color="#000" />
                                    <Text style={styles.successText}>Terverifikasi</Text>
                                </View>
                            ) : (
                                <View style={styles.cameraContainer}>
                                    <CameraView
                                        style={styles.camera}
                                        facing="front"
                                    />
                                </View>
                            )}
                        </View>

                        {/* Indikator Sudut / Hiasan Neobrutalism */}
                        <View style={styles.cornerTL} />
                        <View style={styles.cornerTR} />
                        <View style={styles.cornerBL} />
                        <View style={styles.cornerBR} />
                    </View>
                </View>

                {/* TIPS / CATATAN */}
                {!scanComplete && !isScanning && (
                    <View style={styles.tipsCard}>
                        <MaterialCommunityIcons name="lightbulb-outline" size={20} color="#000" />
                        <Text style={styles.tipsText}>
                            Pastikan tidak menggunakan masker, kacamata hitam, atau topi agar hasil akurat.
                        </Text>
                    </View>
                )}

                {/* TOMBOL AKSI */}
                <View style={styles.actionContainer}>
                    {scanComplete ? (
                        <View style={{ gap: 12, width: "100%" }}>
                            <TouchableOpacity
                                style={styles.primaryButton}
                                activeOpacity={0.8}
                                onPress={handleSaveData}
                            >
                                <MaterialCommunityIcons name="content-save-check" size={20} color="#000" />
                                <Text style={styles.primaryButtonText}>Simpan Data Wajah</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.secondaryButton}
                                activeOpacity={0.8}
                                onPress={handleRetake}
                            >
                                <MaterialCommunityIcons name="reload" size={20} color="#000" />
                                <Text style={styles.secondaryButtonText}>Ulangi Pemindaian</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={[styles.primaryButton, isScanning && { backgroundColor: "#E0E0E0" }]}
                            activeOpacity={0.8}
                            onPress={handleStartScan}
                            disabled={isScanning}
                        >
                            <MaterialCommunityIcons
                                name={isScanning ? "loading" : "camera-iris"}
                                size={22}
                                color="#000"
                            />
                            <Text style={styles.primaryButtonText}>
                                {isScanning ? "Sedang Memindai..." : "Mulai Scan Wajah"}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FDFBF7",
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FDFBF7",
        padding: 20
    },
    loadingText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#555",
        marginTop: 12,
    },
    permissionContainer: {
        alignItems: "center",
        padding: 20,
    },
    permissionTitle: {
        fontSize: 20,
        fontWeight: "900",
        color: "#000",
        marginTop: 20,
        marginBottom: 10,
        textAlign: "center",
    },
    permissionDesc: {
        fontSize: 14,
        fontWeight: "600",
        color: "#555",
        textAlign: "center",
        marginBottom: 30,
        lineHeight: 20,
    },
    pageHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 3,
        borderBottomColor: "#000",
        backgroundColor: "#FFF",
    },
    backButton: {
        width: 40,
        height: 40,
        backgroundColor: "#FFF",
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        elevation: 3,
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: "900",
        color: "#000",
        textAlign: "center",
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center",
    },
    instructionBox: {
        alignItems: "center",
        marginTop: 10,
        paddingHorizontal: 10,
    },
    instructionTitle: {
        fontSize: 20,
        fontWeight: "900",
        color: "#000",
        marginBottom: 6,
        textAlign: "center",
    },
    instructionDesc: {
        fontSize: 13,
        fontWeight: "600",
        color: "#555",
        textAlign: "center",
        lineHeight: 18,
    },
    // Scanner Oval Styling
    scannerContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    scannerWrapper: {
        position: "relative",
        padding: 15,
    },
    ovalFrame: {
        width: width * 0.65,
        height: width * 0.9,
        borderRadius: (width * 0.65) / 2,
        borderWidth: 4,
        borderColor: "#000",
        // HAPUS INI: backgroundColor: "#000", 
        backgroundColor: "#E0E0E0", // Ganti dengan warna abu-abu terang sebagai warna dasar sebelum kamera load
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        elevation: 8,
        overflow: "hidden",
    },
    // TAMBAHKAN STYLE INI
    cameraContainer: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: (width * 0.65) / 2, // Sesuaikan dengan ovalFrame
    },
    camera: {
        width: "100%",
        height: "100%",
    },
    ovalFrameScanning: {
        borderColor: "#FFD166",
    },
    ovalFrameComplete: {
        borderColor: "#06D6A0",
        backgroundColor: "#CAFFBF",
    },
    successIconBox: {
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        flex: 1,
        backgroundColor: "#CAFFBF",
        width: "100%",
        height: "100%",
    },
    successText: {
        fontSize: 14,
        fontWeight: "900",
        color: "#000",
    },
    // Dekorasi Sudut Neobrutalism
    cornerTL: { position: "absolute", top: 0, left: 0, width: 20, height: 20, borderTopWidth: 4, borderLeftWidth: 4, borderColor: "#000" },
    cornerTR: { position: "absolute", top: 0, right: 0, width: 20, height: 20, borderTopWidth: 4, borderRightWidth: 4, borderColor: "#000" },
    cornerBL: { position: "absolute", bottom: 0, left: 0, width: 20, height: 20, borderBottomWidth: 4, borderLeftWidth: 4, borderColor: "#000" },
    cornerBR: { position: "absolute", bottom: 0, right: 0, width: 20, height: 20, borderBottomWidth: 4, borderRightWidth: 4, borderColor: "#000" },
    // Tips Card
    tipsCard: {
        flexDirection: "row",
        backgroundColor: "#FDFFB6",
        padding: 12,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#000",
        alignItems: "center",
        gap: 10,
        width: "100%",
    },
    tipsText: {
        flex: 1,
        fontSize: 11,
        fontWeight: "700",
        color: "#333",
        lineHeight: 16,
    },
    // Tombol Aksi
    actionContainer: {
        width: "100%",
        marginBottom: 10,
    },
    primaryButton: {
        backgroundColor: "#FFD166",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 14,
        borderWidth: 3,
        borderColor: "#000",
        gap: 8,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        elevation: 6,
    },
    primaryButtonText: {
        color: "#000",
        fontSize: 15,
        fontWeight: "900",
    },
    secondaryButton: {
        backgroundColor: "#FFF",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 14,
        borderWidth: 3,
        borderColor: "#000",
        gap: 8,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        elevation: 4,
    },
    secondaryButtonText: {
        color: "#000",
        fontSize: 15,
        fontWeight: "900",
    },
});