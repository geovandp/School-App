import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// --- DUMMY DATA KHUSUS BU SITI ---
const teacherProfile = {
    name: "Siti Aminah, S.Pd",
    nip: "19850723 201001 2 014",
    subject: "Matematika",
};

const teacherKpi = {
    overallAttendance: 93, // Rata-rata kehadiran di kelas Bu Siti
    targetAttendance: 95,
    totalStudents: 142, // Total siswa yang diajar
    totalClasses: 4,    // Jumlah rombel yang diajar
};

const classKpiData = [
    { id: "c1", name: "Kelas X IPA 1", attendance: 96 },
    { id: "c2", name: "Kelas X IPA 2", attendance: 91 },
    { id: "c3", name: "Kelas XI IPS 1", attendance: 82 }, // Di bawah target
    { id: "c4", name: "Kelas XI IPS 2", attendance: 98 },
];

export default function KpiGuruPage() {
    const insets = useSafeAreaInsets();

    const handleBack = () => {
        router.back();
    };

    // Helper untuk warna progress bar dan status kehadiran
    const getPerformanceStyle = (score: number) => {
        if (score >= 95) return { color: "#CAFFBF", status: "Sangat Baik" }; // Hijau
        if (score >= 90) return { color: "#9BF6FF", status: "Baik" };        // Biru
        if (score >= 75) return { color: "#FDFFB6", status: "Perhatian" };   // Kuning
        return { color: "#FFADAD", status: "Kritis" };                       // Merah
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }]}>
            
            {/* --- HEADER --- */}
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.pageTitle} numberOfLines={1}>Kinerja Guru</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* --- PROFIL GURU --- */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarBox}>
                        <MaterialCommunityIcons name="face-woman-outline" size={40} color="#000" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.profileName}>{teacherProfile.name}</Text>
                        <Text style={styles.profileSub}>{teacherProfile.subject} • NIP. {teacherProfile.nip}</Text>
                    </View>
                </View>

                {/* --- BAGIAN 1: KARTU HIGHLIGHT UTAMA --- */}
                <Text style={styles.sectionTitle}>Ringkasan (Bulan Ini)</Text>
                
                <View style={styles.highlightRow}>
                    {/* Kartu Rata-Rata Kehadiran Kelas yang Diajar */}
                    <View style={[styles.highlightCard, { backgroundColor: "#FFC6FF", flex: 1.2 }]}>
                        <View style={styles.cardIconBox}>
                            <MaterialCommunityIcons name="google-classroom" size={28} color="#000" />
                        </View>
                        <Text style={styles.highlightValue}>{teacherKpi.overallAttendance}%</Text>
                        <Text style={styles.highlightLabel}>Kehadiran Siswa Diajar</Text>
                        
                        {/* Custom Progress Bar */}
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: `${teacherKpi.overallAttendance}%`, backgroundColor: getPerformanceStyle(teacherKpi.overallAttendance).color }]} />
                        </View>
                        <Text style={styles.targetText}>Target Sekolah: {teacherKpi.targetAttendance}%</Text>
                    </View>

                    {/* Kartu Data Lainnya */}
                    <View style={styles.highlightColumn}>
                        <View style={[styles.smallCard, { backgroundColor: "#9BF6FF" }]}>
                            <Text style={styles.smallCardValue}>{teacherKpi.totalStudents}</Text>
                            <Text style={styles.smallCardLabel}>Siswa Diajar</Text>
                        </View>
                        <View style={[styles.smallCard, { backgroundColor: "#FDFFB6" }]}>
                            <Text style={styles.smallCardValue}>{teacherKpi.totalClasses}</Text>
                            <Text style={styles.smallCardLabel}>Rombel Diampu</Text>
                        </View>
                    </View>
                </View>

                {/* --- BAGIAN 2: DAFTAR KINERJA PER KELAS --- */}
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>Performa Kelas</Text>
                    <TouchableOpacity style={styles.filterBtn}>
                        <MaterialCommunityIcons name="filter-variant" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                {classKpiData.map((item) => {
                    const perf = getPerformanceStyle(item.attendance);
                    return (
                        <View key={item.id} style={styles.listCard}>
                            <View style={styles.listCardHeader}>
                                <View>
                                    <Text style={styles.className}>{item.name}</Text>
                                    <Text style={styles.teacherName}>Mapel: {teacherProfile.subject}</Text>
                                </View>
                                <View style={[styles.statusBadge, { backgroundColor: perf.color }]}>
                                    <Text style={styles.statusText}>{perf.status}</Text>
                                </View>
                            </View>

                            <View style={styles.progressRow}>
                                <View style={styles.progressBarBgList}>
                                    <View style={[styles.progressBarFillList, { width: `${item.attendance}%`, backgroundColor: perf.color }]} />
                                </View>
                                <Text style={styles.progressValueText}>{item.attendance}%</Text>
                            </View>
                        </View>
                    );
                })}

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FDFBF7",
    },
    
    // Header
    pageHeader: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 3,
        borderBottomColor: "#000", backgroundColor: "#FFF",
    },
    backButton: {
        width: 40, height: 40, backgroundColor: "#FFF", borderWidth: 2,
        borderColor: "#000", borderRadius: 10, justifyContent: "center",
        alignItems: "center", shadowColor: "#000", shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1, elevation: 3,
    },
    pageTitle: { fontSize: 18, fontWeight: "900", color: "#000", textAlign: "center", flex: 1, paddingHorizontal: 10 },

    scrollContent: {
        padding: 20,
    },

    // Profil Guru
    profileCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 16,
        borderRadius: 16,
        borderWidth: 3,
        borderColor: "#000",
        marginBottom: 24,
        gap: 16,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        elevation: 6,
    },
    avatarBox: {
        width: 60,
        height: 60,
        backgroundColor: "#FFADAD",
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    profileName: { fontSize: 18, fontWeight: "900", color: "#000" },
    profileSub: { fontSize: 13, fontWeight: "700", color: "#555", marginTop: 4 },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "900",
        color: "#000",
        marginBottom: 16,
    },
    sectionHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 24,
        marginBottom: 16,
    },
    filterBtn: {
        backgroundColor: "#FFF",
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 8,
        padding: 8,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
    },

    // Bagian 1: Cards Highlight
    highlightRow: {
        flexDirection: "row",
        gap: 16,
    },
    highlightCard: {
        borderRadius: 16,
        borderWidth: 3,
        borderColor: "#000",
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        elevation: 6,
    },
    cardIconBox: {
        width: 48,
        height: 48,
        backgroundColor: "#FFF",
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    highlightValue: { fontSize: 36, fontWeight: "900", color: "#000", lineHeight: 40 },
    highlightLabel: { fontSize: 13, fontWeight: "700", color: "#333", marginTop: 4 },
    
    // Progress Bar Style (Besar)
    progressBarBg: {
        height: 12,
        backgroundColor: "#FFF",
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#000",
        marginTop: 16,
        overflow: "hidden",
    },
    progressBarFill: {
        height: "100%",
        borderRightWidth: 2,
        borderColor: "#000",
    },
    targetText: { fontSize: 11, fontWeight: "700", color: "#555", marginTop: 8, textAlign: "right" },

    highlightColumn: { flex: 1, gap: 16 },
    smallCard: {
        flex: 1,
        borderRadius: 16,
        borderWidth: 3,
        borderColor: "#000",
        padding: 16,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        elevation: 6,
    },
    smallCardValue: { fontSize: 24, fontWeight: "900", color: "#000" },
    smallCardLabel: { fontSize: 12, fontWeight: "700", color: "#333", marginTop: 4 },

    // Bagian 2: List Kelas
    listCard: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        borderWidth: 3,
        borderColor: "#000",
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        elevation: 6,
    },
    listCardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 16,
    },
    className: { fontSize: 16, fontWeight: "900", color: "#000" },
    teacherName: { fontSize: 12, fontWeight: "700", color: "#555", marginTop: 4 },
    statusBadge: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#000",
    },
    statusText: { fontSize: 11, fontWeight: "900", color: "#000", textTransform: "uppercase" },
    
    // Progress Bar Style (Kecil)
    progressRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    progressBarBgList: {
        flex: 1,
        height: 14,
        backgroundColor: "#F0F0F0",
        borderRadius: 7,
        borderWidth: 2,
        borderColor: "#000",
        overflow: "hidden",
    },
    progressBarFillList: {
        height: "100%",
        borderRightWidth: 2,
        borderColor: "#000",
    },
    progressValueText: { fontSize: 14, fontWeight: "900", color: "#000", width: 40, textAlign: "right" },
});