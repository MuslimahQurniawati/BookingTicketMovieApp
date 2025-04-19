import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {BORDERADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../Theme/theme';
import { Ionicons } from '@expo/vector-icons';

const genres: any ={
    28: 'Action', 
    12:'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasi',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystry',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
    };

const MovieCard = (props: any) => {
  return (
      <TouchableOpacity onPress={() => props.cardFunctin() }>
        <View style={[styles.container, props.shouldMarginatedAtEnd 
        ? props.infirst
            ?{marginLeft:SPACING.space_36} 
            : props.islast 
            ? {marginRight: SPACING.space_36}
            :{}
        :{},
        props.shouldMarginatedAtEnd ? {margin: SPACING.space_12}: {},
        {maxWidth: props.cardWidth}
         ]}>
            <Image 
                style={[styles.cardImage, {width:props.cardWidth}]}
                source= {{uri: props.imagePath}} />
            <View>
                <View style={styles.rateContainer}>
                    <Ionicons name="star" style={styles.starIcon}/>
                    <Text style={styles.votetext}>
                        {props.vote_average}({props.vote_count})
                    </Text>
                </View>

                <Text numberOfLines={1} style={styles.textTitle}>{props.title}</Text>
                <View style={styles.genreContainer}>
                    {
                        props.genre.map((item:any) =>{
                            return (
                                <View key={item} style={styles.genreBox}>
                                   <Text style={styles.genreText}>{genres[item]}</Text> 
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </View>
      </TouchableOpacity>
  );
};

export default MovieCard;

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
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    paddingVertical: SPACING.space_10,
    textAlign: 'center',
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.space_10,
  },
  starIcon:{
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },
  votetext:{
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE. size_14,
    color: COLORS.White,
  },
  genreContainer:{
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBox:{
    borderColor: COLORS.Grey,
    borderWidth: 1,
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDERADIUS.radius_20,
  },
  genreText:{
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.White
  }
});
