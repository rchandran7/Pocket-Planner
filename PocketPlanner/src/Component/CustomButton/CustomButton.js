import React from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'

const CustomButton = ({onPress, text, type = "PRIMARY", bgColor, fgColor}) => {
    return(
        <Pressable onPress ={onPress} 
                    style = {[
                        styles.container, 
                        type == "TERTIARY" ? styles.container_TERTIARY : styles.container_PRIMARY,
                        bgColor ? {backgroundColor: bgColor} : {}
                        ]}>
                    <Text 
                        style = {[
                            styles.text, 
                            type == "TERTIARY" ? styles.text_TERTIARY: styles.text_PRIMARY,
                             fgColor ? {color: fgColor} : {}
                            ]}>
                        {text}
                    </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create ({
    container: {
        width: '100%',
        padding: 20,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },  

    container_PRIMARY: {
        backgroundColor: '#B0C4DE',
    },

    container_TERTIARY: {

    },

    text_PRIMARY: {
        fontWeight: 'bold',
        color: 'white',
    },
    text_TERTIARY: {
        color: 'grey',
    },
});

export default CustomButton