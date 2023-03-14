import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { createTask } from '../graphql/mutations';
import { getUser, listUsers } from '../graphql/queries';
import CalendarPicker from 'react-native-calendar-picker';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const AddTaskForm = () => {
   
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date());
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


  const handleAddTask = async () => {
    if (!name || !description) {
      Alert.alert('Please enter a task name and description.');
      return;
    }
    try {
      const taskDetails = {
        name,
        description,
        deadline: deadline,
        category: '', // add a category property if needed
        completed: false,
        userID: user.id,
      };
      await API.graphql(graphqlOperation(createTask, { input: taskDetails }));
      setName('');
      setDescription('');
      setDeadline(new Date());
      console.log(name);
      console.log(description);
      console.log(deadline);
      navigation.popToTop();
    } catch (error) {
      console.log('Error adding task:', error);
      Alert.alert('Error adding task. Please try again later.');
    }
  };
  const handleConfirmDatePicker = (date) => {
    setDeadline(date);
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
          placeholder="Enter task name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Task Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task description"
          value={description}
          onChangeText={(text) => setDescription(text)}
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
        <TouchableOpacity onPress={handleReturn} style={styles.addButton}>
            <Text style={styles.buttonText}>Return to Schedule</Text>
          </TouchableOpacity>
    </View>
  );
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
  });
  

  export default AddTaskForm;
  