import { DEFAULT_SCORE_STATE, MOVES, OPPONENTS, OUTCOMES } from "./constants";

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
  onLineAnimationComplete: (order: number) => void;
};

type Opponent = keyof typeof OPPONENTS;

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

type TurnIndicatorProps = {
  state: GameState;
};

type OpponentSelectorProps = {
  playerId?: string;
  opponent: Opponent;
  onChange: (a: Opponent) => void;
};

type PositionScoreProps = {
  x: number;
  y: number;
  state: GameState;
  isMaximizing: boolean;
};

type OnlineDialogProps = {
  isOpen: boolean;
  playerId: string;
  onClose: () => void;
};

type MainScreenProps = {
  playerId?: string;
};

type ScoreKey = keyof typeof DEFAULT_SCORE_STATE;

export type {
  Move,
  Outcome,
  Opponent,
  ScoreKey,
  GameState,
  MoveProps,
  LineProps,
  CellProps,
  ScoreState,
  GameScoreProps,
  MainScreenProps,
  CheckWinnerProps,
  OnlineDialogProps,
  PositionScoreProps,
  TurnIndicatorProps,
  AnnouncerStateProps,
  OpponentSelectorProps,
};
