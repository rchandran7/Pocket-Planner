import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, Alert, Pressable} from 'react-native';
import styled from 'styled-components';
import CustomButton from '../CustomButton/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

export default function AddInput({submitHandler}) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent = {true}
        visible = {modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style = {styles.modalView}>
          <ClassButton onPress={()=>setModalVisible(!modalVisible)}>
            <TextClass>Create Class</TextClass>
          </ClassButton>
          <AddClassButton onPress={()=>setModalVisible(!modalVisible)}>
            <TextAddClass>Add Class</TextAddClass>
          </AddClassButton>
          <AssignmentButton onPress={()=>setModalVisible(!modalVisible)}>
            <TextAssignment>Add Assignment</TextAssignment>
          </AssignmentButton>
          <MeetingButton onPress={()=>setModalVisible(!modalVisible)}>
            <TextMeeting>Add Meeting</TextMeeting>
          </MeetingButton>
        </View>
      </Modal>
      <PlusButton onPress={()=>setModalVisible(true)}>
        <ButtonContainer>
          <AntDesign name = "pluscircle" size = {50} color = "#B0C4DE"/>
        </ButtonContainer>
      </PlusButton>
    </View>
  );
}


const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    marginTop: 110,
    margin: 55,
    backgroundColor: '#B0C4DE',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
const PlusButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
`;
const ClassButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
const TextClass = styled.Text`
  text-align: center;
  font-size: 25px;
  color: #FF4500;
`;
const TextAssignment = styled.Text`
  text-align: center;
  font-size: 25px;
  color: #FF4500;
`;
const AssignmentButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding-top: 50px;
`;
const AddClassButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
const TextAddClass = styled.Text`
  text-align: center;
  font-size: 25px;
  padding-top: 50px;
  color: #FF4500;
`;
const MeetingButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
const TextMeeting = styled.Text`
  text-align: center;
  font-size: 25px;
  padding-top: 50px;
  color: #FF4500;
`;