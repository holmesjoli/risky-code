import { useNavigate, NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import Description from '../components/Description';
import Progress from '../components/Progress';
import Header from '../components/Header';
import Footer from '../components/Footer';

const literature = {

    "ADA-2018": {
        "inline-citation": "(ADA 2018)",
        "reference": 'Ada Lovelace Institute, AINOW, and Open Government Partnership. 2017. \"Algorithmic Accountability for the Public Sector.\"',
        "url": "https://www.opengovpartnership.org/wp-content/uploads/2021/08/algorithmic-accountability-public-sector.pdf"
    },
    "AINOW-2018": {
        "inline-citation": "(AINOW 2018)",
        "reference": 'AINOW. 2018. "Algorithmic Accountability Policy Toolkit."',
        "url": "https://ainowinstitute.org/aap-toolkit.pdf"
    },
    "Angwin-2016": {
        "inline-citation": "(Angwin et al. 2016)",
        "reference": 'Angwin, Julia, Jeff Larson, Surya Mattu, and Lauren Kirchner. 2016. \"Machine Bias: There\'s Software Used across the Country to Predict Future Criminals. It\'s Biased against Blacks.\" ProPublica, May 23, 2016.',
        "url": "https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing"
    },
    "Barocas-Selbst-2016": {
        "inline-citation": "(Barocas and Selbst 2016)",
        "reference": "Barocas, Solon, and Andrew D Selbst. 2016. \"Big Data's Disparate Impact.\" California Law Review 104 (3): 671-732.",
        "url": "https://www.californialawreview.org/wp-content/uploads/2016/06/2Barocas-Selbst.pdf"
    },
    "Bender-Friedman-2018": {
        "inline-citation": "(Bender and Friedman 2018)",
        "reference": "Bender, Emily M., and Batya Friedman. 2018. \"Data Statements for Natural Language Processing: Toward Mitigating System Bias and Enabling Better Science.\" Transactions of the Association for Computational Linguistics 6: 587-604.",
        "url": "https://aclanthology.org/Q18-1041.pdf"
    },
    "Benjamin-2019": {
        "inline-citation": "(Benjamin 2019)",
        "reference": "Benjamin, Ruha. 2019. Race After Technology: Abolitionist Tools for the New Jim Crow. Medford, MA: Polity Press.",
        "url": "https://www.ruhabenjamin.com/race-after-technology"
    },
    "Corbett-Davies-2016": {
        "inline-citation": "(Corbett-Davies et al. 2016)",
        "reference": "Corbett-Davies, Sam, Emma Pierson, Avi Feller, and Sharad Goel. 2016. \"A Computer Program Used for Bail and Sentencing Decisions Was Labeled Biased against Blacks. It\'s Actually Not That Clear: The Tool Called COMPAS May Be Biased. But It's Hard to Tell.\" Washington Post - Blogs.",
        "url": "https://www.washingtonpost.com/news/monkey-cage/wp/2016/10/17/can-an-algorithm-be-racist-our-analysis-is-more-cautious-than-propublicas/"
    },
    "Dipshan-2020": {
        "inline-citation": "(Dipshan and Hudgins, 2020)",
        "reference": "Dipshan, Rhys, and Victoria Hudgins. 2020. \"The Most Widely Used Risk Assessment Tool in Each U.S State.\" The Most Widely Used Risk Assessment Tool in Each U.S State (blog). 2020. https://www.law.com/legaltechnews/2020/07/13/the-most-widely-used-risk-assessment-tool-in-each-u-s-state/?slreturn=20230120095740.",
        "url": "https://www.law.com/legaltechnews/2020/07/13/the-most-widely-used-risk-assessment-tool-in-each-u-s-state/?slreturn=20230120095740"
    },
    "Eubanks-2018": {
        "inline-citation": "(Eubanks 2018)",
        "reference": "Eubanks, Virginia. 2018. \"Automating Inequality: How High-Tech Tools Profile, Police, and Punish the Poor.\" New York, NY: St. Martin\'s Press.",
        "url": "https://virginia-eubanks.com/automating-inequality/"
    },
    "Flores-2016": {
        "inline-citation": "(Flores et al. 2016)",
        "reference": "Flores, Anthony W, Kristin Bechtel, and Christopher T Lowenkamp. 2016. \"False Positives, False Negatives, and False Analyses: A Rejoinder to \'Machine Bias: There\'s Software Used across the Country to Predict Future Criminals, and It\'s Biased against Blacks.\'\" Federal Probation 80 (2): 38-.",
        "url": "https://www.uscourts.gov/federal-probation-journal/2016/09/false-positives-false-negatives-and-false-analyses-rejoinder"
    },
    "Friedman-Nissenbaum-1996": {
        "inline-citation": "(Friedman and Nissenbaum 1996)",
        "reference": 'Friedman, Batya, and Helen Nissenbaum. 1996. "Bias in Computer Systems." ACM Transactions on Information Systems 14 (3): 330-47.',
        "url": "https://dl.acm.org/doi/10.1145/230538.230561"
    },
    "Movva-2021": {
        "inline-citation": "(Movva 2021)",
        "reference": 'Movva, Rajiv. 2021. \"Fairness Deconstructed: A Sociotechnical View of \'Fair\' Algorithms in Criminal Justice.\"',
        "url": "https://arxiv.org/abs/2106.13455"
    },
    "Narayanan-2018": {
        "inline-citation": "(Narayanan, 2018)",
        "reference": 'Narayanan, Arvind. 2018. "Tutorial: 21 Fairness Definitions and Their Politics."',
        "url": "https://www.youtube.com/embed/jIXIuYdnyyk"
    },
    "Obermeyer-2019": {
        "inline-citation": "(Obermeyer et al., 2019)",
        "reference": "Obermeyer, Ziad, Brian Powers, Christine Vogeli, and Sendhil Mullainathan. 2019. \"Dissecting Racial Bias in an Algorithm Used to Manage the Health of Populations.\" Science (American Association for the Advancement of Science) 366 (6464): 447–53.",
        "url": "https://www.science.org/doi/10.1126/science.aax2342"
    },
    "Oneil-2016": {
        "inline-citation": "(O\'Neil, 2016)",
        "reference": "O\'Neil, Cathy. 2016. Weapons of Math Destruction: How Big Data Increases Inequality and Threatens Democracy. 1st ed. New York: Penguin Random House LLC.",
        "url": "https://dl-acm-org.ezproxy.neu.edu/doi/10.5555/3002861"
    },
    "Onuoha-2018": {
        "inline-citation": "(Onuoha and Nucera, 2018)",
        "reference": "Onuoha, Mimi, and Diana Nucera. 2018. A People\'s Guide to AI. Print.",
        "url": "https://mimionuoha.com/a-peoples-guide-to-ai"
    },
    "Raine-Anderson-2017": {
        "inline-citation": "(Raine and Anderson 2017)",
        "reference": "Raine, Lee, and Janna Anderson. 2017. \"Theme 7: The Need Grows for Algorithmic Literacy, Transparency and Oversight.\" Pew Research Center, 2017. https://www.pewresearch.org/internet/2017/02/08/theme-7-the-need-grows-for-algorithmic-literacy-transparency-and-oversight/.",
        "url": "https://www.pewresearch.org/internet/2017/02/08/theme-7-the-need-grows-for-algorithmic-literacy-transparency-and-oversight/"
    },
    "Selbst-2019": {
        "inline-citation": "(Selbst et al. 2019)",
        "reference": "Selbst, Andrew, Danah Boyd, Sorelle Friedler, Suresh Venkatasubramanian, and Janet Vertesi. 2019. \"Fairness and Abstraction in Sociotechnical Systems.\" In Proceedings of the Conference on Fairness, Accountability, and Transparency, 59-68. FAT '19. ACM.",
        "url": "https://dl.acm.org/doi/10.1145/3287560.3287598"
    },
    "Verma-Rubin-2018": {
        "inline-citation": "(Verma and Rubin 2019)",
        "reference": "Verma, Sahil, and Julia Rubin. 2018. \"Fairness Definitions Explained.\" In 2018 IEEE/ACM International Workshop on Software Fairness (FairWare), 1-7. FairWare \'18. ACM.",
        "url": "https://fairware.cs.umass.edu/papers/Verma.pdf"
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
            <div className="Content One-Column">
                <div className="Literature-Container Container">
                    <h3>Literature</h3>
                    <div>
                        {Object.keys(literature).map((index) => {
                            return(
                                <p><a key={index} className="Literature-Reference" href={literature[index].url} target="_blank">{literature[index].reference}</a>
                               </p>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="Resources-Container Container">
                    <h3>AI Explainability Resources</h3>
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

export default function Resources({config, modules}) {

    let navigate = useNavigate();

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar-Left">
                    <Description config={config}/>
                    <div className="Button-Container-Left">
                        <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>back</Button>
                    </div>
                </div>
                <Content />
                <div className="Sidebar-Right">
                    <Progress id="resources" modules={modules}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}