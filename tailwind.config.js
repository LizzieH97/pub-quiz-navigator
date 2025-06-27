/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        olive: "#627C4C",
        cream: "#FFD5B3",
        tomato: "#A62F03",
        maroon: "#731B07",
        teal: "#316760",
      },
    },
    plugins: [
      require("tailwind-scrollbar"),
      require("tailwind-scrollbar-hide"),
      require("daisyui"),
      require("@tailwindcss/forms"),
    ],
  },
};
