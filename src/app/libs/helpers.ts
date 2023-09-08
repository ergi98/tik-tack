import { CELL_COUNT, MOVES, COLORS } from "./constants";
import type { CheckWinnerProps, GameState, Move } from "./types";

const checkRow = ({
  x,
  move,
  state,
  cells,
}: Omit<CheckWinnerProps, "y"> & { cells: string[] }) => {
  let temp = 0;
  for (let i = 0; i < CELL_COUNT; i++) {
    if (state.get(`${x}${i}`) === move) {
      cells.push(`${x}${i}`);
      temp++;
    }
  }
  if (temp !== CELL_COUNT) {
    cells.splice(0, cells.length);
  } else {
    return move;
  }
};

const checkCol = ({
  y,
  move,
  state,
  cells,
}: Omit<CheckWinnerProps, "x"> & { cells: string[] }) => {
  let temp = 0;
  for (let i = 0; i < CELL_COUNT; i++) {
    if (state.get(`${i}${y}`) === move) {
      cells.push(`${i}${y}`);
      temp++;
    }
  }
  if (temp !== CELL_COUNT) {
    cells.splice(0, cells.length);
  } else {
    return move;
  }
};

const checkDiag = ({
  move,
  state,
  cells,
}: Omit<CheckWinnerProps, "x" | "y"> & { cells: string[] }) => {
  let temp = 0;
  for (let i = 0, j = 0; i < CELL_COUNT && j < CELL_COUNT; i++, j++) {
    if (state.get(`${i}${j}`) === move) {
      cells.push(`${i}${j}`);
      temp++;
    }
  }
  if (temp !== CELL_COUNT) {
    cells.splice(0, cells.length);
  } else {
    return move;
  }
};

const checkAntiDiag = ({
  move,
  state,
  cells,
}: Omit<CheckWinnerProps, "x" | "y"> & {
  cells: string[];
}) => {
  let temp = 0;
  for (let i = 0, j = CELL_COUNT - 1; i < CELL_COUNT && j >= 0; i++, j--) {
    if (state.get(`${i}${j}`) === move) {
      cells.push(`${i}${j}`);
      temp++;
    }
  }
  if (temp !== CELL_COUNT) {
    cells.splice(0, cells.length);
  } else {
    return move;
  }
};

const checkForWinner = ({ x, y, state, move }: CheckWinnerProps) => {
  const cells: string[] = [];
  let winner: Move | undefined = undefined;
  winner = checkRow({ x, move, state, cells });
  if (!winner) {
    winner = checkCol({ y, move, state, cells });
  }
  if (!winner && y === x) {
    winner = checkDiag({ state, move, cells });
  }
  if (!winner && y === -1 * x + CELL_COUNT - 1) {
    winner = checkAntiDiag({ move, state, cells });
  }

  return { winner, cells };
};

const getNextMove = (currState: GameState) => {
  const lastMove = Array.from(currState.values()).at(-1);
  return lastMove === MOVES.CROSS ? MOVES.CIRCLE : MOVES.CROSS;
};

const getMoveColor = (move?: Move) => COLORS[move ?? MOVES.CROSS];

export { checkForWinner, getNextMove, getMoveColor };
