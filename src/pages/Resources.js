import Description from '../components/Description';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

const literature = {

    "ADA-2018": {
        "inline-citation": "(ADA 2018)",
        "reference": 'Ada Lovelace Institute, AINOW, and Open Government Partnership. 2017. \"Algorithmic Accountability for the Public Sector.\"'
    },
    "AINOW-2018": {
        "inline-citation": "(AINOW 2018)",
        "reference": 'AINOW. 2018. "Algorithmic Accountability Policy Toolkit."'
    },
    "Angwin-2016": {
        "inline-citation": "(Angwin et al. 2016)",
        "reference": 'Angwin, Julia, Jeff Larson, Surya Mattu, and Lauren Kirchner. 2016. \"Machine Bias: There\'s Software Used across the Country to Predict Future Criminals. It\'s Biased against Blacks.\" ProPublica, May 23, 2016.'
    },
    "Barocas-Selbst-2016": {
        "inline-citation": "(Barocas and Selbst 2016)",
        "reference": "Barocas, Solon, and Andrew D Selbst. 2016. \"Big Data's Disparate Impact.\" California Law Review 104 (3): 671-732."
    },
    "Bender-Friedman-2018": {
        "inline-citation": "(Bender and Friedman 2018)",
        "reference": "Bender, Emily M., and Batya Friedman. 2018. \"Data Statements for Natural Language Processing: Toward Mitigating System Bias and Enabling Better Science.\" Transactions of the Association for Computational Linguistics 6: 587-604."
    },
    "Benjamin-2019": {
        "inline-citation": "(Benjamin 2019)",
        "reference": "Benjamin, Ruha. 2019. Race After Technology: Abolitionist Tools for the New Jim Crow. Medford, MA: Polity Press."
    },
    "Corbett-Davies-2016": {
        "inline-citation": "(Corbett-Davies et al. 2016)",
        "reference": "Corbett-Davies, Sam, Emma Pierson, Avi Feller, and Sharad Goel. 2016. \"A Computer Program Used for Bail and Sentencing Decisions Was Labeled Biased against Blacks. It\'s Actually Not That Clear: The Tool Called COMPAS May Be Biased. But It's Hard to Tell.\" Washington Post - Blogs."
    },
    "Flores-2016": {
        "inline-citation": "(Flores et al. 2016)",
        "reference": "Flores, Anthony W, Kristin Bechtel, and Christopher T Lowenkamp. 2016. \"False Positives, False Negatives, and False Analyses: A Rejoinder to \'Machine Bias: There\'s Software Used across the Country to Predict Future Criminals, and It\'s Biased against Blacks.\'\" Federal Probation 80 (2): 38-."
    },
    "Friedman-Nissenbaum-1996": {
        "inline-citation": "(Friedman and Nissenbaum 1996)",
        "reference": 'Friedman, Batya, and Helen Nissenbaum. 1996. "Bias in Computer Systems." ACM Transactions on Information Systems 14 (3): 330-47.'
    },
    "Narayanan-2018": {
        "inline-citation": "(Narayanan, 2018)",
        "reference": 'Narayanan, Arvind. 2018. "Tutorial: 21 Fairness Definitions and Their Politics."'
    },
    "Onuoha-2018": {
        "inline-citation": "(Onuoha and Nucera, 2018)",
        "reference": "Onuoha, Mimi, and Diana Nucera. 2018. A People\'s Guide to AI. Print."
    },
    "Selbst-2019": {
        "inline-citation": "(Selbst et al. 2019)",
        "reference": "Selbst, Andrew, Danah Boyd, Sorelle Friedler, Suresh Venkatasubramanian, and Janet Vertesi. 2019. \"Fairness and Abstraction in Sociotechnical Systems.\" In Proceedings of the Conference on Fairness, Accountability, and Transparency, 59-68. FAT '19. ACM."
    }
}

const aiExplainability = {

    "AI-blindspot": {
        "name": "AI Blindspot Workshop",
        "link": "https://aiblindspot.media.mit.edu/"
    },
    "Peoples-Guide-AI": {
        "name": "A People's Guide to AI",
        "link": "https://mimionuoha.com/a-peoples-guide-to-ai"
    },
    "AI-Equity-Toolkit": {
        "name": "AI Equity Toolkit",
        "link": "https://www.aclu-wa.org/AEKit#:~:text=WHAT%20IS%20THE%20AEKit%3F,impacts%2C%20effectiveness%2C%20and%20oversight."
    },
    "AI-Fairer-Than-A-Judge": {
        "name": "Can you make AI fairer than a judge? Play our courtroom algorithm game",
        "link": "https://www.technologyreview.com/2019/10/17/75285/ai-fairer-than-judge-criminal-risk-assessment-algorithm/amp/"
    },
    "Survival-of-Best-Fit": {
        "name": "Survival of Best Fit",
        "link": "https://www.survivalofthebestfit.com/game/"
    }
}

export function Content() {
    return(
        <div id="Resources">
            <div className="Content Two-Column2">
                <div className="Literature-Container Container">
                    <h4>Literature</h4>
                    <div>
                        {Object.keys(literature).map((index) => {
                            return(
                                    <p key={index} className="Literature-Reference">{literature[index].reference}
                                    </p>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="Resources-Container Container">
                    <h4>AI Explainability Resources</h4>
                    <ul>
                        {Object.keys(aiExplainability).map((index) => {
                            return(
                                <li key={index} className="AI-Explainability-Reference">
                                    <a href={aiExplainability[index].link} target="_blank">{aiExplainability[index].name}</a>
                                </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default function Resources({config, modules, setModules}) {
    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar-Left">
                    <Description config={config}/>
                </div>
                <Content />
                <div className="Sidebar-Right">
                    <Navigation id="resources" modules={modules} setModules={setModules}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}