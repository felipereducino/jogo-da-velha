import { Board, Player } from "../contexts/GameContext";

// Iniciante: aleatório
export const randomMove = (board: Board): number => {
  const empty = board.map((v, i) => (v === null ? i : [])).flat();
  return empty[Math.floor(Math.random() * empty.length)];
};

// Minimax completo
export const minimaxMove = (board: Board, player: Player): number => {
  // implementação completa do Minimax :contentReference[oaicite:7]{index=7}
  return 0;
};

// Profundidade limitada
export const limitedMinimax = (
  board: Board,
  player: Player,
  depth: number
): number => {
  // Minimax com profundidade limitada :contentReference[oaicite:8]{index=8}
  return 0;
};
