import React from 'react';
import * as d3 from "d3";
import { useEffect } from 'react';
import { colors } from "../utils/global"

function ActualPredicted() {

    return(
        <div className="Legend">
            <h4>Legend</h4>
        </div>
    )
}

function Actual() {
    return(
        <div className="Legend">
            <h4>Legend</h4>
        </div>
    )
}

function Points() {

    const width = window.width, height = 40;

    // window.width
    const data = [{x: 10, y:10, name: "Correct"},
                  {x: 10, y:30, name: "Incorrect"}]

    const scaleFill = d3.scaleOrdinal()
        .domain(["Correct", "Incorrect"])
        .range(["#FFFFFF", colors.warning.primaryColor])

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
            .style("fill", colors.text.primaryColor)
            .style("font-size", "12px")

    }, [])


    return(
        <div className="Legend">
            <h4>Legend</h4>
            <h5>Predicted</h5>
            <div id='Legend-Visualization'></div>
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
