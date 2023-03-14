import {
    Routes,
    Route,
    HashRouter,
  } from "react-router-dom";
import { useEffect } from 'react';
import Orientation from "./pages/Orientation";
import Classify from "./pages/predict/Classify";
import Train from "./pages/predict/Train";
import Optimize from "./pages/predict/Optimize";
import Calibration from "./pages/fairness/Calibration";
import Error from "./pages/fairness/Error";
import COMPAS from "./pages/fairness/COMPAS";
import Health from "./pages/caseStudies/Health";
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
    const [algorithmDefinition, setAlgorithmDefinition] = useState("");
    const [baseRatesBrainstorm, setBaseRatesBrainstorm] = useState("");
    const [rules, setRules] = useState({"rule1": "",
                                        "rule2": "",
                                        "rule3": ""});
    const [user, setUser] = useState("group");
    const [name, setName] = useState("");
    const [groupName, setGroupName] = useState("");
    const [type, setType] = useState("your group will assume a team of these roles.");
    const [disablePredictionNext, setDisablePredictionNext] = useState(true);
    const [disablePredictionNext2, setDisablePredictionNext2] = useState(true);
    const [disableFairnessNext, setDisableFairnessNext] = useState(true);
    const [disableFairnessNext2, setDisableFairnessNext2] = useState(true);
    const [disableCaseStudyNext, setDisableCaseStudyNext] = useState(true);
    const [disableDeliberationNext, setDisableDeliberationNext] = useState(true);

    useEffect(() => {
      let t = user === "group"? "your group will assume a team of these roles." : "you will assume a different role.";
      setType(t);
    }, [user]);

    console.log(type)
    // items.sort((a, b) => a.column - b.column)
  
    return(
      <HashRouter>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/Orientation" element={<Orientation user={user} setUser={setUser} type={type} name={name} setName={setName} groupName={groupName} setGroupName={setGroupName}/>} />
          <Route path="/Classify" element={<Classify config={config.Classify} user={user} items={items} disablePredictionNext={disablePredictionNext} setDisablePredictionNext={setDisablePredictionNext} setItems={setItems} modules={modules} setModules={setModules} algorithmDefinition={algorithmDefinition} setAlgorithmDefinition={setAlgorithmDefinition} rules={rules} setRules={setRules}/>} />
          <Route path="/Train" element={<Train config={config.Train} variables={variables} setVariables={setVariables} items={items} setItems={setItems} modules={modules} setModules={setModules} rules={rules} />} />
          <Route path="/Optimize" element={<Optimize config={config.Optimize} user={user} variables={variables} setVariables={setVariables} items={items} setItems={setItems} modules={modules} setModules={setModules} disablePredictionNext2={disablePredictionNext2} setDisablePredictionNext2={setDisablePredictionNext2} algorithmDefinition={algorithmDefinition} setAlgorithmDefinition={setAlgorithmDefinition} rules={rules}/>} />
          <Route path="/Calibration" element={<Calibration config={config.Calibration} user={user} disableFairnessNext={disableFairnessNext} setDisableFairnessNext={setDisableFairnessNext} modules={modules}/>} />
          <Route path="/COMPAS" element={<COMPAS config={config.COMPAS} user={user} disableFairnessNext={disableFairnessNext} setDisableFairnessNext={setDisableFairnessNext} baseRatesBrainstorm={baseRatesBrainstorm} setBaseRatesBrainstorm={setBaseRatesBrainstorm} modules={modules}/>}></Route>
          <Route path="/Error" element={<Error config={config.Error} modules={modules} user={user} disableFairnessNext2={disableFairnessNext2} setDisableFairnessNext2={setDisableFairnessNext2}/>} />
          <Route path="/StreetBump" element={<StreetBump config={config.StreetBump} user={user} disableCaseStudyNext={disableCaseStudyNext} setDisableCaseStudyNext={setDisableCaseStudyNext} modules={modules}/>} />
          <Route path="/Health" element={<Health config={config.Health} modules={modules}/>} />
          <Route path="/Stakeholders" element={<StakeholderMapping config={config.Stakeholders} user={user} disableDeliberationNext={disableDeliberationNext} setDisableDeliberationNext={setDisableDeliberationNext} modules={modules} policy={policy} setPolicy={setPolicy}/>} />
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
