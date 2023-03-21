import React, { useState } from 'react';
import { StyleSheet, View, Modal, Alert, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function AddInput({submitHandler}) {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent = {true}
        visible = {modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback onPress={()=>{setModalVisible(!modalVisible)}}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center' }}>
            <View style = {styles.modalView}>
              <AssignmentButton onPress={()=>{navigation.navigate("addAssignment"); setModalVisible(!modalVisible)}}>
                <TextAssignment>Add Assignment</TextAssignment>
              </AssignmentButton>
              <MeetingButton onPress={()=>{navigation.navigate("addMeeting"); setModalVisible(!modalVisible)}}>
                <TextMeeting>Add Meeting</TextMeeting>
              </MeetingButton>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <PlusButton onPress={()=>setModalVisible(true)}>
        <ButtonContainer>
          <AntDesign name = "pluscircle" size = {55} color = "#B0C4DE"/>
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
    marginTop: 250,
    margin: 55,
    backgroundColor: '#f0f8ff',
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
  margin-top: 75px;
  margin-right: 20px;
`;

const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
const TextAssignment = styled.Text`
  text-align: center;
  font-size: 25px;
  color: #b22222;
`;
const AssignmentButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding-top: 5px;
`;
const MeetingButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding-bottom: 5px;
`;
const TextMeeting = styled.Text`
  text-align: center;
  font-size: 25px;
  padding-top: 50px;
  color: #b22222;
`;