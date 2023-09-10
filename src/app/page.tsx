"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

import {
  motion,
  // animate,
  useAnimate,
  usePresence,
  // useTransform,
  // useMotionValue,
  AnimatePresence,
  AnimationSequence,
} from "framer-motion";

// import { interpolate } from "flubber";

import type {
  Move,
  Opponent,
  CellProps,
  GameState,
  LineProps,
  MoveProps,
  GameScoreProps,
  // TurnIndicatorProps,
} from "./libs/types";
import {
  BOARD,
  MOVES,
  OPPONENTS,
  CELL_SIZE,
  CELL_COUNT,
  // COLORS_HEX,
  DEFAULT_SCORE_STATE,
} from "./libs/constants";
import { checkForWinner, getNextMove, getMoveColor } from "./libs/helpers";
import { circlePath, crossPath } from "./libs/paths";

const Main = () => {
  const [isDisabled, setIsDisabled] = useState(true);

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
              backgroundColor: "#000000",
            },
            { at: "<", duration: 0.3, delay: 0.45 },
          ];
        }) as AnimationSequence,
      ].flat(1)
    ).then(() => setGameState(new Map()));
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

  const onCellExitComplete = () => isDisabled && setIsDisabled(false);

  const handleLineAnimationComplete = (order: number) =>
    order === CELL_COUNT - 2 && setIsDisabled(false);

  return (
    <main className="w-full h-full">
      <section
        ref={scope}
        className="h-full flex flex-col items-center p-4 landscape:flex-row landscape:justify-between relative"
      >
        {/* Menu */}
        {/* <GameMenu /> */}
        {/* Score */}
        <GameScore score={score} />
        {/* Board */}
        <div className="h-fit my-auto">
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
                  onExitComplete={onCellExitComplete}
                  onLineAnimationComplete={handleLineAnimationComplete}
                />
              ))}
            </div>
          ))}
        </div>
        {/* Move Indicator */}
        {/* <TurnIndicator state={gameState} /> */}
        {/* VersusSelector */}
        <OpponentSelector />
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
      <path fillRule="evenodd" clipRule="evenodd" d={crossPath} />
    </svg>
  );
};

const Circle: React.FC = () => {
  return (
    <svg width="24" height="24" className="fill-current">
      <path fillRule="evenodd" clipRule="evenodd" d={circlePath} />
    </svg>
  );
};

const Cell: React.FC<CellProps> = ({
  col,
  row,
  move,
  onClick,
  isDisabled,
  onExitComplete,
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
      )} cell-${row}${col} h-20 w-20 bg-black flex items-center justify-center transition-colors duration-300 rounded-lg cursor-pointer m-2 relative hover:bg-neutral-900/30 focus:bg-neutral-900/30 focus:outline-none active:bg-neutral-900/50`}
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
      <AnimatePresence onExitComplete={onExitComplete}>
        {move && <Move input={move!} />}
      </AnimatePresence>
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
      className="flex items-center gap-4 pointer-events-none select-none game-score landscape:mb-auto"
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

const Bot: React.FC = () => {
  return (
    <svg width="24" height="24" fill="currentColor">
      <path d="M14.1254 13H10.1254V15H14.1254V13Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.12537 13C9.22994 13 10.1254 12.1046 10.1254 11C10.1254 9.89543 9.22994 9 8.12537 9C7.0208 9 6.12537 9.89543 6.12537 11C6.12537 12.1046 7.0208 13 8.12537 13ZM8.12537 11.5C8.40151 11.5 8.62537 11.2761 8.62537 11C8.62537 10.7239 8.40151 10.5 8.12537 10.5C7.84922 10.5 7.62537 10.7239 7.62537 11C7.62537 11.2761 7.84922 11.5 8.12537 11.5Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.1254 11C18.1254 12.1046 17.2299 13 16.1254 13C15.0208 13 14.1254 12.1046 14.1254 11C14.1254 9.89543 15.0208 9 16.1254 9C17.2299 9 18.1254 9.89543 18.1254 11ZM16.6254 11C16.6254 11.2761 16.4015 11.5 16.1254 11.5C15.8492 11.5 15.6254 11.2761 15.6254 11C15.6254 10.7239 15.8492 10.5 16.1254 10.5C16.4015 10.5 16.6254 10.7239 16.6254 11Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.74884 14.6663C3.73056 16.6421 5.76939 18 8.12537 18H16.1254C18.5654 18 20.6652 16.5435 21.6029 14.4525C22.3722 13.9093 22.8746 13.0133 22.8746 12C22.8746 10.9867 22.3722 10.0907 21.6029 9.54753C20.6652 7.45651 18.5654 6 16.1254 6H8.12537C5.76939 6 3.73056 7.3579 2.74884 9.33375C1.78448 9.83263 1.12537 10.8393 1.12537 12C1.12537 13.1607 1.78448 14.1674 2.74884 14.6663ZM8.12537 8H16.1254C17.5088 8 18.7282 8.70234 19.4465 9.76991C19.7227 10.4593 19.8746 11.2119 19.8746 12C19.8746 12.7881 19.7227 13.5407 19.4465 14.2301C18.7282 15.2977 17.5088 16 16.1254 16H8.12537C5.91623 16 4.12537 14.2091 4.12537 12C4.12537 9.79086 5.91623 8 8.12537 8Z"
      />
    </svg>
  );
};

const Group: React.FC = () => {
  return (
    <svg width="24" height="24" fill="none" stroke="currentColor">
      <path
        d="M13.5056 12.8792C16.4066 12.299 21 12.2474 21 18.6296C21 20.3702 18.6792 19.79 15.198 19.79"
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.4839 19.8829H3.02165C2.84728 17.5483 3.64939 12.8792 8.25278 12.8792C12.8562 12.8792 13.6583 17.5483 13.4839 19.8829Z"
        stroke-width="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10.5669 8.06412C10.5669 9.34217 9.53083 10.3782 8.25278 10.3782C6.97473 10.3782 5.93866 9.34217 5.93866 8.06412C5.93866 6.78607 6.97473 5.75 8.25278 5.75C9.53083 5.75 10.5669 6.78607 10.5669 8.06412Z"
        stroke-width="1.5"
      />
      <path
        d="M17.6752 8.06412C17.6752 9.34217 16.6391 10.3782 15.3611 10.3782C14.083 10.3782 13.0469 9.34217 13.0469 8.06412C13.0469 6.78607 14.083 5.75 15.3611 5.75C16.6391 5.75 17.6752 6.78607 17.6752 8.06412Z"
        stroke-width="1.5"
      />
    </svg>
  );
};

// const Globe: React.FC = () => {
//   return (
//     <svg width="24" height="24" fill="currentColor">
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM14.8055 18.4151C17.1228 17.4003 18.7847 15.1667 18.9806 12.525C18.1577 12.9738 17.12 13.3418 15.9371 13.598C15.7882 15.4676 15.3827 17.1371 14.8055 18.4151ZM9.1945 5.58487C7.24725 6.43766 5.76275 8.15106 5.22208 10.244C5.4537 10.4638 5.84813 10.7341 6.44832 11.0008C6.89715 11.2003 7.42053 11.3798 8.00537 11.5297C8.05853 9.20582 8.50349 7.11489 9.1945 5.58487ZM10.1006 13.9108C10.2573 15.3675 10.5852 16.6202 10.9992 17.5517C11.2932 18.2133 11.5916 18.6248 11.8218 18.8439C11.9037 18.9219 11.9629 18.9634 12 18.9848C12.0371 18.9634 12.0963 18.9219 12.1782 18.8439C12.4084 18.6248 12.7068 18.2133 13.0008 17.5517C13.4148 16.6202 13.7427 15.3675 13.8994 13.9108C13.2871 13.9692 12.6516 14 12 14C11.3484 14 10.7129 13.9692 10.1006 13.9108ZM8.06286 13.598C8.21176 15.4676 8.61729 17.1371 9.1945 18.4151C6.8772 17.4003 5.21525 15.1666 5.01939 12.525C5.84231 12.9738 6.88001 13.3418 8.06286 13.598ZM13.9997 11.8896C13.369 11.9609 12.6993 12 12 12C11.3008 12 10.631 11.9609 10.0003 11.8896C10.0135 9.66408 10.4229 7.74504 10.9992 6.44832C11.2932 5.78673 11.5916 5.37516 11.8218 5.15605C11.9037 5.07812 11.9629 5.03659 12 5.01516C12.0371 5.03659 12.0963 5.07812 12.1782 5.15605C12.4084 5.37516 12.7068 5.78673 13.0008 6.44832C13.5771 7.74504 13.9865 9.66408 13.9997 11.8896ZM15.9946 11.5297C15.9415 9.20582 15.4965 7.11489 14.8055 5.58487C16.7528 6.43766 18.2373 8.15107 18.7779 10.244C18.5463 10.4638 18.1519 10.7341 17.5517 11.0008C17.1029 11.2003 16.5795 11.3798 15.9946 11.5297Z"
//       />
//     </svg>
//   );
// };

const OpponentSelector: React.FC = () => {
  const [opponent, setOpponent] = useState<Opponent>(OPPONENTS.PVP);

  const getIcon = (key: string) => {
    if (key === OPPONENTS.PVC) return <Bot />;
    if (key === OPPONENTS.PVP) return <Group />;
    // if (key === OPPONENT.ONLINE) return <Globe />;
    return null;
  };

  const selectorVariants = {
    hidden: {
      scaleX: 0,
    },
    show: {
      scaleX: 1,
      transition: { delay: 1, when: "beforeChildren" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.2 },
    show: { opacity: 1, scale: 1, transition: { easing: "easeIn" } },
  };

  const handleOpponentChange = (key: Opponent) => setOpponent(key);

  return (
    <motion.div
      animate="show"
      initial="hidden"
      variants={selectorVariants}
      className="flex overflow-hidden rounded-md bg-neutral-900 landscape:mt-auto"
    >
      {Object.keys(OPPONENTS).map((key) => (
        <motion.div key={key} variants={buttonVariants}>
          <input
            id={key}
            value={key}
            type="radio"
            name="opponent"
            className="hidden peer"
            checked={opponent === key}
          />
          <label
            htmlFor={key}
            onClick={() => handleOpponentChange(key as Opponent)}
            className={`
              transition-colors duration-300
              py-2 px-4 block cursor-pointer bg-neutral-900 text-neutral-500 
              hover:bg-neutral-800 hover:text-neutral-400 
              active:bg-neutral-700 active:text-neutral-300 
              peer-checked:text-neutral-50 peer-checked:bg-neutral-500 
              peer-checked:hover:text-neutral-200 peer-checked:hover:bg-neutral-600
              peer-checked:active:bg-neutral-700 peer-checked:active:text-neutral-300 
            `}
          >
            {getIcon(key)}
          </label>
        </motion.div>
      ))}
    </motion.div>
  );
};

// const TurnIndicator: React.FC<TurnIndicatorProps> = ({ state }) => {
//   const move = getNextMove(state);

//   const pathIndex = move === MOVES.CIRCLE ? 1 : 0;

//   const progress = useMotionValue(0);

//   const animation = animate(progress, pathIndex, {
//     duration: 0.15,
//   });

//   const path = useTransform(progress, [0, 1], [crossPath, circlePath], {
//     mixer: (from, to) => interpolate(from, to, { maxSegmentLength: 0.5 }),
//   });

//   const fill = useTransform(
//     progress,
//     [0, 1],
//     [COLORS_HEX[MOVES.CROSS], COLORS_HEX[MOVES.CIRCLE]]
//   );

//   useEffect(() => {
//     return () => {
//       animation.stop();
//     };
//   }, [animation]);

//   return (
//     <motion.section
//       initial={{ opacity: 0, y: 48 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.3 }}
//       className="uppercase text-neutral-500 flex items-center text-lg landscape:mt-auto"
//     >
//       To Play
//       <motion.span
//         initial={{ opacity: 0, x: -48 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.6 }}
//         className="flex items-center"
//       >
//         &nbsp;&minus;&nbsp;
//         <svg width="24" height="24">
//           <motion.path
//             d={path}
//             fill={fill}
//             fillRule="evenodd"
//             clipRule="evenodd"
//           />
//         </svg>
//       </motion.span>
//     </motion.section>
//   );
// };
