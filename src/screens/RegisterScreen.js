import React, { useState, useContext } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async () => {
    try {
      await register(email, password);
      navigation.goBack(); // Kayıt başarılıysa login ekranına dön
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>

      <TextInput
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#a8c0a0"
      />

      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#a8c0a0"
      />

      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Zaten hesabınız var mı?{' '}
        <Text style={styles.loginLink} onPress={() => navigation.goBack()}>
          Giriş Yap
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 25, 
    backgroundColor: '#f0f5f1', // açık yeşil arka plan
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3b6d3fff',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#7fb77e', // yeşil ton
    marginBottom: 15,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#e6f0e8',
    fontSize: 16,
    color: '#2f4f2f',
  },
  error: { 
    color: '#b00020', 
    marginBottom: 10, 
    textAlign: 'center' 
  },
  button: {
    backgroundColor: '#3b6d3fff', // koyu yeşil
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#3b6d3fff',
    fontSize: 14,
  },
  loginLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
