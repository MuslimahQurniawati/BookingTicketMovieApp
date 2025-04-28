import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {COLORS, FONTFAMILY, SPACING} from '../Theme/theme';
const AppHeader = (props:any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBG} onPress={() => props.action()}>
      <Ionicons name='close' size={24} color= {COLORS.White} alignItems= 'center' />
      </TouchableOpacity>
      <Text style={styles.headerText}>{props.header}</Text>
      <View style={styles.emptyContainer}></View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.White
  },
  emptyContainer:{
    height: SPACING.space_20*2,
    width: SPACING.space_20*2,
  },
  iconBG:{
    height: SPACING.space_32,
    width: SPACING.space_32,
    alignItems: 'center',
    borderRadius: SPACING.space_20,
    backgroundColor: COLORS.Red,
    justifyContent: 'center',
  }
});
