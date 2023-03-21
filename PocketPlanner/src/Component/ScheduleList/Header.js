import React, { useState } from "react";
import { TouchableWithoutFeedback, TouchableOpacity, Text, StyleSheet, Modal, View, FlatList } from "react-native";
import styled from "styled-components";
 // example date options

export default function Header({ onOptionChange }) {
  const options = ["All", "Today", "Next 7 Days", "Next 30 Days", "Calendar View"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(options[0]);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOptionPress = (option) => {
    setSelectedDate(option);
    onOptionChange(option);
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
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View>
            <View style={styles.modalView}>
              <FlatList
                data={options}
                renderItem={({ item }) => (

                  <TouchableOpacity
                    style={styles.optionContainer}
                    onPress={() => handleOptionPress(item)}
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
          </View>
        </TouchableWithoutFeedback>
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
  font-weight: bold;
  font-size: 30px;
  margin-top: 70px
`;

const styles = StyleSheet.create({
  dateStyle: {
    color: '#b22222',
    fontSize: 18,
    marginTop: 10,
    marginRight: 7,
    borderColor: '#C8C8C8',
    borderWidth: 1,
    padding: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
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
  sortButton: {
    borderColor: '#B0C4DE',
    borderRadius: 10,
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
