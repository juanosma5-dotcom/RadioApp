import { globalStyles } from '@/styles/globalStyles';
import { router } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Menu() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.menuList}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/privacidad' as any)}
        >
          <Text style={styles.menuText}>🔒 Aviso de Privacidad</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/contacto' as any)}
        >
          <Text style={styles.menuText}>✉️ Contacto</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
