import React from 'react';
import * as d3 from "d3";
import { useEffect } from 'react';
import { visStyles } from "../utils/global";

export function ActualPredicted() {

    return(
        <div className="Legend Container No-Margin-Bottom">
            <h4 className="Small-Margin">legend</h4>
            <div className="my-grid">
                <div>
                    <h5 className="section-title0">Actual cold water load</h5>
                </div>
                <div>
                    <h5 className="section-title2 No-Margin-Top">Model predicted</h5>
                    <div className="my-grid">
                        <h6 className="section-title">Yes</h6>
                        <div className="my-grid2">
                            <h6 className="section-title2 No-Margin-Top">Correctly</h6>
                            <h6 className="section-title2 No-Margin-Top">Incorrectly</h6>
                            <div className="Card-Flat Case-True"></div>
                            <div className="Card-Flat Case-True Predicted-False "></div>
                        </div>
                    </div>
                    <div id="Predicted-Container" className="my-grid">
                        <h6 className="section-title1">No</h6>
                        <div className="my-grid2">
                            <div className="Card-Flat Case-False "></div>
                            <div className="Card-Flat Predicted-False Case-False"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Predicted({className=""}) {

    return(
        <div className="Legend No-Margin-Bottom">
            <div className={className}>
                <h4 className="Small-Margin">legend</h4>
                <div>
                    <h5 className="No-Margin-Top No-Margin-Bottom">Model prediction</h5>
                    <div className="Row">
                        <div className="Text-Align-Center">
                            <h6 className="Text-Align-Center">Correctly</h6>
                            <div className="Card-Flat"></div>
                        </div>
                        <div className="Text-Align-Center">
                            <h6 className="Text-Align-Center">Incorrectly</h6>
                            <div className="Card-Flat Predicted-False"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Actual() {
    return(
        <div className="Legend Container">
            <h4 className="Small-Margin">legend</h4>
            <div>
                <h5 className="No-Margin-Top No-Margin-Bottom">Cold water load</h5>
                <div className="Row">
                    <div className="Text-Align-Center">
                        <h6 className="Text-Align-Center ">Yes</h6>
                        <div className="Card-Flat Case-True"></div>
                    </div>
                    <div className="Text-Align-Center">
                        <h6 className="Text-Align-Center">No</h6>
                        <div className="Card-Flat Case-False"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

class LegendContainer extends React.Component {

    constructor(componentType) {
        super(componentType);
        this.componentType = componentType.componentType.componentType;
        this.render();
    }

    getComponent() {
        let component;
        switch (this.componentType) {
            default:
                component = <ActualPredicted/>;
                break;
            case 'actual' :
                component = <Actual/>;
                break;
        }
        return component;
    };

    render() {
        return(
            <div className="Legend-Container">
                {this.getComponent()}
            </div>
        );
    }
}


export default function Legend(componentType) {

    return (
        <LegendContainer componentType={componentType}/>
    )
}

