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
import Classify from "./pages/predict/Classify";
import Train from "./pages/predict/Train";
import Optimize from "./pages/predict/Optimize";
import Calibration from "./pages/fairness/Calibration";
import FalsePositive from "./pages/fairness/FalsePositive";
import FalseNegative from "./pages/fairness/FalseNegative";
import COMPAS from "./pages/case_studies/COMPAS";
import PublicPolicy from "./pages/case_studies/PublicPolicy";
import RiskFramework from "./pages/deliberation/RiskFramework";
import Stakeholders from "./pages/deliberation/Stakeholders";
import DecisionAid from "./pages/deliberation/DecisionAid";

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
        <Route path="/Classify" element={<Classify />} />
        <Route path="/Train" element={<Train />} />
        <Route path="/Optimize" element={<Optimize />} />
        <Route path="/Calibration" element={<Calibration />} />
        <Route path="/FalsePositive" element={<FalsePositive />} />
        <Route path="/FalseNegative" element={<FalseNegative />} />
        <Route path="/COMPAS" element={<COMPAS />} />
        <Route path="/PublicPolicy" element={<PublicPolicy />} />
        <Route path="/RiskFramework" element={<RiskFramework />} />
        <Route path="/Stakeholders" element={<Stakeholders />} />
        <Route path="/DecisionAid" element={<DecisionAid />} />
      </Routes>
    </HashRouter>
    </ThemeProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();