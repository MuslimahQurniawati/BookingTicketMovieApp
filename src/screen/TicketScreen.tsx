import  React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, StatusBar, ImageBackground, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AppHeader from '../components/AppHeader';
import { BORDERADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../Theme/theme';
import { Ionicons } from '@expo/vector-icons';


const TicketScreen = ({navigation, route}: any) => {
  const [ticketData, setTicketData] = useState<any>(route.params);

  useEffect(() => {
    (async () => {
      try {
        const ticket = await SecureStore.getItemAsync('ticket'); // ganti ke SecureStore
        if (ticket !== undefined && ticket !== null) {
          setTicketData(JSON.parse(ticket));
        }
      } catch (error) {
        console.error('Something went wrong while getting Data', error);
      }
    })();
  }, []);

  console.log('TICKETDATA', ticketData);
  if (ticketData !== route.params && route.params != undefined) {
    setTicketData(route.params);
  }

  if (ticketData == undefined || ticketData == null) { 
    return (
      <View style={styles.container}>
          <StatusBar hidden />
          <View style={styles.appHeaderContainer}>
            <AppHeader
              name="close"
              header={'My Tickets'}
              action={() => navigation.goBack()}
            />
          </View>
        </View>
    );
  }

  return (
    <View style={styles.container}>
          <StatusBar hidden />
          <View style={styles.appHeaderContainer}>
            <AppHeader
              name="close"
              header={'My Tickets'}
              action={() => navigation.goBack()}
            />
          </View>

          <View style={styles.ticketContainer}>
              <ImageBackground 
                source={{uri: ticketData?.ticketImage}}
                style= {styles.ticketBGImage}
              />
                <View style={styles.linear}></View>
                  <View style={styles.ticketFooter}>
                    <View style={styles.ticketDateContainer}>
                      <View style={styles.subtitleContainer}>
                        <Text style={styles.DateTitle}>{ticketData?.date.date}</Text>
                        <Text style={styles.subTitle}>{ticketData?.date.day}</Text>
                      </View>
                    </View>
                    <View style={styles.subtitleContainer}>
                      <Ionicons name='time' style={styles.clockIcon}/>
                      <Text style={styles.subTitle}>{ticketData?.time}</Text>
                    </View>
                </View>
                <View style={styles.ticketSeatContainer}>
                  <View style={styles.subtitleContainer}>
                    <Text style={styles.subHeading}>Hall</Text>
                    <Text style={styles.subTitle}>02</Text>
                  </View>
                  <View style={styles.subtitleContainer}>
                    <Text style={styles.subHeading}>Row</Text>
                    <Text style={styles.subTitle}>04</Text>
                  </View>
                  <View style={styles.subtitleContainer}>
                    <Text style={styles.subHeading}>Seats</Text>
                    <Text style={styles.subTitle}>
                    {ticketData?.seatArray
                      .slice(0, 3)
                      .map((item: any, index: number, arr: any) => {
                        return item + (index == arr.length - 1 ? '' : ', ');
                      })}
                    </Text>
                  </View>
                </View>
                <Image source={require('src/assets/images/barcode.png')} 
                      style={styles.barcodeImage}/>
              </View>
        </View>
  );
};

export default TicketScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  appHeaderContainer:{
    marginTop: SPACING.space_20*2,
    marginHorizontal: SPACING.space_36,
  },
  ticketContainer:{
    flex: 1,
    justifyContent: 'center',
  },
  ticketBGImage:{
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    aspectRatio: 200 / 300,
    borderTopLeftRadius: BORDERADIUS.radius_20,
    borderTopRightRadius: BORDERADIUS.radius_20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  linear:{
    borderTopColor: COLORS.Black,
    borderTopWidth: 3,
    width: 300,
    alignSelf: 'center',
    backgroundColor: COLORS.Red,
    borderStyle: 'dashed',
  },
  ticketFooter:{
    backgroundColor: COLORS.Red,
    width: 300,
    alignItems: 'center',
    paddingBottom: SPACING.space_20,
    alignSelf: 'center',
    borderBottomLeftRadius: BORDERADIUS.radius_25,
    borderBottomRightRadius: BORDERADIUS.radius_25,
  },
  ticketDateContainer:{
    flexDirection: 'row',
    gap: SPACING.space_20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  ticketSeatContainer:{
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  DateTitle:{
    color: COLORS.White,
    fontSize: SPACING.space_24,
    fontFamily: FONTFAMILY.poppins_medium
  },
  subTitle:{
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  subHeading:{
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  subtitleContainer:{
    alignItems: 'center',
  },
  clockIcon:{
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
    paddingBottom: SPACING.space_10,
  },
  barcodeImage:{

  }
});
