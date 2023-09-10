import React from "react";

import { motion } from "framer-motion";

const PATHS = [
  "M12 5C11.4477 5 11 5.44772 11 6C11 6.55228 11.4477 7 12 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H12Z",
  "M7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z",
  "M3 18C3 17.4477 3.44772 17 4 17H12C12.5523 17 13 17.4477 13 18C13 18.5523 12.5523 19 12 19H4C3.44772 19 3 18.5523 3 18Z",
];

const GameMenu = () => {
  return (
    <div className="absolute right-4 top-6 ">
      <button className="cursor-pointer rounded-full text-neutral-500 transition-colors bg-black duration-300 p-2 hover:bg-neutral-900 hover:text-neutral-50 focus:bg-neutral-950 focus:text-neutral-200 focus:outline-none active:bg-neutral-900 active:text-neutral-50">
        <MenuIcon />
      </button>
    </div>
  );
};

const MenuIcon: React.FC = () => {
  return (
    <svg width="24" height="24">
      {PATHS.map((path, i) => (
        <motion.path
          key={i}
          d={path}
          fill="currentColor"
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 10 * (i + 1) }}
          transition={{ delay: 0.9 + i * 0.05, ease: "easeIn" }}
        />
      ))}
    </svg>
  );
};

export default GameMenu;
