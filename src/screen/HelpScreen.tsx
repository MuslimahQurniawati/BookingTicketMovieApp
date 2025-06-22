import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { COLORS } from '../Theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactSupportScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      Alert.alert('Gagal', 'Semua kolom wajib diisi.');
      return;
    }

    const newMessage = {
      id: Date.now(),
      name,
      email,
      message,
      time: new Date().toISOString(),
    };

    try {
      // Ambil pesan yang sudah ada
      const existingMessages = await AsyncStorage.getItem('supportMessages');
      const messages = existingMessages ? JSON.parse(existingMessages) : [];

      // Tambahkan pesan baru
      messages.push(newMessage);

      // Simpan kembali
      await AsyncStorage.setItem('supportMessages', JSON.stringify(messages));

      Alert.alert('Sukses', 'Pesan kamu berhasil dikirim dan disimpan.');

      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan pesan.');
      console.error(error);
    }
  };


  const cekData = async () => {
  try {
    const savedMessages = await AsyncStorage.getItem('supportMessages');
    const parsed = savedMessages ? JSON.parse(savedMessages) : [];
    console.log('Pesan Tersimpan:', parsed);
  } catch (error) {
    console.error('Gagal membaca data:', error);
  }
};
useEffect(() => {
  cekData();
}, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Contact Support</Text>

        <TextInput
          placeholder="Nama"
          placeholderTextColor= {'rgba(255, 255, 255, 0.5)'}
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor= {'rgba(255, 255, 255, 0.5)'}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Pesan"
          placeholderTextColor= {'rgba(255, 255, 255, 0.5)'}
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={5}
          style={[styles.input, styles.messageInput]}
        />

        <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.save}>Save Changes</Text>
            </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ContactSupportScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: COLORS.Black,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: COLORS.White
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
    color: COLORS.White
  },
  save:{
    backgroundColor: COLORS.Red,
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff',
  }
});
