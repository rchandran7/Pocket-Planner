import React, { useState, useCallback} from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { tasksByUserID, meetingsByUserID } from '../../graphql/queries';
import { deleteTask, updateMeeting, updateTask, deleteMeeting } from '../../graphql/mutations';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function GroupSchedule({route}) {
  
    const [groupTasks, setGroupTasks] = useState([]);
    const [groupMeetings, setGroupMeetings] = useState([]);


    const {id} = route.params;
  const navigation = useNavigation();
  const handleAddTask = (id) => {
    navigation.navigate('AddGroupTask', {id: id});
  }
  const handleGoBack = () => {
    navigation.pop();
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
  
  const handleDeleteTask = useCallback(async (task) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete the task "${task.name}"?`,
      [
        {
          text: 'Cancel',
          style: 'default',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await API.graphql(graphqlOperation(deleteTask, { input: { id: task.id } }));
  
              const newGroupTasks = groupTasks.filter((t) => t !== task).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  
              setGroupTasks(newGroupTasks);
            } catch (error) {
              console.log('Error deleting task:', error);
            }
          },
        },
      ]
    );
  }, [groupTasks, setGroupTasks]);
  
  
  const handleDeleteMeeting = useCallback(async (meeting) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete the meeting "${meeting.name}"?`,
      [
        {
          text: 'Cancel',
          style: 'default',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await API.graphql(graphqlOperation(deleteMeeting, { input: { id: meeting.id } }));
              const newGroupMeetings= groupMeetings.filter((t) => t !== meeting).sort((a, b) => new Date(a.meetingDate) - new Date(b.meetingDate));
              setGroupMeetings(newGroupMeetings);
            } catch (error) {
              console.log('Error deleting meeting:', error);
            }
          },
        },
      ]
    );
  }, [groupMeetings, setGroupMeetings]);

  const handleConfirmTask = (task) => {
    if (!task.id) {
      console.log('Error confirming task: Task ID is null or undefined');
      return;
    }
  
    const message = `Are you sure you want to mark "${task.name}" as ${
      task.completed ? "incompleted" : "completed"
    }?`;
  
    Alert.alert(
      task.completed ? "Mark Incompleted" : "Mark Completed",
      message,
      [
        {
          text: 'Cancel',
          style: 'destructive',
        },
        {
          text: 'Confirm',
          style: 'default',
          onPress: async () => {
            try {
              const updatedTask = await API.graphql(graphqlOperation(updateTask, { input: { id: task.id, completed: !task.completed } }));
              const updatedTasks = groupTasks.map(m => {
                if (m.id === updatedTask.data.updateTask.id) {
                  return updatedTask.data.updateTask;
                } else {
                  return m;
                }
              });
              setGroupTasks(updatedTasks);
            } catch (error) {
              console.log('Error updating meeting:', error);
            }
          },
        },
      ]
    );
  }

  const handleConfirmMeeting = (meeting) => {
    if (!meeting.id) {
      console.log('Error confirming meeting: Meeting ID is null or undefined');
      return;
    }
  
    const message = `Are you sure you want to mark "${meeting.name}" as ${
      meeting.completed ? "incompleted" : "completed"
    }?`;
  
    Alert.alert(
      meeting.completed ? "Mark Incompleted" : "Mark Completed",
      message,
      [
        {
          text: 'Cancel',
          style: 'destructive',
        },
        {
          text: 'Confirm',
          style: 'default',
          onPress: async () => {
            try {
              const updatedMeeting = await API.graphql(graphqlOperation(updateMeeting, { input: { id: meeting.id, completed: !meeting.completed } }));
              const updatedMeetings = groupMeetings.map(m => {
                if (m.id === updatedMeeting.data.updateMeeting.id) {
                  return updatedMeeting.data.updateMeeting;
                } else {
                  return m;
                }
              });
              setGroupMeetings(updatedMeetings);
            } catch (error) {
              console.log('Error updating meeting:', error);
            }
          },
        },
      ]
    );
  }
  
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

    } catch (err) {
      console.log('error fetching tasks and meetings', err);
    }
  };
  const allItems = [...groupTasks, ...groupMeetings];
      const sortedItems = allItems.sort((a, b) => {
        const aDate = a.meetingDate || a.deadline;
        const bDate = b.meetingDate || b.deadline;
        return new Date(aDate) - new Date(bDate);
        });


  const renderItem = ({ item }) => {
    if (item.meetingDate) {
      return (
        <TouchableOpacity 
        onPress={() => handleConfirmMeeting(item)}
          style={[
            styles.taskItem,
            item.completed ? styles.taskItemCompleted : styles.taskItem,
          ]}
        >
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.subText}>{item.description}</Text>
          <Text style={styles.dateText}> {formatDate(item.meetingDate)} </Text>

          <TouchableOpacity onPress={() => handleDeleteMeeting(item)}>
          <Icon name="times" color="red" size={20} />
        </TouchableOpacity>

        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity 
          onPress={() => handleConfirmTask(item)}
          style={[
            styles.taskItem,
            item.completed ? styles.taskItemCompleted : styles.taskItem,
          ]}
        >
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.subText}>{item.description}</Text>
          <Text style={styles.dateText}> {formatDate(item.deadline)} </Text>
          <TouchableOpacity onPress={() => handleDeleteTask(item)}>
          <Icon name="times" color="red" size={20} />
        </TouchableOpacity>
        </TouchableOpacity>
      );
    }
  };

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        <FlatList
            data={sortedItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.joinButton} onPress={() => handleAddTask(id)}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.joinButton} onPress={() => handleAddMeeting(id)}>
            <Text style={styles.buttonText}>Add Meeting</Text>
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
  backButton: {
    backgroundColor: '#B0C4DE',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
  },
});