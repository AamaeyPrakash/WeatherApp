import React, {useState,} from 'react';
import {View, TextInput, TouchableOpacity, Text, Button} from 'react-native';
import { account } from '../../appWriteConfig';
import * as yup from "yup";
import { Formik } from "formik";

const SignUpScreen = ({navigation}) =>{
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignUp  = async () =>{
        try{
            await account.create("unique()",email,password);
            setMessage("User Created Successfully!");
        }
        catch(error){
            setMessage(error.message);
        }
    };

    return(
        <View>
            <TextInput placeholder='Email' value={email} onChangeText={setEmail} />
            <TextInput
                placeholder='password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                />
                <Button title='Sign Up!' onPress={handleSignUp} />
                {message ?<Text>{message}</Text>:null}
                <Button 
                title='Already Have an Account?'
                onPress={() => navigation.navigate("SignIn")}
                ></Button>
        </View>
    )
}

// const passWordSchema = yup.object().shape({
//     password: yup.string()
//       .min(8, "Password should be minimum 8 characters")
//       .max(16, "Password should be maximum 16 characters")
//       .matches(/[a-z]/, "Password should contain a lowercase letter")
//       .matches(/[A-Z]/, "Password should contain an uppercase letter")
//       .matches(/[0-9]/, "Password should contain a number")
//       .matches(/[!@#$%^&*]/, "Password should contain a special character")
//       .required("Password is required"),
//   });
  
//   const App = () => {
//     return (
//       <View style={styles.container}>
//         <Formik
//           initialValues={{ password: "" }}
//           validationSchema={passWordSchema}
//           onSubmit={values => {
//             Alert.alert('Password is valid', `Password: ${values.password}`);
//           }}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//             <View>
//               <Text>Password</Text>
//               <TextInput
//                 onChangeText={handleChange('password')}
//                 onBlur={handleBlur('password')}
//                 value={values.password}
//                 secureTextEntry
//                 style={styles.input}
//               />
//               {touched.password && errors.password && (
//                 <Text style={styles.errorText}>{errors.password}</Text>
//               )}
//               <Button onPress={handleSubmit} title="Submit" />
//             </View>
//           )}
//         </Formik>
//       </View>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       padding: 20,
//       justifyContent: 'center',
//       flex: 1,
//     },
//     input: {
//       borderWidth: 1,
//       borderColor: '#ccc',
//       padding: 10,
//       marginVertical: 10,
//       borderRadius: 5,
//     },
//     errorText: {
//       color: 'red',
//       marginBottom: 10,
//     },

export default SignUpScreen;