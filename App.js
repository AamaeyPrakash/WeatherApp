import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,TouchableOpacity, SafeAreaView } from "react-native";
// import { databases, storage } from './appWriteConfig'
// import { launchImageLibrary } from 'react-native-image-picker';
// import uuid from 'react-native-uuid';
import ChatScreen from './src/screens/ChatScreen';

const App = () => {
    return (
        <SafeAreaView style={{flex:1}}>
            <ChatScreen/>
        </SafeAreaView>
    );
};

export default App;