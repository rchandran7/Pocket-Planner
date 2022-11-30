import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style = {styles.container}>
            <TextInput
                value = {value}
                onChangeText = {setValue}
                style={styles.input}
                secureTextEntry = {secureTextEntry}
                placeholder = {placeholder}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        background: 'white',
        width: '100%',
        
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 15,
        marginVertical: 5,
    },
    input: {},
});
export default CustomInput;