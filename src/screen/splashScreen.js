import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Tab'); // atau halaman utama kamu
    }, 2500); // durasi splash
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../asset/image/splashScreen.png')} style={styles.logo} />
      {/* <ActivityIndicator size="large" color="#ff4b4b" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    // marginBottom: 20,
  },
});
