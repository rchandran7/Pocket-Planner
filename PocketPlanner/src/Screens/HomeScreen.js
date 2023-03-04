import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { tasksByUserID, listUsers } from '../graphql/queries';
import { deleteTask } from '../graphql/mutations';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';
import Header from '../Component/ScheduleList/Header';
import AddInput from '../Component/ScheduleList/AddInput';

const TaskList = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  
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
  


  const handleDeleteTask = (task) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete the task "${task.name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await API.graphql(graphqlOperation(deleteTask, { input: { id: task.id } }));
              setTasks(tasks.filter((t) => t !== task));
            } catch (error) {
              console.log('Error deleting task:', error);
            }
          },
        },
      ]
    );
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
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleTimeString('en-US', options);
  };

  if (tasks.length === 0) {
    return (
      <ComponentContainer>
        <EmptyImage
          source={require("../../assets/Schedule-Transparent-Background.png")}
        />
        <EmptyText>Nothing scheduled!</EmptyText>
        <AddInput />
      </ComponentContainer>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.taskListContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Header/>
        </View>
        <View style={styles.addInputContainer}>
          <AddInput/>
        </View>
      </View>
      {tasks.map((task, index) => (
        <View key={task.id} style={[styles.taskItem, index === 0 && { marginTop: 40 }]}>
            <View>
              <Text style={styles.taskName}>{task.name}</Text>
              {task.description && (
                <Text style={styles.taskDescription}>{task.description}</Text>
              )}
            </View>
          {task.deadline && (
            <View style={styles.taskDeadline}>
              <Text style={styles.taskDate}>{formatDate(task.deadline)}</Text>
              <Text style={styles.taskTime}>{formatTime(task.deadline)}</Text>
            </View>
          )}
          <TouchableOpacity onPress={() => handleDeleteTask(task)}>
            <Icon name="times" color="red" size={20} />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );  
};

const styles = StyleSheet.create({
  taskListContainer: {
    paddingVertical: 15,
    paddingHorizontal: 8,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#B0C4DE',
    borderRadius: 8,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: 'gray',
  },
  taskDeadline: {
    alignItems: 'flex-end',
  },
  taskDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskTime: {
    fontSize: 12,
    color: 'gray',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  header: {
    flex: 1,
  },
  addInputContainer: {
    alignItems: 'flex-end',
    paddingRight: 8,
    flex: 1,
  },
});
const ComponentContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  height: 825px;
`;

const EmptyImage = styled.Image`
  width: 350px;
  height: 350px;
`;

const EmptyText = styled.Text`
  color: black;
  margin-top: 30px;
  font-size: 30px;
`;

export default TaskList;