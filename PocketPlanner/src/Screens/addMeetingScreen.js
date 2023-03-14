import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native'
import { TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {CheckBox} from "react-native-elements";
import { API, graphqlOperation } from 'aws-amplify';
import { createMeeting } from '../graphql/mutations';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function AddMeeting() {

    const [meetingName, setMeetingName] = useState('');
    const [description, setDescription] = useState('');
    const [meetingDate, setMeetingDate] = useState();
    const [isRecurring, setIsRecurring] = useState(false);
    const [isMultiDay, setIsMultiDay] = useState(false);
    const [user, setUser] = useState(null);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
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

    const handleReturn = async () =>{
      navigation.popToTop();
    }

    
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
            isRecurring,
            category: '', // add a category property if needed
            //completed: false,
            userID: user.id,
          };
          if (isRecurring){
            for(let i = 0; i < 10; i++){
              const recurringMeetingDate = new Date(meetingDate.getTime() + i * 7 * 24 * 60 * 60 * 1000)
              const recurringMeetingDetails = {
                ...meetingDetails,
                meetingDate: recurringMeetingDate,
              };
            try{
              await API.graphql(graphqlOperation(createMeeting, { input: recurringMeetingDetails }));
              console.log(`Created recurring meeting: ${recurringMeetingDetails.meetingName} on ${recurringMeetingDetails.meetingDate}`);
              } catch (error) {
                  console.log('Error creating recurring meeting:', error);
                  Alert.alert('Error creating recurring meeting. Please try again later.');
                  }
            }
          } else{
            meetingDetails.meetingDate = meetingDate;
            try{
              await API.graphql(graphqlOperation(createMeeting, { input: meetingDetails }));
              console.log(`Created meeting: ${meetingDetails.meetingName} on ${meetingDetails.meetingDate}`);
            } catch (error) {
              console.log('Error creating meeting:', error);
              Alert.alert('Error creating meeting. Please try again later.');
            }
          }
          setMeetingName('');
          setDescription('');
          setMeetingDate(new Date());
          setIsRecurring(false);
          console.log(meetingName);
          console.log(description);
          console.log(meetingDate);
          console.log(isRecurring);
          navigation.popToTop();
        } catch (error) {
          console.log('Error adding meeting:', error);
          Alert.alert('Error adding meeting. Please try again later.');
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
                value={meetingName}
                onChangeText={(text) => setMeetingName(text)}
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
                value = {isRecurring}
                style = {styles.input}
                checked={isRecurring}
                onPress={() => setIsRecurring(!isRecurring)}
            />
        </View>
        <View style = {styles.inputContainer}>
            <CheckBox 
                title = "Is This Meeting Multiple Days Per Week?"
                value = {isMultiDay}
                style = {styles.input}
                checked={isMultiDay}
                onPress={() => setIsMultiDay(!isMultiDay)}
            />
        </View>
    
        <TouchableOpacity onPress={() => setIsDatePickerVisible(true)} style={styles.button}>
          <Text style={styles.buttonText}>Set Meeting Date</Text>
          <Text style={styles.deadlineText}>{formatDate(meetingDate)}, {formatTime(meetingDate)}</Text>
        </TouchableOpacity>
    
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirmDatePicker}
          onCancel={handleCancelDatePicker}
          minimumDate={new Date()}
        />
          <TouchableOpacity onPress={handleAddMeeting} style={styles.addButton}>
            <Text style={styles.buttonText}>Add Meeting</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReturn} style={styles.addButton}>
            <Text style={styles.buttonText}>Return to Schedule</Text>
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
        marginTop: 10,
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