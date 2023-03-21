import React, { useState, useEffect } from 'react';
import { Button, TextInput, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {CheckBox} from "react-native-elements";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { createMeeting } from '../graphql/mutations';
import { listUsers } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { AWSDate } from '@aws-amplify/core';
import { useNavigation } from '@react-navigation/native';


const AddMeetingForm = () => {

  const navigation = useNavigation();

  const [isMeetingRecurring, setIsMeetingRecurring] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [meetingTime, setMeetingTime] = useState(new Date());
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [description, setDescription] = useState('');

  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [includeSundays, setIncludeSundays] = useState(false);
  const [includeMondays, setIncludeMondays] = useState(false);
  const [includeTuesdays, setIncludeTuesdays] = useState(false);
  const [includeWednesdays, setIncludeWednesdays] = useState(false);
  const [includeThursdays, setIncludeThursdays] = useState(false);
  const [includeFridays, setIncludeFridays] = useState(false);
  const [includeSaturdays, setIncludeSaturdays] = useState(false);
  
  // Functions to show/hide the date pickers
  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };
  
  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };
  
  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };
  
  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };
  
  // Functions to handle selecting a date
  const handleStartDateConfirm = (date) => {
    setStartDate(date); // Save date in YYYY-MM-DD format
    hideStartDatePicker();
  };
  
  const handleEndDateConfirm = (date) => {
    setEndDate(date); // Save date in YYYY-MM-DD format
    hideEndDatePicker();
  };
  const handleCheckboxChange = () => {
    setIsMeetingRecurring(!isMeetingRecurring);
    setIsDatePickerVisible(false); // Hide the date picker when the checkbox is checked/unchecked
  };

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

  const handleConfirmDatePicker = (date) => {
    setMeetingTime(date);
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

  const handleReturn = () =>{
    navigation.pop();
  }
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() < 12 ? 'AM' : 'PM';
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleRecurringMeeting = async () => {
    try {
      const dates = [];
      let currentDate =  new Date(startDate.getTime());
      console.log(currentDate);
      while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getUTCDay();
        if ((dayOfWeek === 0 && includeSundays) || (dayOfWeek === 1 && includeMondays) || (dayOfWeek === 2 && includeTuesdays) || (dayOfWeek === 3 && includeWednesdays) || (dayOfWeek === 4 && includeThursdays) || (dayOfWeek === 5 && includeFridays) || (dayOfWeek === 6 && includeSaturdays)) {
          dates.push(new Date(currentDate.getTime())); 
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
      for (const thisDate of dates) {
        const input = {
          name,
          description,
          meetingDate: thisDate,
          userID: user.id, // replace with actual user ID
          isRecurring: true,
          completed: false,
        };
        const result = await API.graphql(graphqlOperation(createMeeting, { input }));
        console.log('Created meeting:', result.data.createMeeting);
      }
      navigation.pop();
      // handle successful creation here, e.g. navigate to another screen
    } catch (error) {
      console.error('Error creating meeting:', error);
      // handle error here, e.g. show error message to user
    }
  };
  
  const handleSingleMeeting = async () => {
    try {
      const input = {
        name,
        description,
        meetingDate: meetingTime,
        userID: user.id, // replace with actual user ID
        isRecurring: false,
        completed: false,
      };
      const result = await API.graphql(graphqlOperation(createMeeting, { input }));
      console.log('Created meeting:', result.data.createMeeting);
      navigation.pop();
      // handle successful creation here, e.g. navigate to another screen
    } catch (error) {
      console.error('Error creating meeting:', error);
      // handle error here, e.g. show error message to user
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Meeting Name"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Meeting Description"
      />


    <CheckBox
      checked={isMeetingRecurring}
      onPress={handleCheckboxChange}
      title="Is Meeting Recurring"
      containerStyle={styles.checkboxContainer}
      textStyle={styles.checkboxText}
    />

    {isMeetingRecurring ? (

    <View>
      <TouchableOpacity onPress={showStartDatePicker} style={styles.button}>
          <Text style={styles.buttonText}>Start Date and Meeting Time</Text>
          <Text style={styles.deadlineText}>{formatDate(startDate)}, {formatTime(startDate)}</Text>
        </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="datetime"
        onConfirm={handleStartDateConfirm}
        onCancel={hideStartDatePicker}
        minimumDate={new Date()}
      />
      
      <TouchableOpacity onPress={showEndDatePicker} style={styles.button}>
          <Text style={styles.buttonText}>End Date</Text>
          <Text style={styles.deadlineText}>{formatDate(endDate)}</Text>
        </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="datetime"
        onConfirm={handleEndDateConfirm}
        onCancel={hideEndDatePicker}
        minimumDate={new Date()}
      />
      <CheckBox
        title='Sunday'
        checked={includeSundays}
        onPress={() => setIncludeSundays(!includeSundays)}
      />
      <CheckBox
        title='Monday'
        checked={includeMondays}
        onPress={() => setIncludeMondays(!includeMondays)}
      />
      <CheckBox
        title='Tuesday'
        checked={includeTuesdays}
        onPress={() => setIncludeTuesdays(!includeTuesdays)}
      />
      <CheckBox
        title='Wednesday'
        checked={includeWednesdays}
        onPress={() => setIncludeWednesdays(!includeWednesdays)}
      />
      <CheckBox
        title='Thursday'
        checked={includeThursdays}
        onPress={() => setIncludeThursdays(!includeThursdays)}
      />
      <CheckBox
        title='Friday'
        checked={includeFridays}
        onPress={() => setIncludeFridays(!includeFridays)}
      />
      <CheckBox
        title='Saturday'
        checked={includeSaturdays}
        onPress={() => setIncludeSaturdays(!includeSaturdays)}
      />

      <TouchableOpacity onPress={handleRecurringMeeting} style={styles.button}>
        <Text style={styles.buttonText}>Create Meetings</Text>
      </TouchableOpacity>

    </View>
      
    ) : (
      <View>

        <TouchableOpacity onPress={() => setIsDatePickerVisible(true)} style={styles.button}>
          <Text style={styles.buttonText}>Set Meeting Date and Time</Text>
          <Text style={styles.deadlineText}>{formatDate(meetingTime)}, {formatTime(meetingTime)}</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={handleSingleMeeting} style={styles.button}>
          <Text style={styles.buttonText}>Create Meeting</Text>
        </TouchableOpacity>

      </View>
    )}

    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="datetime"
      onConfirm={handleConfirmDatePicker}
      onCancel={handleCancelDatePicker}
      minimumDate={new Date()}
    />

    <TouchableOpacity onPress={handleReturn} style={styles.button}>
      <Text style={styles.buttonText}>Return to Schedule</Text>
    </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#B0C4DE',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
});

export default AddMeetingForm;
