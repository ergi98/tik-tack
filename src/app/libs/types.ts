import { MOVES, OUTCOMES } from "./constants";
import type { AnimationDefinition } from "framer-motion";

type Move = keyof typeof MOVES;

type Outcome = keyof typeof OUTCOMES;

type ScoreState = {
  [key in Move]: number;
};

type GameState = Map<string, Move>;

type AnnouncerStateProps = {
  show: boolean;
  winner?: Move;
  outcome?: Outcome;
};

type LineProps = {
  order: number;
  vertical?: boolean;
  size: number | string;
  onAnimationComplete: (order: number) => void;
};

type MoveProps = {
  input: Move;
};

type GameScoreProps = {
  score: ScoreState;
};

type CellProps = {
  move?: Move;
  row: number;
  col: number;
  isDisabled: boolean;
  onClick: (a: number, b: number) => void;
  onLineAnimationComplete: (order: number) => void;
};

type CheckWinnerProps = {
  x: number;
  y: number;
  move: Move;
  state: GameState;
};

export type {
  Move,
  Outcome,
  GameState,
  MoveProps,
  LineProps,
  CellProps,
  ScoreState,
  GameScoreProps,
  CheckWinnerProps,
  AnnouncerStateProps,
};
