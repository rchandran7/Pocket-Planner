import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import SignInScreen from './src/Screens/SignInScreen';
import { NavigationContainer } from '@react-navigation/native';

import ScreenNavigator from './src/Screens/Navigator'
import DefaultStack from './src/Routes/defaultStack'

function App() {
  return (
    <DefaultStack />
    //<ScreenNavigator />
  );
}

export default App; 