import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Model from "../../components/Model";
import { Actual } from "../../components/Legend";
import { updateCard, Card } from '../../components/Card'; 
import { runRegression, PredictiveOutcomes, LaundryItemPredicted } from "../../components/Regression";
import { terms, VARIABLES } from '../../utils/global';
import Progress from "../../components/Progress";
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import { RoleShort } from "../../components/Role";
import Overlay from "../../components/Overlay";
import { importImages } from "../../components/Helper";

function Information() {
    return (
        <div className="Two-Column Margin-Top">
            <PredictiveOutcomes/>
        </div>
    )
}

function DataModel({items}) {

    const images = importImages();

    return (
        <table>
           	<thead>
                <tr>
                    <th><h4 className="No-Margin-Bottom">Item</h4></th>
                    <th><h4 className="No-Margin-Bottom">Delicate</h4></th>
                    <th><h4 className="No-Margin-Bottom">Dry clean</h4></th>
                    <th><h4 className="No-Margin-Bottom">Pastel</h4></th>
                    <th><h4 className="No-Margin-Bottom">Print</h4></th>
                    <th><h4 className="No-Margin-Bottom">White</h4></th>
                    <th><h4 className="No-Margin-Bottom">Classified</h4></th>
                </tr>
		    </thead>
            <tbody>

                {items.filter(d => d.id < 5).map(function(d) {
                    return(<tr key={d.id}>
                        <td><img src={images[Object.keys(images)[d.id]]} alt="An item of clothing" width="100" height="50" ></img></td>
                        <td>{d.delicate ? "True": "False"}</td>
                        <td>{d.dryCleanOnly ? "True": "False"}</td>
                        <td>{d.pastel ? "True": "False"}</td>
                        <td>{d.print ? "True": "False"}</td>
                        <td>{d.white ? "True": "False"}</td>
                        <td>{d.column }</td>
                    </tr>)
                })}
            </tbody>
        </table>   
    );

}

export function Content({variables, setVariables, items, setItems, modules}) {

    useEffect(() => {
            runRegression(items, setItems, variables);
            updateCard(items, variables);
    }, [items, variables]);

    return(
        <div className="Content No-Padding-Top">
            <div className="One-Column-Three5">
                <div>
                    <div className=''>
                        {/* <h3 className="Small-Margin">interact</h3> */}
                        <div>
                            <Model variables={variables} setVariables={setVariables}/>
                        </div>
                    </div>
                </div>
                <div className="">
                    {/* <h3 className="Small-Margin">visualize</h3> */}
                    <Card items={items}/>
                    <Information items={items} variables={variables}/>
                </div>
            </div>
        </div>
    )
}

export default function Train({config, user, variables, setVariables, items, setItems, modules, rules, state, remaining}) {

    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (remaining === 0) {
            let path = `/`;
            navigate(path);
        }
    }, [state, remaining])

    let navigate = useNavigate();
    const routeNext = () => {
      let path = `/Optimize`; 
      navigate(path);
    };

    const routeBack = () => {
      let path = `/Classify`; 
      navigate(path);
    };

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="App">
            {isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary">
                    <h3 className="Page-Title Margin-Bottom">algorithmic training</h3>
                    <div className="Two-Column-Three">
                        <DataModel items={items}/>
                        <RightSideBar>
                            <div className="Container2">
                                <h4 className="Small-Margin">learn</h4>
                                <p>The second step of algorithmic prediction is to <span className="Semi-Bold">train</span> a predictive model. A predictive model is a computational interpretation of an algorithm's rules based on data.</p>
                                <p>We will train a predictive model called Laundry AID. It will guess if an item belongs in the cold water load according to your rules from the last module.</p>
                                <ul className="Margin-Bottom">
                                    <li>{rules.rule1}</li>
                                    <li>{rules.rule2}</li>
                                    <li>{rules.rule3}</li>
                                </ul>
                                <p>All of the data in Laundry AID are called <span className="Emphasis">boolean</span> variables, meaning they contain two possible values — true or false.</p>
                                <p className="No-Margin-Bottom">To train the model add data variables to the model that you think will be predictive of the outcome variable <span className="Emphasis">cold water load</span>.</p>
                                </div>
                            <NextButtonOverlay toggleOverlay={toggleOverlay} className="Purple"/>
                        </RightSideBar>
                    </div>
                </div>
            </div>
        </Overlay>:
        <></>
        }
        <Header/>
        <div className="Main">
            <LeftSideBar>
                <Description title={config.title} id={config.id} modules={modules}>
                    <p>To train Laundry AID, drag one or more variables from data variables to model variables that you think are predictive of <span className="Emphasis">cold water load</span>. This will automatically run a statistical model to predict the results.</p>
                    <p>Laundry rules:</p>
                    <ul className="Margin-Bottom">
                        <li>{rules.rule1}</li>
                        <li>{rules.rule2}</li>
                        <li>{rules.rule3}</li>
                    </ul>
                    <p>Add or remove variables from the model to see how the predictive probabilities change.</p>
                </Description>
                <div className="Margin-Bottom Bottom-Rule Padding-Bottom">
                    <h3>Navigation</h3>
                    <NextButton routeNext={routeNext} className="Purple"/>
                    <div className="Button-Container-Right">
                        <BackButton routeBack={routeBack}/>
                        <Progress id={config.id} modules={modules} className="Purple"/>
                    </div>
                </div>
                <h3>Additional Information</h3>
                <RoleShort moduleName="prediction"/>
                <Terminology margin="Margin-Large-Bottom" className="Purple">
                    <Term term={terms['algorithm']}/>
                    <Term term={terms['data-variable']}/>
                    <Term term={terms['model-variable']}/>
                    <Term term={terms['outcome-variable']}/>
                    <Term term={terms['predictive-model']}/>
                    <Term term={terms['predictive-probability']}/>
                </Terminology>
            </LeftSideBar>
            <Content variables={variables} setVariables={setVariables} items={items} setItems={setItems} modules={modules}/>
        </div>
        <Footer/>
    </div>
    )
}
