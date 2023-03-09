import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native'
import { TextInput } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import {CheckBox} from "react-native-elements";
import { API, graphqlOperation } from 'aws-amplify';
import { createMeeting } from '../graphql/mutations';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function AddMeeting() {

    const [meetingName, setMeetingName] = useState('');
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState();
    const [meetingDate, setMeetingDate] = useState();
    const [recurring, setRecurring] = useState();
    const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await API.graphql(graphqlOperation(listUsers));
        setUser(userData.data.listUsers.items[0]);
        console.log(userData.data.listUsers.items[0]);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []);

    
    const handleAddMeeting = async () => {
        if (!meetingName || !description) {
          Alert.alert('Please enter a task name and description.');
          return;
        }
        try {
          const meetingDetails = {
            meetingName,
            description,
            meetingDate,
            recurring,
            category: '', // add a category property if needed
            //completed: false,
            userID: user.id,
          };
          await API.graphql(graphqlOperation(createMeeting, { input: meetingDetails }));
          setMeetingName('');
          setDescription('');
          setMeetingDate(new Date());
          console.log(title);
          console.log(description);
          console.log(meetingDate);
          console.log(recurring);
          navigation.popToTop();
        } catch (error) {
          console.log('Error adding task:', error);
          Alert.alert('Error adding task. Please try again later.');
        }
      };
      const handleConfirmDatePicker = (date) => {
        setMeetingDate(date);
        setIsDatePickerVisible(false);
      };
    
      const handleCancelDatePicker = () => {
        setIsDatePickerVisible(false);
      };
    
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
          month: '2-digit',
          day: '2-digit',
        };
        return date.toLocaleDateString('en-US', options);
      };
    
      const formatTime = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = date.getHours() < 12 ? 'AM' : 'PM';
        return `${hours}:${minutes} ${ampm}`;
      };
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Task Name:</Text>
                <TextInput
                style={styles.input}
                placeholder="Enter Meeting Name"
                value={Title}
                onChangeText={(text) => setTitle(text)}
                />
            </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Task Description:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Meeting description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style = {styles.inputContainer}>
            <CheckBox 
                title = "Is This Meeting Recurring?"
                value = {recurring}
                style = {styles.input}
                checked={true}
                onPress={() => setRecurring(recurring)}
            />
        </View>
    
        <TouchableOpacity onPress={() => setIsDatePickerVisible(true)} style={styles.button}>
          <Text style={styles.buttonText}>Set Deadline</Text>
          <Text style={styles.deadlineText}>{formatDate(deadline)}, {formatTime(deadline)}</Text>
        </TouchableOpacity>
    
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirmDatePicker}
          onCancel={handleCancelDatePicker}
          minimumDate={new Date()}
        />
          <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
      </View>
            
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
      },
      inputContainer: {
        marginBottom: 10,
        width: '100%',
      },
      label: {
        fontWeight: 'bold',
        marginBottom: 5,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        width: '100%',
      },
      button: {
        backgroundColor: '#B0C4DE',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
      },
      deadlineText: {
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 5,
      },
      addButton: {
        backgroundColor: '#B0C4DE',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        width: '100%',
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})