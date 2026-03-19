import { globalStyles } from '@/styles/globalStyles';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Privacidad() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView style={styles.content}>
        <View style={globalStyles.card}>
          <View style={globalStyles.contenido}>
            <Text style={styles.titulo}>Aviso de Privacidad de Datos</Text>
            <Text style={styles.texto}>
              En Antena de los Andes protegemos su información...
              {'\n\n'}
              1. Identidad y Domicilio: Somos responsables del tratamiento de los datos personales que nos proporcione.
              {'\n\n'}
              2. Finalidad del Tratamiento: Sus datos (como nombre y correo) recopilados a través de nuestro formulario de contacto se utilizarán exclusivamente para responder a sus mensajes.
              {'\n\n'}
              3. Protección: Adoptamos las medidas de seguridad tecnológicas necesarias para proteger su información contra daño, pérdida o uso no autorizado.
              {'\n\n'}
              (Nota: Este es un texto de ejemplo. Deberá actualizarlo con el texto legal oficial aplicable a su país.)
            </Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  texto: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
});
