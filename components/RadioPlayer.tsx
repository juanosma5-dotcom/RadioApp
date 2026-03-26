import { useConfig } from '@/context/ConfigContext';
import { Audio } from 'expo-av';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SocialButtons from './SocialButtons';

export default function RadioPlayer() {
  const config = useConfig();
  const [sonido, setSonido] = useState<InstanceType<typeof Audio.Sound> | null>(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [cargando, setCargando] = useState(false);

  const togglePlay = async () => {
    if (cargando) return;

    if (reproduciendo && sonido) {
      await sonido.stopAsync();
      await sonido.unloadAsync();
      setSonido(null);
      setReproduciendo(false);
      return;
    }

    try {
      setCargando(true);
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

      const { sound } = await Audio.Sound.createAsync(
        { uri: config.stream.url },
        { shouldPlay: true, isLooping: false }
      );

      setSonido(sound);
      setReproduciendo(true);
    } catch (error) {
      console.log('Error al reproducir:', error);
    } finally {
      setCargando(false);
    }
  };
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.barra, { paddingBottom: 12 + insets.bottom }]}>
      <View style={styles.info}>
        <Text style={styles.nombre}>📻 Radio en Vivo</Text>
        <Text style={styles.estado}>
          {cargando ? 'Conectando...' : reproduciendo ? '🔴 Al Aire' : 'Toca para escuchar'}
        </Text>
      </View>

      <SocialButtons />

      <TouchableOpacity style={styles.boton} onPress={togglePlay} disabled={cargando}>
        {cargando
          ? <ActivityIndicator color="white" />
          : <Text style={styles.botonTexto}>{reproduciendo ? '⏹' : '▶'}</Text>
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  barra: {
    backgroundColor: '#24376B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 10,
  },
  info: { flex: 1 },
  nombre: { color: 'white', fontWeight: 'bold', fontSize: 15 },
  estado: { color: '#ffcccc', fontSize: 12, marginTop: 2 },
  boton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonTexto: { color: 'white', fontSize: 22 },
});