import * as React from 'react';
import {useState} from 'react';
import { Text, View, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import styled from "styled-components";

export default function SettingsScreen() {
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View>
        <SettingsContainer>
            <SettingsText>Settings</SettingsText>
        </SettingsContainer>
        <NotificationContainer>
            <Text style={styles.notificationText}>Notifications</Text>
            <Switch
                trackColor={{false: '#767577', true: '#B0C4DE'}}
                thumbColor={isEnabled ? '#95D787' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </NotificationContainer>
        <SignOutContainer>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </SignOutContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#b22222',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  notificationText: {
      marginRight: 10,
      fontSize: 20,
  }
});

const SettingsText = styled.Text`
  font-weight: bold;
  font-size: 30px;
`;
const SettingsContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 95px;
`;
const SignOutContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 450px;
`;
const NotificationContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`;