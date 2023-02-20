import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import Description from '../components/Description';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { NavLink } from "react-router-dom";

const glossary = {
    "algorithm": {
        "name": "algorithm",
        "definitions": {
            "def1": {
                "definition": "A set of instructions, rules, and calculations designed to solve problems",
                "citation": "(Benjamin 2019)",
                "link": "Benjamin-2019"
            },
            "def2": {
                "definition": "A series of steps through which particular inputs can be turned into outputs",
                "citation": "(Ada Lovelace Institute, AINOW, and Open Government Partnership 2021)",
                "link": "AINOW-2021"
            },
            "def3": {
                "definition": "Aa series of steps that allow you to perform a particular task.",
                "citation": "(Onuoha and Nucera 2018)",
                "link": "Peoples-Guide-2018"
            }
        }
    },
    "algorithmic-literacy": {
        "name": "algorithmic literacy",
        "definitions": {
            "def1": {
                "definition": "An understanding of algorithmic mechanisms and the ability to think critically about the social implications of algorithmic decision-making",
                "citation": "(Raine and Anderson 2017)",
                "link": "Raine-Anderson-2017"
            }
        }
    },
    "automated-decision-making": {
        "name": "automated decision-making",
        "definitions": {
            "def1": {
                "definition": "A system that uses automated reasoning to aid or replace a decision-making process that would otherwise be performed by humans... All automated decision systems are designed by humans and involve some degree of human involvement in their operation. Humans are ultimately responsible for how a system receives its inputs (e.g. who collects the data that feeds into a system), how the system is used, and how a system's outputs are interpreted and acted on",
                "citation": "(AINOW 2018)",
                "link": "AINOW-2018"
            }
        }
    },
    "bias": {
        "name": "bias",
        "definitions": {
            "def1": {
                "definition": "Bias to refer to cases where computer systems 'systematically and unfairly discriminate against certain individuals or groups of individuals in favor of others'",
                "citation": "(Friedman and Nissenbaum 1996)",
                "link": "Friedman-Nissenbaum-1996"
            }
        }
    },
    "disparate-impact": {
        "name": "disparate impact",
        "definitions": {
            "def1": {
                "definition": "Disparate impact refers to policies or practices that are facially neutral but have a disproportionately adverse impact on protected classes",
                "citation": "(Barocas and Selbst 2016)",
                "link": "Barocas-Selbst-2016"
            }
        }
    },
    "fnr": {
        "name": "false negative rate",
        "definitions": {
            "def1": {
                "definition": "",
                "citation": "",
                "link": ""
            }
        }
    },
    "fpr": {
        "name": "false positive rate",
        "definitions": {
            "def1": {
                "definition": "",
                "citation": "",
                "link": ""
            }
        }
    },
    "sociotechnical": {
        "name": "sociotechnical",
        "definitions": {
            "def1": {
                "definition": "Systems that consist of a combination of technical and social components",
                "citation": "(Selbst et al. 2019)",
                "link": "Selbst-2019"
            }
        }
    },
    "stakeholder": {
        "name": "stakeholder",
        "definitions": {
            "def1": {
                "definition": "People impacted directly or indirectly by a system",
                "citation": "(Bender and Friedman 2018)",
                "link": "Bender-Friedman-2018"
            }
        }
    },
    "mathematical-fairness": {
        "name": "mathematical fairness",
        "definitions": {
            "def1": {
                "definition": "Formal mathematical constructions of legal concepts such as \"equal protection\" and \"disparate impact\"",
                "citation": "(Movva 2021)",
                "link": "Movva-2021"
            }
        }
    }
}

export function Content() {
    return(
        <div id="Glossary">
            <div className="Content One-Column">
                {Object.keys(glossary).map((term, index) => {
                    return(
                        <div key={index} className="Term-Container Container">
                            <h3 className="Term-Name">{glossary[term].name}</h3>
                            {
                                Object.keys(glossary[term].definitions).map((def, index) => {
                                    return(
                                        <p key={index}>
                                            <span className="Term-Definition">{glossary[term].definitions[def].definition}</span>
                                            <NavLink className="Term-Citation" to="/Resources"> {glossary[term].definitions[def].citation}</NavLink>
                                        </p>
                                    )
                                }) 
                            }                            
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default function Glossary({config, modules}) {

    let navigate = useNavigate();

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar-Left">
                    <Description config={config}/>
                </div>
                <Content />
                <div className="Sidebar-Right">
                    <div className="Button-Container-Right">
                        <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>back</Button>
                    </div>
                    <Navigation id="glossary" modules={modules}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
