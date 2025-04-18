import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, ActivityIndicator, Dimensions } from 'react-native';
import { COLORS, SPACING } from '../Theme/theme';
import { 
  upcomingMovies, 
  nowPlayingMovies, 
  popularMovies 
} from '../api/apicalls';
import InputHeader from '../components/inputHeader';

const { width, height } = Dimensions.get('window');

// Fetch data dengan pengecekan error
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

  // Navigasi ke Search
  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };

  // Fetch data saat pertama render
  useEffect(() => {
    (async () => {
      const tempNowPlaying = await getNowPlayingMovies();
      const tempUpcoming = await getUpcomingMovies();
      const tempPopular = await getPopularMovies();

      if (tempNowPlaying) setNowPlayingMoviesList(tempNowPlaying);
      if (tempUpcoming) setUpcomingMoviesList(tempUpcoming);
      if (tempPopular) setPopularMoviesList(tempPopular);
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
      <StatusBar hidden />

      <View style={styles.inputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.Red} />
        </View>
      ) : (
        <View style={{ padding: 20 }}>
          {/* Tempat untuk render movie list kalau data sudah ada */}
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
});

export default HomeScreen;
