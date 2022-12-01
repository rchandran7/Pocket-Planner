import React, { useState } from 'react';
import { View, StatusBar, FlatList} from 'react-native';
import styled from 'styled-components';
import AddInput from '../Component/ScheduleList/AddInput';
import TodoList from '../Component/ScheduleList/TodoList';
import Header from '../Component/ScheduleList/Header';
import Empty from '../Component/ScheduleList/Empty';

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const submitHandler = (value) => {
    setData((prevTodo) => {
      return [
        {
          value: value,
          key: Math.random().toString(),
        },
        ...prevTodo,
      ];
    });
  };
  const deleteItem = (key) => {
    setData((prevTodo) => {
      return prevTodo.filter((todo) => todo.key != key);
    });
  };
    return (
      <ComponentContainer>
        <View>
          <StatusBar barStyle="light-content" 
            backgroundColor="#B0C4DE" />
        </View>

        <View>
          <FlatList
            data = {data}
            ListHeaderComponent = {() => <Header />}
            ListEmptyComponent = {() => <Empty />}
            keyExtractor = {(item) => item.key}
            renderItem = {({item}) => (
              <TodoList item = {item} deleteItem = {deleteItem} />
            )}
          />
          <View>
            <AddInput submitHandler={submitHandler} />
          </View>
        </View>
      </ComponentContainer>
    );
}

  
const ComponentContainer = styled.View`
  background-color: #B0C4DE;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;