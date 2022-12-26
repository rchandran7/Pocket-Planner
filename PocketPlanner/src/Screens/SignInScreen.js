import React from 'react';
import logo from '../../../assets/Logo_PocketPlanner.jpg';
import CustomInput from '../Component/CustomInput/CustomInput';
import CustomButton from '../Component/CustomButton/CustomButton';
import SocialSignInButtons from '../Component/SocialSignInButtons/SocialSignInButtons';
import {useState} from 'react';
import { useWindowDimensions } from 'react-native';
import { View, Image, StyleSheet, ScrollView } from 'react-native';


const SignInScreen = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const {height} = useWindowDimensions();

    const onSignInPressed = () => {
        console.warn("Log in Occured");
    }

    const onForgotPasswordPressed = () => {
        console.warn("Forgot Password Pressed");
    }

    const onSignUpPressed = () => {
        console.warn("Sign Up Pressed");
    }

return (
    <ScrollView showsVerticalScrollIndicator = {false}>
    <View style = {styles.root}>
        <Image source = {logo} style = {[styles.logo, {height: height * 0.3}]} resizeMode = "contain" />

        <CustomInput 
        placeholder = "Username" 
        value = {username} 
        setValue = {setUsername}
        />

        <CustomInput 
        placeholder = "Password" 
        value = {password} 
        setValue = {setPassword} 
        secureTextEntry ={true}
        />

        <CustomButton 
            text = "Log In" 
            onPress ={onSignInPressed}
        />

        <CustomButton 
        text = "Forgot Password" 
        onPress ={onForgotPasswordPressed}
        type = "TERTIARY"
        />

        <SocialSignInButtons/>

        <CustomButton 
            text = "Don't have an account? Create One" 
            onPress ={onSignUpPressed}
            type = "TERTIARY"
        />
    </View>
    </ScrollView>
    );
};


const styles = StyleSheet.create({
    root: {
        alignItems:'center',
        padding: 50,
    },
    logo: {
        width: '80%',
        maxWidth: 350,
        maxHeight: 250,
    },
});

export default SignInScreen
