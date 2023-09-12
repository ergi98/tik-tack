const GET_BOARD = (count: number) => {
  const temp: number[][] = [];

  for (let i = 0; i < count; i++) {
    temp[i] = [];
    for (let j = count * i; j < count * (i + 1); j++) {
      temp[i].push(j);
    }
  }

  return temp;
};

const CELL_COUNT = 3;

const CELL_SIZE = 96;

const BOARD = Object.freeze(GET_BOARD(CELL_COUNT));

const MOVES = Object.freeze({
  CIRCLE: "CIRCLE",
  CROSS: "CROSS",
});

const OUTCOMES = Object.freeze({
  WIN: "WIN",
  DRAW: "DRAW",
});

const OPPONENTS = Object.freeze({
  PVP: "PVP",
  PVC: "PVC",
  // ONLINE: "ONLINE",
});

const DEFAULT_SCORE_STATE = Object.freeze({
  [MOVES.CIRCLE]: 0,
  [MOVES.CROSS]: 0,
});

const COLORS = Object.freeze({
  [MOVES.CIRCLE]: "text-neutral-300",
  [MOVES.CROSS]: "text-neutral-500",
});

const COLORS_HEX = Object.freeze({
  [MOVES.CIRCLE]: "#d4d4d4",
  [MOVES.CROSS]: "#737373",
});

const MINIMAX = Object.freeze({
  [MOVES.CIRCLE]: -1,
  [MOVES.CROSS]: 1,
});

export {
  BOARD,
  MOVES,
  COLORS,
  MINIMAX,
  OUTCOMES,
  OPPONENTS,
  CELL_SIZE,
  CELL_COUNT,
  COLORS_HEX,
  DEFAULT_SCORE_STATE,
};
