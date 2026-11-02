import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// 1. Tipe Data Catatan
type NoteItem = {
  id: string;
  title: string;
  content: string;
  date: string;
  color: string;
};

// 2. Data Dummy Catatan (Warna disesuaikan menjadi pastel yang sangat lembut untuk background)
const initialNotes: NoteItem[] = [
  {
    id: "1",
    title: "Ide Proyek Akhir",
    content: "Membuat aplikasi absensi dengan fitur deteksi lokasi dan QR code terenkripsi.",
    date: "15 Sep 2026",
    color: "#FEF2F2", // Red Soft
  },
  {
    id: "2",
    title: "Rapat Guru",
    content: "Bahas persiapan ujian tengah semester dan evaluasi kurikulum merdeka.",
    date: "14 Sep 2026",
    color: "#FEF9C3", // Yellow Soft
  },
  {
    id: "3",
    title: "Belanja Kelas",
    content: "Spidol (3), Penghapus (1), Kertas HVS (2 rim).",
    date: "12 Sep 2026",
    color: "#ECFEFF", // Cyan Soft
  },
  {
    id: "4",
    title: "Catatan: Budi",
    content: "Budi sering terlambat. Perlu diajak bicara empat mata setelah jam pelajaran selesai.",
    date: "10 Sep 2026",
    color: "#F0FDF4", // Green Soft
  },
  {
    id: "5",
    title: "Jadwal Piket",
    content: "Cek jadwal piket kebersihan kelas 10-A minggu depan.",
    date: "08 Sep 2026",
    color: "#FAF5FF", // Purple Soft
  },
];

export default function NotesPage() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState<NoteItem[]>(initialNotes);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderNoteCard = ({ item }: { item: NoteItem }) => {
    return (
      <TouchableOpacity
        style={[styles.noteCard, { backgroundColor: item.color }]}
        activeOpacity={0.7}
        onPress={() => alert(`Buka catatan: ${item.title}`)}
      >
        <Text style={styles.noteTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.noteContent} numberOfLines={4}>
          {item.content}
        </Text>
        <View style={styles.noteFooter}>
          <Text style={styles.noteDate}>{item.date}</Text>
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
          <MaterialCommunityIcons name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Catatan</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Kolom Pencarian */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari catatan..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Grid Catatan */}
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={renderNoteCard}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="note-off-outline" size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>Tidak ada catatan yang ditemukan.</Text>
          </View>
        }
      />

      {/* Tombol Tambah Catatan (FAB) */}
      <TouchableOpacity 
        style={[styles.fab, { bottom: Math.max(insets.bottom + 20, 30) }]} 
        activeOpacity={0.8}
        onPress={() => alert("Fitur tambah catatan")}
      >
        <MaterialCommunityIcons name="plus" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Off-white modern
  },
  
  // --- Header ---
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    zIndex: 10,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "center",
    flex: 1,
  },

  // --- Pencarian ---
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 14,
    color: "#334155",
  },

  // --- Grid & Card ---
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, 
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  noteCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 6,
    minHeight: 160,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.02)", // Border super tipis untuk memberi definisi
    // Soft shadow
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  noteTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
    lineHeight: 20,
  },
  noteContent: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 20,
    flex: 1,
  },
  noteFooter: {
    marginTop: 12,
    alignItems: "flex-end",
  },
  noteDate: {
    fontSize: 11,
    fontWeight: "500",
    color: "#94A3B8",
  },

  // --- Empty State ---
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: "#64748B",
  },

  // --- Floating Action Button (FAB) ---
  fab: {
    position: "absolute",
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: "#3B82F6", // Primary Accent Color
    borderRadius: 28, // Lingkaran sempurna
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 20,
  },
});