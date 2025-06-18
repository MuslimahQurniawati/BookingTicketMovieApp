import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingScreen = () => {
  const navigation = useNavigation<any>();

  const openAppSettings = () => {
    Linking.openSettings().catch(() =>
      Alert.alert('Error', 'Gagal membuka pengaturan aplikasi')
    );
  };

  const openPrivacy = () => {
    Alert.alert(
      'Pengaturan Privasi',
      'Kami menghargai privasi kamu. Data kamu tidak dibagikan ke pihak ketiga.'
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pengaturan</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HelpScreen')}
      >
        <Text style={styles.buttonText}>Contact Support</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AboutScreen')}
      >
        <Text style={styles.buttonText}>Tentang Aplikasi</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openAppSettings}>
        <Text style={styles.buttonText}>Pengaturan Aplikasi</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openPrivacy}>
        <Text style={styles.buttonText}>Pengaturan Privasi</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
