import React, {useState,} from 'react';
import {View, TextInput, TouchableOpacity, Text, Button, StyleSheet} from 'react-native';
import { account, databases } from '../../appWriteConfig';
import * as yup from "yup";
import { Formik } from "formik";

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const passWordSchema = yup.object().shape({
        password: yup.string()
            .min(8, "Password should be minimum 8 characters")
            .max(16, "Password should be maximum 16 characters")
            .matches(/[a-z]/, "Password should contain a lowercase letter")
            .matches(/[A-Z]/, "Password should contain an uppercase letter")
            .matches(/[0-9]/, "Password should contain a number")
            .matches(/[!@#$%^&*]/, "Password should contain a special character")
            .required("Password is required"),
    });

    const handleSignUp = async (values) => {
        const { password } = values;
        try {
            const user = await account.create("unique()", email, password, name);
            const userInfo = {
                userId: user.$id,
                name: name,
                email: email,
            };
            await databases.createDocument(
                "66b0c833001eaadd638b", // DatabaseID
                "66bdfd08002463022412", // CollectionID
                user.$id,
                userInfo
            );
            setMessage("User Created Successfully!");
            navigation.navigate("SignInScreen");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder='Name' placeholderTextColor="#000" value={name} onChangeText={setName} style={styles.input}/>
            <TextInput placeholder='Email' placeholderTextColor="#000" value={email} onChangeText={setEmail} style={styles.input} />
            <Formik initialValues={{ password: '' }} validationSchema={passWordSchema} onSubmit={handleSignUp}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                        <TextInput
                            placeholder='Password'
                            placeholderTextColor="#000"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                            style={styles.input}
                        />
                        {touched.password && errors.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}
                        <Button title='Sign Up!' onPress={handleSubmit} style={styles.button} />
                    </View>
                )}
            </Formik>
                {message ? <Text style={styles.errorText}>{message}</Text> : null}
            <Button
                title='Already Have an Account?'
                onPress={() => navigation.navigate("SignInScreen")}
                style={styles.button}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        color: 'black',
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
        textAlign: 'center',
    },
});

export default SignUpScreen;
