import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native'
import { TextInput } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function Task() {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const handleAddTask = () => {
        setTaskItems([...taskItems, title, desc, priority]);
        console.log(title, desc, priority);
        setTitle(null);
        setDesc(null);
        setPriority(null);
    }
    const navigation = useNavigation();
    return (
        <View style={styles.body}>

            <TextInput 
                value={title}
                style={styles.input}
                placeholder= 'Title'
                onChangeText={(value) => setTitle(value)}
            />
            <TextInput 
                value={desc}
                style={styles.input}
                placeholder= 'Description'
                multiline
                onChangeText={(value) => setDesc(value)}
            />
            <TextInput 
                value={priority}
                style={styles.input}
                placeholder= 'Set Priority'
                keyboardType='number-pad'
                onChangeText={(value) => setPriority(value)}
            />

            <TouchableOpacity style={styles.button} onPress={handleAddTask}>
                <AntDesign name={'checkcircle'} size={50} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#C0C0C0',
        borderRadius: 20,
        backgroundColor: '#fff',
        textAlign: 'left',
        fontSize: 20,
        margin: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 50,
        elevation: 5,
        
    },
})