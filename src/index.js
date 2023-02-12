import React from "react";
import ReactDOM from "react-dom/client";
import "./utils/styles/style.scss";

import { createTheme, ThemeProvider } from "@material-ui/core";
import reportWebVitals from "./reportWebVitals";
import App from "./App"

const highlightColor = "#7FC243";

const theme = createTheme({
  typography: {
    fontFamily: "Plex, Verdana, Geneva, Tahoma, sans-serif",
    fontSize: 12
  },
  palette: {
    type: "dark",
    background: {
      paper: "#131517"
    },
    primary: {
      main: "#03afbf"
    },
    secondary: {
      main: "#cbcbcb"
    }
  },
  overrides: {
    MuiPaper: {
      root: {
        elevation: 0,
        square: true,
        padding: 0,
        marginBottom: 0
      }
    },
    MuiAccordionSummary: {
      root: {
        position: "relative",
        paddingLeft: 0,
        marginLeft: "15px",
        marginRight: "15px",
        borderColor: highlightColor,
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: ".25rem"
      },
      content: {
        margin: 0,
        color: highlightColor
      },
      expandIcon: {
        position: "relative",
        color: highlightColor
      }
    },
    MuiAccordionDetails: {
      root: {
        padding: 0
      }
    },
    MuiButtonBase: {
      root: {
        position: "absolute"
      }
    },
    Mui: {
      disabled: {
        backgroundColor: "rgb(127, 194, 67, .12)"
      }
    },
    MuiButton: {
      root: {
        borderRadius: "0.25rem"
      },
      label: {
        fontVariant: "small-caps",
        fontWeight: 500,
        letterSpacing: ".6px",
        textTransform: "none",
        fontSize: "1.05rem"
      },
      contained: {
        backgroundColor: highlightColor
      },
      outlinedSecondary: {
        borderColor: highlightColor,
        color: highlightColor
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