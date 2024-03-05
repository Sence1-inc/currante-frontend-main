import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { createTheme, Theme, ThemeProvider } from "@mui/material";

const theme: Theme = createTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 390,
      sm: 768,
      md: 1024,
      lg: 1200,
      xl: 1400,
    }
  },
  palette: {
    common: {
      black: '#000000',
      white: '#ffffff',
    }, 
    primary: {
      light: '#a1b5de',
      main: '#0e2f71'
    }, 
    secondary: {
      main: '#f58a47',
      dark: '#d2580b'
    },
    background: {
      paper: '#6b7fa6',
      default: '#ffffff',
    }
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
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: '4.8rem',
      fontWeight: 700,
      lineHeight: 1.167
    },
    h2: {
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: '3.6rem',
      fontWeight: 700,
      lineHeight: 1.3
    },
    h3: {
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: '2.4rem',
      fontWeight: 700,
      lineHeight: 1.3
    },
    h4: {
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: '2.0rem',
      fontWeight: 700,
      lineHeight: 1.3
    },
    h5: {
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: '1.8rem',
      fontWeight: 700,
      lineHeight: 1.3
    },    
    h6: {
      fontFamily: "'Poppins', 'sans-serif'",
      fontSize: '1.4rem',
      fontWeight: 700,
      lineHeight: 1.3
    },
    body1: {
      fontFamily: "'Open Sans', 'serif'",
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.167
    },
    body2: {
      fontFamily: "'Open Sans', 'serif'",
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.167
    },
    subtitle1: {
      fontFamily: "'Open Sans', 'serif'",
      fontSize: '0.875rem',
      fontWeight: 300,
      lineHeight: 1.167
    }
  }, 
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
