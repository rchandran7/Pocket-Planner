import React, { useState } from 'react';
import { TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import CustomButton from '../CustomButton/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

export default function AddInput({submitHandler}) {
  const navigation = useNavigation();
  return (
    <PlusButton onPress={()=>navigation.navigate("AddTask")}>
     <ButtonContainer>
         <AntDesign name = "pluscircle" size = {50}/>
     </ButtonContainer>
    </PlusButton>
  );
}

const PlusButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
`;