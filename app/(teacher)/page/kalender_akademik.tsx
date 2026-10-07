import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Data Dummy Bulan
const calendarDataMonths = [
    {
        monthName: "Agustus 2026",
        tahunAjaran: "Tahun Ajaran 2026 / 2027",
        totalDays: 31,
        startDay: 6, // Sabtu
        prevMonthDays: 31,
        events: [
            { id: "aug-1", date: "17 Agu 2026", title: "Upacara HUT Kemerdekaan RI", category: "Kegiatan" as const, color: "#FFADAD" },
        ],
    },
    {
        monthName: "September 2026",
        tahunAjaran: "Tahun Ajaran 2026 / 2027",
        totalDays: 30,
        startDay: 2, // Selasa (0=Min, 1=Sen, 2=Sel)
        prevMonthDays: 31, // Agustus punya 31 hari, maka 30 & 31 masuk ke kotak kosong Minggu & Senin
        events: [
            { id: "sep-1", date: "07 - 12 Sep 2026", title: "Penilaian Tengah Semester (PTS) Ganjil", category: "Ujian" as const, color: "#FFADAD" },
            { id: "sep-2", date: "15 Sep 2026", title: "Peringatan Maulid Nabi Muhammad SAW", category: "Libur" as const, color: "#CAFFBF" },
            { id: "sep-3", date: "21 Sep 2026", title: "Rapat Koordinasi Dewan Guru", category: "Rapat" as const, color: "#FDFFB6" },
            { id: "sep-4", date: "28 Sep - 03 Okt 2026", title: "Studi Banding & Projek P5 Siswa", category: "Kegiatan" as const, color: "#9BF6FF" },
        ],
    },
    {
        monthName: "Oktober 2026",
        tahunAjaran: "Tahun Ajaran 2026 / 2027",
        totalDays: 31,
        startDay: 4, // Kamis
        prevMonthDays: 30,
        events: [
            { id: "okt-1", date: "28 Okt 2026", title: "Peringatan Hari Sumpah Pemuda", category: "Kegiatan" as const, color: "#CAFFBF" },
        ],
    },
];

export default function KalenderAkademikPage() {
    const insets = useSafeAreaInsets();
    const [currentMonthIndex, setCurrentMonthIndex] = useState(1); // September 2026
    const [selectedDate, setSelectedDate] = useState<number | null>(7);

    const activeMonthData = calendarDataMonths[currentMonthIndex];
    const daysInMonth = Array.from({ length: activeMonthData.totalDays }, (_, i) => i + 1);

    // Membuat array tanggal dari bulan sebelumnya untuk mengisi slot kosong di awal
    const prevMonthPadding = Array.from({ length: activeMonthData.startDay }, (_, i) => {
        return activeMonthData.prevMonthDays - activeMonthData.startDay + i + 1;
    });

    // Menghitung sisa kotak di akhir agar grid kalender pas (kelipatan 7 / 35 atau 42 kotak)
    const totalCellsSoFar = prevMonthPadding.length + daysInMonth.length;
    const totalGridCells = totalCellsSoFar <= 35 ? 35 : 42;
    const nextMonthPaddingCount = totalGridCells - totalCellsSoFar;
    const nextMonthPadding = Array.from({ length: nextMonthPaddingCount }, (_, i) => i + 1);

    const handlePrevMonth = () => {
        if (currentMonthIndex > 0) {
            setCurrentMonthIndex(currentMonthIndex - 1);
            setSelectedDate(1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonthIndex < calendarDataMonths.length - 1) {
            setCurrentMonthIndex(currentMonthIndex + 1);
            setSelectedDate(1);
        }
    };

    const renderEventItem = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.dateBox}>
                    <MaterialCommunityIcons name="calendar-range" size={16} color="#000" />
                    <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <View style={[styles.categoryBadge, { backgroundColor: item.color }]}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                </View>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.eventTitle}>{item.title}</Text>
            </View>
        </View>
    );

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
                <Text style={styles.pageTitle}>Kalender Akademik</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Banner Bulan dengan Tombol Navigasi Prev & Next */}
                <View style={styles.yearMonthBanner}>
                    <TouchableOpacity 
                        style={[styles.navButton, currentMonthIndex === 0 && styles.navButtonDisabled]} 
                        onPress={handlePrevMonth}
                        disabled={currentMonthIndex === 0}
                    >
                        <MaterialCommunityIcons name="chevron-left" size={22} color="#000" />
                    </TouchableOpacity>

                    <View style={styles.bannerCenter}>
                        <Text style={styles.tahunAjaranText}>{activeMonthData.tahunAjaran}</Text>
                        <Text style={styles.bulanAktifText}>{activeMonthData.monthName}</Text>
                    </View>

                    <TouchableOpacity 
                        style={[styles.navButton, currentMonthIndex === calendarDataMonths.length - 1 && styles.navButtonDisabled]} 
                        onPress={handleNextMonth}
                        disabled={currentMonthIndex === calendarDataMonths.length - 1}
                    >
                        <MaterialCommunityIcons name="chevron-right" size={22} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* LAYOUT GRID KALENDER BULANAN */}
                <View style={styles.calendarCard}>
                    {/* Header Hari (Min - Sab) */}
                    <View style={styles.weekDaysRow}>
                        {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day, index) => (
                            <Text key={index} style={styles.weekDayText}>{day}</Text>
                        ))}
                    </View>

                    {/* Grid Angka Tanggal */}
                    <View style={styles.daysGrid}>
                        {/* 1. Tanggal pudar dari bulan sebelumnya */}
                        {prevMonthPadding.map((date, index) => (
                            <View key={`prev-${index}`} style={[styles.dayCell, styles.dayCellInactive]}>
                                <Text style={styles.dayTextInactive}>{date}</Text>
                            </View>
                        ))}

                        {/* 2. Tanggal aktif bulan berjalan */}
                        {daysInMonth.map((date) => {
                            const isSelected = selectedDate === date;
                            const hasEvent = activeMonthData.events.some((ev) => 
                                ev.date.includes(String(date).padStart(2, '0'))
                            );

                            return (
                                <TouchableOpacity
                                    key={date}
                                    style={[
                                        styles.dayCell,
                                        isSelected && styles.dayCellSelected,
                                    ]}
                                    onPress={() => setSelectedDate(date)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                                        {date}
                                    </Text>
                                    {hasEvent && <View style={[styles.eventDot, isSelected && styles.eventDotSelected]} />}
                                </TouchableOpacity>
                            );
                        })}

                        {/* 3. Tanggal pudar dari bulan berikutnya */}
                        {nextMonthPadding.map((date, index) => (
                            <View key={`next-${index}`} style={[styles.dayCell, styles.dayCellInactive]}>
                                <Text style={styles.dayTextInactive}>{date}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Bagian Daftar Agenda / Jadwal */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Agenda & Kegiatan Bulan Ini</Text>
                </View>

                {/* List Agenda */}
                {activeMonthData.events.length > 0 ? (
                    <FlatList
                        data={activeMonthData.events}
                        keyExtractor={(item) => item.id}
                        renderItem={renderEventItem}
                        scrollEnabled={false}
                        contentContainerStyle={styles.listContainer}
                    />
                ) : (
                    <Text style={styles.emptyText}>Tidak ada agenda di bulan ini.</Text>
                )}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FDFBF7",
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
        shadowRadius: 0,
        elevation: 3,
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: "900",
        color: "#000",
        textAlign: "center",
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 24,
    },
    yearMonthBanner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#E4D4FF",
        marginTop: 20,
        marginBottom: 16,
        padding: 12,
        borderRadius: 16,
        borderWidth: 3,
        borderColor: "#000",
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    navButton: {
        width: 36,
        height: 36,
        backgroundColor: "#FFF",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    navButtonDisabled: {
        opacity: 0.4,
        backgroundColor: "#E0E0E0",
    },
    bannerCenter: {
        alignItems: "center",
    },
    tahunAjaranText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#333",
        textTransform: "uppercase",
    },
    bulanAktifText: {
        fontSize: 16,
        fontWeight: "900",
        color: "#000",
    },
    calendarCard: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 12,
        borderWidth: 3,
        borderColor: "#000",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    weekDaysRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 8,
        borderBottomWidth: 2,
        borderBottomColor: "#000",
        paddingBottom: 6,
    },
    weekDayText: {
        width: 38,
        textAlign: "center",
        fontSize: 11,
        fontWeight: "900",
        color: "#555",
    },
    daysGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: 4,
    },
    dayCell: {
        width: 38,
        height: 38,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#DDD",
        backgroundColor: "#FAFAFA",
        justifyContent: "center",
        alignItems: "center",
        margin: 2,
    },
    dayCellInactive: {
        backgroundColor: "#F2F2F2",
        borderColor: "#E0E0E0",
    },
    dayCellSelected: {
        backgroundColor: "#000",
        borderColor: "#000",
    },
    dayText: {
        fontSize: 13,
        fontWeight: "800",
        color: "#000",
    },
    dayTextInactive: {
        fontSize: 13,
        fontWeight: "700",
        color: "#AAA",
    },
    dayTextSelected: {
        color: "#FFF",
    },
    eventDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#FF6B6B",
        position: "absolute",
        bottom: 4,
    },
    eventDotSelected: {
        backgroundColor: "#FFD166",
    },
    sectionHeader: {
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "900",
        color: "#000",
    },
    listContainer: {
        gap: 12,
    },
    emptyText: {
        textAlign: "center",
        color: "#777",
        fontSize: 13,
        fontWeight: "600",
        marginTop: 10,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 14,
        padding: 14,
        borderWidth: 3,
        borderColor: "#000",
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    dateBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F7F7F7",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: "#000",
        gap: 4,
    },
    dateText: {
        fontSize: 11,
        fontWeight: "800",
        color: "#000",
    },
    categoryBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: "#000",
    },
    categoryText: {
        fontSize: 10,
        fontWeight: "900",
        color: "#000",
        textTransform: "uppercase",
    },
    infoSection: {
        backgroundColor: "#FDFBF7",
        padding: 10,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: "#000",
    },
    eventTitle: {
        fontSize: 14,
        fontWeight: "900",
        color: "#000",
    },
});