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
import About from "./pages/About";
import Glossary from "./pages/Glossary";
import Resources from "./pages/Resources";

import { config, CARDS, VARIABLES, MODEL_COLUMN_NAMES }  from "./utils/global";
import { useState } from "react";

function setModelVariableSelected(variables) {

  const { MODEL_VARIABLES } = MODEL_COLUMN_NAMES;
  const m = variables.filter((d) => d.column === MODEL_VARIABLES).map((d) => d.id);
  let modelVariableSelected = false;

  if (m.length > 0) {
    modelVariableSelected = true;
  }

  return modelVariableSelected;
}

export default function App() {

    const [items, setItems] = useState(CARDS);
    const [variables, setVariables] = useState(VARIABLES);
    let modelVariableSelected = setModelVariableSelected(variables);
    let itemsSorted = items;

    if (items[0].predicted) {
      items.sort((a, b) => b.predicted - a.predicted)
    }

    console.log(items)

    return(
      <HashRouter>
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/Classify" element={<Classify config={config.Classify} items={items} setItems={setItems}/>} />
          <Route path="/Train" element={<Train config={config.Train} variables={variables} setVariables={setVariables} items={itemsSorted} setItems={setItems} modelVariableSelected={modelVariableSelected}/>} />
          <Route path="/Optimize" element={<Optimize config={config.Optimize} variables={variables} setVariables={setVariables} items={itemsSorted} modelVariableSelected={modelVariableSelected}/>} />
          <Route path="/Calibration" element={<Calibration />} />
          <Route path="/FalsePositive" element={<FalsePositive />} />
          <Route path="/FalseNegative" element={<FalseNegative />} />
          <Route path="/COMPAS" element={<COMPAS />} />
          <Route path="/PublicPolicy" element={<PublicPolicy />} />
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
