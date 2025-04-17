import { Text, View, StyleSheet } from 'react-native';
import {COLORS} from '../Theme/theme';
import { enableScreens } from 'react-native-screens';
enableScreens();

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Text>HomeScreen</Text>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.Black,
    }
});

export default HomeScreen;