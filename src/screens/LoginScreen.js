import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase';
import styles from './LoginScreenStyles'; // styles.js dosyasını import ettik

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Hata", "Lütfen e-posta ve şifre girin.");
      return;
    }
    try {
      await login(email, password); 
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Uyarı', 'Lütfen önce e-posta adresinizi girin.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Başarılı', 'Şifre yenileme bağlantısı e-posta adresinize gönderildi.');
    } catch (error) {
      Alert.alert('Hata', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>

      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#a8c0a0"
      />

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#a8c0a0"
      />

      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotLink} onPress={handleForgotPassword}>
        <Text style={styles.forgotText}>Şifremi Unuttum</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Hesabın yok mu? Kayıt ol</Text>
      </TouchableOpacity>
    </View>
  );
}
