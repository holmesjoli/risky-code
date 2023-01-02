import React from "react";
import ReactDOM from "react-dom/client";
import "./utils/styles/style.scss";

import { createTheme, ThemeProvider } from "@material-ui/core";
import reportWebVitals from "./reportWebVitals";
import {
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import Introduction from "./pages/Introduction";
import Predict from "./pages/predict/Predict";
import Fairness from "./pages/fairness/Fairness";
import CaseStudies from "./pages/case_studies/CaseStudies";
import Deliberation from "./pages/deliberation/Deliberation";

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
    }
  },
  shape: {
    borderRadius: 0
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <ThemeProvider theme={theme}>
      {/* <App /> */}
      <HashRouter>
      {
        /**
         * The BrowserRouter component is from the react-router library and allows simple static routing between different pages of a webapp.
         * Each "Route" is a distinct component that will update the contents of the page and the URL path.
         * Ex: routing to the Analyze page will change the URL to localhost:3000/Analyze
         */
      }
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/Predict" element={<Predict />} />
        <Route path="/Fairness" element={<Fairness />} />
        <Route path="/CaseStudies" element={<CaseStudies />} />
        <Route path="/Deliberation" element={<Deliberation />} />
      </Routes>
    </HashRouter>
    </ThemeProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();