import { useConfig } from "@/context/ConfigContext";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import RenderHtml from "react-native-render-html";
import { WpPost } from "@/types/post";

export default function Noticia() {
  const config = useConfig();
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<WpPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(false);
    fetch(`${config.api.noticia}/${id}?_embed`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#c0392b" />
        <Text style={styles.mensajeEstado}>Cargando noticia...</Text>
      </SafeAreaView>
    );
  }

  if (error || !post) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorIcono}>⚠️</Text>
        <Text style={styles.errorTexto}>No se pudo cargar la noticia.</Text>
        <Text style={styles.errorSub}>Verifica tu conexión e intenta de nuevo.</Text>
      </SafeAreaView>
    );
  }

  const imagen = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? config.media.fallback_image;
  const contenido = post.content?.rendered?.replace(/<!--.*?-->/gs, '').trim();
  const titulo = post.title?.rendered?.replace(/<[^>]*>/g, '');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: imagen }} style={styles.imagen} />
        <Text style={styles.titulo}>{titulo}</Text>
        <RenderHtml
          contentWidth={width - 32}
          source={{ html: contenido ?? '' }}
          tagsStyles={{
            p: { fontSize: 16, lineHeight: 24, marginBottom: 12, color: '#333' },
            h3: { fontSize: 20, fontWeight: 'bold', marginTop: 18, marginBottom: 8 },
            strong: { fontWeight: 'bold' },
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 24,
  },
  imagen: {
    width: '100%',
    height: 220,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#222',
  },
  mensajeEstado: {
    marginTop: 10,
    color: '#666',
  },
  errorIcono: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorTexto: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  errorSub: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});
