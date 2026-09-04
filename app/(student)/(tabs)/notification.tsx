import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

// --- DATA DUMMY NOTIFIKASI ---
const INITIAL_NOTIFICATIONS = [
  {
    id: "1",
    type: "tugas",
    title: "Tugas Baru Ditambahkan",
    message:
      "Bapak Sudirman menambahkan tugas baru pada mata pelajaran Matematika Wajib.",
    time: "10 menit yang lalu",
    isRead: false, // Belum dibaca
  },
  {
    id: "2",
    type: "nilai",
    title: "Nilai Semester Telah Dirilis!",
    message:
      "Selamat! Nilai akademik Semester Ganjil 2026/2027 sudah dapat dilihat di dashboard nilai Anda.",
    time: "2 jam yang lalu",
    isRead: false,
  },
  {
    id: "3",
    type: "submit",
    title: "Tugas Berhasil Dikumpulkan",
    message:
      "Jawaban untuk 'Praktikum Fisika Dasar' telah berhasil diunggah dan diterima sistem.",
    time: "Kemarin, 15:30",
    isRead: true, // Sudah dibaca
  },
  {
    id: "4",
    type: "ekskul",
    title: "Pendaftaran Ekskul Diterima",
    message:
      "Pendaftaran Anda pada ekstrakurikuler Pramuka telah disetujui oleh pembina. Jadwal sudah otomatis masuk ke kalender Anda.",
    time: "2 Sep 2026",
    isRead: true,
  },
  {
    id: "5",
    type: "pengumuman",
    title: "Perubahan Jadwal Ujian",
    message:
      "Harap perhatikan bahwa jadwal UTS Bahasa Inggris dimajukan menjadi hari Rabu, 10 September.",
    time: "1 Sep 2026",
    isRead: true,
  },
];

export default function NotifikasiScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  // Fungsi menandai semua notifikasi sudah dibaca
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true })),
    );
  };

  // Fungsi menandai satu notifikasi saat diklik
  const handleReadNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  // Konfigurasi Gaya Ikon berdasarkan Tipe Notifikasi
  const getNotificationStyle = (type: string) => {
    switch (type) {
      case "tugas":
        return { icon: "book-edit-outline", color: "#3B82F6", bg: "#EFF6FF" }; // Biru
      case "nilai":
        return {
          icon: "star-shooting-outline",
          color: "#F59E0B",
          bg: "#FEF3C7",
        }; // Kuning/Emas
      case "submit":
        return {
          icon: "check-decagram-outline",
          color: "#10B981",
          bg: "#ECFDF5",
        }; // Hijau
      case "ekskul":
        return {
          icon: "account-group-outline",
          color: "#8B5CF6",
          bg: "#F5F3FF",
        }; // Ungu
      default:
        return { icon: "bell-outline", color: "#64748B", bg: "#F1F5F9" }; // Abu-abu (Pengumuman Umum)
    }
  };

  return (
    <View style={[styles.mainWrapper, { paddingTop: insets.top }]}>
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={28}
              color="#1E293B"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifikasi</Text>
        </View>

        {/* Tombol "Tandai semua dibaca" */}
        {notifications.some((n) => !n.isRead) && (
          <TouchableOpacity
            onPress={markAllAsRead}
            style={styles.markAllButton}
          >
            <MaterialCommunityIcons
              name="check-all"
              size={18}
              color={Colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.listContainer}>
          {notifications.length > 0 ? (
            notifications.map((item) => {
              const styleConfig = getNotificationStyle(item.type);

              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.notificationCard,
                    !item.isRead && styles.notificationCardUnread,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => handleReadNotification(item.id)}
                >
                  {/* Ikon Kategori */}
                  <View
                    style={[
                      styles.iconBox,
                      { backgroundColor: styleConfig.bg },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={styleConfig.icon as any}
                      size={24}
                      color={styleConfig.color}
                    />
                  </View>

                  {/* Konten Teks */}
                  <View style={styles.contentBox}>
                    <Text
                      style={[styles.title, !item.isRead && styles.titleUnread]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        styles.message,
                        !item.isRead && styles.messageUnread,
                      ]}
                      numberOfLines={2}
                    >
                      {item.message}
                    </Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>

                  {/* Titik Penanda Belum Dibaca */}
                  {!item.isRead && <View style={styles.unreadDot} />}
                </TouchableOpacity>
              );
            })
          ) : (
            /* Empty State */
            <View style={styles.emptyState}>
              <MaterialCommunityIcons
                name="bell-sleep-outline"
                size={60}
                color="#CBD5E1"
              />
              <Text style={styles.emptyTitle}>Belum Ada Notifikasi</Text>
              <Text style={styles.emptySubtitle}>
                Pemberitahuan terkait tugas, nilai, dan informasi sekolah akan
                muncul di sini.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: "#F8FAFC" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  backButton: { padding: 5, marginRight: 10 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#1E293B" },
  markAllButton: { padding: 8, backgroundColor: "#F0FDF4", borderRadius: 8 },

  contentContainer: { paddingBottom: 40 },
  listContainer: { paddingTop: 10 },

  // Desain Kartu Notifikasi
  notificationCard: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    alignItems: "center",
  },
  notificationCardUnread: {
    backgroundColor: "#F4F8FC", // Warna latar sedikit biru terang/abu untuk yang belum dibaca
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  contentBox: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 4,
  },
  titleUnread: {
    fontWeight: "900",
    color: "#0F172A",
  },
  message: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
    marginBottom: 6,
  },
  messageUnread: {
    color: "#334155", // Teks deskripsi lebih gelap sedikit jika belum dibaca
  },
  timeText: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "500",
  },

  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary, // Menggunakan warna hijau aplikasi
    marginLeft: 5,
  },

  // Empty State
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginTop: 15,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
  },
});
