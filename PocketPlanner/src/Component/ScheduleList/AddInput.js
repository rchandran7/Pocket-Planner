import React, { useState } from 'react';
import { StyleSheet, View, Modal, Alert} from 'react-native';
import styled from 'styled-components';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function AddInput({submitHandler}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [classModalVisible, setClassModalVisible] = useState(false);
  const [addClassModalVisible, setAddClassModalVisible] = useState(false);
  const [assignmentModalVisible, setAssignmentModalVisible] = useState(false);
  const [meetingModalVisible, setMeetingModalVisible] = useState(false);
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
          <ClassButton onPress={()=> setClassModalVisible(true)}>
            <TextClass>Create Class</TextClass>
          </ClassButton>
          <AddClassButton onPress={()=>setAddClassModalVisible(true)}>
            <TextAddClass>Add Class</TextAddClass>
          </AddClassButton>
          <AssignmentButton onPress={()=>setAssignmentModalVisible(true)}>
            <TextAssignment>Add Assignment</TextAssignment>
          </AssignmentButton>
          <MeetingButton onPress={()=>setMeetingModalVisible(true)}>
            <TextMeeting>Add Meeting</TextMeeting>
          </MeetingButton>
        </View>
        <Modal
          animationType="fade"
          transparent = {true}
          visible = {classModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setClassModalVisible(!classModalVisible);
          }}>
          <View style = {styles.classModalView}>
            <CloseModalsButton onPress={()=>{setModalVisible(!modalVisible); setClassModalVisible(!classModalVisible)}}>
              <TextClassModal>Temp: Create class modal here</TextClassModal>
            </CloseModalsButton>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent = {true}
          visible = {addClassModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setAddClassModalVisible(!addClassModalVisible);
          }}>
          <View style = {styles.addClassModalView}>
            <CloseModalsButton onPress={()=>{setModalVisible(!modalVisible); setAddClassModalVisible(!addClassModalVisible)}}>
              <TextClassModal>Temp: Add class modal Here</TextClassModal>
            </CloseModalsButton>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent = {true}
          visible = {assignmentModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setAssigmentModalVisible(!assignmentModalVisible);
          }}>
          <View style = {styles.assignmentModalView}>
            <CloseModalsButton onPress={()=>{setModalVisible(!modalVisible); setAssignmentModalVisible(!assignmentModalVisible)}}>
              <TextClassModal>Temp: Add assignment modal here</TextClassModal>
            </CloseModalsButton>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent = {true}
          visible = {meetingModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setAssigmentModalVisible(!meetingModalVisible);
          }}>
          <View style = {styles.meetingModalView}>
            <CloseModalsButton onPress={()=>{setModalVisible(!modalVisible); setMeetingModalVisible(!meetingModalVisible)}}>
              <TextClassModal>Temp: Add meeting modal here</TextClassModal>
            </CloseModalsButton>
          </View>
        </Modal>
      </Modal>
      <PlusButton onPress={()=>setModalVisible(true)}>
        <ButtonContainer>
          <AntDesign name = "pluscircle" size = {50} color = "#B0C4DE"/>
        </ButtonContainer>
      </PlusButton>
    </View>
  );
};


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
  classModalView: {
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
  addClassModalView: {
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
  assignmentModalView: {
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
  meetingModalView: {
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
const TextClassModal = styled.Text`
  text-align: center;
  font-size: 25px;
  color: #FF4500;
`;

const  CloseModalsButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;