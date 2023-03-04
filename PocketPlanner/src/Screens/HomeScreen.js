import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { tasksByUserID, listUsers } from '../graphql/queries';
import { deleteTask, updateTask } from '../graphql/mutations';
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

  const handleConfirmCompleted = (task) => {
    if (!task.id) {
      console.log('Error confirming task: Task ID is null or undefined');
      return;
    }

    const message = `Are you sure you want to mark "${task.name}" as ${
      task.completed ? "incompleted" : "completed"
    }?`;

    Alert.alert(
      task.completed ? "Mark Task Incompleted" : "Mark Task Completed",
      message,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: async () => {
            try {
              await API.graphql(graphqlOperation(updateTask, { input: { id: task.id, completed: !task.completed } }));
            } catch (error) {
              console.log('Error updating task:', error);
            }
          },
        },
      ]
    );
    }
  

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

      {tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).map((task, index) => (

        <TouchableOpacity key={task.id} onPress={() => handleConfirmCompleted(task)} 
        style={[
          styles.taskItem,
          index === 0 && { marginTop: 40 },
          task.completed ? styles.taskItemCompleted : styles.taskItem,
        ]}
        >

            <View style={{ flex: 1 }}>
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

          <TouchableOpacity onPress={() => handleDeleteTask(task)} style={{ marginLeft: 10 }}>
            <Icon name="times" color="red" size={20} />
          </TouchableOpacity>

        </TouchableOpacity>

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
  taskItemCompleted: {
    backgroundColor: '#95D787', // green background for completed tasks
    borderColor: '#4B7642', // green border for completed tasks
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
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
    marginLeft: 10,
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