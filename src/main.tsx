import { createTheme, Theme, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const theme: Theme = createTheme({
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 390,
      md: 768,
      lg: 1200,
      xl: 1400,
    },
  },
  palette: {
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    primary: {
      light: "#a1b5de",
      main: "#0e2f71",
      dark: "#2f2e41",
    },
    secondary: {
      main: "#f58a47",
      dark: "#d2580b",
    },
    background: {
      paper: "#6b7fa6",
      default: "#ffffff",
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: "'Open Sans', 'serif'",
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      color: "#0e2f71",
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: "4.8rem",
      fontWeight: 700,
      lineHeight: 1.167,
    },
    h2: {
      color: "#0e2f71",
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: "3.6rem",
      fontWeight: 700,
      lineHeight: 1.3,
      "@media (max-width:768px)": {
        fontSize: "2.2rem",
      },
    },
    h3: {
      color: "#0e2f71",
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: "2.4rem",
      fontWeight: 700,
      lineHeight: 1.5,
      "@media (max-width:768px)": {
        fontSize: "2.0rem",
      },
    },
    h4: {
      color: "#0e2f71",
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: "2.0rem",
      fontWeight: 700,
      lineHeight: 1.5,
      "@media (max-width:768px)": {
        fontSize: "1.8rem",
      },
    },
    h5: {
      color: "#0e2f71",
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: "1.8rem",
      fontWeight: 700,
      lineHeight: 1.5,
      "@media (max-width:768px)": {
        fontSize: "1.6rem",
      },
    },
    h6: {
      color: "#0e2f71",
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: "1.4rem",
      fontWeight: 700,
      lineHeight: 1.5,
      "@media (max-width:768px)": {
        fontSize: "1.2rem",
      },
    },
    body1: {
      fontFamily: "'Open Sans', 'serif'",
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.3,
      "@media (max-width:768px)": {
        fontSize: "0.875rem",
      },
    },
    body2: {
      fontFamily: "'Open Sans', 'serif'",
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: 1.5,
      "@media (max-width:768px)": {
        fontSize: "0.875rem",
      },
    },
    subtitle1: {
      fontFamily: "'Open Sans', 'serif'",
      fontSize: "0.875rem",
      fontWeight: 300,
      lineHeight: 1.5,
      "@media (max-width:768px)": {
        fontSize: "0.750rem",
      },
    },
    smallest: {
      color: "#0e2f71",
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: ".5rem",
      fontWeight: 500
    },
    titleMed: {
      color: "#0e2f71",
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: "1rem",
      fontWeight: 600
    },
    labelLight: {
      color: "#7C7C7C",
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: ".8rem",
      fontWeight: 400
    },
    labelSmall: {
      color: "#0e2f71",
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: ".75rem",
      fontWeight: 600
    },
    bodySmall: {
      color: "#868686",
      fontFamily: "'Open Sans', 'serif'",
      fontSize: ".75rem",
      fontWeight: 500
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          smallest: 'span',
          titleMed: 'span',
          bodySmall: 'p',
          labelSmall: 'span',
          labelLight: 'span'
        },
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
