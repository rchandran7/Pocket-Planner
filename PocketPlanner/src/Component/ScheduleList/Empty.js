import React from "react";
import styled from "styled-components";

export default function Empty() {
    return (
        <ComponentContainer>
          <EmptyImage
            source={require("../../../assets/Schedule-Transparent-Background.png")}
          />
          <EmptyText>Nothing scheduled today!</EmptyText>
        </ComponentContainer>
      );
}

const ComponentContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  height: 570px;
`;

const EmptyImage = styled.Image`
  width: 350px;
  height: 350px;
`;

const EmptyText = styled.Text`
  color: black;
  margin-top: 30px;
  font-size: 30px;
`;