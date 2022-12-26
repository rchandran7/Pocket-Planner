import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from '../Component/CustomInput/CustomInput';
import CustomButton from '../Component/CustomButton/CustomButton';
import SocialSignInButtons from '../Component/SocialSignInButtons/SocialSignInButtons';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const onRegisterPressed = () => {
        console.warn("Register Pressed");
    };

    const onTermsOfUsePressed = () => {
        console.warn("Terms Of Use Pressed");
    };

    const onPrivacyPressed = () => {
        console.warn("Privacy Policy Pressed");
    };
    const onHaveAnAccountPressed = () => {
        console.warn("Have An Account Pressed");
    };


    return (
        <View style={styles.root}>
            <Text style={styles.title}> Create An Account </Text>

            <CustomInput
                placeholder="Username"
                value={username}
                setValue={setUsername} />
            <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail} />

            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true} />
            <CustomInput
                placeholder="Repeat Password"
                value={passwordRepeat}
                setValue={setPasswordRepeat}
                secureTextEntry={true} />

            <CustomButton
                text="Register"
                onPress={onRegisterPressed} />

            <Text style={styles.text}>
                By Registering, you confirm that you accept our{' '}
                <Text styles={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text>
                {' '} and {' '}
                <Text styles={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>
            </Text>

            <SocialSignInButtons />

            <CustomButton
                text="Have an account? Sign in"
                onPress={onHaveAnAccountPressed} 
                type = "TERTIARY"/>


        </View>

    );
}


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
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: "#B0C4DE",
        margin: 10,
    }
});

export default SignUpScreen