import {
    Routes,
    Route,
    HashRouter,
  } from "react-router-dom";
import Introduction from "./pages/Introduction";
import Classify from "./pages/predict/Classify";
import Optimize from "./pages/predict/Optimize";
import Calibration from "./pages/fairness/Calibration";
import FalsePositive from "./pages/fairness/FalsePositive";
import FalseNegative from "./pages/fairness/FalseNegative";
import COMPAS from "./pages/case_studies/COMPAS";
import RiskFramework from "./pages/deliberation/RiskFramework";
import Stakeholders from "./pages/deliberation/Stakeholders";
import DecisionAid from "./pages/deliberation/DecisionAid";
import About from "./pages/About";
import Glossary from "./pages/Glossary";
import Resources from "./pages/Resources";

import { config, CARDS, VARIABLES }  from "./utils/global";
import { useState} from "react";

export default function App() {

    const [items, setItems] = useState(CARDS);
    const [variables, setVariables] = useState(VARIABLES);

    return(
      <HashRouter>
        <Routes>
          <Route path="/" element={<Introduction config={config.Introduction}/>} />
          <Route path="/Classify" element={<Classify config={config.Classify} items={items} setItems={setItems}/>} />
          <Route path="/Optimize" element={<Optimize config={config.Optimize} variables={variables} setVariables={setVariables} items={items} setItems={setItems}/>} />
          <Route path="/Calibration" element={<Calibration />} />
          <Route path="/FalsePositive" element={<FalsePositive />} />
          <Route path="/FalseNegative" element={<FalseNegative />} />
          <Route path="/COMPAS" element={<COMPAS />} />
          <Route path="/RiskFramework" element={<RiskFramework />} />
          <Route path="/Stakeholders" element={<Stakeholders />} />
          <Route path="/DecisionAid" element={<DecisionAid />} />
          <Route path="/About" element={<About />} />
          <Route path="/Glossary" element={<Glossary />} />
          <Route path="/Resources" element={<Resources />} />
        </Routes>
      </HashRouter>
    )
}
