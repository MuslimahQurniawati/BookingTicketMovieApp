import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { BORDERADIUS, COLORS, FONTFAMILY, SPACING } from '../Theme/theme';

const CastCard = (props : any) => {
  return (
    <View style={[styles.container, props.shouldMarginatedAtEnd 
        ? props.inFirst 
        ? { marginLeft: SPACING.space_24 } 
        : props.inLast 
        ? {marginRight: SPACING.space_24}
        : {}
      :{},
      {maxWidth:props.cardWidth},
      ]}>

      <Image source={{ uri: props.imagePath }} style={[styles.cardImage, {width: props.cardWidth}]}/>
        <Text style={styles.title} numberOfLines={1}>
            {props.title}
        </Text>
        <Text style={styles.Subtitle} numberOfLines={1}>
            {props.subtitle}
        </Text>
    </View>
  );
};

export default CastCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardImage: {
    aspectRatio: 1920/2000,
    borderRadius: 50,
  },
  title: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'stretch',
    marginTop: SPACING.space_8,
    color: COLORS.White,
  },
  Subtitle: {
    alignSelf: 'stretch',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 8,
    color: COLORS.White
  }
});
