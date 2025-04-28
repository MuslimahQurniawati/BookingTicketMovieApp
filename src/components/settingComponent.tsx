import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../Theme/theme';
import Icon from 'react-native-vector-icons/Feather';


interface SettingComponentProps {
  icon: string;
  heading: string;
  subheading: string;
  subtitle: string;
}

const SettingComponent = (props: SettingComponentProps) => {
  return (
    <View style={styles.container}>
       <Icon name={props.icon} size={24} color={COLORS.White} style={styles.icon} />
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{props.heading}</Text>
        <Text style={styles.subtitle}>{props.subheading}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
      <View>
        <Icon name="chevron-right" size={24} color={COLORS.White} />
      </View>
    </View>
  );
};

export default SettingComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: SPACING.space_20,
  },
  settingContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    color: COLORS.White,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: COLORS.Grey,
  },
  icon:{
    marginRight: SPACING.space_10,
  },
});
