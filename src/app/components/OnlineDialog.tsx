import React, { useRef, useState } from "react";

import { Dialog } from "@headlessui/react";

import type { OnlineDialogProps } from "../libs/types";
import {
  motion,
  AnimatePresence,
  useAnimate,
  type AnimationPlaybackControls,
} from "framer-motion";

const OnlineDialog: React.FC<OnlineDialogProps> = ({ isOpen, onClose }) => {
  const [scope, animate] = useAnimate();

  const [gameCode, setGameCode] = useState("123456");

  const handleCodeClick = () => {
    navigator.clipboard
      .writeText(gameCode)
      .then(animateCopiedFeedback)
      .catch((err) => {
        console.log(err);
      });
  };

  const animateCopiedFeedback = () => {
    animate([
      ["div.copied-message", { x: "-50%", y: "100%" }, { duration: 0.0001 }],
      [
        "div.copied-message",
        {
          y: 0,
          x: "-50%",
          opacity: 1,
        },
        {
          at: "<",
        },
      ],
      [
        "button.game-code-button",
        {
          borderColor: "rgb(74 222 128)",
        },
        {
          at: "<",
        },
      ],
      [
        "div.copied-message",
        {
          opacity: 0,
          y: "100%",
          x: "-50%",
        },
        {
          delay: 0.3,
        },
      ],
      [
        "button.game-code-button",
        {
          borderColor: "rgb(82 82 82)",
        },
        {
          at: "<",
        },
      ],
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          <motion.div
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            aria-hidden="true"
            className="fixed inset-0 bg-black/50"
          />
          <motion.div
            exit={{ opacity: 0, y: -75 }}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -75 }}
            transition={{ ease: "easeInOut", duration: 0.3, delay: 0.15 }}
            className="fixed flex top-0 w-screen items-center justify-center p-4"
          >
            <Dialog.Panel className="w-full max-w-md rounded-lg p-4 bg-neutral-800">
              <Dialog.Title className="text-lg pb-1">Play Online</Dialog.Title>
              <Dialog.Description className="text-neutral-400 pb-4">
                Connect with another player by sharing this code or by entering
                their player code.
              </Dialog.Description>

              <div ref={scope} className="pb-4">
                {/* Your Code */}
                <button
                  onClick={handleCodeClick}
                  className="w-full flex justify-between border border-neutral-600 rounded-md p-4 text-sm focus:outline-neutral-400 relative overflow-hidden game-code-button"
                >
                  <div>Your Code</div>
                  <div className="font-bold tracking-wide">{gameCode}</div>
                  <div className="absolute left-1/2 text-green-400 opacity-0 -translate-x-1/2 translate-y-full copied-message">
                    Copied!
                  </div>
                </button>
              </div>
              <form>
                <label
                  htmlFor="opponentCode"
                  className="text-neutral-400 block pb-2"
                >
                  Enter below the player code you wish to play against.
                </label>
                <div className="pb-4">
                  <input
                    type="text"
                    name="opponentCode"
                    placeholder="Opponent code"
                    className="w-full p-4 rounded-md focus:outline-neutral-400"
                  />
                </div>
                <button
                  type="submit"
                  className="block ml-auto bg-neutral-500 px-4 py-2 rounded-md"
                >
                  Connect
                </button>
              </form>
            </Dialog.Panel>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default OnlineDialog;
