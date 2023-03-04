import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, CheckBox } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { tasksByUserID, listUsers } from '../graphql/queries';
import { deleteTask } from '../graphql/mutations';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';


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

  return (
    <ScrollView contentContainerStyle={styles.taskListContainer}>
      {tasks.map((task) => (
        <View key={task.id} style={styles.taskItem}>
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
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginTop: 45,
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
});

export default TaskList;