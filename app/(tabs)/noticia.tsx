import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions
} from "react-native";
import RenderHtml from "react-native-render-html";

export default function Noticia() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { width } = useWindowDimensions();

 useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://antenadelosandes.com/wp-json/wp/v2/posts/${id}?_embed`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color="#c0392b" />
        <Text style={{ marginTop: 10 }}>Cargando noticia...</Text>
      </SafeAreaView>
    );
  }

  const imagen =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  const contenido = post.content?.rendered
    ?.replace(/<!--.*?-->/g, "")
    ?.trim();

  const titulo = post.title?.rendered?.replace(/<[^>]*>/g, "");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {imagen && (
          <Image
            source={{ uri: imagen }}
            style={styles.imagen}
          />
        )}

        <Text style={styles.titulo}>{titulo}</Text>

        <RenderHtml
          contentWidth={width}
          source={{ html: contenido }}
          tagsStyles={{
            p: {
              fontSize: 16,
              lineHeight: 24,
              marginBottom: 12,
              color: "#333"
            },
            h3: {
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 18,
              marginBottom: 8
            },
            strong: {
              fontWeight: "bold"
            }
          }}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",   // mismo fondo que index
    paddingHorizontal: 16
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  imagen: {
    width: "100%",
    height: 220,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 10
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#222"
  }

});