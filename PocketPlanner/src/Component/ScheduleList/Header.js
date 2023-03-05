import React, { useState } from "react";
import { Button, TouchableOpacity, Text, StyleSheet, Modal, View, FlatList } from "react-native";
import styled from "styled-components";

const options = ["All", "Today", "Next 7 Days", "Next 30 Days"]; // example date options

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(options[0]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setIsModalOpen(false);
  };

  return (
    <ComponentContainer>

      <HeaderText>Schedule</HeaderText>

      <TouchableOpacity onPress={handleOpenModal}>
        <Text style={styles.dateStyle}> {selectedDate} </Text>
      </TouchableOpacity>

      <Modal 
      visible={isModalOpen} 
      animationType="fade"
      transparent = {true}
      >
        <View style={styles.modalView}>
          <FlatList
            data={options}
            renderItem={({ item }) => (

              <TouchableOpacity
                style={styles.optionContainer}
                onPress={() => handleSelectDate(item)}
              >
                <Text style={styles.optionStyle}>{item}</Text>
              </TouchableOpacity>
            )}

            keyExtractor={(item) => item}

          />
          <TouchableOpacity onPress={handleCloseModal} style={styles.button}> 
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          
        </View>
      </Modal>

    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  height: 100px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center
`;

const HeaderText = styled.Text`
  color: black;
  font-size: 30px;
  margin-top: 70px
`;

const styles = StyleSheet.create({
  dateStyle: {
    color: '#b22222',
    fontSize: 20,
    marginTop: 10,
    marginRight: 7,
  },
  modalView: {
    marginTop: 180,
    margin: 55,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    paddingVertical: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  optionContainer: {
    padding: 10,
  },
  optionStyle: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#B0C4DE',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
