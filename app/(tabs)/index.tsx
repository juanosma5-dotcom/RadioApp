import { CONFIG } from '@/constants/config';
import { globalStyles } from '@/styles/globalStyles';
import { WpPost } from '@/types/post';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Noticias() {
  const [noticias, setNoticias] = useState<WpPost[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const loadNoticias = () => {
    setCargando(true);
    setError(false);
    fetch(CONFIG.apiNoticias)
      .then(res => res.json())
      .then((data: WpPost[]) => {
        setNoticias(data);
        setCargando(false);
      })
      .catch(err => {
        console.log('Error:', err);
        setError(true);
        setCargando(false);
      });
  };

  useEffect(() => {
    loadNoticias();
  }, []);

  const getImagen = (item: WpPost): string => {
    return item._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? CONFIG.imagenFallback;
  };

  const getResumen = (item: WpPost): string => {
    return item.excerpt.rendered.replace(/<[^>]*>/g, '').trim();
  };

  if (cargando) {
    return (
      <View style={globalStyles.loading}>
        <ActivityIndicator size="large" color="#c0392b" />
        <Text style={{ marginTop: 10, color: '#666' }}>Cargando noticias...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={globalStyles.loading}>
        <Text style={{ fontSize: 48, marginBottom: 12 }}>⚠️</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 6 }}>
          Sin conexión
        </Text>
        <Text style={{ fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 20 }}>
          No se pudieron cargar las noticias.
        </Text>
        <TouchableOpacity onPress={loadNoticias} style={globalStyles.botonReintentar}>
          <Text style={globalStyles.botonReintentarTexto}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderNoticia = ({ item }: { item: WpPost }) => (
    <TouchableOpacity
      style={globalStyles.card}
      onPress={() =>
        router.push({
          pathname: '/noticia',
          params: { id: item.id },
        })
      }
    >
      <Image source={{ uri: getImagen(item) }} style={globalStyles.imagen} />
      <View style={globalStyles.contenido}>
        <Text style={globalStyles.categoria}>
          {item._embedded?.['wp:term']?.[0]?.[0]?.name ?? ''}
        </Text>
        <Text style={globalStyles.titulo}>{item.title.rendered}</Text>
        <Text style={globalStyles.resumen} numberOfLines={3}>
          {getResumen(item)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <FlatList
        data={noticias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNoticia}
        refreshing={cargando}
        onRefresh={loadNoticias}
      />
    </SafeAreaView>
  );
}