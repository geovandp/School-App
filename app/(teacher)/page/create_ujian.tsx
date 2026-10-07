import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

type QuestionForm = {
    questionText: string;
    options: { [key: string]: string };
    correctAnswer: string;
};

export default function CreateExamPage() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    // State untuk Detail Ujian
    const [examTitle, setExamTitle] = useState("");
    const [examDuration, setExamDuration] = useState("90"); // dalam menit

    // State untuk Daftar Soal yang dibuat
    const [questions, setQuestions] = useState<QuestionForm[]>([]);

    // State untuk Form Input Soal Saat Ini
    const [currentQuestionText, setCurrentQuestionText] = useState("");
    const [options, setOptions] = useState({ A: "", B: "", C: "", D: "" });
    const [correctAnswer, setCorrectAnswer] = useState("A");

    // Fungsi Menambah Soal ke List
    const handleAddQuestion = () => {
        if (!currentQuestionText.trim()) {
            Alert.alert("Perhatian", "Pertanyaan soal tidak boleh kosong!");
            return;
        }
        if (!options.A || !options.B || !options.C || !options.D) {
            Alert.alert("Perhatian", "Semua pilihan jawaban (A, B, C, D) harus diisi!");
            return;
        }

        const newQuestion: QuestionForm = {
            questionText: currentQuestionText,
            options: { ...options },
            correctAnswer,
        };

        setQuestions([...questions, newQuestion]);

        // Reset form soal setelah ditambah
        setCurrentQuestionText("");
        setOptions({ A: "", B: "", C: "", D: "" });
        setCorrectAnswer("A");
        Alert.alert("Berhasil", "Soal berhasil ditambahkan ke daftar.");
    };

    // Fungsi Simpan / Terbitkan Ujian
    const handleSaveExam = () => {
        if (!examTitle.trim()) {
            Alert.alert("Perhatian", "Judul ujian wajib diisi!");
            return;
        }
        if (questions.length === 0) {
            Alert.alert("Perhatian", "Minimal buat 1 soal ujian sebelum disimpan!");
            return;
        }

        // Di sini nantinya Anda bisa mengirim data `examTitle`, `examDuration`, dan `questions` ke backend/database
        console.log("=== UJIAN BARU DIBUAT ===");
        console.log("Judul:", examTitle);
        console.log("Durasi:", examDuration, "Menit");
        console.log("Total Soal:", questions.length);
        console.log("Detail Soal:", questions);

        Alert.alert("Sukses", "Ujian baru berhasil diterbitkan!", [
            { text: "OK", onPress: () => router.back() }
        ]);
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }]}>
            
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Buat Ujian Baru</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* --- INFORMASI UTAMA UJIAN --- */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>1. Informasi Ujian</Text>
                    
                    <Text style={styles.label}>Judul Ujian / Mata Pelajaran</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: Ujian Akhir Semester Bahasa Indonesia"
                        placeholderTextColor="#888"
                        value={examTitle}
                        onChangeText={setExamTitle}
                    />

                    <Text style={styles.label}>Durasi Pengerjaan (Menit)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="90"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={examDuration}
                        onChangeText={setExamDuration}
                    />
                </View>

                {/* --- FORM INPUT SOAL --- */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>2. Tambah Pertanyaan ({questions.length} Soal Ditambahkan)</Text>

                    <Text style={styles.label}>Pertanyaan Soal</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Tuliskan teks soal di sini..."
                        placeholderTextColor="#888"
                        multiline
                        numberOfLines={4}
                        value={currentQuestionText}
                        onChangeText={setCurrentQuestionText}
                    />

                    <Text style={styles.label}>Pilihan Jawaban</Text>
                    {(["A", "B", "C", "D"] as const).map((key) => (
                        <View key={key} style={styles.optionRow}>
                            <View style={styles.optionBadge}>
                                <Text style={styles.optionBadgeText}>{key}</Text>
                            </View>
                            <TextInput
                                style={styles.optionInput}
                                placeholder={`Pilihan jawaban ${key}`}
                                placeholderTextColor="#888"
                                value={options[key]}
                                onChangeText={(text) => setOptions({ ...options, [key]: text })}
                            />
                        </View>
                    ))}

                    <Text style={styles.label}>Kunci Jawaban Benar</Text>
                    <View style={styles.keyContainer}>
                        {(["A", "B", "C", "D"] as const).map((key) => {
                            const isSelected = correctAnswer === key;
                            return (
                                <TouchableOpacity
                                    key={key}
                                    style={[styles.keyButton, isSelected && styles.keyButtonSelected]}
                                    onPress={() => setCorrectAnswer(key)}
                                >
                                    <Text style={[styles.keyButtonText, isSelected && styles.keyButtonTextSelected]}>
                                        {key}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Tombol Tambah Soal */}
                    <TouchableOpacity style={styles.addQuestionButton} onPress={handleAddQuestion}>
                        <MaterialCommunityIcons name="plus-thick" size={20} color="#000" />
                        <Text style={styles.addQuestionButtonText}>Tambah Soal Ini</Text>
                    </TouchableOpacity>
                </View>

                {/* --- TOMBOL PUBLISH / SIMPAN SEMUA --- */}
                <TouchableOpacity style={styles.publishButton} onPress={handleSaveExam}>
                    <MaterialCommunityIcons name="check-all" size={22} color="#FFF" />
                    <Text style={styles.publishButtonText}>Terbitkan Ujian ({questions.length} Soal)</Text>
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
    label: { fontSize: 14, fontWeight: "800", color: "#333", marginBottom: 6, marginTop: 12 },
    input: { backgroundColor: "#F9F6EE", borderWidth: 2, borderColor: "#000", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, fontWeight: "700", color: "#000" },
    textArea: { height: 100, textAlignVertical: "top" },
    optionRow: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 10 },
    optionBadge: { width: 40, height: 40, backgroundColor: "#9BF6FF", borderRadius: 8, borderWidth: 2, borderColor: "#000", justifyContent: "center", alignItems: "center" },
    optionBadgeText: { fontSize: 16, fontWeight: "900", color: "#000" },
    optionInput: { flex: 1, backgroundColor: "#F9F6EE", borderWidth: 2, borderColor: "#000", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, fontWeight: "700", color: "#000" },
    keyContainer: { flexDirection: "row", gap: 12, marginTop: 8 },
    keyButton: { flex: 1, height: 45, backgroundColor: "#FFF", borderWidth: 2, borderColor: "#000", borderRadius: 8, justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 2 },
    keyButtonSelected: { backgroundColor: "#CAFFBF" },
    keyButtonText: { fontSize: 16, fontWeight: "900", color: "#000" },
    keyButtonTextSelected: { color: "#000" },
    addQuestionButton: { flexDirection: "row", backgroundColor: "#FDFFB6", borderWidth: 2, borderColor: "#000", borderRadius: 10, paddingVertical: 12, justifyContent: "center", alignItems: "center", gap: 8, marginTop: 20, shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3 },
    addQuestionButtonText: { fontSize: 15, fontWeight: "900", color: "#000" },
    publishButton: { flexDirection: "row", backgroundColor: "#4361EE", borderWidth: 3, borderColor: "#000", borderRadius: 12, paddingVertical: 16, justifyContent: "center", alignItems: "center", gap: 10, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 6 },
    publishButtonText: { fontSize: 16, fontWeight: "900", color: "#FFF", textTransform: "uppercase" },
});