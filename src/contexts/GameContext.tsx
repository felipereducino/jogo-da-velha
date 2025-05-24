import React, { createContext, useState, useContext, ReactNode } from "react";

export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[];

interface GameState {
  board: Board;
  turn: Player;
  level: "iniciante" | "intermediario" | "avancado";
  score: { wins: number; losses: number };
  makeMove: (index: number) => void;
  reset: () => void;
}

interface GameProviderProps {
  children: ReactNode;
}

const GameContext = createContext<GameState | undefined>(undefined);

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>("X");
  const [level, setLevel] = useState<GameState["level"]>("iniciante");
  const [score, setScore] = useState<GameState["score"]>({
    wins: 0,
    losses: 0,
  });

  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
  };

  const makeMove = (idx: number) => {
    // lógica de jogada e chamada ao serviço de IA
  };

  return (
    <GameContext.Provider
      value={{ board, turn, level, score, makeMove, reset }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame deve ser usado dentro de GameProvider");
  return ctx;
};
