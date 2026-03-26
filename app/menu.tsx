import { globalStyles } from '@/styles/globalStyles';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Menu() {
  return (
    <View style={[globalStyles.container, { backgroundColor: '#f4f4f4' }]}>
      {/* Header personalizado más delgado y con fondo oscuro */}
      <View style={styles.customHeader}>
        <Text style={styles.modalTitle}>Menú</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Ionicons name="close" size={28} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.menuList}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
            router.back();
            router.push('/privacidad' as any);
          }}
        >
          <Text style={styles.menuText}>🔒 Aviso de Privacidad</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
            router.back();
            router.push('/contacto' as any);
          }}
        >
          <Text style={styles.menuText}>✉️ Contacto</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
            router.back();
            router.push('/servicios' as any);
          }}
        >
          <Text style={styles.menuText}>🛠️ Servicios</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  customHeader: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeBtn: {
    padding: 4,
  },
  menuList: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  chevron: {
    fontSize: 20,
    color: '#ccc',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 16,
  },
});
