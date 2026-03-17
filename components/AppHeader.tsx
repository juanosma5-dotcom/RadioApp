import { Image, StyleSheet, Text, View } from 'react-native';

export default function AppHeader() {
  return (
    <View style={styles.header}>
      <Image
        source={require('@/assets/images/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.titulo}>Antena de los Andes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#24376B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
});
