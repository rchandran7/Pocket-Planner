/*import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

function ScreenNavigator() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Settings" component={SettingsScreen}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
}

export default ScreenNavigator;*/

import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import FriendScreen from './FriendScreen';

const Tab = createBottomTabNavigator();

function ScreenNavigator() {
  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name = "home" color={color} size={25} />
            )
          }}
        />

        <Tab.Screen 
          name="Friends" 
          component={FriendScreen} 
          options={{
            tabBarLabel: 'Friends',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name = "people" color={color} size={22} />
            )
          }}
        />


        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name = "settings" color={color} size={22} />
            )
          }}
        />
      </Tab.Navigator>
  );
}

export default ScreenNavigator;