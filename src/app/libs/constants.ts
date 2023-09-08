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

const DEFAULT_SCORE_STATE = Object.freeze({
  [MOVES.CIRCLE]: 0,
  [MOVES.CROSS]: 0,
});

export { CELL_COUNT, CELL_SIZE, BOARD, MOVES, OUTCOMES, DEFAULT_SCORE_STATE };
