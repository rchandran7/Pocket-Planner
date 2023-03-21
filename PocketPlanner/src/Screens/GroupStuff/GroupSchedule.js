import React, { useState} from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { tasksByUserID, meetingsByUserID } from '../../graphql/queries';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GroupSchedule({route}) {
  
    const [groupTasks, setGroupTasks] = useState([]);
    const [groupMeetings, setGroupMeetings] = useState([]);
    const {id} = route.params;
  const navigation = useNavigation();
  const handleAddTask = (id) => {
    navigation.navigate('AddGroupTask', {id: id});
  }
  const handleAddMeeting = (id) => {
    navigation.navigate('AddGroupMeeting', {id: id});
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );
  

  const fetchTasks = async () => {
    try {
      const taskData = await API.graphql(graphqlOperation(tasksByUserID, {userID: id}));
      const meetingData = await API.graphql(graphqlOperation(meetingsByUserID, {userID: id}));
  
      const tasks = taskData.data.tasksByUserID.items;
      const meetings = meetingData.data.meetingsByUserID.items;
  
      const sortedTasks = tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      const sortedMeetings = meetings.sort((a, b) => new Date(a.meetingDate) - new Date(b.meetingDate));
  
      setGroupTasks(sortedTasks);
      setGroupMeetings(sortedMeetings);
      console.log(groupTasks);
      //console.log(groupMeetings);
    } catch (err) {
      console.log('error fetching tasks and meetings', err);
    }
  };

  const renderItem = ({ item }) => {
    if (item.meetingDate) {
      return (
        <TouchableOpacity 
          onPress={() => console.log(item)}
          style={[
            styles.taskItem,
            item.completed ? styles.taskItemCompleted : styles.taskItem,
          ]}
        >
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.subText}>{item.description}</Text>
          <Text style={styles.dateText}> {formatDate(item.meetingDate)} </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity 
          onPress={() => console.log(item)}
          style={[
            styles.taskItem,
            item.completed ? styles.taskItemCompleted : styles.taskItem,
          ]}
        >
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.subText}>{item.description}</Text>
          <Text style={styles.dateText}> {formatDate(item.deadline)} </Text>
        </TouchableOpacity>
      );
    }
  };

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
            data={[...groupTasks, ...groupMeetings]}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.joinButton} onPress={() => handleAddTask(id)}>
            <Text style={styles.createText}>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.joinButton} onPress={() => handleAddMeeting(id)}>
            <Text style={styles.createText}>Add Meeting</Text>
          </TouchableOpacity>
        </View>
        
      </SafeAreaView>
      
    );
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupListContainer: {
    paddingVertical: 15,
    paddingHorizontal: 8,
  },
  taskItem: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  createButton: {
    backgroundColor: '#B0C4DE',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '49%',
  },
  joinButton: {
    backgroundColor: '#B0C4DE',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '49%',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subText: {
    fontSize: 14,
  },
});