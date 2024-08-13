import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,TouchableOpacity } from "react-native";
import { databases, storage } from './appWriteConfig'
import { launchImageLibrary } from 'react-native-image-picker';
import uuid from 'react-native-uuid'

const PickImageAppWrite = () =>{
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
    
      const pickImage = () => {
          launchImageLibrary({ mediaType: 'photo' }, (response) => {
              if (response.didCancel) {
                  console.log('User cancelled image selection');
              } else if (response.errorMessage) {
                  console.log(response.errorMessage);
              } else {
                  const uri = response.assets[0].uri;
                  uploadImage(uri);
              }
          });
      };
  
    const uploadImage = async (uri) => {
      try {
        const file = {
            uri: uri,
            name: `photo_${Date.now()}.jpg`,
            type: 'image/jpeg',
        };
  
        const formData = new FormData();
          formData.append('file', {
            uri: file.uri,
            name: file.name,
            type: file.type,
        });
          
        const fileId = uuid.v4();
          formData.append('fileId', fileId); // Correctly append the fileId to formData
          const response = await fetch(`https://cloud.appwrite.io/v1/storage/buckets/66b0d211003c52724af5/files`,{
              method: 'POST',
              headers: {'X-Appwrite-Project': '66a2427b001785354397',},
              body: formData, 
          });
      
        const result = await response.json();
          console.log(result);
      } catch (error) {
        console.error('File upload failed', error);
      }
    };
  
    return (
        <View>
            <Text>App</Text>
            <Button title="Create Document" onPress={createDocument}/>
            <Button title="Pick and Upload Image" onPress={pickImage} />
        </View>
    )
  }

  export default PickImageAppWrite;