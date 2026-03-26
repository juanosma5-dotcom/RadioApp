import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { View } from 'react-native';

import AppHeader from '@/components/AppHeader';
import RadioPlayer from '@/components/RadioPlayer';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ConfigProvider } from '@/context/ConfigContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ConfigProvider>
        <View style={{ flex: 1 }}>
          {/* Header persistente en todas las pantallas */}
          <AppHeader />

          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="noticia" options={{ headerShown: false }} />
            <Stack.Screen name="menu" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="privacidad" options={{ headerShown: false }} />
            <Stack.Screen name="contacto" options={{ headerShown: false }} />
            <Stack.Screen name="servicios" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
          </Stack>

          {/* Reproductor persistente (incluye botón WhatsApp) */}
          <RadioPlayer />
        </View>
      </ConfigProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
