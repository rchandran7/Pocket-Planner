import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ScreenNavigator from '../Screens/Navigator';
import HomeScreen from '../Screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import EditProfileScreen from '../Screens/EditProfile';
import CreateClass from '../Screens/createClassScreen.js';
import AddClass from '../Screens/addClassScreen';
import AddAssignment from '../Screens/addAssignmentScreen';
import AddMeeting from '../Screens/addMeetingScreen';
import CreateGroup from '../Screens/GroupStuff/CreateGroupScreen';
import JoinGroup from '../Screens/GroupStuff/JoinGroupScreen';

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
                <stackNav.Screen name="EditProfileScreen" component={EditProfileScreen}/>
                <stackNav.Screen name="Pocket Planner" component={ScreenNavigator}/>
                <stackNav.Screen name="createClass" component={CreateClass} />
                <stackNav.Screen name="addClass" component={AddClass} />
                <stackNav.Screen name="addAssignment" component={AddAssignment} />
                <stackNav.Screen name="addMeeting" component={AddMeeting} />

                <stackNav.Screen name="CreateGroupScreen" component={CreateGroup} />
                <stackNav.Screen name="JoinGroupScreen" component={JoinGroup} />
                
            </stackNav.Navigator>
        </NavigationContainer>
    );
}

export default tabNavigator;