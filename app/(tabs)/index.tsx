import { globalStyles } from '@/styles/globalStyles';
import { router } from "expo-router";
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList, Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const API_URL = 'https://antenadelosandes.com/wp-json/wp/v2/posts?_embed&per_page=10';

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  const loadNoticias = () => {
    setCargando(true);

    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setNoticias(data);
        setCargando(false);
      })
      .catch(err => {
        console.log('Error:', err);
        setCargando(false);
      });
  };

  useEffect(() => {
    loadNoticias();
  }, []);

  const getImagen = (item: any) => {
    try {
      return item._embedded['wp:featuredmedia'][0].source_url;
    } catch {
      return 'https://antenadelosandes.com/wp-content/uploads/2025/07/cropped-IMG.png';
    }
  };

  const getResumen = (item: any) => {
    return item.excerpt.rendered.replace(/<[^>]*>/g, '').trim();
  };

  const renderNoticia = ({ item }: { item: any }) => (
      <TouchableOpacity
      style={globalStyles.card}
      onPress={() =>
        router.push({
          pathname: "/noticia",
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
        <Text style={globalStyles.resumen} numberOfLines={3}>{getResumen(item)}</Text>
      </View>
    </TouchableOpacity>
  );

  if (cargando) {
    return (
      <View style={globalStyles.loading}>
        <ActivityIndicator size="large" color="#c0392b" />
        <Text style={{ marginTop: 10, color: '#666' }}>Cargando noticias...</Text>
      </View>
    );
  }

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
/*
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 20, fontWeight: 'bold', padding: 16, backgroundColor: '#c0392b', color: 'white' },
  card: { backgroundColor: 'white', marginHorizontal: 12, marginTop: 12, borderRadius: 10, overflow: 'hidden', elevation: 3 },
  imagen: { width: '100%', height: 180 },
  contenido: { padding: 12 },
  categoria: { fontSize: 11, color: '#c0392b', fontWeight: 'bold', marginBottom: 4, textTransform: 'uppercase' },
  titulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 6, color: '#222' },
  resumen: { fontSize: 13, color: '#555', lineHeight: 19 },
});
*/