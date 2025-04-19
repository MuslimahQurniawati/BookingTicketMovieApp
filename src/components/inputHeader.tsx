import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { BORDERADIUS, COLORS, SPACING } from '../Theme/theme';
import { Ionicons } from '@expo/vector-icons';
interface InputHeaderProps {
  searchFunction: (name: string) => void;
}
const InputHeader: React.FC<InputHeaderProps> = ({ searchFunction }) => {
   const [searchText, setSearchText] =useState<string>('');
  return (
    <View style={styles.inputBox}>
      <TextInput 
          style={styles.textInput}
          placeholder="Search your Movies..."
          placeholderTextColor= {'rgba(255, 255, 255, 0.5)'}
          value={searchText}
          onChangeText={textInput => setSearchText(textInput)}
          />
    <TouchableOpacity onPress={() => searchFunction(searchText)}>
      <Ionicons name="search" size={24} color= {COLORS.Red} />
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    inputBox: {
      display: 'flex',
      minHeight: 50,  
      paddingHorizontal: SPACING.space_20,
      borderWidth:1.5,
      borderColor: COLORS.White,
      borderRadius: BORDERADIUS.radius_25,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: SPACING.space_12,
      marginBottom: SPACING.space_10
    },
    textInput: {
      flex: 1,
      color: COLORS.White,
      fontSize: 16,
    },
});
export default InputHeader;
