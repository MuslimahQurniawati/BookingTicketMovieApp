import  React, {useState} from 'react';
import { Text, View, StyleSheet, Dimensions, StatusBar, FlatList } from 'react-native';
import {COLORS, SPACING} from '../Theme/theme';
import { searchMovies, baseImagePath } from '../api/apicalls';
import InputHeader from '../components/inputHeader';
import SubMovieCard from '../components/SubMovieCard';

const {width, height} = Dimensions.get('screen');

const SearchScreen = (navigation : any) => {
  const [SearchList, setSearchList] = useState([]);

  const searchMoviesFunction = async (name:string) => {
    try{
      let response = await fetch(searchMovies(name));
      let json = await response.json();
      setSearchList(json.results);
    }catch(error){
      console.error('something went wrong in searchMoviesFunction');
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View>
        <FlatList
                data={SearchList} 
                keyExtractor={(item: any) => item.id}
                bounces={false}
                numColumns={2}
                ListHeaderComponent={
                  <View style={{ width: width - SPACING.space_36 * 2, alignSelf: 'center', marginTop: SPACING.space_28 }}>
                    <InputHeader searchFunction={searchMoviesFunction} />
                  </View>
                }
                contentContainerStyle={styles.centerContainer}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginBottom: SPACING.space_20,  
                }}
                renderItem={({item, index}) => (
                  <SubMovieCard 
                    shouldMarginatedAtEnd={false}
                    cardFunctin={() => {
                      navigation.push('MovieDetails', {movieid: item.id});
                    }}
                    cardWidth={width / 2 - SPACING.space_12*2}
                    title={item.original_title} 
                    imagePath={baseImagePath('w342', item.poster_path)} 
                    /> 
                )}
              />
        </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flex: 1,
    width,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
  },
  centerContainer:{
    alignItems:'center',
  }
});
