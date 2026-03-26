import React from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useConfig } from '@/context/ConfigContext';

export default function SocialButtons() {
  const config = useConfig();

  // Función para determinar el ícono y color basado en el nombre de la red social
  const getIconConfig = (name: string) => {
    switch (name.toLowerCase()) {
      case 'facebook':
        return { icon: 'logo-facebook' as const, color: '#1877F2' };
      case 'instagram':
        return { icon: 'logo-instagram' as const, color: '#E4405F' };
      case 'whatsapp':
        return { icon: 'logo-whatsapp' as const, color: '#25D366' };
      case 'x':
      case 'twitter':
        return { icon: 'logo-twitter' as const, color: '#1DA1F2' };
      case 'youtube':
        return { icon: 'logo-youtube' as const, color: '#FF0000' };
      default:
        return { icon: 'link' as const, color: '#555' };
    }
  };

  if (!config.social || config.social.length === 0) return null;

  return (
    <View style={styles.container}>
      {config.social.map((item, index) => {
        const { icon, color } = getIconConfig(item.name);
        return (
          <TouchableOpacity
            key={index}
            style={[styles.boton, { backgroundColor: color }]}
            onPress={() => {
              if (item.name.toLowerCase() === 'whatsapp' && config.contact?.whatsapp) {
                const url = `https://wa.me/${config.contact.whatsapp.number}?text=${encodeURIComponent(config.contact.whatsapp.message)}`;
                Linking.openURL(url);
              } else {
                Linking.openURL(item.url);
              }
            }}
            activeOpacity={0.85}
          >
            <Ionicons name={icon} size={18} color="white" />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginRight: 10,
  },
  boton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
});
