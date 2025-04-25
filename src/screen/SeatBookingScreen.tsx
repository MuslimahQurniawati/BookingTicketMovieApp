import React, {useState} from 'react';
import { Text, View, StyleSheet, ScrollView, StatusBar, ImageBackground } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../Theme/theme';
import AppHeader from '../components/AppHeader';
const timeArray: string[] = [
  '10:00 ',
  '11:00 ',
  '12:00 ',
  '13:00 ',
  '14:00',
  '15:00',
  '19:00 ',
  '20:00',
];

const generateDate = () => {
  const date = new Date();
  let weekday =['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays =[];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays.map(item => `${item.day} ${item.date}`);
};

const generateSeats =() => {
  let numRow = 8;
  let numColumn = 3;
  let rowArray = [];
  let reachnine = false;
  let start = 1; 
  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let j = 0; j < numColumn; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.floor(Math.random())),
        selected: false,
      };
      columnArray.push(seatObject);
      start++; 
    }
    if (i ==3){
      numColumn += 2;
    }
    if (numColumn < 9 && !reachnine){
      numColumn += 2;
    }else{
      reachnine = true;
      numColumn -= 2;
    }
    rowArray.push(columnArray);
  }
  return rowArray;
};
import { useNavigation } from '@react-navigation/native';

const SeatBookingScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const [dataArray, setDataArray] = useState<any[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);

  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();
  
  return(
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
        <View>
          <ImageBackground source={{uri: route.params?. BgImage}} style={styles.ImageBG}>
          <View style={styles.gradientOverlay} />
            <View style={[styles.gradientFallback, styles.appHeaderContainer]}>
              <AppHeader
                name='close'
                header={''}
                action={() => navigation.goBack()}
              />
            </View>
          </ImageBackground>
          <Text style={styles.screenText}>Screen This Side</Text>
        </View>
      <StatusBar hidden={true} />
    </ScrollView>
  )
  // const selectSeat =(index: number, subIndex: number, num: number) => {
  //   if (twoDSeatArray[index][subIndex].taken) {
  //     let array: any =[...selectedSeatArray];
  //     let temp =[...twoDSeatArray];
  //     temp[index][subIndex].selected = !temp[index][subIndex].selected;
  //     if (!array.includes(num)) {
  //       array.push(num);
  //       setSelectedSeatArray(array);
  //     }else{
  //       const tempIndex = array.indexOf(num);
  //       if (tempIndex > -1) {
  //         array.splice(tempIndex, 1);
  //         setSelectedSeatArray(array);
  //       }
  //     }
  //     setPrice(array.length * 5.0);
  //     setTwoDSeatArray(temp);
  //   }
  // };

  // const BookSeats =async () => {
  //   if (
  //     selectedSeatArray.length !== 0 &&
  //     timeArray[selectedTimeIndex] !== undefined &&
  //     dateArray[selectedDateIndex] !== undefined
  //   ){
  //     try {
  //       await EncryptedStorage.setItem(
          
  //       )
  //     }
  //   }
  // }
  
};

export default SeatBookingScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  ImageBG: {
    width: '100%',
    aspectRatio: 3073/1727,
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
    screenText:{
      textAlign: 'center',
      fontSize: FONTSIZE.size_10,
      color: COLORS.White,
    }
});
