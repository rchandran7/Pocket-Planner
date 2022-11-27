
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
//import SignInScreen from './src/Screens/SignInScreen/SignInScreen';
import SignUpScreen from './src/Screens/SignUpScreen/SignUpScreen';
//import { NavigationContainer } from '@react-navigation/native';
//import ScreenNavigator from './Navigator'

function App() {
  return (
    <View>
      <SignUpScreen />
      <StatusBar style="auto" />
    </View>
  );
}

export default App;