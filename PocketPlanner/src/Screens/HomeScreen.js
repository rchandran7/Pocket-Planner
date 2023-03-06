import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import TaskList from '../Component/ScheduleList/TaskList';
import TaskCalendar from '../Component/ScheduleList/CalendarView';

const HomeScreen = ({ tasks }) => {
  const [isCalendarView, setIsCalendarView] = useState(false);

  const handleViewChange = () => {
    setIsCalendarView(!isCalendarView);
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <TouchableOpacity onPress={handleViewChange}>
          <Text>{isCalendarView ? 'List View' : 'Calendar View'}</Text>
        </TouchableOpacity>
      </View>
      {isCalendarView ? (
        <TaskCalendar tasks={tasks} />
      ) : (
        <TaskList tasks={tasks} />
      )}
    </View>
  );
};

export default HomeScreen;