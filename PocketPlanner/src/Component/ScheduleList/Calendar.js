import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarView = ({tasks}) => {
  const [selectedDate, setSelectedDate] = useState('');

  const markedDates = tasks.reduce((obj, task) => {
    obj[task.deadline] = {
      marked: true,
      dotColor: 'blue'
    };
    return obj;
  }, {});

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        markingType={'simple'}
        markedDates={markedDates}
        onDayPress={onDayPress}
      />
      {selectedDate && (
        <View style={styles.taskList}>
          {tasks
            .filter((task) => task.date === selectedDate)
            .map((task) => (
              <View key={task.id} style={styles.task}>
                  <Text style={styles.taskTitle}>{task.name}</Text>
                  <Text style={styles.taskDescription}>{task.description}</Text>
                  <Text style={styles.taskTime}>{formatTime(task.deadline)}</Text>
              </View>
            ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 110,
  },
  taskList: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  task: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default CalendarView;
