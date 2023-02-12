import React from "react";
import ReactDOM from "react-dom/client";
import "./utils/styles/style.scss";

import { createTheme, ThemeProvider } from "@material-ui/core";
import reportWebVitals from "./reportWebVitals";
import App from "./App"

const theme = createTheme({
  typography: {
    fontFamily: "Plex, Verdana, Geneva, Tahoma, sans-serif",
    fontSize: 12
  },
  palette: {
    type: "dark",
    background: {
      paper: "#1c2022"
    },
    primary: {
      main: "#03afbf"
    },
    secondary: {
      main: "#919295"
    }
  },
  overrides: {
    MuiPaper: {
      root: {
        elevation: 0,
        square: true,
        padding: 0,
        marginBottom: 0
      },
      elevation1: {
        boxShadow: "none"
      }
    },
    MuiButton: {
      outlinedSecondary: {
        position: "absolute",
        bottom: 0
      }
    },
    MuiAccordionSummary: {
      root: {
        paddingLeft: 0
      },
      content: {
        margin: 0
      }
    },
    MuiAccordionDetails: {
      root: {
        paddingTop: 0
      }
    }
  },
  shape: {
    borderRadius: 0
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();