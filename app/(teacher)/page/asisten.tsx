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

  // State untuk input teks dan daftar obrolan
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    // Event listener yang berbeda untuk iOS dan Android agar lebih mulus
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSubscription = Keyboard.addListener(showEvent, () => {
      setKeyboardVisible(true);
    });

    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setKeyboardVisible(false);
    });

    // Bersihkan listener saat komponen dilepas (unmount)
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // Reference untuk FlatList agar bisa auto-scroll ke bawah
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    // 1. Simpan pesan user ke dalam list
    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMsg]);
    setInputText(""); // Kosongkan kolom input
    setIsBotTyping(true); // Tampilkan status bot sedang memproses (opsional)

    // 2. Beri jeda 1 detik seolah bot sedang "mengetik", lalu munculkan balasannya
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Maaf, bot belum bisa beroperasi untuk saat ini. 🙏 Minta tolong kembali nanti ya!",
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, botMsg]);
      setIsBotTyping(false);
    }, 1000); // 1000ms = 1 detik
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
            <MaterialCommunityIcons name="robot-outline" size={20} color="#000" />
          </View>
        )}

        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.botBubble,
          ]}
        >
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      // Gunakan "height" untuk Android dan "padding" untuk iOS
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // Tambahkan offset agar inputan terdorong sedikit ke atas keyboard pada iOS
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            // paddingBottom: Math.max(insets.bottom, 16),
          },
        ]}
      >
        {/* Header */}
        <View style={styles.pageHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
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
          // Auto-scroll ke bawah saat ada pesan baru
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Indikator Typing (Opsional) */}
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
              // Jika keyboard terbuka -> paddingBottom: 0
              // Jika tertutup -> gunakan insets.bottom atau minimal 16
              paddingBottom: isKeyboardVisible ? 16 : Math.max(insets.bottom, 50)
            }
          ]}
        >
          <TextInput
            style={styles.textInput}
            placeholder="Ketik pesan..."
            placeholderTextColor="#777"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            style={styles.sendButton}
            activeOpacity={0.7}
            onPress={handleSend}
          >
            <MaterialCommunityIcons name="send" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    zIndex: 10,
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
    width: 36,
    height: 36,
    backgroundColor: "#9BF6FF",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 4,
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  userBubble: {
    backgroundColor: "#CAFFBF",
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
    lineHeight: 20,
  },
  typingIndicator: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  typingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    fontStyle: "italic",
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFF",
    borderTopWidth: 3,
    borderTopColor: "#000",
    alignItems: "center",
    gap: 12,
  },
  textInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#F4F4F4",
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  sendButton: {
    width: 50,
    height: 50,
    backgroundColor: "#000",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
});