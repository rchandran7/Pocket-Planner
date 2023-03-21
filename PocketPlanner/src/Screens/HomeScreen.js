import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { tasksByUserID, listUsers, meetingsByUserID } from '../graphql/queries';
import { deleteTask, updateMeeting, updateTask, deleteMeeting } from '../graphql/mutations';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';
import Header from '../Component/ScheduleList/Header';
import AddInput from '../Component/ScheduleList/AddInput';
import CalendarView from './Calendar';
import {CheckBox} from "react-native-elements";

const TaskList = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [isEmpty, setIsEmpty] = useState(tasks.length === 0 && meetings.length === 0);
  const [selectedOption, setSelectedOption] = useState("All");
  const [cutoffDate, setCutoffDate] = useState(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1); // add 1 to the current year
    return date;
  });
  // initial cutoff date is today

  const handleOptionChange = (selectedOption) => {
    let daysToAdd = 365;
    switch (selectedOption) {
      case "All":
        break;
      case "Today":
        daysToAdd = 0;
        break;
      case "Next 7 Days":
        daysToAdd = 7;
        break;
      case "Next 30 Days":
        daysToAdd = 30;
        break;
      case "Calendar View":
        setSelectedOption("Calendar View");
        return;
      default:
        break;
    }
    const newCutoffDate = new Date();
    console.log(newCutoffDate.setDate(newCutoffDate.getDate()))
    newCutoffDate.setDate(newCutoffDate.getDate() + daysToAdd);
    setCutoffDate(newCutoffDate);
    setSelectedOption(selectedOption);
  };

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

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const meetingData = await API.graphql(graphqlOperation(meetingsByUserID, { userID: user.id }));
        const meetings = meetingData.data.meetingsByUserID.items;
        setMeetings(meetings);
      } catch (err) {
        console.log('Error fetching meetings:', err);
      }
    };
  
    if (user) {
      fetchMeetings();
    }
  }, [user, meetings]);

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
              setTasks(tasks.filter((t) => t !== task));
            } catch (error) {
              console.log('Error deleting task:', error);
            }
          },
        },
      ]
    );
  }, [setTasks]);
  
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
              setMeetings(meetings.filter((t) => t !== meeting));
            } catch (error) {
              console.log('Error deleting meeting:', error);
            }
          },
        },
      ]
    );
  }, [setMeetings]);

  

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
              await API.graphql(graphqlOperation(updateTask, { input: { id: task.id, completed: !task.completed } }));
            } catch (error) {
              console.log('Error updating task:', error);
            }
          },
        },
      ]
    );
  }
  const handleConfirmMeeting = (task) => {
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
              await API.graphql(graphqlOperation(updateMeeting, { input: { id: task.id, completed: !task.completed } }));
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
  useEffect(() => {
    setIsEmpty(tasks.length === 0 && meetings.length === 0);
  }, [tasks, meetings]);

  if (isEmpty) {
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
  const today = new Date();

  if (selectedOption == "Calendar View") {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Header onOptionChange={handleOptionChange}/>
          </View>
          <View style={styles.addInputContainer}>
            <AddInput/>
          </View>
        </View>
        <CalendarContainer>
         <CalendarView tasks={tasks} />
        </CalendarContainer>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Header onOptionChange={handleOptionChange}/>
        </View>
        <View style={styles.addInputContainer}>
          <AddInput/>
        </View>
      </View>
      <ListContainer>
        <ScrollView contentContainerStyle={styles.taskListContainer}>

        {[...tasks, ...meetings]
    .filter(item => (!item.deadline || new Date(item.deadline) <= cutoffDate) && (!item.meetingDate || new Date(item.meetingDate) <= cutoffDate))
    .sort((a, b) => {
      const aTime = new Date(a.deadline || a.meetingDate);
      const bTime = new Date(b.deadline || b.meetingDate);
      return aTime - bTime;
    })
    .map((item) => (
      <TouchableOpacity 
        key={item.id} 
        onPress={() => {
          if (item.meetingDate) {
            handleConfirmMeeting(item);
          } else {
            handleConfirmTask(item);
          }
        }}
        style={[
          styles.taskItem,
          item.completed ? styles.taskItemCompleted : styles.taskItem,
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.taskName}>{item.name}</Text>
          {item.description && (
            <Text style={styles.taskDescription}>{item.description}</Text>
          )}
        </View>
        {item.deadline && (
          <View style={styles.taskDeadline}>
            <Text style={styles.taskDate}>{formatDate(item.deadline)}</Text>
            <Text style={styles.taskTime}>{formatTime(item.deadline)}</Text>
          </View>
        )}
        {item.meetingDate && (
          <View style={styles.taskDeadline}>
            <Text style={styles.taskDate}>{formatDate(item.meetingDate)}</Text>
            <Text style={styles.taskTime}>{formatTime(item.meetingDate)}</Text>
          </View>
        )}
        <CheckBox
          value={item.completed}
          checked={item.completed}
          style={styles.checkbox}
          onPress={() => {
            if (item.meetingDate) {
              handleConfirmMeeting(item);
            } else {
              handleConfirmTask(item);
            }
          }}
        />
        <TouchableOpacity onPress={() => {
            if (item.meetingDate) {
              handleDeleteMeeting(item);
            } else {
              handleDeleteTask(item);
            }
          }}>
          <Icon name="times" color="red" size={20} />
        </TouchableOpacity>

      </TouchableOpacity>
    ))
  }

        </ScrollView>
      </ListContainer>
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    marginTop: 20,
  },
  header: {
    flex: 1,
  },
  addInputContainer: {
    alignItems: 'flex-end',
    paddingRight: 8,
    flex: 1,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    width: '100%',
  }
});
const ComponentContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  height: 825px;
`;
const ListContainer = styled.View`
  height: 700px;
`;
const CalendarContainer = styled.View`
  height: 375px;
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