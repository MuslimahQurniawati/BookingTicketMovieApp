import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { COLORS, SPACING } from '../Theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';

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
                icon= 'user'
                heading='Account'
                subheading='Edit Profile'
                subtitle='Change Password'/>
              <SettingComponent 
                icon= 'setting'
                heading='Settings'
                subheading='Theme'
                subtitle='Permissions'/>
              <SettingComponent 
                icon= 'help-circle'
                heading='Help'
                subheading='FAQ'
                subtitle='Contact Support'/>
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
      marginHorizontal: SPACING.space_36,
      marginTop: SPACING.space_20*2,
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
      marginTop: SPACING.space_12,
    }
});
