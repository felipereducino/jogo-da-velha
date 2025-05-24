import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Cell } from "./Cell";
import { useGame } from "../contexts/GameContext";

const Grid = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  width: 300px;
`;

export const Board: React.FC = () => {
  const { board, makeMove } = useGame();
  return (
    <Grid>
      {board.map((v, i) => (
        <Cell key={i} value={v} onPress={() => makeMove(i)} />
      ))}
    </Grid>
  );
};
