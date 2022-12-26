import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import SignInScreen from './src/Screens/SignInScreen';
import SignUpScreen from './src/Screens/SignUpScreen';
import { NavigationContainer } from '@react-navigation/native';

import ScreenNavigator from './src/Screens/Navigator'
import DefaultStack from './src/Routes/defaultStack'

function App() {
  return (
    // <DefaultStack />
    <View>
      <SignUpScreen />
      <StatusBar style="auto" />
    </View>
  );
};

export default App; 