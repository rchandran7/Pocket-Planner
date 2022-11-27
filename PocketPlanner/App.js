
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import SignInScreen from './src/Screens/SignInScreen';
import { NavigationContainer } from '@react-navigation/native';
import ScreenNavigator from './Navigator'

function App() {
  return (
    <View>
      <SignInScreen />
      <StatusBar style="auto" />
    </View>
  );
}

export default App;