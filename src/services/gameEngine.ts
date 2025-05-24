export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[];

/** Todas as combinações vencedoras (índices do array de 9 células) */
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

/** Cria um tabuleiro vazio */
export function createBoard(): Board {
  return Array<Cell>(9).fill(null);
}

/** Retorna o próximo jogador */
export function nextPlayer(current: Player): Player {
  return current === "X" ? "O" : "X";
}

/**
 * Tenta fazer uma jogada em `index`.
 * Lança erro se a célula já estiver ocupada ou se o jogo já tiver terminado.
 * Retorna um novo Board imutável.
 */
export function makeMove(board: Board, index: number, player: Player): Board {
  if (index < 0 || index > 8) {
    throw new Error("Index inválido");
  }
  if (board[index] !== null) {
    throw new Error("Célula já ocupada");
  }
  if (getResult(board) !== null) {
    throw new Error("Jogo já terminado");
  }
  const next = board.slice();
  next[index] = player;
  return next;
}

/**
 * Verifica vencedor ou empate:
 * - Retorna "X" ou "O" se alguém venceu
 * - Retorna "Tie" se todas as células estiverem cheias e não há vencedor
 * - Retorna null se o jogo ainda está em andamento
 */
export function getResult(board: Board): Player | "Tie" | null {
  // busca linha vencedora
  for (const [a, b, c] of winningCombos) {
    const v = board[a];
    if (v && v === board[b] && v === board[c]) {
      return v;
    }
  }
  // se não há células vazias → empate
  if (board.every((cell) => cell !== null)) {
    return "Tie";
  }
  // ainda rolando
  return null;
}
