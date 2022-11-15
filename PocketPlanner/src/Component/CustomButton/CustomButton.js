import React from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'

const CustomButton = ({onPress, text, type}) => {
    return(
        <Pressable onPress ={onPress} style = {[styles.container, styles['container_${type}']] }>
            <Text style = {styles.text}>{styles['text_${type}']}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create ({
    container: {
        width: '100%',
        padding: 15,
        magrinVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },  

    container_PRIMARY: {
        backgroundColor: '#3B71F3',
    },

    container_TERTIARY: {

    },

    text: {
        fontWeight: 'bold',
        color: 'white',
    },
    text_TERTIARY: {
        color: 'grey',
    },
});

export default CustomButton