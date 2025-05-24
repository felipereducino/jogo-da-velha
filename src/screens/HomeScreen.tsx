import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 32px;
  color: #0074d9;
  margin-bottom: 20px;
`;

const Button = styled.TouchableOpacity`
  background-color: #7fdbff;
  padding: 12px 24px;
  border-radius: 8px;
  margin: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <Container>
    <Image source={require("../assets/logo.png")} />

    <Title>Jogo da Velha</Title>

    <Button onPress={() => navigation.navigate("Game")}>
      <ButtonText>Jogar Agora</ButtonText>
    </Button>
  </Container>
);
