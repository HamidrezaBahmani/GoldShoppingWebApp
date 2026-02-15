// theme.js
import { createTheme } from "@mui/material/styles";
import IRANSansWeb from "../assets/fonts/woff2/IRANSansWebFaNum-Bold.woff2";

console.log("Font path:", IRANSansWeb);
const theme = createTheme({
  typography: {
    fontFamily: "IRANSansWeb, Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'IRANSansWeb';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: url(${IRANSansWeb}) format('woff2');
        }
      `,
    },
  },
});

export default theme;
