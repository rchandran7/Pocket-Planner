import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { tasksByUserID, listUsers } from '../graphql/queries';
import { useFocusEffect } from '@react-navigation/native';

const TaskList = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

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

  const fetchTasks = async () => {
    try {
      const taskData = await API.graphql(graphqlOperation(tasksByUserID, { userID: user.id }));
      const tasks = taskData.data.tasksByUserID.items;
      setTasks(tasks);
    } catch (err) {
      console.log('Error fetching tasks:', err);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // fetch tasks for the logged-in user
      fetchTasks();
    }, [])
  );

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
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  taskListContainer: {
    paddingVertical: 16,
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
});

export default TaskList;
