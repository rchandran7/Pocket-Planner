import React from 'react';
import { View } from 'react-native';
import { Calendar as BigCalendar } from 'react-native-big-calendar';

const TaskCalendar = ({ tasks }) => {
  const events = tasks.map((task) => ({
    title: task.title,
    startDate: new Date(task.date),
    endDate: new Date(task.date),
    summary: task.description,
  }));

  return (
    <View style={{ flex: 1 }}>
      <BigCalendar
        events={events}
        height={500}
        mode="week"
        scrollToNow
        showTime
        step={60}
        startAccessor="startDate"
        endAccessor="endDate"
        eventCellStyle={{ opacity: 1 }}
        timeFormat="h:mm A"
        eventTimeFormat="h:mm A"
        monthFormat="MMMM yyyy"
        dayFormat="dddd, MMMM D"
        date={new Date()}
        onDateChange={(date) => console.log('selected date:', date)}
        onPressEvent={(event) => console.log('event pressed:', event)}
      />
    </View>
  );
};

export default TaskCalendar;
