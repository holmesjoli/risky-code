import React from "react";
import ReactDOM from "react-dom/client";
import "./utils/styles/style.scss";
import App from "./App";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const theme = createTheme({
  typography: {
    fontFamily: "Plex, Verdana, Geneva, Tahoma, sans-serif",
    fontSize: 12
  },
  palette: {
    type: "dark",
    background: {
      paper: "#21252b"
    },
    primary: {
      main: "#03afbf"
    },
    secondary: {
      main: "#f0804e"
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
    }
  },
  shape: {
    borderRadius: 0
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();