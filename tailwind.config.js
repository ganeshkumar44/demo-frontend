// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        custom: "32rem",
      },
      boxShadow: {
        blackShadow02: "0px 0px 5px rgba(0,0,0,0.2)",
      }
    },
  },
  plugins: [],
};
