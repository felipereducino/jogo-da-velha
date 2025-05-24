// src/screens/GameScreen.tsx

import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  Animated,
  Image,
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
const CELL_SIZE = width / 3 - 12; // smaller to allow padding

// —— Styled-components ——
const Container = styled.View`
  flex: 1;
  background-color: #0f0f0f;
  align-items: center;
  justify-content: center;
`;

const StatusText = styled.Text`
  font-size: 22px;
  margin-bottom: 16px;
  color: #00e5ff;
  text-shadow: 0 0 8px #00e5ff;
`;

const BoardContainer = styled.View`
  background-color: #1a1a1a;
  padding: 6px;
  border-radius: 16px;
  border: 2px solid #ff3c78;
  margin-bottom: 24px;
  shadow-color: #ff3c78;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.7;
  shadow-radius: 12px;
  elevation: 10;
`;

const Row = styled.View`
  flex-direction: row;
`;

const CellButton = styled(TouchableOpacity)`
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  margin: 3px;
  border: 2px solid #00e5ff;
  border-radius: 8px;
  background-color: #111;
  align-items: center;
  justify-content: center;
  shadow-color: #00e5ff;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.9;
  shadow-radius: 6px;
  elevation: 8;
`;

const CellText = styled.Text`
  font-size: 36px;
  color: #ff3c78;
  text-shadow: 0 0 6px #ff3c78;
`;

const ResetButton = styled(TouchableOpacity)`
  margin-top: 16px;
  background-color: #ff3c78;
  padding: 12px 32px;
  border-radius: 12px;
  shadow-color: #ff3c78;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.8;
  shadow-radius: 6px;
  elevation: 8;
`;

const ResetText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 0 0 4px #000;
`;

// —— Modal Styled-Components —— (keeping your gamer style)
const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.85);
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.View`
  width: 80%;
  background-color: #1a1a1a;
  border: 2px solid #00e5ff;
  border-radius: 16px;
  padding: 24px;
  align-items: center;
  shadow-color: #00e5ff;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.8;
  shadow-radius: 12px;
  elevation: 12;
`;

const ModalTitle = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #00e5ff;
  text-shadow: 0 0 8px #00e5ff;
  text-align: center;
`;

const ModalImage = styled(Image)`
  width: 180px;
  height: 180px;
  margin-bottom: 12px;
`;

const ModalButton = styled(TouchableOpacity)`
  margin-top: 12px;
  background-color: #ff3c78;
  padding: 12px 28px;
  border-radius: 10px;
  shadow-color: #ff3c78;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.8;
  shadow-radius: 6px;
  elevation: 8;
`;

const ModalButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-shadow: 0 0 4px #000;
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

  // 1. Determine flags up‐front
  const isTie = result === "Tie";
  const isWin = result === "X" || result === "O";
  const showModal = isTie || isWin;

  // 2. Choose message & image
  let message = "";
  let banner: any = null;

  if (isTie) {
    message = "EMPATE!";
    banner = require("../assets/tie-banner.png");
  } else if (isWin) {
    // if X, you win; if O, you lose
    message = result === "X" ? "VOCÊ VENCEU!" : "VOCÊ PERDEU!";
    banner = require("../assets/winner-banner.png");
  }

  return (
    <Container>
      <StatusText>{result ? message : `Turno: ${turn}`}</StatusText>

      {/* Board */}
      <BoardContainer>
        {[0, 1, 2].map((r) => (
          <Row key={r}>
            {[0, 1, 2].map((c) => {
              const idx = r * 3 + c;
              return (
                <CellButton key={idx} onPress={() => handlePress(idx)}>
                  <CellText>{board[idx]}</CellText>
                </CellButton>
              );
            })}
          </Row>
        ))}
      </BoardContainer>

      <ResetButton onPress={handleReset}>
        <ResetText>Reiniciar</ResetText>
      </ResetButton>

      {/* Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={handleReset}
      >
        <Overlay>
          <ModalContainer>
            {banner && <ModalImage source={banner} />}
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
