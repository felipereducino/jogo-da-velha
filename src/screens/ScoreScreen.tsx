import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { storageService } from "../services/storageService";

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const ScoreScreen: React.FC = () => {
  const [score, setScore] = useState({ wins: 0, losses: 0 });
  useEffect(() => {
    storageService.loadScore().then(setScore);
  }, []);
  return (
    <Container>
      <Text>Vitórias: {score.wins}</Text>
      <Text>Derrotas: {score.losses}</Text>
    </Container>
  );
};
