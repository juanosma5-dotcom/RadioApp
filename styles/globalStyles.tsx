import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f4f4f4"
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 16,
    backgroundColor: "#24376B",
    color: "white"
  },

  card: {
    backgroundColor: "white",
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3
  },

  imagen: {
    width: "100%",
    height: 180
  },

  contenido: {
    padding: 12
  },

  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#222"
  },

  texto: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333"
  },
  loading: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  categoria: { 
    fontSize: 11, 
    color: '#c0392b', 
    fontWeight: 'bold', 
    marginBottom: 4, 
    textTransform: 'uppercase' 
  },
  resumen: { 
    fontSize: 13, 
    color: '#555',
    lineHeight: 19 
  },
  botonReintentar: {
    backgroundColor: '#24376B',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 8,
  },
  botonReintentarTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});