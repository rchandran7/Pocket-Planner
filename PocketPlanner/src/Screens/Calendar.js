import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';

import { API, graphqlOperation } from 'aws-amplify';
import { tasksByUserID, listUsers, listTasks } from '../graphql/queries';
import { deleteTask, updateTask } from '../graphql/mutations';

import styled from 'styled-components';
import TaskList from './HomeScreen';

var datesObj = {
  date: '',
  periods: [
      {startingDay: true, endingDay: true, color: '#ffa500'},
      {color: 'transparent'},
      {startingDay: false, endingDay: true, color: '#f0e68c'}
    ]
};

const datesArr = [];

let markedDay = {};

export default function CalendarView() {

  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All");
  const [cutoffDate, setCutoffDate] = useState(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1); // add 1 to the current year
    return date;
  });

  const fetchUserAndTasks = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(listUsers));
      setUser(userData.data.listUsers.items[0]);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserAndTasks();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskData = await API.graphql(graphqlOperation(tasksByUserID, { userID: user.id }));
        const tasks = taskData.data.tasksByUserID.items;
        setTasks(tasks);
      } catch (err) {
        console.log('Error fetching tasks:', err);
      }
    };
  
    if (user) {
      fetchTasks();
    }
  }, [user, tasks]);

  const dates = tasks.reduce((dates, task) => {
    //console.log(task.deadline.substring(0,10));
    markedDay[task.deadline.substring(0,10)] = {
      periods: [
        //{startingDay: true, endingDay: false, color: '#5f9ea0'},
        {startingDay: true, endingDay: true, color: '#ffa500'},
        //{startingDay: true, endingDay: false, color: '#f0e68c'}
      ]
    };
  }, {}); 

  const refreshTasks = async () => {
    try {
      const taskData = await API.graphql(graphqlOperation(tasksByUserID, { userID: user.id }));
      const tasks = taskData.data.tasksByUserID.items;
      setTasks(tasks);
      console.log("refreshing tasks");
    } catch (err) {
      console.log('Error fetching tasks:', err);
    }
  };

  return (

    <View style={styles.container}>

    <Calendar
  markingType="multi-period"
  style={styles.containerItem}
  markedDates = {markedDay}
/*   markedDates={{
    '2023-03-14': {
      periods: [
        {startingDay: true, endingDay: false, color: '#5f9ea0'},
        {startingDay: true, endingDay: true, color: '#ffa500'},
        {startingDay: true, endingDay: false, color: '#f0e68c'}
      ]
    },
    '2023-03-15': {
      periods: [
        {startingDay: false, endingDay: true, color: '#5f9ea0'},
        {color: 'transparent'},
        {selected: true, endingDay: false, color: '#f0e68c'}
      ]
    },
    '2023-03-16': {
      periods: [
        {startingDay: true, endingDay: true, color: '#ffa500'},
        {color: 'transparent'},
        {startingDay: false, endingDay: true, color: '#f0e68c'}
      ]
    }
  }} */
/>
<TouchableOpacity onPress={() => refreshTasks} style={{ marginLeft: 10 }}>
      <Icon name="times" color="red" size={50} />
</TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '0%',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  containerItem: {
    minHeight: '0%',
    minWidth: '100%',
  },
});