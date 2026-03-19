import React, { useEffect, useState } from 'react';
import { globalStyles } from '@/styles/globalStyles';
import { CONFIG } from '@/constants/config';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function Servicios() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(CONFIG.apiServicios)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Servicios endpoint failed, showing maintenance mode:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={[globalStyles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error || !data) {
    return (
      <SafeAreaView style={[globalStyles.container, styles.center]}>
        <Ionicons name="construct-outline" size={80} color="#666" style={styles.icon} />
        <Text style={styles.mantenimientoTitulo}>Sección en Mantenimiento</Text>
        <Text style={styles.mantenimientoTexto}>
          La sección de servicios no se encuentra disponible en este momento.{'\n'}
          Estamos trabajando para ofrecerte esta funcionalidad pronto.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.content}>
        <Text>Servicios disponibles pronto...</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  icon: {
    marginBottom: 20,
  },
  mantenimientoTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  mantenimientoTexto: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  content: {
    padding: 16,
  },
});
