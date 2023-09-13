/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  safelist: [
    "placeholder-red-400",
    "placeholder-neutral-400",
    "text-red-50",
    "text-neutral-50",
    "border-red-500",
    "border-neutral-500",
    "hover:text-red-50",
    "hover:text-neutral-50",
    "hover:border-red-400",
    "hover:border-neutral-400",
    "focus:text-red-400",
    "focus:text-neutral-400",
    "focus:border-red-400",
    "focus:border-neutral-400",
  ],
  plugins: [],
};
