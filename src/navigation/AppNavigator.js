import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import HomeScreen from '../screens/HomeScreen';
import DisplayScreen from '../screens/DisplayScreen';

const stack = createStackNavigator();

const AppNavigator = () => {

    return(
        <stack.Navigator initialRouteName='SignUp'>
            <stack.Screen name="SignIn" component={ SignInScreen } />
            <stack.Screen name="SignUp" component={ SignUpScreen } />
        </stack.Navigator>
    );
};

export default AppNavigator;