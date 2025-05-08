/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./apps/web/app/**/*.{ts,tsx}",
    "./apps/web/pages/**/*.{ts,tsx}",
    "./apps/web/components/**/*.{ts,tsx}",
    "./apps/web/(landing)/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {},
  },
  plugins: [],
};
