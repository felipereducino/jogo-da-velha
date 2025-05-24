import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.85);
`;

const Title = styled.Text`
  font-size: 32px;
  color: #0074d9;
  margin-bottom: 20px;
`;

const Button = styled.TouchableOpacity`
  background-color: #002546;
  padding: 12px 24px;
  border-radius: 16px;
  margin: 8px;
  align-items: center;
  width: 300px;
  height: 80px;
  display: flex;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 32px;
  font-weight: bold;
`;

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <Container>
    <Image source={require("../assets/logo.png")} />

    <Button onPress={() => navigation.navigate("Game")}>
      <ButtonText>Jogar Agora</ButtonText>
    </Button>
  </Container>
);
