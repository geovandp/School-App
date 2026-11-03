import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// 1. Tipe Data Notifikasi
type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "success" | "warning";
  isRead: boolean;
};

// 2. Data Dummy
const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Jadwal Mengajar Baru",
    message: "Anda memiliki jadwal mengajar di Kelas 10-A pada pukul 08:00 WIB.",
    time: "10 Menit yang lalu",
    type: "info",
    isRead: false,
  },
  {
    id: "2",
    title: "Absensi Berhasil",
    message: "Data absensi kelas 11-B hari ini telah berhasil disinkronisasi ke server.",
    time: "1 Jam yang lalu",
    type: "success",
    isRead: false,
  },
  {
    id: "3",
    title: "Peringatan Sistem",
    message: "Sistem akan mengalami pemeliharaan rutin pada pukul 23:00 WIB.",
    time: "Kemarin",
    type: "warning",
    isRead: true,
  },
  {
    id: "4",
    title: "Pembaruan Modul",
    message: "Modul pembelajaran Semester 2 sudah tersedia dan siap diunduh.",
    time: "Kemarin",
    type: "info",
    isRead: true,
  },
];

export default function NotificationPage() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // Konfigurasi Gaya Ikon berdasarkan Tipe Notifikasi (Clean UI)
  const getIconData = (type: string) => {
    switch (type) {
      case "success":
        return { name: "check-decagram-outline", color: "#10B981", bg: "#ECFDF5" }; // Emerald
      case "warning":
        return { name: "alert-circle-outline", color: "#F59E0B", bg: "#FEF3C7" }; // Amber
      case "info":
      default:
        return { name: "information-outline", color: "#3B82F6", bg: "#EFF6FF" }; // Blue
    }
  };

  // Fungsi menandai satu notifikasi sudah dibaca
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
    );
  };

  // Fungsi menandai semua sudah dibaca
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
  };

  const renderItem = ({ item }: { item: NotificationItem }) => {
    const iconData = getIconData(item.type);

    return (
      <TouchableOpacity
        style={[
          styles.notificationCard,
          !item.isRead && styles.notificationCardUnread,
        ]}
        activeOpacity={0.7}
        onPress={() => markAsRead(item.id)}
      >
        {/* Ikon Kategori dengan latar soft */}
        <View style={[styles.iconBox, { backgroundColor: iconData.bg }]}>
          <MaterialCommunityIcons name={iconData.name as any} size={24} color={iconData.color} />
        </View>

        {/* Konten Teks */}
        <View style={styles.contentBox}>
          <Text style={[styles.title, !item.isRead && styles.titleUnread]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={[styles.message, !item.isRead && styles.messageUnread]} numberOfLines={2}>
            {item.message}
          </Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>

        {/* Titik Penanda Belum Dibaca (Primary Color Accent) */}
        {!item.isRead && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
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
            <MaterialCommunityIcons name="arrow-left" size={28} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifikasi</Text>
        </View>

        {/* Tombol "Tandai semua dibaca" */}
        {notifications.some((n) => !n.isRead) && (
          <TouchableOpacity onPress={markAllAsRead} style={styles.markAllButton}>
            <MaterialCommunityIcons name="check-all" size={18} color="#3B82F6" />
          </TouchableOpacity>
        )}
      </View>

      {/* --- LIST NOTIFIKASI --- */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="bell-sleep-outline" size={60} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>Belum Ada Notifikasi</Text>
            <Text style={styles.emptySubtitle}>
              Pemberitahuan jadwal mengajar, info sistem, dan absensi akan muncul di sini.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Off-white modern background
  },
  
  // --- Header Styles ---
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
  headerLeft: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  backButton: { 
    padding: 5, 
    marginRight: 10 
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#1E293B" 
  },
  markAllButton: { 
    padding: 8, 
    backgroundColor: "#EFF6FF", 
    borderRadius: 8 
  },

  // --- List & Card Styles ---
  listContainer: {
    paddingTop: 10,
    paddingBottom: 40,
  },
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
  
  // Ikon Lingkaran (Soft Badge)
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24, // Bulat penuh
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  
  // Teks Konten
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
    fontWeight: "bold",
    color: "#0F172A", // Lebih gelap jika belum dibaca
  },
  message: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
    marginBottom: 6,
  },
  messageUnread: {
    color: "#334155",
  },
  timeText: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "500",
  },
  
  // Indikator Titik Biru Kecil
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3B82F6", // Primary Accent Color
    marginLeft: 5,
  },

  // --- Empty State ---
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