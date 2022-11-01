import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const CustomInput = ({value, setValue}) => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    return (
        <View style = {styles.container}>
            value = {value}
            onChangeText = {setValue}
            <TextInput placeholder = "placeholder" style = {styles.input}/>
            <CustomInput placeholder = "Username" value = {username} setValue = {setUsername}/>
            <CustomInput />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        background: 'white',
        width: '100%',

        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {},
});
export default CustomInput