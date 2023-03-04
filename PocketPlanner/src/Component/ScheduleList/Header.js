import React from "react";
import styled from "styled-components";

var day = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
let today = month + '/' + day + '/' + year;

export default function Header() {
  return (
    <ComponentContainer>
      <HeaderText>Schedule</HeaderText>
      <HeaderList>{today}</HeaderList>
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

const HeaderList = styled.Text`
  color: #b22222;
  font-size: 20px;
  margin-right: 7px;
  margin-top: 10px;
`;