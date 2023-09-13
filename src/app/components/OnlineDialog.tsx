import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog } from "@headlessui/react";

import type { OnlineDialogProps } from "../libs/types";

import { motion, useAnimate, AnimatePresence } from "framer-motion";

const validationSchema = z.object({
  opponentCode: z
    .string({
      invalid_type_error: "Invalid opponent code",
      required_error: "Opponent code is required",
    })
    .length(6, {
      message: "Opponent code must be exactly 6 characters long",
    }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const OnlineDialog: React.FC<OnlineDialogProps> = ({
  isOpen,
  playerId,
  onClose,
}) => {
  const [scope, animate] = useAnimate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const handleCodeClick = () => {
    navigator.clipboard
      .writeText(playerId)
      .then(() => animateCopiedFeedback("success"))
      .catch((err) => {
        console.error(err);
        animateCopiedFeedback("error");
      });
  };

  const onSubmit = (data: ValidationSchema) => {
    console.log(data);
  };

  const animateCopiedFeedback = (status: "success" | "error") => {
    animate([
      [
        `div.copied-${status}-message`,
        { x: "-50%", y: "100%" },
        { duration: 0.0001 },
      ],
      [
        `div.copied-${status}-message`,
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
          borderColor:
            status === "success" ? "rgb(74 222 128)" : "rgb(239 68 68)",
        },
        {
          at: "<",
        },
      ],
      [
        `div.copied-${status}-message`,
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

  const getInputColors = (isError: boolean) => {
    const accent = isError ? "red" : "neutral";
    return `placeholder-${accent}-400 text-${accent}-50 border-${accent}-500 hover:text-${accent}-50 hover:border-${accent}-400 focus:text-${accent}-400 focus:border-${accent}-400`;
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
                  <div className="font-bold tracking-wide">{playerId}</div>
                  <div className="absolute left-1/2 text-green-400 opacity-0 -translate-x-1/2 translate-y-full copied-success-message">
                    Copied!
                  </div>
                  <div className="absolute left-1/2 text-red-400 opacity-0 -translate-x-1/2 translate-y-full copied-error-message">
                    Error!
                  </div>
                </button>
              </div>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <label
                  htmlFor="opponentCode"
                  className="text-neutral-400 block pb-2"
                >
                  Enter below the player code you wish to play against.
                </label>
                <div className="pb-4">
                  <input
                    type="text"
                    spellCheck="false"
                    autoComplete="off"
                    autoCorrect="false"
                    autoCapitalize="off"
                    placeholder="Opponent code"
                    {...register("opponentCode")}
                    className={`
                      w-full px-4 py-3 rounded-md border-2 border-neutral-600
                      focus:outline-none transition-colors duration-200
                      ${getInputColors(
                        !!(errors.opponentCode && errors.opponentCode.message)
                      )}
                    `}
                  />
                  <div className="h-6">
                    <AnimatePresence>
                      {!!(
                        errors.opponentCode && errors.opponentCode.message
                      ) && (
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="text-sm pl-4 pt-1 block text-red-400"
                        >
                          {errors.opponentCode.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
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
