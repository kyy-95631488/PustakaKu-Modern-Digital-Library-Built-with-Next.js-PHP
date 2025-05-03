import colors from "tailwindcss/colors";
import typography from "@tailwindcss/typography";
import scrollbarHide from "tailwind-scrollbar-hide";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];

export const theme = {
  extend: {
    typography: (theme) => ({
      DEFAULT: {
        css: {
          a: {
            color: theme('colors.blue.500'),
            '&:hover': {
              color: theme('colors.blue.700'),
              textDecoration: 'underline',
            },
          },
        },
      },
    }),
    animation: {
      pulseCustom: 'pulse 2s infinite ease-in-out',
      'infinite-scroll': 'infinite-scroll 10s linear infinite',
    },
    keyframes: {
      pulse: {
        '0%': {
          transform: 'scale(1)',
          opacity: '1',
        },
        '50%': {
          transform: 'scale(1.1)',
          opacity: '0.8',
        },
        '100%': {
          transform: 'scale(1)',
          opacity: '1',
        },
      },
      'infinite-scroll': {
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(-100%)' },
      },
    },
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
  },
  colors: {
    ...colors,
    primary: blue,
    secondary: sky,
    'dark-grey': '#121212',
  },
};

export const plugins = [scrollbarHide, typography];
