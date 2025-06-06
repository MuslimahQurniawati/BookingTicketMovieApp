import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {BORDERADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../Theme/theme'

const SubMovieCard = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.cardFunction() }>
        <View style={[
          styles.container,
          { 
            marginHorizontal: SPACING.space_12,   // jarak kiri-kanan antar gambar
            marginBottom: SPACING.space_20,      // jarak antar baris
            maxWidth: props.cardWidth
          }
        ]}>
            <Image 
                style={[styles.cardImage, {width: props.cardWidth}]}
                source={{ uri: props.imagePath }} 
            />
            <Text numberOfLines={1} style={styles.textTitle}>{props.title}</Text>
        </View>
      </TouchableOpacity>  
  );
};

export default SubMovieCard;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: BORDERADIUS.radius_20,
  },
  textTitle: {
    fontFamily: FONTFAMILY.poppins_extrabold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    paddingVertical: SPACING.space_10,
    textAlign: 'center',
  }
});
