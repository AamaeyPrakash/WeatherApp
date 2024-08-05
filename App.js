import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,TouchableOpacity } from "react-native";
import { databases } from './appWriteConfig'


// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import AppNavigator from './src/navigation/AppNavigator';
// import HomeScreen from './src/screens/HomeScreen';
// import DisplayScreen from './src/screens/DisplayScreen';


// const Tab = createBottomTabNavigator();

// const App = () => {
//   return(
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Display" component={DisplayScreen} />
//         <Tab.Screen name="Profile" component={AppNavigator} />
//       </Tab.Navigator>
//     </NavigationContainer>  )
// }

const App = () =>{
    const databaseId="66b0c833001eaadd638b"
    const collectionId="66b0c83c000b8c7038e1"
    useEffect (()=>{
        const fetchDocuments = async () => {
            try {
                const response = await databases.listDocuments(databaseId,collectionId);
                console.log(response.documents);
            } catch (error) {
                console.log(error)
            }
        };
        fetchDocuments();
    },[]);

    const createDocument = async () =>{
        try{
            const response = await databases.createDocument(databaseId,collectionId,"Cars",{
                Name: "XYZ Car",
                PhoneNumber:10
            })
            console.log("Document created",response);
            }
            catch(error){
                console.error(error);
            }
        }
    
    return (
        <View>
            <Text>App</Text>
            <Button title="Create Document" onPress={createDocument}/>
        </View>
    )
}


export default App;