import { Board, Player } from "../contexts/GameContext";
import { randomMove, limitedMinimax, minimaxMove } from "../services/aiService";

export const useAI = (level: "iniciante" | "intermediario" | "avancado") => {
  const computeMove = (board: Board, player: Player): number => {
    switch (level) {
      case "iniciante":
        return randomMove(board);
      case "intermediario":
        return limitedMinimax(board, player, 2);
      case "avancado":
        return minimaxMove(board, player);
    }
  };
  return { computeMove };
};
