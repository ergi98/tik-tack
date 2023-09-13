import React from "react";

import { Dialog } from "@headlessui/react";

import type { OnlineDialogProps } from "../libs/types";

const OnlineDialog: React.FC<OnlineDialogProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog className="relative z-50" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 w-screen flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg p-4 bg-neutral-800">
          <Dialog.Title className="text-lg pb-1">Play Online</Dialog.Title>
          <Dialog.Description className="text-neutral-400 pb-4">
            Connect with another player by sharing this code or by entering
            their player code.
          </Dialog.Description>

          <div className="pb-4">
            {/* Your Code */}
            <button className="w-full flex justify-between border border-neutral-600 rounded-md p-4 uppercase text-sm focus:outline-neutral-400">
              <div>Your Code</div>
              <div className="font-bold tracking-wide">12343</div>
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
      </div>
    </Dialog>
  );
};

export default OnlineDialog;
