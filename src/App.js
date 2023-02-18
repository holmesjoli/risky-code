import {
    Routes,
    Route,
    HashRouter,
  } from "react-router-dom";
import Introduction from "./pages/Introduction";
import Classify from "./pages/predict/Classify";
import Train from "./pages/predict/Train";
import Calibration from "./pages/fairness/Calibration";
import Error from "./pages/fairness/Error";
import COMPAS from "./pages/caseStudies/COMPAS";
import StreetBump from "./pages/caseStudies/StreetBump";
import Risk from "./pages/deliberation/Risk";
import Stakeholders from "./pages/deliberation/Stakeholders";
import Decision from "./pages/deliberation/Decision";
import About from "./pages/About";
import Glossary from "./pages/Glossary";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";

import { config, CARDS, VARIABLES }  from "./utils/global";
import { useState} from "react";

export default function App() {

    const [items, setItems] = useState(CARDS);
    const [variables, setVariables] = useState(VARIABLES);
    const [modules, setModules] = useState([]);
  
    return(
      <HashRouter>
        <Routes>
          <Route path="/" element={<Introduction config={config.Introduction} modules={modules}/>} />
          <Route path="/Classify" element={<Classify config={config.Classify} items={items} setItems={setItems} modules={modules} setModules={setModules} />} />
          <Route path="/Train" element={<Train config={config.Train} variables={variables} setVariables={setVariables} items={items} setItems={setItems} modules={modules} setModules={setModules}/>} />
          <Route path="/Calibration" element={<Calibration config={config.Calibration} modules={modules}/>} />
          <Route path="/Error" element={<Error config={config.Error} modules={modules}/>} />
          <Route path="/COMPAS" element={<COMPAS config={config.COMPAS}  modules={modules}/>} />
          <Route path="/StreetBump" element={<StreetBump config={config.StreetBump}  modules={modules}/>} />
          <Route path="/Stakeholders" element={<Stakeholders config={config.Stakeholders}  modules={modules}/>} />
          <Route path="/Risk" element={<Risk config={config.Risk}  modules={modules}/>} />
          <Route path="/Decision" element={<Decision config={config.Decision}  modules={modules}/>} />
          <Route path="/About" element={<About config={config.About} modules={modules} />} />
          <Route path="/Glossary" element={<Glossary config={config.Glossary} modules={modules}/>} />
          <Route path="/Resources" element={<Resources config={config.Resources} modules={modules}/>} />
          <Route path="/Contact" element={<Contact config={config.Contact} modules={modules}/>} />
        </Routes>
      </HashRouter>
    )
}
