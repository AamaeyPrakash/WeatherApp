import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,TouchableOpacity } from "react-native";
import { databases, storage } from './appWriteConfig'
import { launchImageLibrary } from 'react-native-image-picker';


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
    
    const pickImage = () =>{
        launchImageLibrary({mediaType:'photo'},(response)=>{
            if(response.didCancel){
                console.log("User cancelled image selection");
            }
            else if(response.errorMessage){
                console.log(response.errorMessage);
            }
            else{
                const uri = response.assets[0].uri;
                uploadImage(uri);
            }
        });
    };

    const uploadImage = async (uri) =>{
        try{
            const file = {
                uri:uri,
                name:`photo_${Date.now()}.jpg`,
                type:'image/jpeg',
            };
            const data = new FormData();
            data.append('file',file);
            const response= await storage.createFile(
                '66b0d211003c52724af5',
                'unique()',
                file   
            );
            console.log(response)
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <View>
            <Text>App</Text>
            <Button title="Create Document" onPress={createDocument}/>
            <Button title="Pick and Upload Image" onPress={pickImage} />
        </View>
    )
}


export default App;