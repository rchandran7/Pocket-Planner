import React from 'react';
import logo from '../../assets/Logo_PocketPlanner.jpg';
import CustomInput from '../Component/CustomInput/CustomInput';
import CustomButton from '../Component/CustomButton/CustomButton';
import {useState} from 'react';
import { useWindowDimensions } from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-native';

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

return (
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
    </View>
    );
};


const styles = StyleSheet.create({
    root: {
        alignItems:'center',
        padding: 50,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
});
export default SignInScreen
