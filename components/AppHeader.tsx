import { router } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppHeader() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => router.push('/menu' as any)} style={styles.menuIcon}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Antena de los Andes</Text>
      </View>
      
      <Image
        source={require('@/assets/images/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#24376B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  titulo: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuIcon: {
    padding: 4,
  },
  menuText: {
    color: 'white',
    fontSize: 24,
  },
});
