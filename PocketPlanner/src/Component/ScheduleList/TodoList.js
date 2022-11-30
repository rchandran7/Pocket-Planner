import React from "react";
import {View} from "react-native";
import styled from "styled-components";
import {Entypo} from "@expo/vector-icons";
import {MaterialIcons} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";

export default function TodoList({item, deleteItem}) {
  const changeIcon = () => {
    <AntDesign name = "checkcircle"/>
  }
    return (
        <ComponentContainer>
        <ListContainer>
          <CircleContainer onPress={() => changeIcon()}>
            <Entypo name="circle" size={20} color="#B0C4DE" />
          </CircleContainer>
          <View>
            <TextItem>{item.value}</TextItem>
            <TextDate>Task</TextDate>
          </View>
          <IconContainer onPress={() => deleteItem(item.key)}>
            <MaterialIcons name="delete" size={24} color="#B0C4DE" />
          </IconContainer>
        </ListContainer>
      </ComponentContainer>
    );
}

const ListContainer = styled.TouchableOpacity`
  background-color: #F8F8FF;
  height: auto;
  width: 350px;
  margin-bottom: 30px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`;

const TextItem = styled.Text`
  color: black;
  width: 260px;
  height: auto;
  font-size: 20px;
  margin-top: 10px;
  margin-right: 20px;
`;

const TextTask = styled.Text`
  color: #4169e1;
  font-size: 15px;
  margin-right: 20px;
  border-radius: 10px;
  width: 40px;
`;
const TextDate = styled.Text`
  color: #4169e1;
  font-size: 15px;
  margin-right: 20px;
  border-radius: 10px;
  width: 40px;
`;

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-top: 15px;
  height: 40px;
  border-radius: 10px;
`;

const CircleContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 5px;
`;