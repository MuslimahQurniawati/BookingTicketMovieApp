import React from 'react';
import HomeScreen from '../screen/HomeScreen';
import SearchScreen from '../screen/SearchScreen';
import TicketScreen from '../screen/TicketScreen';
import UserAccountScreen from '../screen/UserAccountScreen';
import { COLORS, FONTSIZE, SPACING } from '../Theme/theme';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';  
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.Black,
          borderTopWidth: 0,
          height: SPACING.space_10 * 10,
          paddingBottom: 5,    
          paddingTop: 10,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: string = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Ticket') {
            iconName = focused ? 'ticket' : 'ticket-outline';
          } else if (route.name === 'User') {
            iconName = focused ? 'person' : 'person-outline';
          }
          const iconColor = focused ? COLORS.Red : color;
          return <Ionicons  name={iconName as any} size={focused ? 34 : 30} color={iconColor} />;
        },
        activeTabBackground: COLORS.Red,
        tabBarInactiveTintColor: COLORS.White, 
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Ticket" component={TicketScreen} />
      <Tab.Screen name="User" component={UserAccountScreen} />
    </Tab.Navigator>
  );
};

const Styles = StyleSheet.create({
  activeTabBackground: {
    backgroundColor: COLORS.Black,
    padding: SPACING.space_20,
    borderRadius: SPACING.space_18 * 10,
  },
});

export default TabNavigator;
