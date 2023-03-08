import {
    Routes,
    Route,
    HashRouter,
  } from "react-router-dom";
import Introduction from "./pages/Introduction";
import Workshop from "./pages/Workshop";
import Optimize from "./pages/predict/Optimize";
import Train from "./pages/predict/Train";
import Calibration from "./pages/fairness/Calibration";
import Error from "./pages/fairness/Error";
import COMPAS from "./pages/caseStudies/COMPAS";
import StreetBump from "./pages/caseStudies/StreetBump";
import Risk from "./pages/deliberation/Risk";
import StakeholderMapping from "./pages/deliberation/StakeholderMapping";
import Decision from "./pages/deliberation/Decision";
import About from "./pages/About";
import Glossary from "./pages/Glossary";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Main from "./pages/Main";

import { config, CARDS, VARIABLES }  from "./utils/global";
import { useState} from "react";

export default function App() {

    const [items, setItems] = useState(CARDS);
    const [variables, setVariables] = useState(VARIABLES);
    const [modules, setModules] = useState([]);
    const [policy, setPolicy] = useState("");
    const [user, updateUser] = useState("group");
    const [disableFairnessNext, setDisableFairnessNext] = useState(true);
    const [disableCaseStudyNext, setDisableCaseStudyNext] = useState(true);
    const [disableDeliberationNext, setDisableDeliberationNext] = useState(true);

    console.log(disableFairnessNext)

    // console.log(items)
    // items.sort((a, b) => a.column - b.column)
  
    return(
      <HashRouter>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/Workshop" element={<Workshop user={user} updateUser={updateUser}/>} />
          <Route path="/Introduction" element={<Introduction config={config.Introduction} modules={modules}/>} />
          <Route path="/Train" element={<Train config={config.Train} variables={variables} setVariables={setVariables} items={items} setItems={setItems} modules={modules} setModules={setModules}/>} />
          <Route path="/Optimize" element={<Optimize config={config.Optimize} variables={variables} setVariables={setVariables} items={items} setItems={setItems} modules={modules} setModules={setModules} />} />
          <Route path="/Calibration" element={<Calibration config={config.Calibration} user={user} disableFairnessNext={disableFairnessNext} setDisableFairnessNext={setDisableFairnessNext} modules={modules}/>} />
          <Route path="/Error" element={<Error config={config.Error} modules={modules}/>} />
          <Route path="/COMPAS" element={<COMPAS config={config.COMPAS}  modules={modules}/>} />
          <Route path="/StreetBump" element={<StreetBump config={config.StreetBump} disableCaseStudyNext={disableCaseStudyNext} setDisableCaseStudyNext={setDisableCaseStudyNext} modules={modules}/>} />
          <Route path="/Stakeholders" element={<StakeholderMapping config={config.Stakeholders} disableDeliberationNext={disableDeliberationNext} setDisableDeliberationNext={setDisableDeliberationNext} modules={modules} policy={policy} setPolicy={setPolicy}/>} />
          <Route path="/Risk" element={<Risk config={config.Risk}  modules={modules} policy={policy} setPolicy={setPolicy}/>} />
          <Route path="/Decision" element={<Decision config={config.Decision}  modules={modules}/>} />
          <Route path="/About" element={<About config={config.About} modules={modules} />} />
          <Route path="/Glossary" element={<Glossary config={config.Glossary} modules={modules}/>} />
          <Route path="/Resources" element={<Resources config={config.Resources} modules={modules}/>} />
          <Route path="/Contact" element={<Contact config={config.Contact} modules={modules}/>} />
        </Routes>
      </HashRouter>
    )
}
