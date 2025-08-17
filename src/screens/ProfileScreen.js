import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './ProfileScreenStyles'

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Kullanıcı';
  const photoURL = user?.photoURL;

  const handleLogout = async () => {
    try {
      await logout();
      // logout sonrası AppNavigator otomatik Login ekranına yönlendirir
    } catch (error) {
      alert('Çıkış yapılamadı.');
    }
  };

  const handleResetPassword = () => {
    if (!user?.email) {
      Alert.alert('E-posta bulunamadı');
      return;
    }
    auth()
      .sendPasswordResetEmail(user.email)
      .then(() => {
        Alert.alert('Şifre sıfırlama maili gönderildi.');
      })
      .catch(() => {
        Alert.alert('Şifre sıfırlama maili gönderilemedi.');
      });
  };

  const handleOpenSupport = () => {
    Linking.openURL('mailto:support@uygulama.com');
  };

  const handleAbout = () => {
    Alert.alert('Uygulama Hakkında', 'Bu uygulama finansal takip içindir. Versiyon 1.0.0');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    Alert.alert('Tema değişikliği', isDarkMode ? 'Açık tema seçildi' : 'Karanlık tema seçildi');
  };

  const initials = displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Geri Dön Butonu */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('Home');
          }
        }}
      >
        <Icon name="chevron-back" size={28} color={isDarkMode ? '#eee' : '#333'} />
      </TouchableOpacity>

      <View style={[styles.profileBox, isDarkMode && styles.darkProfileBox]}>
        {photoURL ? (
          <Image source={{ uri: photoURL }} style={styles.profileImage} />
        ) : (
          <View style={[styles.placeholderImage, isDarkMode && styles.darkPlaceholder]}>
            <Text style={[styles.initialsText, isDarkMode && styles.darkText]}>{initials}</Text>
          </View>
        )}

        <Text style={[styles.nameText, isDarkMode && styles.darkText]}>{displayName}</Text>
        <Text style={[styles.emailText, isDarkMode && styles.darkText]}>{user?.email}</Text>
      </View>

      <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Şifre Değiştir</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleOpenSupport}>
        <Text style={styles.buttonTextSecondary}>Destek</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleAbout}>
        <Text style={styles.buttonTextSecondary}>Uygulama Hakkında</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.tertiaryButton]} onPress={toggleTheme}>
        <Text style={styles.buttonTextTertiary}>{isDarkMode ? 'Açık Tema' : 'Karanlık Tema'}</Text>
      </TouchableOpacity>

      <Text style={[styles.versionText, isDarkMode && styles.darkText]}>Versiyon: 1.0.0</Text>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

