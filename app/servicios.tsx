import React, { useEffect, useState } from 'react';
import { globalStyles } from '@/styles/globalStyles';
import { useConfig } from '@/context/ConfigContext';
import { ENV } from '@/constants/env';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Servicio {
  estado: string;
  titulo: string;
  descripcion: string;
  tecnologias: string[];
}

interface ServiciosData {
  servicios: Servicio[];
  stack: string[];
}

export default function Servicios() {
  const config = useConfig();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<ServiciosData | null>(null);

  useEffect(() => {
    // Usamos el endpoint oficial dictado remotamente o el que tenemos local
    const url = (config.api?.servicios && config.api.servicios.includes('.json')) 
      ? config.api.servicios 
      : ENV.SERVICIOS_URL;

    fetch(url)
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
      <View style={[globalStyles.container, styles.center]}>
        <ActivityIndicator size="large" color="#24376B" />
      </View>
    );
  }

  // Si hay error o no hay data estructurada, cae suavemente a la vista de mantenimiento
  if (error || !data || !data.servicios || data.servicios.length === 0) {
    return (
      <View style={[globalStyles.container, styles.center]}>
        <Ionicons name="construct-outline" size={80} color="#666" style={styles.icon} />
        <Text style={styles.mantenimientoTitulo}>Sección en Mantenimiento</Text>
        <Text style={styles.mantenimientoTexto}>
          La sección de servicios no se encuentra disponible en este momento.{'\n'}
          Estamos trabajando para ofrecerte esta funcionalidad pronto.
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Servicio }) => (
    <View style={[globalStyles.card, styles.cardExtra]}>
      <View style={globalStyles.contenido}>
        <View style={styles.headerRow}>
          <Text style={styles.cardTitle} numberOfLines={2}>{item.titulo}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.estado}</Text>
          </View>
        </View>
        <Text style={styles.cardDesc}>{item.descripcion}</Text>
        <Text style={styles.techText}>
          <Text style={{fontWeight: 'bold'}}>Tecnologías:</Text> {item.tecnologias.join(', ')}
        </Text>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!data?.stack || data.stack.length === 0) return null;
    return (
      <View style={styles.stackContainer}>
        <Text style={styles.stackTitle}>Nuestro Stack Tecnológico</Text>
        <View style={styles.stackGrid}>
          {data.stack.map((tech, index) => (
            <View key={index} style={styles.stackBadge}>
              <Text style={styles.stackBadgeText}>{tech}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={globalStyles.container}>
      {/* Header negro personalizado */}
      <View style={styles.customBlackHeader}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 15 }}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.customHeaderTitle}>Servicios</Text>
      </View>

      <FlatList
        data={data.servicios}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={() => (
          <View style={styles.listHeader}>
            <Text style={styles.pageTitle}>Nuestros Servicios e Infraestructura</Text>
            <Text style={styles.pageSubtitle}>Conoce los desarrollos de software nativos y cloud que ofrecemos.</Text>
          </View>
        )}
        ListFooterComponent={renderFooter}
      />
    </View>
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
  listContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  listHeader: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#24376B',
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  cardExtra: {
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#24376B',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  badge: {
    backgroundColor: '#E6F4FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#24376B',
    fontWeight: 'bold',
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  techText: {
    fontSize: 13,
    color: '#888',
  },
  customBlackHeader: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  customHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  stackContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  stackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#24376B',
    marginBottom: 15,
  },
  stackGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  stackBadge: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eaeaea',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  stackBadgeText: {
    fontSize: 13,
    color: '#24376B',
    fontWeight: '600',
  },
});
