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
    text: "Halo! Saya adalah Asisten AI Anda. Ada yang bisa saya bantu hari ini?",
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
    }, 1000); 
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
            <MaterialCommunityIcons name="robot-outline" size={18} color="#3B82F6" />
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
        {/* Header */}
        <View style={styles.pageHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Asisten Cerdas</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Area Chat */}
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

        {/* Indikator Typing */}
        {isBotTyping && (
          <View style={styles.typingIndicator}>
            <Text style={styles.typingText}>Bot sedang mengetik...</Text>
          </View>
        )}

        {/* Area Input Pesan */}
        <View
          style={[
            styles.inputContainer,
            {
              paddingBottom: isKeyboardVisible ? 16 : Math.max(insets.bottom, 16),
            }
          ]}
        >
          <TextInput
            style={styles.textInput}
            placeholder="Ketik pesan..."
            placeholderTextColor="#94A3B8"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            style={styles.sendButton}
            activeOpacity={0.7}
            onPress={handleSend}
          >
            <MaterialCommunityIcons name="send" size={18} color="#FFF" />
          </TouchableOpacity>
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
    padding: 6,
    borderRadius: 8,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "center",
    flex: 1,
  },
  chatContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    gap: 16,
  },
  messageWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 8,
    maxWidth: "85%",
  },
  messageWrapperUser: {
    alignSelf: "flex-end",
  },
  messageWrapperBot: {
    alignSelf: "flex-start",
  },
  avatarBox: {
    width: 32,
    height: 32,
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 4,
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: "#3B82F6", // Primary Blue modern
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  messageText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#334155",
    lineHeight: 20,
  },
  userMessageText: {
    color: "#FFFFFF",
  },
  typingIndicator: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  typingText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#94A3B8",
    fontStyle: "italic",
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    alignItems: "center",
    gap: 12,
  },
  textInput: {
    flex: 1,
    height: 44,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "500",
    color: "#0F172A",
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: "#3B82F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});