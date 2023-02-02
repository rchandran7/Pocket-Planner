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

const signUpConfig = {
  header: "My Customized Sign Up",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
  ],
};

export default withAuthenticator(App, {signUpConfig}); 