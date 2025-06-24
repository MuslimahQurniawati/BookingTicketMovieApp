import { COLORS } from '../Theme/theme';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Image
        source={require('../asset/image/splashScreen.png')} // Ganti dengan logo kamu
        style={styles.logo}
      /> */}
      <Text style={styles.title}>Tentang Aplikasi</Text>
      <Text style={styles.description}>
        Aplikasi ini dibuat untuk membantu pengguna dalam melakukan pemesanan tiket bioskop secara mudah dan cepat. 
        Dikembangkan menggunakan React Native dan Expo.
      </Text>

      <Text style={styles.sectionTitle}>Pengembang</Text>
      <Text style={styles.text}>Muslimah Qurniawati</Text>
      <Text style={styles.text}>Teknik Informatika</Text>
      <Text style={styles.text}>Universitas Islam Madura</Text>

      <Text style={styles.sectionTitle}>Versi Aplikasi</Text>
      <Text style={styles.text}>v1.0.0</Text>
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 90,
    marginBottom: 20,
    borderRadius: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#444',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 5,
    color: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
});
