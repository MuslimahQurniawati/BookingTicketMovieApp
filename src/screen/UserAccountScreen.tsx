import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { useCallback } from 'react';
import { COLORS, SPACING } from '../Theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// useFocusEffect(
//   useCallback(() => {
//     const fetchProfile = async () => {
//       const savedName = await AsyncStorage.getItem('userName');
//       const savedImage = await AsyncStorage.getItem('userImage');
//       if (savedName) setUserName(savedName);
//       if (savedImage) setUserImage(savedImage);
//     };
//     fetchProfile();
//   }, [])
// );

const UserAccountScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
            <AppHeader
              name="close"
              header={'My Profile'}
              action={() => navigation.goBack()}
            />
          </View>
        <View style={styles.profileContainer}>
        
            <Image source={require('../asset/image/foto.jpg')} style={styles.avatarImage} />
            <Text style={styles.avatarText}>Muslimah Qurniawati</Text>
              <SettingComponent 
                icon='user'
                heading='Account'
                subheading='Edit Profile'
                subtitle='Change Password'
                onPress={ () => navigation.navigate('EditProfileScreen')}/>
              <SettingComponent 
                icon='settings'
                heading='Settings'
                subheading='Theme'
                subtitle='Permissions'
                onPress={ () => navigation.navigate('ThemeSettingScreen')}/>
              <SettingComponent 
                icon='help-circle'
                heading='Help'
                subheading='FAQ'
                subtitle='Contact Support'
                onPress={() => navigation.navigate('HelpScreen')}
                />
              <SettingComponent 
                icon='info'
                heading='About'
                subheading='About Movies'
                subtitle='More'
                onPress={() => navigation.navigate('AboutScreen')}/>
        </View>
    </View>
  );
};

export default UserAccountScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  appHeaderContainer:{
      marginTop: SPACING.space_20*2,
      marginHorizontal: SPACING.space_36,
    },
    profileContainer:{
      alignItems: 'center',
      padding: SPACING.space_36,  
      // marginTop: SPACING.space_20*2,
    },
    avatarImage:{
      height: 80,
      width: 80,
      borderRadius: 80,
    },
    avatarText:{
      fontFamily: 'Poppins-Medium',
      fontSize: SPACING.space_20,
      color: COLORS.White,
      marginTop: SPACING.space_10,
    }
});
function setUserName(savedName: string) {
  throw new Error('Function not implemented.');
}

function setUserImage(savedImage: string) {
  throw new Error('Function not implemented.');
}

