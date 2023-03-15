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
    //const [multiDay, setMultiDay] = useState(new Array().fill(false));
    const [weekdays, setWeekdays] = useState([false, false, false, false, false, false, false]);
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
    
      const selectedDays = weekdays.reduce((acc, curr, index) => {
        if (curr) {
          acc.push(index);
        }
        return acc;
      }, []);
    
      if (selectedDays.length === 0) {
        Alert.alert('Please select at least one day of the week.');
        return;
      }
    
      const meetingDetails = {
        meetingName,
        description,
        isRecurring,
        category: '', // add a category property if needed
        userID: user.id,
      };
    
      if (isRecurring) {
        const recurringMeetingDetails = selectedDays.map((day) => {
          const recurringMeetingDate = new Date(meetingDate.getTime() + day * 24 * 60 * 60 * 1000);
          return {
            ...meetingDetails,
            meetingDate: recurringMeetingDate,
          };
        });
    
        try {
          await Promise.all(
            recurringMeetingDetails.map((meeting) =>
              API.graphql(graphqlOperation(createMeeting, { input: meeting }))
            )
          );
          console.log('Created recurring meetings:', recurringMeetingDetails);
        } catch (error) {
          console.log('Error creating recurring meetings:', error);
          Alert.alert('Error creating recurring meetings. Please try again later.');
        }
      } else {
        meetingDetails.meetingDate = meetingDate;
        try {
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
      setWeekDays([false, false, false, false, false, false, false]);
    
      navigation.popToTop();
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
                title = "Monday"
                //value = {false}
                style = {styles.input}
                checked = {weekdays[0]}
                onPress={() => {
                  const newWeekdays = [...weekdays]; // create a copy of the array
                  newWeekdays[0] = !newWeekdays[0]; // toggle the value
                  setWeekdays(newWeekdays); // update the state with the new array
                }}
            />
            <CheckBox 
                title = "Tuesday"
                //value = {weekdays[1]}
                style = {styles.input}
                checked = {weekdays[1]}
                onPress={() => {
                  const newWeekdays = [...weekdays]; 
                  newWeekdays[1] = !newWeekdays[1]; 
                  setWeekdays(newWeekdays); 
                }}
            />
            <CheckBox 
                title = "Wednesday"
                //value = {weekdays[2]}
                style = {styles.input}
                checked = {weekdays[2]}
                onPress={() => {
                  const newWeekdays = [...weekdays]; 
                  newWeekdays[2] = !newWeekdays[2];
                  setWeekdays(newWeekdays); 
                }}
            />
            <CheckBox 
                title = "Thursday"
                //value = {weekdays[3]}
                style = {styles.input}
                checked = {weekdays[3]}
                onPress={() => {
                  const newWeekdays = [...weekdays]; 
                  newWeekdays[3] = !newWeekdays[3]; 
                  setWeekdays(newWeekdays); 
                }}
            />
            <CheckBox 
                title = "Friday"
                //value = {weekdays[4]}
                style = {styles.input}
                checked = {weekdays[4]}
                onPress={() => {
                  const newWeekdays = [...weekdays]; 
                  newWeekdays[4] = !newWeekdays[4];
                  setWeekdays(newWeekdays); 
                }}
            />
            <CheckBox 
                title = "Saturday"
                //value = {weekdays[5]}
                style = {styles.input}
                checked = {weekdays[5]}
                onPress={() => {
                  const newWeekdays = [...weekdays]; 
                  newWeekdays[5] = !newWeekdays[5]; 
                  setWeekdays(newWeekdays); 
                }}
            />
            <CheckBox 
                title = "Sunday"
                //value = {weekdays[6]}
                style = {styles.input}
                checked = {weekdays[6]}
                onPress={() => {
                  const newWeekdays = [...weekdays]; 
                  newWeekdays[6] = !newWeekdays[6]; 
                  setWeekdays(newWeekdays); 
                }}
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