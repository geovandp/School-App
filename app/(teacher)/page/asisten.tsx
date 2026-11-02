import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Message = {
  id: string;
  text: string;
  sender: "bot" | "user";
};

// Chat awal saat halaman pertama dibuka
const initialMessages: Message[] = [
  {
    id: "1",
    text: "Halo! Saya adalah Asisten AI Anda. Ada yang bisa saya bantu terkait jadwal, absensi, atau informasi sekolah hari ini?",
    sender: "bot",
  },
];

export default function ChatBotPage() {
  const insets = useSafeAreaInsets();

  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSubscription = Keyboard.addListener(showEvent, () => {
      setKeyboardVisible(true);
    });

    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMsg]);

    const currentInput = inputText.toLowerCase();
    setInputText(""); 
    setIsBotTyping(true);

    setTimeout(() => {
      let replyText = "";

      if (currentInput.includes("halo") || currentInput.includes("hai")) {
        replyText = "Halo juga! Ada yang bisa saya bantu terkait informasi sekolah hari ini?";
      }
      else if (currentInput.includes("absen") || currentInput.includes("kehadiran")) {
        replyText = "Untuk mengecek atau mengubah data kehadiran, Anda bisa langsung menuju menu 'Kehadiran Siswa' di beranda.";
      }
      else if (currentInput.includes("kpi") || currentInput.includes("kinerja")) {
        replyText = "Data KPI Guru dan Rombel dapat Anda lihat melalui menu KPI. Anda bisa menggunakan filter untuk melihat data bulan ini atau per semester.";
      }
      else if (currentInput.includes("dokumen") || currentInput.includes("arsip") || currentInput.includes("surat")) {
        replyText = "Anda bisa mencari dokumen, RPP, atau surat masuk di menu 'Arsip Dokumen'.";
      }
      else if (currentInput.includes("terima kasih") || currentInput.includes("makasih")) {
        replyText = "Sama-sama! Jangan ragu untuk bertanya lagi jika Anda membutuhkan bantuan lain. 😊";
      }
      else {
        const randomReplies = [
          "Maaf, saya kurang menangkap maksud Anda. Bisa dijelaskan lebih spesifik?",
          "Saat ini saya masih dalam tahap belajar. Apakah Anda mau bertanya seputar absensi atau arsip?",
          "Hmm, pertanyaan yang menarik, tapi sayangnya saya belum punya jawaban untuk itu saat ini. 🙏",
          "Sistem saya belum mengenali perintah tersebut. Coba gunakan kata kunci seperti 'absen', 'kpi', atau 'arsip'."
        ];
        replyText = randomReplies[Math.floor(Math.random() * randomReplies.length)];
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: replyText,
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, botMsg]);
      setIsBotTyping(false);
    }, 1200); 
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === "user";

    return (
      <View
        style={[
          styles.messageWrapper,
          isUser ? styles.messageWrapperUser : styles.messageWrapperBot,
        ]}
      >
        {!isUser && (
          <View style={styles.avatarBox}>
            <MaterialCommunityIcons name="robot-happy-outline" size={22} color="#3B82F6" />
          </View>
        )}

        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.botBubble,
          ]}
        >
          <Text style={[styles.messageText, isUser && styles.userMessageText]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <View
        style={[
          styles.container,
          { paddingTop: insets.top },
        ]}
      >
        {/* --- HEADER --- */}
        <View style={styles.pageHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Asisten AI</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* --- AREA CHAT --- */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatContainer}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* --- INDIKATOR TYPING --- */}
        {isBotTyping && (
          <View style={styles.typingIndicator}>
            <View style={styles.avatarBoxSmall}>
              <MaterialCommunityIcons name="dots-horizontal" size={20} color="#94A3B8" />
            </View>
            <Text style={styles.typingText}>Mengetik balasan...</Text>
          </View>
        )}

        {/* --- AREA INPUT PESAN --- */}
        <View
          style={[
            styles.inputContainer,
            {
              paddingBottom: isKeyboardVisible ? 16 : Math.max(insets.bottom, 24),
            }
          ]}
        >
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Tanya jadwal, kpi, absensi..."
              placeholderTextColor="#94A3B8"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                { backgroundColor: inputText.trim() ? "#3B82F6" : "#E2E8F0" }
              ]}
              activeOpacity={0.7}
              onPress={handleSend}
              disabled={!inputText.trim()}
            >
              <MaterialCommunityIcons 
                name="send" 
                size={18} 
                color={inputText.trim() ? "#FFFFFF" : "#94A3B8"} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Off-white modern background
  },
  
  // --- Header ---
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    zIndex: 10,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "center",
    flex: 1,
  },

  // --- Area Chat ---
  chatContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    gap: 16,
  },
  messageWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 4,
    maxWidth: "85%",
  },
  messageWrapperUser: {
    alignSelf: "flex-end",
  },
  messageWrapperBot: {
    alignSelf: "flex-start",
  },
  
  // Avatar Bot
  avatarBox: {
    width: 36,
    height: 36,
    backgroundColor: "#EFF6FF", // Soft Blue
    borderRadius: 18, // Bulat sempurna
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 4,
  },
  
  // Chat Bubble
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: "#3B82F6", // Primary Blue
    borderBottomRightRadius: 4, // Ekor bubble
  },
  botBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4, // Ekor bubble
    // Soft Shadow untuk Bot
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  
  // Teks Pesan
  messageText: {
    fontSize: 15,
    color: "#334155", // Slate Gelap (untuk bot)
    lineHeight: 22,
  },
  userMessageText: {
    color: "#FFFFFF", // Teks Putih untuk user
  },

  // --- Indikator Typing ---
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  avatarBoxSmall: {
    width: 28,
    height: 28,
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  typingText: {
    fontSize: 13,
    color: "#94A3B8",
    fontStyle: "italic",
  },

  // --- Area Input ---
  inputContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC", // Warna abu-abu sangat soft
    borderRadius: 24, // Melengkung halus seperti kapsul
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100, // Jika teks panjang, maksimal tingginya
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#0F172A",
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18, // Bulat sempurna
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});