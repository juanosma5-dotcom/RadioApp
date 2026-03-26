import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppConfig } from '@/types/config';

import { ENV } from '@/constants/env';

interface ConfigContextProps {
  config: AppConfig;
}

const ConfigContext = createContext<ConfigContextProps | null>(null);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [error, setError] = useState(false);

  const loadConfig = async () => {
    try {
      setError(false);
      // Fetch remote configuration
      const res = await fetch(ENV.CONFIG_URL);
      if (!res.ok) throw new Error('Errorfetching config JSON');
      const data: AppConfig = await res.json();
      setConfig(data);
    } catch (err) {
      console.warn('Error fetching app settings:', err);
      setError(true);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.icon}>📡</Text>
        <Text style={styles.title}>Sin conexión</Text>
        <Text style={styles.subtitle}>No pudimos conectar con los servidores de la emisora.</Text>
        <TouchableOpacity style={styles.button} onPress={loadConfig}>
          <Text style={styles.buttonText}>Reintentar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!config) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#24376B" />
        <Text style={styles.subtitleLoading}>Cargando emisora...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ConfigContext.Provider value={{ config }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig debe usarse dentro de un ConfigProvider');
  }
  return context.config;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  icon: { fontSize: 50, marginBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 25 },
  subtitleLoading: { fontSize: 16, color: '#666', marginTop: 15 },
  button: { backgroundColor: '#c0392b', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
