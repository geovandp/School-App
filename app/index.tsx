import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang</Text>
      <Text style={styles.subtitle}>Silakan pilih masuk sebagai:</Text>

      {/* Tombol 1: Ke Halaman Siswa */}
      <TouchableOpacity 
        style={[styles.button, styles.studentButton]} 
        onPress={() => router.push('/(student)/(tabs)')}
      >
        <Text style={styles.buttonText}>Masuk ke Siswa</Text>
      </TouchableOpacity>

      {/* Tombol 2: Ke Halaman Guru */}
      <TouchableOpacity 
        style={[styles.button, styles.teacherButton]} 
        onPress={() => router.push('/(teacher)/(tabs)')}
      >
        <Text style={styles.buttonText}>Masuk ke Guru</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: { ios: 0.1, android: 0.2 }[0] ?? 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentButton: {
    backgroundColor: '#007AFF', // Warna Biru untuk Siswa
  },
  teacherButton: {
    backgroundColor: '#34C759', // Warna Hijau untuk Guru
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});