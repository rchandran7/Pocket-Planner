import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { listUsers, tasksByUserID } from '../graphql/queries';
import { useState, useEffect } from "react";
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import styled from "styled-components";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [overdueTasks, setOverdueTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [inProgTasks, setInProgTasks] = useState(0);
  
  
  
  useFocusEffect(
    React.useCallback(() => {
      const fetchUsers = async () => {
        try {
          const userData = await API.graphql(graphqlOperation(listUsers));
          setUser(userData.data.listUsers.items[0]); // assuming that you want to display the first user from the list
        } catch (e) {
          console.log(e);
        }
      }
      fetchUsers();
    }, [])
  );
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskData = await API.graphql(graphqlOperation(tasksByUserID, { userID: user.id }));
        const userTasks = taskData.data.tasksByUserID.items;
        setTasks(userTasks);
        const overdueTasks = userTasks.filter(task => {
          const deadline = new Date(task.deadline);
          return !task.completed && deadline < new Date();
        });
        const completedTasks = userTasks.filter(task => task.completed);
        const inProgressTasks = userTasks.length - overdueTasks.length - completedTasks.length;
        
        // Set the number of overdue tasks in state
        setOverdueTasks(overdueTasks.length);
        setCompletedTasks(completedTasks.length);
        setInProgTasks(inProgressTasks)
      } catch (e) {
        console.log(e);
      }
    }
    if (user) {
      fetchTasks();
    }
  }, [user]);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfo}>
      <Image
      source={{ uri: `https://${user.image.bucket}.s3.${user.image.region}.amazonaws.com/public/${user.image.key}?${Math.random()}` }}
      style={ styles.userImg }
      />

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.completeButton}>
          <Text style={styles.stats}>{completedTasks}</Text>
          <Text style={styles.statDescription}>Tasks Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inProgButton}>
          <Text style={styles.stats}>{inProgTasks}</Text>
          <Text style={styles.statDescription}>Tasks In Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.overdueButton}>
          <Text style={styles.stats}>{overdueTasks}</Text>
          <Text style={styles.statDescription}>Tasks Overdue</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfileScreen', { user })}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  stats: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
  completeButton: {
    backgroundColor: '#95D787',
    borderRadius: 10,
    padding: 5,
    width: '32%',
  },
  inProgButton: {
    backgroundColor: '#B0C4DE',
    borderRadius: 10,
    padding: 5,
    width: '32%',
  },
  overdueButton: {
    backgroundColor: '#F36C6C',
    borderRadius: 10,
    padding: 5,
    width: '32%',
  },
  userInfo: {
    alignItems: 'center'
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#000',
    marginTop: 20,
    marginBottom: 10
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 50,
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#B0C4DE',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  }
});
const ComponentContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 450px;
`;
const LogoImage = styled.Image`
  width: 200px;
  height: 200px;
`;