import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import SignInScreen from './src/Screens/SignInScreen';
import SignUpScreen from './src/Screens/SignUpScreen';
import { NavigationContainer } from '@react-navigation/native';

import ScreenNavigator from './src/Screens/Navigator'
import DefaultStack from './src/Routes/defaultStack'
import { Amplify } from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import config from './src/aws-exports';


Amplify.configure(config);
function App() {
  return (
    <DefaultStack />
  );
};

export default withAuthenticator(App); 