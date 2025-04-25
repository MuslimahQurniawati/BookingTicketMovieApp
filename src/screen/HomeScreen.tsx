import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, StatusBar,ActivityIndicator, Dimensions, FlatList } from 'react-native';
import { COLORS, SPACING } from '../Theme/theme';
import { 
  upcomingMovies, 
  nowPlayingMovies, 
  popularMovies,
  baseImagePath
} from '../api/apicalls';
import InputHeader from '../components/inputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const { width, height } = Dimensions.get('window');

const getNowPlayingMovies = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Error in getNowPlayingMovies:", error);
    return null;
  }
};

const getUpcomingMovies = async () => {
  try {
    let response = await fetch(upcomingMovies);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Error in getUpcomingMovies:", error);
    return null;
  }
};

const getPopularMovies = async () => {
  try {
    let response = await fetch(popularMovies);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Error in getPopularMovies:", error);
    return null;
  }
};

const HomeScreen = ({ navigation }: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);

  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };
  

  useEffect(() => {
    (async () => {
      const tempNowPlaying = await getNowPlayingMovies();
      const tempPopular = await getPopularMovies();
      const tempUpcoming = await getUpcomingMovies();

      if (tempNowPlaying) setNowPlayingMoviesList([
        {id:'dummy1'},
        ...tempNowPlaying.results,
        {id:'dummy2'}]);
      if (tempPopular) setPopularMoviesList(tempPopular.results);
      if (tempUpcoming) setUpcomingMoviesList(tempUpcoming.results);
    })();
  }, []);
  
  
  const isLoading = 
    !nowPlayingMoviesList || 
    !upcomingMoviesList || 
    !popularMoviesList;
  
  return (
    <ScrollView 
      style={styles.container}
      bounces={false}
      contentContainerStyle={styles.scrollviewContainer}
    >
      <StatusBar hidden/>

      <View style={styles.inputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>

      <CategoryHeader title={'Now Playing'}/>
      <FlatList
        data={nowPlayingMoviesList} 
        keyExtractor={(item: any) => item.id}
        bounces={false}
        snapToInterval={width * 1.5 + SPACING.space_36}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({ item, index }) => {
          if (item.id === 'dummy1' || item.id === 'dummy2') {
            return (
              <View style={{ width: (width - (width * 1.5 + SPACING.space_36 * 2)) / 2 }} />
            );
          }
        
          return (
            <MovieCard
              shouldMarginatedAtEnd={true}
              cardFunction={() => navigation.push('MovieDetails', { movieid: item.id })}
              cardWidth={width / 1.5}
              isFirst={index === 0}
              isLast={index === nowPlayingMoviesList.length - 1}
              title={item.original_title}
              imagePath={baseImagePath('w780', item.poster_path)}
              genre={Array.isArray(item.genre_ids) ? item.genre_ids.slice(0, 3) : []}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />
          );
        }}
      />
      <CategoryHeader title={'Popular'}/>
      <FlatList
        data={popularMoviesList} 
        keyExtractor={(item: any) => item.id}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard 
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList.length -1 ? true : false}
            title={item.original_title} 
            imagePath={baseImagePath('w342', item.poster_path)} 
            /> 
        )}
      />
      <CategoryHeader title={'Upcoming'}/>
      <FlatList
        data={upcomingMoviesList} 
        keyExtractor={(item: any) => item.id}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard 
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList.length -1 ? true : false}
            title={item.original_title} 
            imagePath={baseImagePath('w342', item.poster_path)} 
            /> 
        )}
      />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.Red} />
        </View>
      ) : (
        <View style={{ padding: 20 }}>

        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black
  },
  scrollviewContainer: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28
  },
  containerGap36:{
    gap: 4,
    paddingHorizontal: 28
  }
});

export default HomeScreen;
