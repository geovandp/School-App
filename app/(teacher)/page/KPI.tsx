import React from "react";
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

// Data Dummy KPI Utama Siti Aminah
const teacherProfile = {
    name: "Siti Aminah, S.Pd",
    nip: "19850723 201001 2 014",
    subject: "Matematika",
};

const teacherKpi = {
    overallAttendance: 93,
    targetAttendance: 95,
    totalStudents: 142,
    totalClasses: 4,
};

const classKpiData = [
    { id: "c1", name: "Kelas X IPA 1", attendance: 96 },
    { id: "c2", name: "Kelas X IPA 2", attendance: 91 },
    { id: "c3", name: "Kelas XI IPS 1", attendance: 82 },
    { id: "c4", name: "Kelas XI IPS 2", attendance: 98 },
];

export default function KpiDefaultPage() {
    const insets = useSafeAreaInsets();

    const handleBack = () => {
        router.back();
    };

    const getPerformanceStyle = (score: number) => {
        if (score >= 95) return { color: "#CAFFBF", status: "Sangat Baik" };
        if (score >= 90) return { color: "#9BF6FF", status: "Baik" };
        if (score >= 75) return { color: "#FDFFB6", status: "Perhatian" };
        return { color: "#FFADAD", status: "Kritis" };
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }]}>
            
            {/* HEADER */}
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.pageTitle} numberOfLines={1}>KPI Utama Guru</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* PROFIL GURU */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarBox}>
                        <MaterialCommunityIcons name="face-woman-outline" size={40} color="#000" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.profileName}>{teacherProfile.name}</Text>
                        <Text style={styles.profileSub}>{teacherProfile.subject} • NIP. {teacherProfile.nip}</Text>
                    </View>
                </View>

                {/* BANNER SHORTCUT KE DASHBOARD PKSP SITI AMINAH */}
                <TouchableOpacity 
                    style={styles.pkspBanner}
                    activeOpacity={0.85}
                    onPress={() => router.push("/(teacher)/page/PkspDashboard")} // Ubah path sesuai router Anda
                >
                    <View style={styles.pkspBannerIcon}>
                        <MaterialCommunityIcons name="clipboard-account-outline" size={32} color="#000" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                            <Text style={styles.pkspBannerTitle}>Layanan PKSP</Text>
                            <View style={styles.badgeNew}>
                                <Text style={styles.badgeNewText}>64 Instrumen</Text>
                            </View>
                        </View>
                        <Text style={styles.pkspBannerSub}>Penilaian Sejawat & Hasil Evaluasi Kinerja</Text>
                    </View>
                    <MaterialCommunityIcons name="arrow-right-bold-circle" size={28} color="#000" />
                </TouchableOpacity>

                {/* RINGKASAN KINERJA MENGAJAR */}
                <Text style={styles.sectionTitle}>Ringkasan Mengajar</Text>
                
                <View style={styles.highlightRow}>
                    <View style={[styles.highlightCard, { backgroundColor: "#FFC6FF", flex: 1.2 }]}>
                        <View style={styles.cardIconBox}>
                            <MaterialCommunityIcons name="google-classroom" size={28} color="#000" />
                        </View>
                        <Text style={styles.highlightValue}>{teacherKpi.overallAttendance}%</Text>
                        <Text style={styles.highlightLabel}>Kehadiran Siswa Diajar</Text>
                        
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: `${teacherKpi.overallAttendance}%`, backgroundColor: getPerformanceStyle(teacherKpi.overallAttendance).color }]} />
                        </View>
                        <Text style={styles.targetText}>Target: {teacherKpi.targetAttendance}%</Text>
                    </View>

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

                {/* PERFORMA KELAS */}
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>Performa Per Kelas</Text>
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
    container: { flex: 1, backgroundColor: "#FDFBF7" },
    pageHeader: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 3,
        borderBottomColor: "#000", backgroundColor: "#FFF",
    },
    backButton: {
        width: 40, height: 40, backgroundColor: "#FFF", borderWidth: 2,
        borderColor: "#000", borderRadius: 10, justifyContent: "center", alignItems: "center",
        shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, elevation: 3,
    },
    pageTitle: { fontSize: 18, fontWeight: "900", color: "#000", textAlign: "center", flex: 1 },
    scrollContent: { padding: 20 },
    profileCard: {
        flexDirection: "row", alignItems: "center", backgroundColor: "#FFF",
        padding: 16, borderRadius: 16, borderWidth: 3, borderColor: "#000",
        marginBottom: 16, gap: 16, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 6,
    },
    avatarBox: {
        width: 60, height: 60, backgroundColor: "#FFADAD", borderRadius: 16,
        borderWidth: 2, borderColor: "#000", justifyContent: "center", alignItems: "center",
    },
    profileName: { fontSize: 18, fontWeight: "900", color: "#000" },
    profileSub: { fontSize: 13, fontWeight: "700", color: "#555", marginTop: 4 },

    // PKSP BANNER
    pkspBanner: {
        flexDirection: "row", alignItems: "center", backgroundColor: "#BDB2FF",
        padding: 16, borderRadius: 16, borderWidth: 3, borderColor: "#000",
        marginBottom: 24, gap: 12, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 6,
    },
    pkspBannerIcon: {
        width: 48, height: 48, backgroundColor: "#FFF", borderRadius: 12, borderWidth: 2, borderColor: "#000", justifyContent: "center", alignItems: "center",
    },
    pkspBannerTitle: { fontSize: 16, fontWeight: "900", color: "#000" },
    pkspBannerSub: { fontSize: 11, fontWeight: "700", color: "#333", marginTop: 2 },
    badgeNew: { backgroundColor: "#FDFFB6", borderWidth: 2, borderColor: "#000", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
    badgeNewText: { fontSize: 10, fontWeight: "900", color: "#000" },

    sectionTitle: { fontSize: 18, fontWeight: "900", color: "#000", marginBottom: 16 },
    sectionHeaderRow: { marginTop: 24, marginBottom: 16 },
    highlightRow: { flexDirection: "row", gap: 16 },
    highlightCard: { borderRadius: 16, borderWidth: 3, borderColor: "#000", padding: 16, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 6 },
    cardIconBox: { width: 48, height: 48, backgroundColor: "#FFF", borderRadius: 12, borderWidth: 2, borderColor: "#000", justifyContent: "center", alignItems: "center", marginBottom: 16 },
    highlightValue: { fontSize: 36, fontWeight: "900", color: "#000" },
    highlightLabel: { fontSize: 13, fontWeight: "700", color: "#333", marginTop: 4 },
    progressBarBg: { height: 12, backgroundColor: "#FFF", borderRadius: 6, borderWidth: 2, borderColor: "#000", marginTop: 16, overflow: "hidden" },
    progressBarFill: { height: "100%", borderRightWidth: 2, borderColor: "#000" },
    targetText: { fontSize: 11, fontWeight: "700", color: "#555", marginTop: 8, textAlign: "right" },
    highlightColumn: { flex: 1, gap: 16 },
    smallCard: { flex: 1, borderRadius: 16, borderWidth: 3, borderColor: "#000", padding: 16, justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 6 },
    smallCardValue: { fontSize: 24, fontWeight: "900", color: "#000" },
    smallCardLabel: { fontSize: 12, fontWeight: "700", color: "#333", marginTop: 4 },
    listCard: { backgroundColor: "#FFF", borderRadius: 16, borderWidth: 3, borderColor: "#000", padding: 16, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, elevation: 6 },
    listCardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
    className: { fontSize: 16, fontWeight: "900", color: "#000" },
    teacherName: { fontSize: 12, fontWeight: "700", color: "#555", marginTop: 4 },
    statusBadge: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 2, borderColor: "#000" },
    statusText: { fontSize: 11, fontWeight: "900", color: "#000", textTransform: "uppercase" },
    progressRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    progressBarBgList: { flex: 1, height: 14, backgroundColor: "#F0F0F0", borderRadius: 7, borderWidth: 2, borderColor: "#000", overflow: "hidden" },
    progressBarFillList: { height: "100%", borderRightWidth: 2, borderColor: "#000" },
    progressValueText: { fontSize: 14, fontWeight: "900", color: "#000", width: 40, textAlign: "right" },
});