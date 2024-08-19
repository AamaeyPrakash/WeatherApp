import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,TouchableOpacity, SafeAreaView } from "react-native";
// import { databases, storage } from './appWriteConfig'
// import { launchImageLibrary } from 'react-native-image-picker';
// import uuid from 'react-native-uuid';
import ChatScreen from './src/screens/ChatScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import AppNavigator from './src/navigation/AppNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from './src/screens/SignInScreen';

const Stack = createStackNavigator();
const App = () => {
    return (
        // <SafeAreaView style={{flex:1}}>
        // </SafeAreaView>
    <NavigationContainer>
        <Stack.Navigator initialRouteName='SignUp'>
            <Stack.Screen name="SignIn" component={ SignInScreen } />
            <Stack.Screen name="SignUp" component={ SignUpScreen } />
        </Stack.Navigator>
    </NavigationContainer>
    );
};

export default App;