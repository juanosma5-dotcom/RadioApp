import { globalStyles } from '@/styles/globalStyles';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert, ActivityIndicator, Platform, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';

export default function Contacto() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => {
      setKeyboardHeight(0);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleEnviar = async () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Por favor, completa al menos tu nombre, correo y mensaje.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('subject', subject);
      formData.append('message', message);
      // 🔥 RECAPTCHA NOTA: Enviamos un token falso temporal o vacío porque reCAPTCHA v2/v3 es exclusivo de entornos web. 
      // El backend PHP necesitaría una pequeña condición para omitir el recaptcha si la petición viene de la app nativa.
      formData.append('g-recaptcha-response', 'app-nativa-bypass');

      const response = await fetch('https://antenadelosandes.com/player/send_email_app.php', {
        method: 'POST',
        body: formData,
        // No enviamos Content-Type para que fetch lo decida (boundary automático de FormData)
      });

      if (response.ok) {
        Alert.alert('¡Excelente!', 'Tu mensaje ha sido enviado a la emisora.');
        setName(''); setEmail(''); setPhone(''); setSubject(''); setMessage('');
      } else {
        const errorText = await response.text();
        Alert.alert('Error', errorText || 'Hubo un problema enviando el mensaje.');
      }
    } catch (e) {
      Alert.alert('Error', 'Problemas de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.customBlackHeader}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 15 }}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.customHeaderTitle}>Contacto</Text>
      </View>
      <ScrollView 
        contentContainerStyle={[styles.contentContainer, { paddingBottom: 40 + keyboardHeight }]} 
        keyboardShouldPersistTaps="handled"
      >
        <View style={globalStyles.card}>
          <View style={globalStyles.contenido}>
            <Text style={styles.titulo}>Contáctanos</Text>
            <Text style={styles.descripcion}>
              Déjanos tu mensaje y nos pondremos en contacto contigo pronto.
            </Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput style={styles.input} placeholder="Andres Serna Perez" value={name} onChangeText={setName} />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Correo Electrónico</Text>
              <TextInput style={styles.input} placeholder="tucorreo@ejemplo.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Teléfono</Text>
              <TextInput style={styles.input} placeholder="+573187666929" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Asunto</Text>
              <TextInput style={styles.input} placeholder="¿Que nos quieres decir?" value={subject} onChangeText={setSubject} />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Mensaje</Text>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                placeholder="Aquí va tu mensaje." 
                multiline={true} 
                numberOfLines={4} 
                textAlignVertical="top" 
                value={message}
                onChangeText={setMessage}
              />
            </View>

            <TouchableOpacity style={styles.botonEnviar} onPress={handleEnviar} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.botonTexto}>ENVIAR</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
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
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333',
  },
  textArea: {
    height: 100,
  },
  botonEnviar: {
    backgroundColor: '#0d6efd',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  botonTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
