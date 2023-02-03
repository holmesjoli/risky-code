import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

const literature = {

    "AINOW-2018": {
        "inline-citation": "(AINOW 2018)",
        "reference": 'AINOW. 2018. "Algorithmic Accountability Policy Toolkit."'
    },
    "Barocas-Selbst-2016": {
        "inline-citation": "(Barocas and Selbst 2016)",
        "reference": "Barocas, Solon, and Andrew D Selbst. 2016. \'Big Data's Disparate Impact.\' California Law Review 104 (3): 671-732."
    },
    "Bender-Friedman-2018": {
        "inline-citation": "(Bender and Friedman 2018)",
        "reference": "Bender, Emily M., and Batya Friedman. 2018. \'Data Statements for Natural Language Processing: Toward Mitigating System Bias and Enabling Better Science.\' Transactions of the Association for Computational Linguistics 6: 587-604."
    },
    "Benjamin-2019": {
        "inline-citation": "(Benjamin 2019)",
        "reference": "Benjamin, Ruha. 2019. Race After Technology: Abolitionist Tools for the New Jim Crow. Medford, MA: Polity Press."
    },
    "Friedman-Nissenbaum-1996": {
        "inline-citation": "(Friedman and Nissenbaum 1996)",
        "reference": 'Friedman, Batya, and Helen Nissenbaum. 1996. "Bias in Computer Systems." ACM Transactions on Information Systems 14 (3): 330-47.'
    },
    "Narayanan-2018": {
        "inline-citation": "(Narayanan, 2018)",
        "reference": 'Narayanan, Arvind. 2018. "Tutorial: 21 Fairness Definitions and Their Politics."'
    },
    "Selbst-2019": {
        "inline-citation": "(Selbst et al. 2019)",
        "reference": "Selbst, Andrew, Danah Boyd, Sorelle Friedler, Suresh Venkatasubramanian, and Janet Vertesi. 2019. \'Fairness and Abstraction in Sociotechnical Systems.\' In Proceedings of the Conference on Fairness, Accountability, and Transparency, 59-68. FAT '19. ACM."
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
            <h2>resources</h2>
            <div className="Content">
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

export default function Resources() {
    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar">
                    <Navigation/>
                </div>
                <Content />
            </div>
            <Footer/>
        </div>
    )
}