import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ScreenNavigator from '../Screens/Navigator';
import AddTask from '../Screens/TaskAdder';
import { NavigationContainer } from '@react-navigation/native';
import EditProfileScreen from '../Screens/EditProfile';

const stackNav = createStackNavigator();

function tabNavigator() {
    return (
        <NavigationContainer>
            <stackNav.Navigator
            screenOptions={{
            headerShown: false
            }}
            >
                <stackNav.Screen name="bottomTabs" component={ScreenNavigator}/>
                <stackNav.Screen name="TaskAdder" component={AddTask} />
                <stackNav.Screen name="EditProfileScreen" component={EditProfileScreen}/>
            </stackNav.Navigator>
        </NavigationContainer>
    );
}

export default tabNavigator;