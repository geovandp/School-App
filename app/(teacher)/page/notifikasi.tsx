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

  // Fungsi untuk mendapatkan ikon berdasarkan tipe notifikasi
  const getIconData = (type: string) => {
    switch (type) {
      case "success":
        return { name: "check-circle-outline", color: "#A0E8AF" };
      case "warning":
        return { name: "alert-outline", color: "#FFADAD" };
      case "info":
      default:
        return { name: "information-outline", color: "#9BF6FF" };
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
          styles.card,
          !item.isRead ? styles.cardUnread : styles.cardRead,
        ]}
        activeOpacity={0.8}
        onPress={() => markAsRead(item.id)}
      >
        <View style={[styles.iconBox, { backgroundColor: iconData.color }]}>
          <MaterialCommunityIcons name={iconData.name as any} size={28} color="#000" />
        </View>

        <View style={styles.textBox}>
          <View style={styles.titleRow}>
            <Text style={styles.notifTitle} numberOfLines={1}>
              {item.title}
            </Text>
            {/* Titik indikator belum dibaca */}
            {!item.isRead && <View style={styles.unreadDot} />}
          </View>
          <Text style={styles.notifMessage}>{item.message}</Text>
          <Text style={styles.notifTime}>{item.time}</Text>
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
        <Text style={styles.pageTitle}>Notifikasi</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Sub Header: Tombol Tandai Semua Dibaca */}
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>
          Belum dibaca: {notifications.filter((n) => !n.isRead).length}
        </Text>
        <TouchableOpacity onPress={markAllAsRead} activeOpacity={0.7}>
          <Text style={styles.markReadText}>Tandai semua dibaca</Text>
        </TouchableOpacity>
      </View>

      {/* List Notifikasi */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Tidak ada notifikasi saat ini.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFBF7",
  },
  // --- Header Styles ---
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
  // --- Sub Header Styles ---
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#000",
  },
  markReadText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#555",
    textDecorationLine: "underline",
  },
  // --- List & Card Styles ---
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 16,
  },
  card: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 16,
    borderWidth: 3,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  cardUnread: {
    backgroundColor: "#FDFFB6", // Warna pastel kuning untuk belum dibaca
  },
  cardRead: {
    backgroundColor: "#FFF", // Putih untuk sudah dibaca
    opacity: 0.8, // Sedikit redup
    shadowOffset: { width: 2, height: 2 }, // Bayangan lebih kecil
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textBox: {
    flex: 1,
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#000",
    flex: 1,
  },
  unreadDot: {
    width: 10,
    height: 10,
    backgroundColor: "#FF595E", // Merah untuk indikator belum dibaca
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
    marginLeft: 8,
  },
  notifMessage: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    lineHeight: 18,
    marginBottom: 8,
  },
  notifTime: {
    fontSize: 11,
    fontWeight: "800",
    color: "#888",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginTop: 40,
  },
});