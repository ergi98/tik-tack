const BOARD = Object.freeze([
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
]);

const CELL_SIZE = 96;

const CELL_COUNT = BOARD.length;

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
