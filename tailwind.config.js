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
      },
      fontSize: {
        font12: "12px",
        font14: "14px",
        font15: "15px",
        font16: "16px",
        font18: "18px",
        font20: "20px",
      },
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        blue: "#1976D2",
      }
    },
  },
  plugins: [],
};
