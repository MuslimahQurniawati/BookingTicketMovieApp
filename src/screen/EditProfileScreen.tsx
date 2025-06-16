import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Alert, TouchableOpacity, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';

const EditProfileScreen = ({ navigation }: any) => {
  const [userName, setUserName] = useState('Muslimah Qurniawati');
    const [userImage, setUserImage] = useState<string | null>(null);


  useEffect(() => {
    const loadProfile = async () => {
      const savedName = await AsyncStorage.getItem('userName');
      const savedImage = await AsyncStorage.getItem('userImage');
      if (savedName) setUserName(savedName);
      if (savedImage) setUserImage(savedImage);
    };
    loadProfile();

    // No need to request permissions manually for react-native-image-picker
  }, []);

  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Failed to pick image.');
        } else if (response.assets && response.assets.length > 0) {
          setUserImage(response.assets[0].uri ?? null);
        }
      }
    );
  };

  const saveChanges = async () => {
  try {
    await AsyncStorage.setItem('userName', userName);
    await AsyncStorage.setItem('userImage', userImage ?? '');
    Alert.alert('Saved', 'Profile updated successfully.');
    navigation.goBack();
  } catch (error) {
    Alert.alert('Error', 'Failed to save profile.');
  }
};


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
        source={
            userImage ? { uri: userImage } : require('../asset/image/foto.jpg')
        }
        style={styles.avatar}
        ></Image>
        <Text style={styles.changePhoto}>Change Photo</Text>
      </TouchableOpacity>
    <TextInput
    placeholder="Enter your name"
    value={userName}
    onChangeText={setUserName}
    style={styles.input}
    placeholderTextColor="#aaa"
    />

      <Button title="Save Changes" onPress={saveChanges} />
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginBottom: 10,
  },
  changePhoto: {
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    width: '100%',
    marginBottom: 20,
  },
});
