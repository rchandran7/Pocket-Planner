import * as React from 'react';

import { createStackNavigator } from '@react-navigation/native';
import ScreenNavigator from '../Screens/Navigator';
import AddTask from '../Screens/TaskAdder';
import { NavigationContainer } from '@react-navigation/native';

const stackNav = createStackNavigator();

function tabNavigator() {
    return (
        <NavigationContainer>
            <stackNav.Navigator>
                <stackNav.Screen name="bottomTabs" component={ScreenNavigator}/>
                <stackNav.Screen name="TaskAdder" component={AddTask} />
            </stackNav.Navigator>
        </NavigationContainer>
    );
}

export default tabNavigator;