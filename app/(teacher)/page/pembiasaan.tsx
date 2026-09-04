import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HabitItem = {
    id: string;
    title: string;
    icon: string;
    color: string;
    description: string;
};

// 7 Poin Pembiasaan Harian
const habitsData: HabitItem[] = [
    {
        id: "1",
        title: "Bangun Pagi",
        icon: "weather-sunset-up",
        color: "#9BF6FF",
        description: "Memulai hari dengan bangun lebih awal dan segar.",
    },
    {
        id: "2",
        title: "Beribadah",
        icon: "hands-pray",
        color: "#CAFFBF",
        description: "Melaksanakan ibadah tepat waktu sesuai keyakinan.",
    },
    {
        id: "3",
        title: "Berolahraga",
        icon: "run",
        color: "#FDFFB6",
        description: "Menjaga kesehatan fisik melalui aktivitas fisik ringan.",
    },
    {
        id: "4",
        title: "Makan Sehat",
        icon: "food-apple-outline",
        color: "#FFADAD",
        description: "Mengonsumsi makanan bergizi seimbang dan bernutrisi.",
    },
    {
        id: "5",
        title: "Gemar Belajar",
        icon: "book-open-page-variant-outline",
        color: "#FFC6FF",
        description: "Membaca buku atau mempelajari hal baru setiap hari.",
    },
    {
        id: "6",
        title: "Bermasyarakat",
        icon: "account-group-outline",
        color: "#A0E8AF",
        description: "Berinteraksi sosial dan berbuat baik dengan sesama.",
    },
    {
        id: "7",
        title: "Tidur Cepat",
        icon: "bed-outline",
        color: "#E4D4FF",
        description: "Beristirahat malam dengan cukup dan tidak larut malam.",
    },
];

export default function PembiasaanPage() {
    const insets = useSafeAreaInsets();
    // State untuk menyimpan daftar id pembiasaan yang sudah dicentang (selesai hari ini)
    const [checkedHabits, setCheckedHabits] = useState<string[]>([]);

    const toggleHabit = (id: string) => {
        if (checkedHabits.includes(id)) {
            setCheckedHabits(checkedHabits.filter((item) => item !== id));
        } else {
            setCheckedHabits([...checkedHabits, id]);
        }
    };

    const renderItem = ({ item }: { item: HabitItem }) => {
        const isChecked = checkedHabits.includes(item.id);

        return (
            <TouchableOpacity
                style={[styles.card, { backgroundColor: item.color }]}
                activeOpacity={0.8}
                onPress={() => toggleHabit(item.id)}
            >
                <View style={styles.cardLeft}>
                    <View style={styles.iconBox}>
                        <MaterialCommunityIcons name={item.icon as any} size={24} color="#000" />
                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.habitTitle}>{item.title}</Text>
                        <Text style={styles.habitDesc}>{item.description}</Text>
                    </View>
                </View>

                {/* Kotak Checklist */}
                <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                    {isChecked && (
                        <MaterialCommunityIcons name="check" size={18} color="#FFF" />
                    )}
                </View>
            </TouchableOpacity>
        );
    };

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
                <Text style={styles.pageTitle}>7 Pembiasaan Harian</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Subtitle / Progress Info */}
            <View style={styles.subHeaderContainer}>
                <Text style={styles.dateText}>Jum'at, 4 September 2026</Text>
                <Text style={styles.progressText}>
                    Selesai: {checkedHabits.length} dari 7 pembiasaan
                </Text>
            </View>

            {/* List 7 Pembiasaan */}
            <FlatList
                data={habitsData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
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
    subHeaderContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    dateText: {
        fontSize: 16,
        fontWeight: "900",
        color: "#000",
    },
    progressText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#555",
        marginTop: 2,
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        gap: 14,
    },
    card: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 3,
        borderColor: "#000",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    cardLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: 12,
    },
    iconBox: {
        width: 44,
        height: 44,
        backgroundColor: "#FFF",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    textBox: {
        flex: 1,
    },
    habitTitle: {
        fontSize: 16,
        fontWeight: "900",
        color: "#000",
        marginBottom: 2,
    },
    habitDesc: {
        fontSize: 12,
        fontWeight: "600",
        color: "#333",
    },
    checkbox: {
        width: 28,
        height: 28,
        backgroundColor: "#FFF",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 12,
    },
    checkboxChecked: {
        backgroundColor: "#000",
    },
});