import React from 'react';
import * as d3 from "d3";
import { useEffect } from 'react';
import { visStyles } from "../utils/global"

export function ActualPredicted() {

    return(
        <div className="Legend Container Margin-Bottom">
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
                            <div className="Card-Flat "></div>
                            <div className="Card-Flat Predicted-False "></div>
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

export function Actual() {
    return(
        <div className="Legend Container Margin-Bottom">
            <h4 className="Small-Margin">legend</h4>
            <div>
                <h5 className="No-Margin-Top No-Margin-Bottom">Cold water load</h5>
                <div className="Row">
                    <div className="Text-Align-Center">
                        <h6 className="Text-Align-Center">Yes</h6>
                        <div className="Card-Flat"></div>
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

export function Points() {

    const width = window.width, height = 40;

    const data = [{x: 10, y:10, name: "Correct"},
                  {x: 10, y:30, name: "Incorrect"}]

    const style = "darkMode";
    const scaleFill = d3.scaleOrdinal()
        .domain(["Correct", "Incorrect"])
        .range(["#272B30", visStyles[style]["warningColor"]])

    useEffect(() => {
        const svg = d3.select("#Legend-Visualization")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        svg
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", ((d) => d.x))
            .attr("cy", ((d) => d.y))
            .attr("r", 5)
            .attr("fill", ((d) => scaleFill(d.name)))

        // TODO Center Text with circle
        svg
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("x", ((d) => d.x + 20))
            .attr("y", ((d) => d.y))
            .text(((d) => d.name))
            .style("fill", visStyles[style]["textColor"])
            .style("font-size", "12px")
            // .attr("text-anchor", "left")
            // .attr("alignment-baseline", "bottom")

    }, [])

    return(
        <div className="Container">
            <div className="Legend">
                <h4 className="Small-Margin">legend</h4>
                <h5 className="Small-Margin">Predicted</h5>
                <div id='Legend-Visualization'></div>
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


export default function Legend(componentType) {

    return (
        <LegendContainer componentType={componentType}/>
    )
}

