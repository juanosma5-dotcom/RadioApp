import { router, usePathname } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConfig } from '@/context/ConfigContext';

export default function AppHeader() {
  const config = useConfig();
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  
  const handleMenuPress = () => {
    if (pathname === '/menu') {
      router.back();
    } else {
      router.push('/menu' as any);
    }
  };

  return (
    <View style={[styles.header, { paddingTop: insets.top + 4 }]}>
      <View style={styles.left}>
        <TouchableOpacity onPress={handleMenuPress} style={styles.menuIcon}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>{config.station}</Text>
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
    paddingBottom: 8,
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
