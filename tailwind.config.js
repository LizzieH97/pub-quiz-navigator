/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
  theme: {
    extend: {
      colors: {
        olive: "#5D735E",
        cream: "#F2B950",
        beige: "#BF7C2A",
        maroon: "#592202",
        teal: "#28402A",
        bark: "#261201",
      },
      fontFamily: {
        schoolbell: ["var(--font-schoolbell)"],
      },
      fontWeight: {
        extrabold: 800,
      },
      keyframes: {
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
    animation: {
      "scroll-left": "scroll-left 30s linear infinite",
    },
    safelist: [
      "mask-star",
      "mask",
      "rating",
      "rating-sm",
      "rating-md",
      "rating-lg",
      "bg-teal",
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
};
