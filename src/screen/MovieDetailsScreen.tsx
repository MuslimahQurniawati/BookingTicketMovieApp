import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, StatusBar, ImageBackground, Image, FlatList, TouchableOpacity } from 'react-native';
import { baseImagePath, movieDetails, moviecastDetails } from '../api/apicalls';
import { BORDERADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../Theme/theme'
import AppHeader from '../components/AppHeader';
import { Ionicons } from '@expo/vector-icons';
import CategoryHeader from '../components/CategoryHeader';
import CastCard from '../components/CastCard';

const getMovieDetails = async (movieid: number) => {
  try {
    let response = await fetch(movieDetails(movieid));
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('something went wrong in getMoviesDetail Function', error);
  }
}

const getMovieCastDetails = async (movieid: number) => {
  try {
    let response = await fetch(moviecastDetails(movieid));
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('something went wrong in getMoviesCastDetail Function', error);
  }
}

const MovieDetailScreen = ({ navigation, route }: any) => {
  const [movieData, setMovieData] = useState<any>(undefined);
  const [movieCastData, setMovieCastData] = useState<any>(undefined);

  useEffect (() => {
    (async () => {
      const tempMovieData = await getMovieDetails (route.params.movieid);
      setMovieData(tempMovieData)
  })();
  
    (async () => {
      const tempMovieCastData = await getMovieCastDetails (route.params.movieid);
      setMovieCastData(tempMovieCastData)
  })();
console.log(movieCastData)
}, []);
  
  if  (movieData == undefined && movieData == null && movieCastData == undefined && movieCastData == null) {
    return (
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollViewcontainer}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.appHeaderContainer}>
          <AppHeader 
            name='close' 
            header={''} 
            action={() => navigation.goBack()} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={COLORS.Red} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />

      <View>
        <ImageBackground
          source={{
            uri: baseImagePath('w780', movieData?.backdrop_path),
          }}
          style={styles.imageBG}>
           <View style={styles.gradientOverlay} />

            <View style={[styles.gradientFallback, styles.appHeaderContainer]}>
              <AppHeader
                name='close'
                header={''}
                action={() => navigation.goBack()}
              />
            </View>

        </ImageBackground>
        <View style={styles.imageBG}></View>
        <Image
          source={{uri: baseImagePath('w342', movieData?.poster_path)}}
          style={styles.cardImage}
        />
      </View>
      <View style={styles.timeContainer}>
        <Ionicons name='time' size={20} color={COLORS.Grey} alignItems='center' marginRight={8} />
        <Text style={styles.runTimeText}>
          {Math.floor(movieData?.runtime / 60)}h {''}
          {Math.floor(movieData?.runtime % 60)}m
        </Text>
      </View>

      <View>
        <Text style={styles.titleText}>
          {movieData?.original_title}
        </Text>
      </View>

      <View style={styles.genreContainer}>

        {movieData?.genres.map((item: any) => {
          return (
            <View style={styles.genreBox} key={item.id}>
              <Text style={styles.genreText}>{item.name}</Text>
            </View>
          );
        })}
      </View>
      <Text style={styles.tagline}>{movieData?.tagline}</Text>
      
      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>
          <Ionicons name='star' size={10}style={styles.starIcon}/>
          <Text style={styles.runTimeText}>{movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})</Text>
          <Text style={styles.runTimeText}>
            {movieData?.release_date.substring(8, 10)}{' '}{new Date(movieData?.release_date).toLocaleString('default',
              { month: 'long' })}{' '}{movieData?.release_date.substring(0, 4)}{''}
          </Text>
        </View>
        <Text style={styles.descriptionText}>{movieData?.overview}</Text>
      </View>

      <View>
        <CategoryHeader title="Top Cast" />
        <FlatList 
          data={movieCastData?.cast}
          keyExtractor={(item:any) => item.id}
          horizontal contentContainerStyle ={styles.containerGap24}
          renderItem={({item, index}) => (
          <CastCard
            shouldMarginatedAtEnd={true}
            cardWidth={80}
            inFirst={index == 0 ? true : false}
            inLast={index == movieCastData.length - 1 ? true : false}
            imagePath={baseImagePath('w500', item.profile_path)}
            title={item.original_name}
            subtitle={item.character}
          />
        )}
        />

      <View>
        <TouchableOpacity
          style={styles.buttonBG}
          onPress={() => {
            navigation.push('SeatBooking', {
              BgImage: baseImagePath('w780', movieData.poster_path),
            });
          }}>
          <Text style={styles.buttonText}>Select Seats</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  )
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black
  },
  loadingContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  scrollViewcontainer:{
    flex: 1,
  },
  appHeaderContainer:{
    marginTop: SPACING.space_20*2,
    marginHorizontal: SPACING.space_36,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  gradientFallback: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, 
  },
  imageBG:{
    width: '100%',
    aspectRatio: 3072/1727,
  },
  cardImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  timeContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.space_15,
  },
  runTimeText:{
    fontSize: SPACING.space_15,
    color: COLORS.Grey,
    fontFamily: FONTFAMILY.poppins_regular,
    textAlign: 'center',
  },
  titleText:{
    fontSize: SPACING.space_32,
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_bold,
    textAlign: 'center',
    marginTop: SPACING.space_4,
    marginBottom: SPACING.space_10,
  },
  genreContainer:{
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  genreBox:{
    borderColor: COLORS.Grey,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDERADIUS.radius_25,
    borderWidth: 1,
  },
  genreText:{
    fontSize: SPACING.space_10,
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  tagline:{
    fontSize: SPACING.space_16,
    color: COLORS.White,
    fontStyle: 'italic',
    fontFamily: FONTFAMILY.poppins_regular,
    textAlign: 'center',
    marginVertical: SPACING.space_10,
    marginHorizontal: SPACING.space_36,
  },
  infoContainer:{
    marginHorizontal: SPACING.space_24,
  },
  rateContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_10,
  },
  starIcon:{
    color: COLORS.Yellow,
    fontSize: FONTSIZE.size_18,
  },
  descriptionText:{
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_light,
  },
  containerGap24:{
    gap: SPACING.space_24,
  },
  buttonBG:{
    alignItems: 'center',
    marginVertical: SPACING.space_24,
    marginBottom: 55
  },
  buttonText:{
    borderRadius: BORDERADIUS.radius_25 * 2,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.Red,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  }
});
