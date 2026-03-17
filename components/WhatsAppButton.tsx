import { CONFIG } from '@/constants/config';
import { Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function WhatsAppButton() {
  const handlePress = () => {
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMensaje)}`;
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity
      style={styles.boton}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      <Text style={styles.icono}>💬</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#25D366',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  icono: {
    fontSize: 22,
  },
});
