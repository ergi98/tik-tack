"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import {
  motion,
  useAnimate,
  usePresence,
  AnimatePresence,
  AnimationSequence,
} from "framer-motion";

import type {
  Move,
  CellProps,
  GameState,
  LineProps,
  MoveProps,
  GameScoreProps,
  TurnIndicatorProps,
} from "./libs/types";
import {
  BOARD,
  MOVES,
  CELL_SIZE,
  CELL_COUNT,
  DEFAULT_SCORE_STATE,
} from "./libs/constants";
import { checkForWinner, getNextMove, getMoveColor } from "./libs/helpers";

const Main = () => {
  const [isDisabled, setIsDisabled] = useState(true);

  const mainRef = useRef<HTMLDivElement>(null);

  const [gameState, setGameState] = useState<GameState>(new Map());

  const [score, setScore] = useState(DEFAULT_SCORE_STATE);
  const [scope, animate] = useAnimate();

  const animateWinningCells = (cells: string[]) => {
    setIsDisabled(true);
    animate(
      [
        cells.map((cell) => {
          return [
            `button.cell-${cell}`,
            { backgroundColor: "#404040" },
            {
              at: "<",
              duration: 0.3,
            },
          ];
        }) as AnimationSequence,
        cells.map((cell) => {
          return [
            `button.cell-${cell}`,
            {
              backgroundColor: "#0a0a0a",
            },
            { at: "<", duration: 0.3, delay: 0.45 },
          ];
        }) as AnimationSequence,
      ].flat(1)
    ).then(() => {
      setGameState(new Map());
      setIsDisabled(false);
    });
  };

  const animateScoreUpdate = (winner: Move) => {
    const selector = `${winner === MOVES.CIRCLE ? "circle" : "cross"}-score`;
    animate(`h3.${selector}`, {
      y: 12,
      opacity: 0,
    }).then(() => {
      flushSync(() => {
        setScore((prev) => {
          return {
            ...prev,
            [winner]: prev[winner] + 1,
          };
        });
      });
      animate([
        [`h3.${selector}`, { y: 0, opacity: 1 }],
        [`div.${selector}-wrapper`, { scale: 1.1 }],
        [`div.${selector}-wrapper`, { scale: 1 }],
      ]);
    });
  };

  const handleCellClick = (x: number, y: number) => {
    const mapKey = `${x}${y}`;
    const nextMove = getNextMove(gameState);
    flushSync(() => {
      setGameState((prev) => {
        if (!prev.get(mapKey)) prev.set(mapKey, nextMove);
        return new Map(prev);
      });
    });

    const noMoreMoves = gameState.size === Math.pow(CELL_COUNT, 2);

    const { winner, cells } = checkForWinner({
      x: x,
      y: y,
      move: nextMove,
      state: gameState,
    });

    if (winner) {
      animateScoreUpdate(winner);
      animateWinningCells(cells);
    } else if (noMoreMoves) {
      setGameState(new Map());
    }
  };

  const handleLineAnimationComplete = (order: number) =>
    order === CELL_COUNT - 2 && setIsDisabled(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    if (!mainRef.current) return;
    const height = window.innerHeight;
    mainRef.current.style.height = `${height}px`;
  };

  return (
    <main
      ref={mainRef}
      className="w-full"
      style={{ height: window.innerHeight }}
    >
      <section
        ref={scope}
        className="h-full flex flex-col items-center justify-between py-12"
      >
        {/* score */}
        <GameScore score={score} />
        {/* Board */}
        <div className="h-fit">
          {BOARD.map((row, i) => (
            <div key={i} className="flex relative">
              {row.map((cell, j) => (
                <Cell
                  row={i}
                  col={j}
                  key={cell}
                  isDisabled={isDisabled}
                  onClick={handleCellClick}
                  move={gameState.get(`${i}${j}`)}
                  onLineAnimationComplete={handleLineAnimationComplete}
                />
              ))}
            </div>
          ))}
        </div>
        {/* Move Indicator */}
        <TurnIndicator state={gameState} />
      </section>
    </main>
  );
};

export default Main;

const Line: React.FC<LineProps> = ({
  size,
  order,
  vertical,
  onAnimationComplete,
}) => {
  return (
    <motion.svg
      width={vertical ? 2 : size}
      height={vertical ? size : 2}
      style={{ strokeWidth: "4px" }}
      className="stroke-neutral-600"
      // Animations
      initial={{ strokeDasharray: 500, strokeDashoffset: 500 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 0.5, delay: order * 0.3 }}
      onAnimationComplete={() => onAnimationComplete(order)}
    >
      {vertical ? (
        <line x1="0" y1="0" x2="0" y2="100%" />
      ) : (
        <line x1="0" y1="0" x2="100%" y2="0" />
      )}
    </motion.svg>
  );
};

const Cross: React.FC = () => {
  return (
    <svg width="24" height="24" className="fill-current">
      <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" />
    </svg>
  );
};

const Circle: React.FC = () => {
  return (
    <svg width="24" height="24" className="fill-current">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
      />
    </svg>
  );
};

const Cell: React.FC<CellProps> = ({
  col,
  row,
  move,
  onClick,
  isDisabled,
  onLineAnimationComplete,
}) => {
  const handleClick = () => onClick(row, col);

  const showVerticalLine = col !== CELL_COUNT - 1 && row === 0;

  const showHorizontalLine = row !== CELL_COUNT - 1 && col === 0;

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`${getMoveColor(
        move
      )} cell-${row}${col} h-20 w-20 hover:bg-neutral-900/20 bg-neutral-950 flex items-center justify-center transition-colors rounded-lg cursor-pointer m-2 relative`}
    >
      {showVerticalLine && (
        <div className="absolute -right-2 -top-2">
          <Line
            vertical
            order={col + row}
            size={CELL_COUNT * CELL_SIZE}
            onAnimationComplete={onLineAnimationComplete}
          />
        </div>
      )}
      {showHorizontalLine && (
        <div className="absolute -bottom-2 -left-2">
          <Line
            order={col + row}
            size={CELL_COUNT * CELL_SIZE}
            onAnimationComplete={onLineAnimationComplete}
          />
        </div>
      )}
      <AnimatePresence>{move && <Move input={move!} />}</AnimatePresence>
    </button>
  );
};

const Move: React.FC<MoveProps> = ({ input }) => {
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(scope.current, { opacity: 1, scale: 1.1 });
      };
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animate(
          scope.current,
          { opacity: 1, scale: 1.75 },
          { duration: 0.35 }
        );
        await animate(
          scope.current,
          { opacity: 0, scale: 0 },
          { duration: 0.35 }
        );
        safeToRemove();
      };
      exitAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresent]);

  return (
    <div ref={scope} className="scale-0 opacity-0">
      {input === MOVES.CIRCLE ? <Circle /> : <Cross />}
    </div>
  );
};

const GameScore: React.FC<GameScoreProps> = ({ score }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex items-center p-4 gap-4 pointer-events-none select-none game-score"
    >
      <div
        className={`cross-score-wrapper flex gap-2 items-center ${getMoveColor(
          MOVES.CROSS
        )}`}
      >
        <motion.h3
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="score cross-score font-bold relative"
        >
          {score[MOVES.CROSS]}
        </motion.h3>
        <Cross />
      </div>
      <div
        className={`circle-score-wrapper flex gap-2 items-center ${getMoveColor(
          MOVES.CIRCLE
        )}`}
      >
        <motion.h3
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="score circle-score font-bold relative"
        >
          {score[MOVES.CIRCLE]}
        </motion.h3>
        <Circle />
      </div>
    </motion.div>
  );
};

const TurnIndicator: React.FC<TurnIndicatorProps> = ({ state }) => {
  const move = getNextMove(state);
  return (
    <motion.section
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="uppercase text-neutral-500 flex items-center text-lg"
    >
      To Play
      <motion.span
        initial={{ opacity: 0, x: -48 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center"
      >
        &nbsp;&minus;&nbsp;
        <span className={getMoveColor(move)}>
          {move === MOVES.CIRCLE ? <Circle /> : <Cross />}
        </span>
      </motion.span>
    </motion.section>
  );
};
