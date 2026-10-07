import React, { useState, useEffect, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useKeepAwake } from "expo-keep-awake";
import {
    Alert,
    AppState,
    BackHandler,
    Dimensions,
    LayoutChangeEvent,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// --- TIPE DATA & DUMMY (Dipersingkat) ---
type Option = { id: string; label: string; text: string; };
type Question = { id: string; text: string; options: Option[]; };
const examData: Question[] = [
    {
        id: "q1",
        text: "Bacalah penggalan hikayat berikut!\n\n\"Maka baginda pun bimbanglah tidak tahu siapa yang patut dirayakan dalam negeri karena anaknya kedua orang itu sama-sama gagah...\"\n\nNilai moral yang terdapat dalam penggalan hikayat tersebut adalah...",
        options: [
            { id: "A", label: "A", text: "Tidak membeda-bedakan anak." },
            { id: "B", label: "B", text: "Mencari muslihat untuk menipu anak." },
            { id: "C", label: "C", text: "Percaya pada mimpi yang tidak masuk akal." },
            { id: "D", label: "D", text: "Berlaku adil dalam menentukan penerus tahta." },
        ],
    },
    {
        id: "q2",
        text: "Perhatikan kalimat berikut!\n\n\"Suara sirine ambulans itu membelah keheningan malam yang panjang.\"\n\nMajas yang dominan pada kalimat tersebut adalah...",
        options: [
            { id: "A", label: "A", text: "Personifikasi" },
            { id: "B", label: "B", text: "Hiperbola" },
            { id: "C", label: "C", text: "Metafora" },
            { id: "D", label: "D", text: "Metonimia" },
        ],
    }
];

export default function ExamSimulationPage() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    useKeepAwake(); // Cegah layar mati

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({}); 
    const [timeLeft, setTimeLeft] = useState(5400); 
    const [isListVisible, setIsListVisible] = useState(false);
    
    // State Keamanan
    const [cheatWarningCount, setCheatWarningCount] = useState(0);
    const [cheatLogs, setCheatLogs] = useState<string[]>([]);
    const appState = useRef(AppState.currentState);
    const screenDimensions = Dimensions.get("screen");

    const currentQuestion = examData[currentIndex];
    const isLastQuestion = currentIndex === examData.length - 1;
    const isFirstQuestion = currentIndex === 0;
    const hasAnsweredCurrent = !!answers[currentQuestion.id];

    // --- 1. BLOKIR TOMBOL BACK FISIK ---
    useEffect(() => {
        const backAction = () => {
            Alert.alert("Akses Ditolak", "Anda tidak bisa keluar sebelum mengumpulkan jawaban.");
            return true; 
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, []);

    // --- 2. DETEKSI KELUAR APLIKASI (HOME / MINIMIZE STANDARD) ---
    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextAppState) => {
            if (
                appState.current.match(/active/) &&
                (nextAppState === "background" || nextAppState === "inactive")
            ) {
                const timestamp = new Date().toLocaleTimeString();
                const logMessage = `[LOG UJIAN] Siswa keluar dari aplikasi pada pukul ${timestamp}`;
                
                console.log(logMessage);
                setCheatLogs((prevLogs) => [...prevLogs, logMessage]);
                setCheatWarningCount((prevCount) => prevCount + 1);
            }
            appState.current = nextAppState;
        });
        return () => subscription.remove();
    }, []);

    // --- 3. DETEKSI MINI WINDOW / FLOATING / SPLIT SCREEN SANGAT AGRESIF ---
    const handleLayoutDetection = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        
        if (width < screenDimensions.width * 0.9 || height < screenDimensions.height * 0.75) {
            const timestamp = new Date().toLocaleTimeString();
            const logMessage = `[LOG UJIAN] Terdeteksi menggunakan Mini Window / Layar Belah pada pukul ${timestamp}!`;
            
            if (!cheatLogs.includes(logMessage)) {
                console.log(logMessage);
                setCheatLogs((prevLogs) => [...prevLogs, logMessage]);
                setCheatWarningCount((prevCount) => prevCount + 1);
            }
        }
    };

    // --- 4. PENJATUHAN SANKSI ---
    useEffect(() => {
        if (cheatWarningCount === 1) {
            Alert.alert(
                "Peringatan Kecurangan!", 
                "Terdeteksi menggunakan Mini Window, Layar Belah, atau keluar aplikasi! Sekali lagi Anda melakukannya, ujian akan otomatis dikumpulkan."
            );
        } else if (cheatWarningCount >= 2) {
            Alert.alert(
                "Diskualifikasi", 
                "Pelanggaran maksimal tercapai. Anda didiskualifikasi dan ujian otomatis dikumpulkan.",
                [{ text: "Tutup", onPress: () => router.back() }]
            );
        }
    }, [cheatWarningCount, router]);

    // --- 5. TIMER ---
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    Alert.alert("Waktu Habis", "Waktu pengerjaan habis. Ujian otomatis dikumpulkan.", [
                        { text: "OK", onPress: () => router.back() }
                    ]);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [router]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const handleClearAnswer = () => {
        const newAnswers = { ...answers };
        delete newAnswers[currentQuestion.id];
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        const answeredCount = Object.keys(answers).length;
        const unanweredCount = examData.length - answeredCount;

        let message = "Apakah Anda yakin ingin mengumpulkan ujian ini?";
        if (unanweredCount > 0) {
            message = `Masih ada ${unanweredCount} soal yang belum dijawab! Anda yakin ingin mengumpulkan?`;
        }

        Alert.alert("Konfirmasi", message, [
            { text: "Periksa Lagi", style: "cancel" },
            { 
                text: "Kumpulkan", 
                onPress: () => {
                    console.log("=== HASIL UJIAN & LOG PELANGGARAN ===");
                    console.log("Log Pelanggaran:", cheatLogs);
                    Alert.alert("Berhasil", "Jawaban Anda telah tersimpan.");
                    router.back();
                } 
            }
        ]);
    };

    return (
        <View 
            onLayout={handleLayoutDetection}
            style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }]}
        >
            
            <View style={styles.header}>
                <View style={styles.warningBadge}>
                    <MaterialCommunityIcons name="shield-lock-outline" size={16} color="#E63946" />
                    <Text style={styles.warningText}>Ujian Terkunci</Text>
                </View>
                
                <View style={styles.timerBadge}>
                    <MaterialCommunityIcons name="clock-outline" size={16} color="#000" />
                    <Text style={[styles.timerText, timeLeft < 300 && { color: "#E63946" }]}>
                        {formatTime(timeLeft)}
                    </Text>
                </View>
            </View>

            <View style={styles.progressContainer}>
                <Text style={styles.progressText}>
                    Soal {currentIndex + 1} <Text style={styles.progressTotal}>/ {examData.length}</Text>
                </Text>
                <TouchableOpacity style={styles.gridIconButton} onPress={() => setIsListVisible(true)}>
                    <MaterialCommunityIcons name="view-grid" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.questionCard}>
                    <Text style={styles.questionText}>{currentQuestion.text}</Text>
                </View>

                <View style={styles.optionsContainer}>
                    {currentQuestion.options.map((option) => {
                        const isSelected = answers[currentQuestion.id] === option.id;
                        return (
                            <TouchableOpacity
                                key={option.id}
                                activeOpacity={0.8}
                                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                                onPress={() => setAnswers({ ...answers, [currentQuestion.id]: option.id })}
                            >
                                <View style={[styles.optionLabelBox, isSelected && styles.optionLabelBoxSelected]}>
                                    <Text style={[styles.optionLabelText, isSelected && styles.optionLabelTextSelected]}>
                                        {option.label}
                                    </Text>
                                </View>
                                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                                    {option.text}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {hasAnsweredCurrent && (
                    <TouchableOpacity style={styles.clearAnswerButton} onPress={handleClearAnswer}>
                        <MaterialCommunityIcons name="eraser-variant" size={18} color="#E63946" />
                        <Text style={styles.clearAnswerText}>Hapus Jawaban</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>

            <View style={styles.bottomNavigation}>
                <TouchableOpacity 
                    style={[styles.navButton, isFirstQuestion && styles.navButtonDisabled]} 
                    disabled={isFirstQuestion}
                    onPress={() => setCurrentIndex(prev => prev - 1)}
                >
                    <MaterialCommunityIcons name="arrow-left-thick" size={24} color={isFirstQuestion ? "#888" : "#000"} />
                </TouchableOpacity>

                {isLastQuestion ? (
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Kumpulkan</Text>
                        <MaterialCommunityIcons name="check-bold" size={20} color="#FFF" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.navButtonNext} onPress={() => setCurrentIndex(prev => prev + 1)}>
                        <Text style={styles.navButtonNextText}>Selanjutnya</Text>
                        <MaterialCommunityIcons name="arrow-right-thick" size={24} color="#FFF" />
                    </TouchableOpacity>
                )}
            </View>

            <Modal visible={isListVisible} transparent={true} animationType="slide" onRequestClose={() => setIsListVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { paddingBottom: Math.max(insets.bottom, 20) }]}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Daftar Soal</Text>
                            <TouchableOpacity style={styles.closeModalButton} onPress={() => setIsListVisible(false)}>
                                <MaterialCommunityIcons name="close" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.legendContainer}>
                            <View style={styles.legendItem}><View style={[styles.legendBox, {backgroundColor: '#CAFFBF'}]} /><Text style={styles.legendText}>Terjawab</Text></View>
                            <View style={styles.legendItem}><View style={[styles.legendBox, {backgroundColor: '#FFF'}]} /><Text style={styles.legendText}>Belum</Text></View>
                            <View style={styles.legendItem}><View style={[styles.legendBox, {backgroundColor: '#000'}]} /><Text style={styles.legendText}>Saat ini</Text></View>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.gridContainer}>
                                {examData.map((q, index) => {
                                    const isAnswered = !!answers[q.id];
                                    const isCurrent = index === currentIndex;
                                    
                                    return (
                                        <TouchableOpacity
                                            key={q.id}
                                            style={[
                                                styles.gridItem,
                                                isAnswered && styles.gridItemAnswered,
                                                isCurrent && styles.gridItemCurrent
                                            ]}
                                            onPress={() => {
                                                setCurrentIndex(index);
                                                setIsListVisible(false);
                                            }}
                                        >
                                            <Text style={[styles.gridItemText, isCurrent && styles.gridItemTextCurrent]}>
                                                {index + 1}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

// --- STYLE ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FDFBF7" },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 3, borderBottomColor: "#000", backgroundColor: "#FFF" },
    warningBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFE5E5", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1.5, borderColor: "#E63946", gap: 6 },
    warningText: { fontSize: 12, fontWeight: "900", color: "#E63946", textTransform: "uppercase" },
    timerBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#FDFFB6", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, borderWidth: 2, borderColor: "#000", gap: 8, shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3 },
    timerText: { fontSize: 16, fontWeight: "900", color: "#000" },
    progressContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 16, backgroundColor: "#FDFBF7" },
    progressText: { fontSize: 20, fontWeight: "900", color: "#000" },
    progressTotal: { fontSize: 16, color: "#666" },
    gridIconButton: { width: 44, height: 44, backgroundColor: "#9BF6FF", borderRadius: 10, borderWidth: 2, borderColor: "#000", justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3 },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
    questionCard: { backgroundColor: "#FFF", padding: 20, borderRadius: 16, borderWidth: 3, borderColor: "#000", marginBottom: 24, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 6 },
    questionText: { fontSize: 16, fontWeight: "700", color: "#000", lineHeight: 24 },
    optionsContainer: { gap: 16 },
    optionCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFF", padding: 12, borderRadius: 12, borderWidth: 2, borderColor: "#000", shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3 },
    optionCardSelected: { backgroundColor: "#CAFFBF", borderColor: "#000", shadowOffset: { width: 0, height: 0 } },
    optionLabelBox: { width: 40, height: 40, backgroundColor: "#F0F0F0", borderRadius: 8, borderWidth: 2, borderColor: "#000", justifyContent: "center", alignItems: "center", marginRight: 12 },
    optionLabelBoxSelected: { backgroundColor: "#000" },
    optionLabelText: { fontSize: 16, fontWeight: "900", color: "#000" },
    optionLabelTextSelected: { color: "#FFF" },
    optionText: { flex: 1, fontSize: 15, fontWeight: "700", color: "#333", lineHeight: 22 },
    optionTextSelected: { color: "#000" },
    clearAnswerButton: { flexDirection: "row", alignItems: "center", alignSelf: "flex-end", marginTop: 16, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1.5, borderColor: "#E63946", backgroundColor: "#FFE5E5", gap: 6 },
    clearAnswerText: { fontSize: 13, fontWeight: "800", color: "#E63946" },
    bottomNavigation: { flexDirection: "row", padding: 20, borderTopWidth: 3, borderTopColor: "#000", backgroundColor: "#FFF", gap: 16 },
    navButton: { width: 60, height: 56, backgroundColor: "#FFF", borderRadius: 12, borderWidth: 3, borderColor: "#000", justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3 },
    navButtonDisabled: { backgroundColor: "#E0E0E0", borderColor: "#888", shadowOpacity: 0 },
    navButtonNext: { flex: 1, flexDirection: "row", backgroundColor: "#4361EE", borderRadius: 12, borderWidth: 3, borderColor: "#000", justifyContent: "center", alignItems: "center", gap: 8, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 6 },
    navButtonNextText: { color: "#FFF", fontSize: 16, fontWeight: "900", textTransform: "uppercase" },
    submitButton: { flex: 1, flexDirection: "row", backgroundColor: "#000", borderRadius: 12, borderWidth: 3, borderColor: "#000", justifyContent: "center", alignItems: "center", gap: 8, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 6 },
    submitButtonText: { color: "#FFF", fontSize: 16, fontWeight: "900", textTransform: "uppercase" },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" },
    modalContent: { backgroundColor: "#FDFBF7", borderTopWidth: 4, borderTopColor: "#000", borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 20, maxHeight: "70%" },
    modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
    modalTitle: { fontSize: 20, fontWeight: "900", color: "#000" },
    closeModalButton: { padding: 4 },
    legendContainer: { flexDirection: "row", gap: 16, marginBottom: 20, paddingBottom: 16, borderBottomWidth: 2, borderBottomColor: "#E0E0E0" },
    legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
    legendBox: { width: 16, height: 16, borderWidth: 1.5, borderColor: "#000", borderRadius: 4 },
    legendText: { fontSize: 12, fontWeight: "700", color: "#555" },
    gridContainer: { flexDirection: "row", flexWrap: "wrap", gap: 12, paddingBottom: 20 },
    gridItem: { width: 52, height: 52, backgroundColor: "#FFF", borderRadius: 12, borderWidth: 2, borderColor: "#000", justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3 },
    gridItemAnswered: { backgroundColor: "#CAFFBF" },
    gridItemCurrent: { backgroundColor: "#000", shadowOpacity: 0 },
    gridItemText: { fontSize: 16, fontWeight: "900", color: "#000" },
    gridItemTextCurrent: { color: "#FFF" },
});