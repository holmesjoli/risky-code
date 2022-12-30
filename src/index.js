import React from "react";
import ReactDOM from "react-dom/client";
import "./utils/styles/style.scss";
import App from "./App";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const theme = createTheme({
  root: {
    color: "pink",
  },
  typography: {
    fontFamily: "IBM Plex Sans, Verdana, Geneva, Tahoma, sans-serif",
    fontSize: 12,
  },
  palette: {
    mode: "dark",
  },
  shape: {
    borderRadius: 0,
  },
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