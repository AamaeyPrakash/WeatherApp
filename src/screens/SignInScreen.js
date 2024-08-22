import React, {useEffect, useState,} from 'react';
import {View, TextInput, TouchableOpacity, Text, Button, Alert} from 'react-native';
import { account } from '../../appWriteConfig';

const SignInScreen = ({ navigation }) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(()=>{
        const checkActiveSession = async () => {
            try{
                const session = await account.getSession("current");
                if(session){
                    navigation.navigate("UserList");
                }
            } catch (error) {
                Alert.alert('Error', error.message)
            }
        };
        checkActiveSession();
    })

    const handleSignIn = async () =>{
        try{
            await account.createEmailPasswordSession(email,password);
            NavigationContainer.navigate("UserList")
        } catch(error){
            Alert.alert('Error', error.message)
        }
}

    return(
        <View>
            <TextInput placeholder='Email' value={email} onChangeText={setEmail} placeholderTextColor="#000"/>
            <TextInput placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor="#000"/>

            <Button title='Sign In' onPress={handleSignIn} />
        </View>
    )
}

export default SignInScreen;