import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const tasks = [
  { id: '1', date: '2023-03-08', title: 'Task 1' },
  { id: '2', date: '2023-03-09', title: 'Task 2' },
  { id: '3', date: '2023-03-10', title: 'Task 3' },
];

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const markedDates = tasks.reduce((obj, task) => {
    obj[task.date] = { marked: true };
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
                <Text>{task.title}</Text>
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
