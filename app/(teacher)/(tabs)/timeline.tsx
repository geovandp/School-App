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

// 2. Data Dummy Catatan
const initialNotes: NoteItem[] = [
  {
    id: "1",
    title: "Ide Proyek Akhir",
    content: "Membuat aplikasi absensi dengan fitur deteksi lokasi dan QR code terenkripsi.",
    date: "15 Sep 2026",
    color: "#FFADAD", // Merah pastel
  },
  {
    id: "2",
    title: "Rapat Guru",
    content: "Bahas persiapan ujian tengah semester dan evaluasi kurikulum merdeka.",
    date: "14 Sep 2026",
    color: "#FDFFB6", // Kuning pastel
  },
  {
    id: "3",
    title: "Belanja Kelas",
    content: "Spidol (3), Penghapus (1), Kertas HVS (2 rim).",
    date: "12 Sep 2026",
    color: "#9BF6FF", // Cyan pastel
  },
  {
    id: "4",
    title: "Catatan: Budi",
    content: "Budi sering terlambat. Perlu diajak bicara empat mata setelah jam pelajaran selesai.",
    date: "10 Sep 2026",
    color: "#CAFFBF", // Hijau pastel
  },
  {
    id: "5",
    title: "Jadwal Piket",
    content: "Cek jadwal piket kebersihan kelas 10-A minggu depan.",
    date: "08 Sep 2026",
    color: "#FFC6FF", // Ungu/Pink pastel
  },
];

export default function NotesPage() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState<NoteItem[]>(initialNotes);

  // Fitur pencarian catatan
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderNoteCard = ({ item }: { item: NoteItem }) => {
    return (
      <TouchableOpacity
        style={[styles.noteCard, { backgroundColor: item.color }]}
        activeOpacity={0.8}
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
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Catatan</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Kolom Pencarian */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color="#555" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari catatan..."
          placeholderTextColor="#888"
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
            <MaterialCommunityIcons name="note-off-outline" size={48} color="#888" />
            <Text style={styles.emptyText}>Tidak ada catatan yang ditemukan.</Text>
          </View>
        }
      />

      {/* Tombol Tambah Catatan (Floating Action Button) */}
      <TouchableOpacity 
        style={[styles.fab, { bottom: Math.max(insets.bottom + 20, 30) }]} 
        activeOpacity={0.8}
        onPress={() => alert("Fitur tambah catatan")}
      >
        <MaterialCommunityIcons name="plus" size={32} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFBF7",
  },
  // --- Header ---
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
    boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000",
    textAlign: "center",
    flex: 1,
  },
  // --- Pencarian ---
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 12,
    boxShadow: "3px 3px 0px rgba(0, 0, 0, 1)",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 46,
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  // --- Grid & Card ---
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80, // Ruang ekstra agar card terbawah tidak tertutup tombol FAB
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16, // Jarak antar baris
  },
  noteCard: {
    flex: 1,
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 6, // Jarak antar kolom
    boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
    minHeight: 150,
    justifyContent: "space-between",
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#000",
    marginBottom: 8,
  },
  noteContent: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    lineHeight: 18,
    flex: 1,
  },
  noteFooter: {
    marginTop: 12,
    alignItems: "flex-end",
  },
  noteDate: {
    fontSize: 11,
    fontWeight: "800",
    color: "rgba(0,0,0,0.5)",
  },
  // --- Empty State ---
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "700",
    color: "#888",
  },
  // --- Floating Action Button (FAB) ---
  fab: {
    position: "absolute",
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#000",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#FFF", // Border putih agar kontras jika latar belakang gelap
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.4)",
    zIndex: 20,
  },
});