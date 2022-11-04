import React from 'react'
import { View, Text } from 'react-native'

const SignInScreen = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const {height} = useWindowDimensions();
return (
    <View style = {styles.root}>
        
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
    </View>
    );
};

const styles = Style.Sheet.create({
    root: {
        alignItems:'center',
        padding: 20,
    },
})
export default SignInScreen
