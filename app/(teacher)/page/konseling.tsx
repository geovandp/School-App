import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Data dummy diperbarui dengan penambahan kronologi dan fotoBukti
const DAFTAR_LAPORAN = [
  {
    id: "LP-001",
    tanggal: "29 Sep 2026",
    kategori: "Bolos",
    lokasi: "Kantin Belakang",
    pelapor: "Anonim",
    status: "Menunggu",
    statusColor: "#FFD6A5", 
    kronologi: "Terlihat sekelompok siswa melompat pagar belakang kantin pada jam pelajaran ke-3 matematika.",
    fotoBukti: "https://via.placeholder.com/400x300.png?text=Foto+Bukti+1", // Contoh link gambar
  },
  {
    id: "LP-002",
    tanggal: "28 Sep 2026",
    kategori: "Merokok",
    lokasi: "Toilet Lantai 2",
    pelapor: "Siswa Kelas 11",
    status: "Diproses",
    statusColor: "#FDFFB6", 
    kronologi: "Tercium bau asap rokok yang menyengat dari bilik ujung toilet pria lantai 2 pada saat jam istirahat pertama.",
    fotoBukti: "https://via.placeholder.com/400x300.png?text=Foto+Bukti+2",
  },
  {
    id: "LP-003",
    tanggal: "25 Sep 2026",
    kategori: "Perundungan",
    lokasi: "Koridor Kelas 10",
    pelapor: "Anonim",
    status: "Selesai",
    statusColor: "#CAFFBF", 
    kronologi: "Seorang siswa diolok-olok secara verbal oleh 3 kakak kelas saat berjalan menuju ruang guru.",
    fotoBukti: null, // Contoh jika pelapor tidak menyertakan foto
  },
];

export default function DaftarLaporanPage() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // State untuk melacak ID laporan mana yang sedang dibuka/di-expand
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Fungsi untuk toggle (buka/tutup) kartu
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
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
      <View style={styles.pageHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Daftar Laporan</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="inbox-multiple-outline" size={24} color="#000" />
          <Text style={styles.infoText}>
            Berikut adalah daftar laporan yang masuk. Ketuk kartu untuk melihat detail kronologi dan foto bukti.
          </Text>
        </View>

        <View style={styles.listContainer}>
          {DAFTAR_LAPORAN.map((laporan) => {
            const isExpanded = expandedId === laporan.id;

            return (
              <TouchableOpacity
                key={laporan.id}
                style={[
                    styles.laporanCard, 
                    // Menambahkan bayangan ekstra jika kartu sedang dibuka
                    isExpanded && { elevation: 8, shadowOffset: { width: 6, height: 6 } } 
                ]}
                activeOpacity={0.9}
                onPress={() => toggleExpand(laporan.id)}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.laporanId}>{laporan.id}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: laporan.statusColor }]}>
                    <Text style={styles.statusText}>{laporan.status}</Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.laporanKategori}>{laporan.kategori}</Text>
                  
                  <View style={styles.metaRow}>
                    <MaterialCommunityIcons name="map-marker-outline" size={14} color="#555" />
                    <Text style={styles.metaText}>{laporan.lokasi}</Text>
                  </View>
                  
                  <View style={styles.metaRow}>
                    <MaterialCommunityIcons name="calendar-clock-outline" size={14} color="#555" />
                    <Text style={styles.metaText}>{laporan.tanggal}</Text>
                  </View>

                  <View style={styles.metaRow}>
                    <MaterialCommunityIcons name="account-eye-outline" size={14} color="#555" />
                    <Text style={styles.metaText}>Pelapor: {laporan.pelapor}</Text>
                  </View>

                  {/* Indikator buka/tutup */}
                  <View style={styles.expandIndicator}>
                      <Text style={styles.expandText}>
                          {isExpanded ? "Tutup Detail" : "Lihat Detail"}
                      </Text>
                      <MaterialCommunityIcons 
                          name={isExpanded ? "chevron-up" : "chevron-down"} 
                          size={16} 
                          color="#4361EE" 
                      />
                  </View>
                </View>

                {/* --- KONTEN DETAIL & FOTO (Hanya Muncul Jika Di-Expand) --- */}
                {isExpanded && (
                  <View style={styles.expandedContent}>
                    <View style={styles.divider} />
                    
                    <Text style={styles.detailLabel}>Kronologi Kejadian:</Text>
                    <Text style={styles.detailText}>{laporan.kronologi}</Text>

                    <Text style={styles.detailLabel}>Foto Bukti:</Text>
                    {laporan.fotoBukti ? (
                        <Image 
                            source={{ uri: laporan.fotoBukti }} 
                            style={styles.buktiImage} 
                        />
                    ) : (
                        <View style={styles.noPhotoBox}>
                            <MaterialCommunityIcons name="image-off-outline" size={24} color="#888" />
                            <Text style={styles.noPhotoText}>Tidak ada foto bukti</Text>
                        </View>
                    )}

                    {/* Tombol Aksi Opsional untuk Penerima Laporan */}
                    <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
                        <Text style={styles.actionButtonText}>Tindak Lanjuti Kasus</Text>
                        <MaterialCommunityIcons name="shield-check" size={18} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                )}

              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFBF7" },
  pageHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 3, borderBottomColor: "#000", backgroundColor: "#FFF", zIndex: 10 },
  backButton: { width: 40, height: 40, backgroundColor: "#FFF", borderWidth: 2, borderColor: "#000", borderRadius: 10, justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3 },
  pageTitle: { fontSize: 18, fontWeight: "900", color: "#000", textAlign: "center", flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  infoBox: { flexDirection: "row", backgroundColor: "#9BF6FF", borderWidth: 3, borderColor: "#000", borderRadius: 12, padding: 16, marginBottom: 24, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 3, height: 3 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4 },
  infoText: { flex: 1, marginLeft: 12, fontSize: 13, fontWeight: "700", color: "#000", lineHeight: 18 },
  listContainer: { gap: 16 },
  laporanCard: { backgroundColor: "#FFF", borderWidth: 3, borderColor: "#000", borderRadius: 16, padding: 16, shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 6 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12, paddingBottom: 8, borderBottomWidth: 2, borderBottomColor: "#F0F0F0" },
  laporanId: { fontSize: 14, fontWeight: "800", color: "#555" },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 2, borderColor: "#000" },
  statusText: { fontSize: 10, fontWeight: "900", color: "#000", textTransform: "uppercase" },
  cardBody: { gap: 8 },
  laporanKategori: { fontSize: 18, fontWeight: "900", color: "#000", marginBottom: 4 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { fontSize: 13, fontWeight: "600", color: "#333" },
  expandIndicator: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 4 },
  expandText: { fontSize: 13, fontWeight: "700", color: "#4361EE" },
  
  // --- Gaya untuk Konten Terbuka (Expanded) ---
  expandedContent: { marginTop: 12 },
  divider: { height: 2, backgroundColor: "#F0F0F0", marginBottom: 12 },
  detailLabel: { fontSize: 13, fontWeight: "800", color: "#000", marginBottom: 4 },
  detailText: { fontSize: 13, fontWeight: "500", color: "#444", lineHeight: 20, marginBottom: 16 },
  buktiImage: { width: "100%", height: 200, borderRadius: 12, borderWidth: 2, borderColor: "#000", backgroundColor: "#F0F0F0", marginBottom: 16, resizeMode: "cover" },
  noPhotoBox: { width: "100%", height: 100, borderRadius: 12, borderWidth: 2, borderColor: "#888", borderStyle: "dashed", backgroundColor: "#FAFAFA", justifyContent: "center", alignItems: "center", marginBottom: 16, gap: 8 },
  noPhotoText: { fontSize: 13, fontWeight: "600", color: "#888" },
  actionButton: { backgroundColor: "#4361EE", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 14, borderRadius: 12, borderWidth: 2, borderColor: "#000", gap: 8 },
  actionButtonText: { fontSize: 14, fontWeight: "800", color: "#FFF" }
});