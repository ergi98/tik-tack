import { CELL_COUNT, MINIMAX, MOVES } from "./constants";
import { checkForWinner } from "./helpers";
import type { GameState, PositionScoreProps } from "./types";

// x - maximizes 1
// o - minimizes -1
// draw - 0

const getBestMoveFromPosition = (
  gameState: GameState
): { x: number; y: number } => {
  let x;
  let y;

  let currentScore = Infinity;

  const clone = new Map(gameState);

  for (let i = 0; i < CELL_COUNT; i++) {
    for (let j = 0; j < CELL_COUNT; j++) {
      const key = `${i}${j}`;
      if (!clone.get(key)) {
        clone.set(key, MOVES.CIRCLE);
        const score = getPositionScore({
          x: i,
          y: j,
          state: clone,
          isMaximizing: true,
        });
        clone.delete(key);
        if (score < currentScore) {
          currentScore = score;
          x = i;
          y = j;
        }
      }
    }
  }

  return { x: x!, y: y! };
};

const getPositionScore = (props: PositionScoreProps): number => {
  const { x, y, state, isMaximizing } = props;

  const { winner } = checkForWinner({
    x,
    y,
    state,
    // Here if the function is called with isMaximizing
    // It means that the previous move was a CIRCLE
    move: isMaximizing ? MOVES.CIRCLE : MOVES.CROSS,
  });
  const noMoreMoves = state.size === Math.pow(CELL_COUNT, 2);

  if (winner) {
    return MINIMAX[winner];
  }
  if (noMoreMoves) {
    return 0;
  }

  let bestScore = isMaximizing ? -Infinity : Infinity;

  if (isMaximizing) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const key = `${i}${j}`;
        if (!state.get(key)) {
          state.set(key, MOVES.CROSS);
          const score = getPositionScore({
            x: i,
            y: j,
            state,
            isMaximizing: false,
          });
          state.delete(key);
          bestScore = Math.max(score, bestScore);
        }
      }
    }
  } else {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const key = `${i}${j}`;
        if (!state.get(key)) {
          state.set(key, MOVES.CIRCLE);
          const score = getPositionScore({
            x: i,
            y: j,
            state,
            isMaximizing: true,
          });
          state.delete(key);
          bestScore = Math.min(score, bestScore);
        }
      }
    }
  }

  return bestScore;
};

export { getBestMoveFromPosition };
