import { globalStyles } from '@/styles/globalStyles';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { useConfig } from '@/context/ConfigContext';
import { ENV } from '@/constants/env';

interface PrivacyData {
  app_name: string;
  data_policy: {
    last_updated: string;
    title: string;
    sections: Array<{
      id: string;
      title?: string;
      content?: string;
      items?: string[];
    }>;
    short_footer: string;
  };
}

export default function Privacidad() {
  const config = useConfig();
  const [data, setData] = useState<PrivacyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPrivacidad = async () => {
      try {
        // Usa la URL del config remoto, o el fallback directo en ENV
        const url = (config as any).privacidad_url || ENV.PRIVACIDAD_URL;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error en la red');
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error('Error fetching privacidad:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPrivacidad();
  }, [config]);

  if (loading) {
    return (
      <View style={[globalStyles.container, styles.center]}>
        <ActivityIndicator size="large" color="#24376B" />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={[globalStyles.container, styles.center]}>
        <Ionicons name="document-text-outline" size={80} color="#666" style={styles.icon} />
        <Text style={styles.errorTitulo}>Aviso no disponible</Text>
        <Text style={styles.errorTexto}>
          No se pudo cargar la política de privacidad en este momento.
        </Text>
        <TouchableOpacity style={styles.botonVolver} onPress={() => router.back()}>
          <Text style={styles.botonVolverTexto}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.customBlackHeader}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 15 }}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.customHeaderTitle}>Privacidad</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerApp}>
          <Ionicons name="shield-checkmark" size={50} color="#24376B" />
          <Text style={styles.mainTitle}>{data.data_policy.title}</Text>
          <Text style={styles.dateText}>Última actualización: {data.data_policy.last_updated}</Text>
        </View>

        {data.data_policy.sections.map((section, index) => (
          <View key={section.id} style={[globalStyles.card, styles.sectionCard]}>
            <View style={globalStyles.contenido}>
              {section.title && (
                <Text style={styles.sectionTitle}>{section.title}</Text>
              )}
              {section.content && (
                <Text style={styles.sectionContent}>{section.content}</Text>
              )}
              {section.items && section.items.map((item, i) => (
                <View key={i} style={styles.bulletRow}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.footerText}>{data.data_policy.short_footer}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 16,
    opacity: 0.8,
  },
  errorTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  errorTexto: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  botonVolver: {
    backgroundColor: '#24376B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  botonVolverTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerApp: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  sectionCard: {
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#24376B',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 6,
    paddingRight: 10,
  },
  bulletPoint: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#24376B',
    marginRight: 8,
    marginTop: 1,
  },
  bulletText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    flex: 1,
  },
  footerText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
    fontStyle: 'italic',
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
});
