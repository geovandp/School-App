import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as DocumentPicker from "expo-document-picker"; // Library Expo untuk pilih dokumen/PDF
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Daftar jenis cuti sesuai permintaan sebelumnya
const LEAVE_TYPES = [
    { id: "menikah", label: "Menikah", icon: "heart-outline", color: "#FFB5A7" },
    { id: "meninggal", label: "Meninggal Keluarga", icon: "account-off-outline", color: "#B5E2FA" },
    { id: "melahirkan", label: "Mendampingi Istri Melahirkan", icon: "baby-face-outline", color: "#CAFFBF" },
    { id: "musibah", label: "Musibah / Bencana Alam", icon: "home-alert-outline", color: "#FDFFB6" },
    { id: "biasa", label: "Cuti Biasa / Tahunan", icon: "calendar-clock-outline", color: "#FFC6FF" },
];

export default function LeaveRequestPage() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    // Data Profil Guru (Read-only)
    const profile = {
        name: "TRANSJANA CATUR ISAPUTRO, S.ST, S.ST",
        nip: "198605062022211021",
        rank: "Penata Muda (III/a)",
        position: "GURU AHLI PERTAMA",
        unit: "DINAS PENDIDIKAN",
        remainingLeave: 11, // Sisa cuti tahunan
    };

    // State Form Cuti
    const [selectedType, setSelectedType] = useState<string>("biasa");
    const [leaveGoal, setLeaveGoal] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [addressDuringLeave, setAddressDuringLeave] = useState("");
    const [surveyRating, setSurveyRating] = useState("Sangat Baik");
    const [attachedFile, setAttachedFile] = useState<{ name: string; uri: string } | null>(null);

    // Fungsi Pilih Berkas PDF (Maks 2MB)
    const handlePickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const file = result.assets[0];
                
                // Cek ukuran file jika tersedia (maksimal 2MB = 2 * 1024 * 1024 bytes)
                if (file.size && file.size > 2 * 1024 * 1024) {
                    Alert.alert("Ukuran Terlalu Besar", "Berkas PDF maksimal berukuran 2 MB.");
                    return;
                }

                setAttachedFile({ name: file.name, uri: file.uri });
            }
        } catch (error) {
            console.log("Gagal memilih file:", error);
        }
    };

    const handleSubmitRequest = () => {
        if (!leaveGoal.trim()) {
            Alert.alert("Perhatian", "Tujuan cuti wajib diisi!");
            return;
        }
        if (!startDate.trim() || !endDate.trim()) {
            Alert.alert("Perhatian", "Tanggal mulai dan selesai cuti wajib diisi!");
            return;
        }
        if (!addressDuringLeave.trim()) {
            Alert.alert("Perhatian", "Alamat selama menjalankan cuti wajib diisi!");
            return;
        }

        const selectedLeaveObj = LEAVE_TYPES.find((item) => item.id === selectedType);

        console.log("=== PENGAJUAN CUTI GURU ===");
        console.log("Nama:", profile.name);
        console.log("NIP:", profile.nip);
        console.log("Jenis Cuti:", selectedLeaveObj?.label);
        console.log("Tujuan:", leaveGoal);
        console.log("Tanggal:", startDate, "s.d", endDate);
        console.log("Alamat Cuti:", addressDuringLeave);
        console.log("Berkas:", attachedFile ? attachedFile.name : "Tidak ada");
        console.log("Survei:", surveyRating);

        Alert.alert(
            "Berhasil Diajukan",
            `Pengajuan cuti (${selectedLeaveObj?.label}) telah dikirim dan menunggu persetujuan atasan.`,
            [{ text: "OK", onPress: () => router.back() }]
        );
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }]}>
            
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Form Pengajuan Cuti</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* --- INFORMASI PROFIL (READ-ONLY) --- */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>1. Informasi Pegawai</Text>
                    
                    <View style={styles.profileRow}><Text style={styles.profileLabel}>Nama</Text><Text style={styles.profileValue}>{profile.name}</Text></View>
                    <View style={styles.profileRow}><Text style={styles.profileLabel}>NIP</Text><Text style={styles.profileValue}>{profile.nip}</Text></View>
                    <View style={styles.profileRow}><Text style={styles.profileLabel}>Pangkat / Gol.</Text><Text style={styles.profileValue}>{profile.rank}</Text></View>
                    <View style={styles.profileRow}><Text style={styles.profileLabel}>Jabatan</Text><Text style={styles.profileValue}>{profile.position}</Text></View>
                    <View style={styles.profileRow}><Text style={styles.profileLabel}>Unit Kerja</Text><Text style={styles.profileValue}>{profile.unit}</Text></View>
                    
                    <View style={styles.sisaCutiBox}>
                        <MaterialCommunityIcons name="calendar-star" size={22} color="#000" />
                        <Text style={styles.sisaCutiText}>Total Sisa Cuti Tahunan: <Text style={{fontWeight: "900", color: "#4361EE"}}>{profile.remainingLeave} Hari</Text></Text>
                    </View>
                </View>

                {/* --- PILIH JENIS CUTI --- */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>2. Pilih Jenis Cuti</Text>
                    <View style={styles.typeGrid}>
                        {LEAVE_TYPES.map((item) => {
                            const isSelected = selectedType === item.id;
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    activeOpacity={0.8}
                                    style={[
                                        styles.typeCard,
                                        { backgroundColor: item.color },
                                        isSelected && styles.typeCardSelected,
                                    ]}
                                    onPress={() => setSelectedType(item.id)}
                                >
                                    <MaterialCommunityIcons name={item.icon as any} size={26} color="#000" />
                                    <Text style={styles.typeLabel}>{item.label}</Text>
                                    {isSelected && (
                                        <View style={styles.checkBadge}>
                                            <MaterialCommunityIcons name="check" size={14} color="#FFF" />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* --- DETAIL FORM CUTI --- */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>3. Detail Pengajuan</Text>

                    <Text style={styles.label}>Tujuan Cuti</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: Pulang kampung / Acara keluarga"
                        placeholderTextColor="#888"
                        value={leaveGoal}
                        onChangeText={setLeaveGoal}
                    />

                    <Text style={styles.label}>Tanggal Mulai</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="DD/MM/YYYY (Contoh: 20/10/2026)"
                        placeholderTextColor="#888"
                        value={startDate}
                        onChangeText={setStartDate}
                    />

                    <Text style={styles.label}>Tanggal Selesai</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="DD/MM/YYYY (Contoh: 22/10/2026)"
                        placeholderTextColor="#888"
                        value={endDate}
                        onChangeText={setEndDate}
                    />

                    <Text style={styles.label}>Selama Cuti Alamat Saya Adalah di:</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Isi alamat anda menetap selama anda menjalani cuti..."
                        placeholderTextColor="#888"
                        multiline
                        numberOfLines={3}
                        value={addressDuringLeave}
                        onChangeText={setAddressDuringLeave}
                    />

                    <Text style={styles.label}>Lampiran Berkas Pendukung (Format .pdf, Maks. 2MB)</Text>
                    <TouchableOpacity style={styles.fileUploadBox} onPress={handlePickDocument}>
                        <MaterialCommunityIcons name="file-pdf-box" size={24} color="#E63946" />
                        <Text style={styles.fileUploadText} numberOfLines={1}>
                            {attachedFile ? attachedFile.name : "Choose file (No file chosen)"}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>Survei Kemudahan Layanan</Text>
                    <View style={styles.surveyContainer}>
                        {["Sangat Baik", "Baik", "Cukup", "Kurang"].map((rating) => {
                            const isSelected = surveyRating === rating;
                            return (
                                <TouchableOpacity
                                    key={rating}
                                    style={[styles.surveyChip, isSelected && styles.surveyChipSelected]}
                                    onPress={() => setSurveyRating(rating)}
                                >
                                    <Text style={[styles.surveyText, isSelected && styles.surveyTextSelected]}>
                                        {rating}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* --- TOMBOL KIRIM --- */}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitRequest}>
                    <MaterialCommunityIcons name="send" size={20} color="#FFF" />
                    <Text style={styles.submitButtonText}>Kirim Pengajuan Cuti</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

// --- STYLE NEO-BRUTALISM ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FDFBF7" },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 3, borderBottomColor: "#000", backgroundColor: "#FFF" },
    backButton: { width: 40, height: 40, backgroundColor: "#FFB5A7", borderRadius: 8, borderWidth: 2, borderColor: "#000", justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3 },
    headerTitle: { fontSize: 18, fontWeight: "900", color: "#000" },
    scrollContent: { padding: 20, paddingBottom: 40 },
    sectionCard: { backgroundColor: "#FFF", padding: 20, borderRadius: 16, borderWidth: 3, borderColor: "#000", marginBottom: 24, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 5 },
    sectionTitle: { fontSize: 18, fontWeight: "900", color: "#000", marginBottom: 16, borderBottomWidth: 2, borderBottomColor: "#000", paddingBottom: 8 },
    profileRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: "#EEE" },
    profileLabel: { fontSize: 13, fontWeight: "800", color: "#666", width: "40%" },
    profileValue: { fontSize: 13, fontWeight: "700", color: "#000", width: "60%", textAlign: "right" },
    sisaCutiBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#FDFFB6", borderWidth: 2, borderColor: "#000", borderRadius: 10, padding: 12, marginTop: 16, gap: 10, shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 2 },
    sisaCutiText: { fontSize: 14, fontWeight: "800", color: "#000" },
    typeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
    typeCard: { width: "48%", padding: 14, borderRadius: 12, borderWidth: 2, borderColor: "#000", justifyContent: "space-between", height: 105, shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3, position: "relative" },
    typeCardSelected: { borderWidth: 3, shadowOffset: { width: 4, height: 4 } },
    typeLabel: { fontSize: 13, fontWeight: "900", color: "#000", marginTop: 4 },
    checkBadge: { position: "absolute", top: 8, right: 8, width: 20, height: 20, backgroundColor: "#000", borderRadius: 10, justifyContent: "center", alignItems: "center" },
    label: { fontSize: 14, fontWeight: "800", color: "#333", marginBottom: 6, marginTop: 12 },
    input: { backgroundColor: "#F9F6EE", borderWidth: 2, borderColor: "#000", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, fontWeight: "700", color: "#000" },
    textArea: { height: 80, textAlignVertical: "top" },
    fileUploadBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#F9F6EE", borderWidth: 2, borderColor: "#000", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, gap: 10, borderStyle: "dashed" },
    fileUploadText: { fontSize: 14, fontWeight: "700", color: "#333", flex: 1 },
    surveyContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 },
    surveyChip: { paddingHorizontal: 14, paddingVertical: 8, backgroundColor: "#FFF", borderWidth: 2, borderColor: "#000", borderRadius: 8, shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 2 },
    surveyChipSelected: { backgroundColor: "#CAFFBF" },
    surveyText: { fontSize: 13, fontWeight: "800", color: "#000" },
    surveyTextSelected: { color: "#000" },
    submitButton: { flexDirection: "row", backgroundColor: "#4361EE", borderWidth: 3, borderColor: "#000", borderRadius: 12, paddingVertical: 16, justifyContent: "center", alignItems: "center", gap: 10, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 6 },
    submitButtonText: { fontSize: 16, fontWeight: "900", color: "#FFF", textTransform: "uppercase" },
});