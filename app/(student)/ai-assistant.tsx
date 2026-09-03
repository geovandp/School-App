import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";

// Tipe data untuk pesan
type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export default function TanyaAniseScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Halo! Aku Anise, asisten akademik kamu. Kamu bisa tanya soal jadwal pelajaran, tugas yang belum selesai, nilai, atau absensi. Ada yang bisa Anise bantu hari ini?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  // --- LOGIKA MOCK AI (Pendeteksi Kata Kunci) ---
  const generateAniseResponse = (question: string) => {
    const q = question.toLowerCase();

    if (
      q.includes("jadwal") ||
      q.includes("hari ini") ||
      q.includes("sekarang")
    ) {
      return "Hari ini kamu ada pelajaran Matematika jam 07:00, lalu Bahasa Indonesia jam 10:30. Jangan sampai terlambat ya! 📚";
    }
    if (
      q.includes("tugas") ||
      q.includes("pr") ||
      q.includes("deadline") ||
      q.includes("belum")
    ) {
      return "Kamu punya 2 tugas yang berstatus 'Belum Dikerjakan':\n1. Latihan Soal Trigonometri (Tenggat: 1 Sep)\n2. Reading Comprehension (Tenggat: 5 Sep).\n\nMau kerjakan yang mana dulu? 💪";
    }
    if (
      q.includes("nilai") ||
      q.includes("rapor") ||
      q.includes("ipk") ||
      q.includes("skor")
    ) {
      return "Rata-rata nilaimu di Kelas 10 Semester 1 adalah 85.5 (Predikat: Memuaskan). Nilai tertinggimu ada di Pendidikan Agama (92). Hebat! 🌟";
    }
    if (
      q.includes("absen") ||
      q.includes("kehadiran") ||
      q.includes("bolos") ||
      q.includes("masuk")
    ) {
      return "Total kehadiranmu semester ini mencapai 95%. Kamu tercatat izin 4 kali dan sakit 2 kali. Pertahankan terus kedisiplinanmu! 🏫";
    }

    // Fallback: Jika di luar konteks
    return "Maaf ya, Anise hanya diprogram untuk menjawab informasi seputar sekolah, seperti jadwal pelajaran, tugas, nilai, dan absensi. Ada hal terkait akademik yang ingin kamu tanyakan?";
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    // 1. Tambahkan pesan user ke layar
    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // 2. Simulasikan jeda waktu AI "berpikir" selama 1-2 detik
    setTimeout(() => {
      const botResponseText = generateAniseResponse(userMsg.text);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  // Otomatis scroll ke pesan terbawah saat ada pesan baru
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isTyping]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        style={[
          styles.mainWrapper,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={28}
              color="#1A1A1A"
            />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <View style={styles.avatarBox}>
              <MaterialCommunityIcons
                name="robot-outline"
                size={24}
                color="#FFFFFF"
              />
            </View>
            <View>
              <Text style={styles.headerTitle}>Tanya Anise</Text>
              <Text style={styles.headerSubtitle}>
                <View style={styles.onlineDot} /> Online
              </Text>
            </View>
          </View>
        </View>

        {/* --- AREA CHAT --- */}
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatContainer}
        >
          <Text style={styles.dateLabel}>Hari ini</Text>

          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <View
                key={msg.id}
                style={[
                  styles.messageBubbleWrapper,
                  isUser ? styles.wrapperUser : styles.wrapperBot,
                ]}
              >
                {/* Avatar Bot muncul di sebelah kiri chat */}
                {!isUser && (
                  <View style={styles.chatAvatar}>
                    <MaterialCommunityIcons
                      name="robot-outline"
                      size={16}
                      color="#FFFFFF"
                    />
                  </View>
                )}

                <View
                  style={[
                    styles.messageBubble,
                    isUser ? styles.bubbleUser : styles.bubbleBot,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      isUser ? styles.textUser : styles.textBot,
                    ]}
                  >
                    {msg.text}
                  </Text>
                  <Text
                    style={[
                      styles.timeText,
                      isUser ? styles.timeUser : styles.timeBot,
                    ]}
                  >
                    {msg.timestamp.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              </View>
            );
          })}

          {/* Indikator Mengetik */}
          {isTyping && (
            <View style={[styles.messageBubbleWrapper, styles.wrapperBot]}>
              <View style={styles.chatAvatar}>
                <MaterialCommunityIcons
                  name="robot-outline"
                  size={16}
                  color="#FFFFFF"
                />
              </View>
              <View
                style={[
                  styles.messageBubble,
                  styles.bubbleBot,
                  styles.typingBubble,
                ]}
              >
                <ActivityIndicator size="small" color={Colors.primary} />
                <Text style={styles.typingText}>Anise sedang mengetik...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* --- INPUT AREA --- */}
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Tanya soal jadwal, tugas, nilai..."
              placeholderTextColor="#94A3B8"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={200}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !inputText.trim() && styles.sendButtonDisabled,
              ]}
              onPress={handleSend}
              disabled={!inputText.trim()}
            >
              <MaterialCommunityIcons name="send" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: "#F8FAFC" }, // Background abu-abu kebiruan terang

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 3,
  },
  backButton: { marginRight: 15, padding: 5 },
  headerTitleContainer: { flexDirection: "row", alignItems: "center" },
  avatarBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#1A1A1A" },
  headerSubtitle: {
    fontSize: 12,
    color: "#10B981",
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginRight: 4,
    marginTop: 2,
  },

  chatContainer: { padding: 20, paddingBottom: 20 },
  dateLabel: {
    textAlign: "center",
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "600",
    marginBottom: 20,
  },

  messageBubbleWrapper: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-end",
  },
  wrapperUser: { justifyContent: "flex-end" },
  wrapperBot: { justifyContent: "flex-start" },

  chatAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  messageBubble: {
    maxWidth: "75%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  bubbleUser: { backgroundColor: Colors.primary, borderBottomRightRadius: 4 },
  bubbleBot: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },

  messageText: { fontSize: 14, lineHeight: 22 },
  textUser: { color: "#FFFFFF" },
  textBot: { color: "#1E293B" },

  timeText: { fontSize: 10, marginTop: 6, alignSelf: "flex-end" },
  timeUser: { color: "rgba(255,255,255,0.7)" },
  timeBot: { color: "#94A3B8" },

  typingBubble: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  typingText: {
    fontSize: 13,
    color: "#64748B",
    marginLeft: 10,
    fontStyle: "italic",
  },

  inputSection: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 24,
    paddingLeft: 20,
    paddingRight: 6,
    paddingVertical: 6,
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    fontSize: 14,
    color: "#1E293B",
    paddingVertical: 8,
    paddingTop: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginBottom: 2,
  },
  sendButtonDisabled: { backgroundColor: "#CBD5E1" },
});
