import React from 'react';
import * as d3 from "d3";

function ActualPredicted() {
    return(
        <div className="Legend">

        </div>
    )
}

function Actual() {
    return(
        <div className="Legend">

        </div>
    )
}

function Points() {

    const width = 280, height = 280;

    return(
        <div className="Legend">

        </div>
    )
}

class LegendContainer extends React.Component {

    constructor(componentID) {
        super(componentID);
        this.componentID = componentID;
        this.render();
    }

    getComponent() {
        let component;
        switch (this.componentID) {
            default:
                component = <ActualPredicted/>;
                break;
            case 'actual' :
                component = <Actual/>;
                break;
            case 'points' :
                component = <Points/>;
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


export default function Legend(componentID) {

    return (
        <LegendContainer componentID={componentID}/>
    )
}
