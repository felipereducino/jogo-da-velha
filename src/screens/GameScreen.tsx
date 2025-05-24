// src/screens/GameScreen.tsx

import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import styled from "styled-components/native";

// ——— Game engine (puro TS) ———
export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[];

const winningCombos: readonly [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

function createBoard(): Board {
  return Array(9).fill(null);
}
function nextPlayer(p: Player): Player {
  return p === "X" ? "O" : "X";
}
function makeMove(board: Board, idx: number, player: Player): Board {
  if (board[idx] != null || getResult(board)) throw new Error();
  const b = board.slice();
  b[idx] = player;
  return b as Board;
}
function getResult(board: Board): Player | "Tie" | null {
  for (const [a, b, c] of winningCombos) {
    const v = board[a];
    if (v && v === board[b] && v === board[c]) return v;
  }
  return board.every((c) => c != null) ? "Tie" : null;
}
// ————————————————————————

const { width } = Dimensions.get("window");
const CELL_SIZE = width / 3 - 2;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
const Row = styled.View`
  flex-direction: row;
`;
const CellButton = styled(TouchableOpacity)`
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  border: 1px solid #333;
  align-items: center;
  justify-content: center;
`;
const ResetButton = styled(TouchableOpacity)`
  margin-top: 24px;
  background-color: #0074d9;
  padding: 12px 32px;
  border-radius: 8px;
`;
const ResetText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
const StatusText = styled.Text`
  font-size: 20px;
  margin-bottom: 12px;
  color: #333;
`;

// —— Modal Styled-Components ——
const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
`;
const ModalContainer = styled.View`
  width: 80%;
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  align-items: center;
`;
const ModalTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #0074d9;
  text-align: center;
`;
const ModalButton = styled(TouchableOpacity)`
  margin-top: 8px;
  background-color: #0074d9;
  padding: 12px 24px;
  border-radius: 8px;
`;
const ModalButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const GameScreen: React.FC = () => {
  const [board, setBoard] = useState<Board>(createBoard());
  const [turn, setTurn] = useState<Player>("X");
  const result = getResult(board);

  const handlePress = (idx: number) => {
    if (result) return;
    try {
      const next = makeMove(board, idx, turn);
      setBoard(next);
      setTurn(nextPlayer(turn));
    } catch {
      return;
    }
  };
  const handleReset = () => {
    setBoard(createBoard());
    setTurn("X");
  };

  // Mensagem do modal
  let message = "";
  if (result === "Tie") message = "É um empate!";
  else if (result) message = `O vencedor é: ${result}`;

  return (
    <Container>
      <StatusText>{result ? message : `Vez de: ${turn}`}</StatusText>

      {/* Tabuleiro */}
      {[0, 1, 2].map((r) => (
        <Row key={r}>
          {[0, 1, 2].map((c) => {
            const idx = r * 3 + c;
            return (
              <CellButton key={idx} onPress={() => handlePress(idx)}>
                <Text style={styles.cellText}>{board[idx]}</Text>
              </CellButton>
            );
          })}
        </Row>
      ))}

      <ResetButton onPress={handleReset}>
        <ResetText>Reiniciar</ResetText>
      </ResetButton>

      {/* —— Modal —— */}
      <Modal
        visible={!!result}
        transparent
        animationType="fade"
        onRequestClose={handleReset}
      >
        <Overlay>
          <ModalContainer>
            <ModalTitle>{message}</ModalTitle>
            <ModalButton onPress={handleReset}>
              <ModalButtonText>Jogar Novamente</ModalButtonText>
            </ModalButton>
          </ModalContainer>
        </Overlay>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  cellText: {
    fontSize: 32,
    color: "#0074d9",
  },
});
