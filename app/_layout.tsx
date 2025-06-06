import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from '../src/navigator/TabNavigator';
import MovieDetailsScreen from '../src/screen/MovieDetailsScreen';
import SeatBookingScreen from '../src/screen/SeatBookingScreen';
import SearchScreen from '../src/screen/SearchScreen';
import TicketScreen from '@/src/screen/TicketScreen';
import { enableScreens } from 'react-native-screens';
import splashScreen from '@/src/screen/splashScreen';
import HomeScreen from '@/src/screen/HomeScreen';
enableScreens();


const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={splashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'default'}}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="SeatBooking"
          component={SeatBookingScreen}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{animation: 'slide_from_right'}} // bebas, bisa kamu ganti efek transisinya.
        />
        <Stack.Screen
          name="Ticket"
          component={TicketScreen}
          options={{animation: 'slide_from_right'}} // bebas, bisa kamu ganti efek transisinya.
        />
      </Stack.Navigator>
  );
}