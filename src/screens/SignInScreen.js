import React, {useState,} from 'react';
import {View, TextInput, TouchableOpacity, Text, Button} from 'react-native';
import { account } from '../../appWriteConfig';

const SignInScreen = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSignUp = async () =>{
        try{
            await account.create("unique()",email,password);
            setMessage("User Created Successfully!");
        }
        catch(error){
            setMessage(error.message);
        }
    }

    return(
        <View>
            <TextInput placeholder='Email' value={email} onChangeText={setEmail} />
            <TextInput placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry/>

            <Button title='Sign In' onPress={handleSignUp} />
            {message ?<Text>{message}</Text>:null}
        </View>
    )
}

export default SignInScreen;