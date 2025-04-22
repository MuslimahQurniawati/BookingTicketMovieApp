import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const CastCard = (props : any) => {
  return (
    <View style={styles.container}>
        <Image source={{ uri: props.imagePath }} />
    </View>
  );
};

export default CastCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  }
});
