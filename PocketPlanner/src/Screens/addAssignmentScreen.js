import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  DatePickerIOS,
  Button,
  StyleSheet,
} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { createTask } from '../graphql/mutations';
import { getUser, listUsers } from '../graphql/queries';
import CalendarPicker from 'react-native-calendar-picker';

const AddTaskForm = () => {
   
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date());

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await API.graphql(graphqlOperation(listUsers));
        setUser(userData.data.listUsers.items[0]);
        console.log(userData.data.listUsers.items[0]);
        console.log(user.id);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []);

  const handleAddTask = async () => {
    try {
      const taskDetails = {
        name,
        description,
        deadline,
        category: '', // add a category property if needed
        completed: false,
        userID: userId,
      };
      await API.graphql(graphqlOperation(createTask, { input: taskDetails }));
      setName('');
      setDescription('');
      setDeadline(new Date());
      console.log(name);
      console.log(description);
      console.log(deadline);
    } catch (error) {
      console.log('Error adding task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter task description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <CalendarPicker
        onDateChange={(date) => setDeadline(date)}
        selectedStartDate={deadline}
        minDate={new Date()}
      />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
});

export default AddTaskForm;
