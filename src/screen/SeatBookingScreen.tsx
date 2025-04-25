import React, {useState} from 'react';
import { Text, View, StyleSheet, ScrollView, StatusBar, ImageBackground, TouchableOpacity, FlatList, ToastAndroid } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING, BORDERADIUS } from '../Theme/theme';
import AppHeader from '../components/AppHeader';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';



const timeArray: string[] = [
  '10:00 ',
  '11:00 ',
  '12:00 ',
  '13:00 ',
  '14:00',
  '15:00',
  '19:00 ',
];

const generateDate = () => {
  const date = new Date();
  let weekday =['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays =[];
  for (let i = 0; i < 7; i++) {
    let currentDate = new Date(date.getTime() + i * 24 * 60 * 60 * 1000);
    let tempDate = {
      date: currentDate.getDate(), // contoh: 26
      day: weekday[currentDate.getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
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
import { useNavigation, NavigationProp } from '@react-navigation/native';
type RootStackParamList = {
  Ticket: {
    seatArray: number[];
    time: string;
    date: { date: number; day: string };
    ticketImage: string;
  };
};

const SeatBookingScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [dataArray, setDataArray] = useState<any[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);

  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();
  
  const selectSeat =(index: number, subIndex: number, num: number) => {
      if (!twoDSeatArray[index][subIndex].taken) {
        let array: any =[...selectedSeatArray];
        let temp =[...twoDSeatArray];
        temp[index][subIndex].selected = !temp[index][subIndex].selected;
        if (!array.includes(num)) {
          array.push(num);
          setSelectedSeatArray(array);
        }else{
          const tempIndex = array.indexOf(num);
          if (tempIndex > -1) {
            array.splice(tempIndex, 1);
            setSelectedSeatArray(array);
          }
        }
        setPrice(array.length * 5.0);
        setTwoDSeatArray(temp);
      }
    };

    const BookSeats = async () => {
      if (
        selectedSeatArray.length !== 0 &&
        timeArray[selectedTimeIndex] !== undefined &&
        dataArray[selectedDateIndex] !== undefined
      ) {
        try {
          await SecureStore.setItemAsync('ticket', JSON.stringify({
            seatArray: selectedSeatArray,
            time: timeArray[selectedTimeIndex],
            date: dataArray[selectedDateIndex],
            ticketImage: route.params.PosterImage,
          }));
          
        } catch (error) {
          console.error(
            'Something went Wrong while storing in BookSeats Functions',
            error,
          );
        }
        navigation.navigate('Ticket', {
          seatArray: selectedSeatArray,
          time: timeArray[selectedTimeIndex],
          date: dataArray[selectedDateIndex],
          ticketImage: route.params.PosterImage,
        });
      } else {
        ToastAndroid.showWithGravity(
          'Please Select Seats, Date and Time of the Show',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    };
  return(
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
        <StatusBar hidden={true} />
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

        <View style={styles.seatContainer}>
          <View style={styles.containerGap20}>
            {
              twoDSeatArray?.map((item, index) => {
                return (
                  <View key={index} style={styles.seatRow}>
                      {item?.map((subitem, subindex) => {
                        return (
                          <TouchableOpacity key={subitem.number} onPress={(() => {
                            selectSeat(index, subindex, subitem.number)
                          })}>
                            <Ionicons 
                              name='square' size={17} style={[styles.seatIcon, 
                              subitem.taken? {color: COLORS.Grey} : {},
                              subitem.selected? {color: COLORS.Red}: {},
                          ]}/>
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                )
              })
            }
          </View>

          <View style={styles.seatRadioContainer}>
            <View style={styles.radioContainer}>
              <Ionicons name='square' style={styles.radioIcon}/>
              <Text style={styles.radioText}>Available</Text>
            </View>
            <View style={styles.radioContainer}>
              <Ionicons name='square' style={[styles.radioIcon, {color:COLORS.Grey}]}/>
              <Text style={styles.radioText}>Taken</Text>
            </View>
            <View style={styles.radioContainer}>
              <Ionicons name='square' style={[styles.radioIcon, {color:COLORS.Red}]}/>
              <Text style={styles.radioText}>Selected</Text>
            </View>
          </View>
        </View>

        <View>
          <FlatList 
            data={dataArray}
            keyExtractor={(item, index) => item?.date ? item.date.toString() : index.toString()}
            horizontal
            contentContainerStyle={styles.containerGap24}
            renderItem={({item, index}) => {
              return(
                <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
                  <View style={[styles.dateContainer, 
                  index === 0
                  ? {marginLeft: SPACING.space_24} 
                  : index === dataArray.length - 1 
                  ? {marginRight: SPACING.space_24} 
                  : {},
                  index === selectedDateIndex
                  ? {backgroundColor: COLORS.Red} : {}
                ]}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.dayText}>{item.day}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={styles.OutterContainer}>
          <FlatList 
            data={timeArray}
            keyExtractor={item => item }
            horizontal
            contentContainerStyle={styles.containerGap24}
            renderItem={({item, index}) => {
              return(
                <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
                  <View style={[styles.timeContainer, 
                  index === 0
                  ? {marginLeft: SPACING.space_24} 
                  : index === dataArray.length - 1 
                  ? {marginRight: SPACING.space_24} 
                  : {},
                  index === selectedTimeIndex
                  ? {backgroundColor: COLORS.Red} : {}
                ]}>
                    <Text style={styles.timeText}>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={styles.buttonPriceContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.totalPriceText}>Total Price</Text>
            <Text style={styles.price}>${price}.00</Text>
          </View>
          <TouchableOpacity onPress={BookSeats}>
            <Text style={styles.buttonText}>Buy Tickets</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  )

  
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
      fontSize: FONTSIZE.size_12,
      color: COLORS. Grey,
      marginTop: 10,
    },
    seatContainer: {
      marginVertical: SPACING.space_20
    },
    containerGap20:{
      gap: 20,
    },
    seatRow:{
      flexDirection: 'row',
      gap: 20,
      justifyContent: 'center',
    },
    seatIcon:{
      color: COLORS.White,
    },
    seatRadioContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: SPACING.space_28,
      marginBottom: SPACING.space_10,
      justifyContent: 'center',
      gap: 40
    },
    radioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    radioIcon:{
      fontSize: 20,
      color: COLORS.White,

    },
    radioText:{
      fontSize: FONTSIZE.size_12,
      color: COLORS.White,
      fontFamily: FONTFAMILY.poppins_regular,
    },
    containerGap24:{
      gap: 20,
    },
    dateContainer:{
      width: SPACING.space_10 * 6,
      height: SPACING.space_10 * 9,
      borderRadius: SPACING.space_10 * 10,
      backgroundColor: COLORS.Grey, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    dateText:{
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_30,
      color: COLORS.White,
      justifyContent: 'center',
    },
    dayText:{
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_14,
      color: COLORS.White,
    },
    OutterContainer: {
      marginVertical: SPACING.space_20,
    },
    timeContainer: {
      paddingVertical: SPACING.space_10,
      borderWidth: 1,
      borderColor: COLORS.White,
      paddingHorizontal: SPACING.space_20,
      borderRadius: BORDERADIUS.radius_25,
      backgroundColor: COLORS.DarkGrey,
      alignItems: 'center',
      justifyContent: 'center',
    },
    timeText: {
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_14,
      color: COLORS.White,
    },
    buttonPriceContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: SPACING.space_24,
      paddingVertical: SPACING.space_24,
      marginBottom: SPACING.space_36,
    },
    priceContainer:{
      alignItems: 'center',
    },
    totalPriceText:{
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_14,
      color: COLORS.Grey,
    },
    price:{
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_24,
      color: COLORS.White,
    },
    buttonText:{
      borderRadius: BORDERADIUS.radius_25,
      paddingHorizontal: SPACING.space_24,
      paddingVertical: SPACING.space_10,
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: FONTSIZE.size_16,
      color: COLORS.White,
      backgroundColor: COLORS.Red,
    }
});
