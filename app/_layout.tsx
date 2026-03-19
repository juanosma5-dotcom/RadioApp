import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { View } from 'react-native';

import AppHeader from '@/components/AppHeader';
import RadioPlayer from '@/components/RadioPlayer';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        {/* Header persistente en todas las pantallas */}
        <AppHeader />

        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="noticia" options={{ headerShown: false }} />
          <Stack.Screen name="menu" options={{ title: 'Menú', presentation: 'modal' }} />
          <Stack.Screen name="privacidad" options={{ title: 'Aviso de Privacidad' }} />
          <Stack.Screen name="contacto" options={{ title: 'Contacto' }} />
          <Stack.Screen name="servicios" options={{ title: 'Servicios' }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>

        {/* Reproductor persistente (incluye botón WhatsApp) */}
        <RadioPlayer />
      </View>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
