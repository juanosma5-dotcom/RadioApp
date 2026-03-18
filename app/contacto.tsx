import { globalStyles } from '@/styles/globalStyles';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';

export default function Contacto() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView style={styles.content}>
        <View style={globalStyles.card}>
          <View style={globalStyles.contenido}>
            <Text style={styles.titulo}>Contáctanos</Text>
            <Text style={styles.descripcion}>
              Déjanos tu mensaje y nos pondremos en contacto contigo pronto.
            </Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput style={styles.input} placeholder="Tu nombre" />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Correo Electrónico</Text>
              <TextInput style={styles.input} placeholder="tu@correo.com" keyboardType="email-address" autoCapitalize="none" />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Mensaje</Text>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                placeholder="Escribe tu mensaje aquí..." 
                multiline={true} 
                numberOfLines={4} 
                textAlignVertical="top" 
              />
            </View>

            <TouchableOpacity style={styles.botonEnviar} onPress={() => alert('¡Mensaje enviado! (Simulación)')}>
              <Text style={styles.botonTexto}>Enviar Mensaje</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  descripcion: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
  },
  botonEnviar: {
    backgroundColor: '#24376B',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botonTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
