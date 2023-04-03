import * as d3 from 'd3';

export const config = { 
    "Predict": {
        "name": "Predict",
        "id": "predict",
        "size": "Large",
        "navLink": "/Prediction",
        "group": "predict"
    },
    "Classify": {
        "name": "Classify",
        "id": "classify",
        "size": "Small",
        "navLink": "/Classify",
        "group": "predict",
        "title": "classify"
    },
    "Train": {
        "name": "Train",
        "id": "train",
        "size": "Small",
        "navLink": "/Train",
        "group": "predict",
        "title": "train"
    },
    "Optimize": {
        "name": "Optimize",
        "id": "optimize",
        "size": "Small",
        "navLink": "/Optimize",
        "group": "predict",
        "title": "optimize"
    },
    "Fairness": {
        "name": "Algorithmic Fairness",
        "id": "fairness",
        "size": "Large",
        "navLink": "/Fairness",
        "group": "fairness"
    },
    "COMPAS": {
        "name": "COMPAS",
        "id": "compas",
        "size": "small",
        "navLink": "/COMPAS",
        "group": "fairness",
        "title": "compas' data"
    },
    "Calibration": {
        "name": "Calibration",
        "id": "calibration",
        "size": "Small",
        "navLink": "/Calibration",
        "group": "fairness",
        "title": "calibration"
    },
    "Error": {
        "name": "Error Rates",
        "id": "error",
        "size": "Small",
        "navLink": "/Error",
        "group": "fairness",
        "title": "error rates"
    },
    "Stakeholders": {
        "name": "Stakeholder Mapping",
        "id": "stakeholderMapping",
        "size": "Large",
        "navLink": "/StakeholderMapping",
        "group": "stakeholders",
        "title": "stakeholder mapping"
    },
    "StreetBump": {
        "name": "Street Bump",
        "id": "street",
        "size": "Small",
        "navLink": "/StreetBump",
        "group": "stakeholders",
        "title": "street bump stakeholders"
    },
    "Deliberation": {
        "name": "Deliberation",
        "id": "deliberation",
        "size": "Large",
        "navLink": "/Deliberation",
        "group": "deliberation"
    }, 
    "Policy": {
        "name": "Policy",
        "id": "policy",
        "size": "Small",
        "navLink": "/Policy",
        "group": "deliberation",
        "title": "stakeholder mapping"
    }, 
    "Risk": {
        "name": "Risk Framework",
        "id": "risk",
        "size": "Small",
        "navLink": "/Risk",
        "group": "deliberation",
        "title": "risk framework"
    }
}

export const colors = {
    "text": {
        "primaryColor": "#FFFFFF"
    },
    "warning": {
        "primaryColor": "#d35171"
    }
}

export const MODEL_COLUMN_NAMES = {
    DATA_VARIABLES: 'data variables',
    MODEL_VARIABLES: 'model variables'
}

const {DATA_VARIABLES} = MODEL_COLUMN_NAMES;
export const VARIABLES = [
    {id: 1, name: 'print', columnName: 'print',  column: DATA_VARIABLES},
    {id: 2, name: 'pastel', columnName: 'pastel', column: DATA_VARIABLES},
    {id: 3, name: 'delicate', columnName: 'delicate', column: DATA_VARIABLES },
    {id: 4, name: 'dry clean', columnName: 'dryCleanOnly', column: DATA_VARIABLES },
    {id: 5, name: 'white', columnName: 'white', column: DATA_VARIABLES },
];

export const CLASSIFY_COLUMN_NAMES = {
    ITEM_LIST: '',
    CASE_TRUE: 'cold water load',
    CASE_FALSE: 'save for later load'
}

const {ITEM_LIST} = CLASSIFY_COLUMN_NAMES;

export const CARDS = [
    {id: 0, name: 'Card 0', column: ITEM_LIST, item_type: "pants", print: false, pastel: false, delicate: false, item_color: "blue", dryCleanOnly: true, white: false, src: "Asset 14.svg"},
    {id: 1, name: 'Card 1', column: ITEM_LIST, item_type: "pants", print: false, pastel: false, delicate: true, item_color: "orange", dryCleanOnly: false, white: false, src: "Asset 16.svg"},
    {id: 2, name: 'Card 2', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, delicate: false, item_color: "black", dryCleanOnly: false, white: false, src: "Asset 12.svg"},
    {id: 3, name: 'Card 3', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, delicate: false, item_color: "green", dryCleanOnly: false, white: false, src: "Asset 71.svg"},
    {id: 4, name: 'Card 4', column: ITEM_LIST, item_type: "pants", print: false, pastel: false, delicate: false, item_color: "black", dryCleanOnly: false, white: false, src: "Asset 2.svg"},
    {id: 5, name: 'Card 5', column: ITEM_LIST, item_type: "shirt", print: false, pastel: true, delicate: false, item_color: "pink", dryCleanOnly: false, white: false, src: "Asset 20.svg"},
    {id: 6, name: 'Card 6', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, delicate: false, item_color: "white", dryCleanOnly: false, white: true, src: "Asset 25.svg"},
    {id: 7, name: 'Card 7', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, delicate: false, item_color: "red", dryCleanOnly: false, white: false, src: "Asset 3.svg"},
    {id: 8, name: 'Card 8', column: ITEM_LIST, item_type: "pants", print: false, pastel: false, delicate: true, item_color: "blue", dryCleanOnly: true, white: false, src: "Asset 38.svg"},
    {id: 9, name: 'Card 9', column: ITEM_LIST, item_type: "hoodie", print: true, pastel: false, delicate: false, item_color: "blue", dryCleanOnly: false, white: false, src: "Asset 33.svg"},
    {id: 10, name: 'Card 10', column: ITEM_LIST, item_type: "shirt", print: true, pastel: false, delicate: false, item_color: "white", dryCleanOnly: false, white: true, src: "Asset 87.svg"},
    {id: 11, name: 'Card 11', column: ITEM_LIST, item_type: "hoodie", print: false, pastel: false, delicate: false, item_color: "pink", dryCleanOnly: false, white: false, src: "Asset 45.svg"},
    {id: 12, name: 'Card 12', column: ITEM_LIST, item_type: "shorts", print: false, pastel: false, delicate: false, item_color: "white", dryCleanOnly: false, white: true, src: "Asset 55.svg"},
    {id: 13, name: 'Card 13', column: ITEM_LIST, item_type: "shirt", print: false, pastel: true, delicate: false, item_color: "yellow", dryCleanOnly: false, white: false, src: "Asset 6.svg"},
    {id: 14, name: 'Card 14', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, delicate: false, item_color: "blue", dryCleanOnly: false, white: false, src: "Asset 69.svg"},
    {id: 15, name: 'Card 15', column: ITEM_LIST, item_type: "shirt", print: false, pastel: true, delicate: false, item_color: "yellow", dryCleanOnly: false, white: false, src: "Asset 6.svg"},
    {id: 16, name: 'Card 16', column: ITEM_LIST, item_type: "shorts", print: false, pastel: false, delicate: false, item_color: "red", dryCleanOnly: true, white: false, src: "Asset 8.svg"},
    {id: 17, name: 'Card 17', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, delicate: false, item_color: "black", dryCleanOnly: false, white: false, src: "Asset 28.svg"},
    {id: 18, name: 'Card 18', column: ITEM_LIST, item_type: "pants", print: true, pastel: false, delicate: false, item_color: "white", dryCleanOnly: false, white: true, src: "Asset 27.svg"},
    {id: 19, name: 'Card 19', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, delicate: false, item_color: "white", dryCleanOnly: false, white: true, src: "Asset 99.svg"}
];

export const STAKEHOLDER_COLUMN_NAMES = {
    STAKEHOLDER: 'stakeholder list',
    DIRECT: 'direct stakeholder',
    INDIRECT: 'indirect stakeholder',
    EXCLUDED: 'excluded stakeholder'
}

const {STAKEHOLDER} = STAKEHOLDER_COLUMN_NAMES;

export const stakeholderGroups = [
    {id: 1, name: 'end user', column: STAKEHOLDER, group: 'direct'},
    {id: 2, name: 'advocacy groups', column: STAKEHOLDER, group: 'indirect'},
    {id: 3, name: 'designer', column: STAKEHOLDER, group: 'direct'},
    {id: 4, name: 'engineer', column: STAKEHOLDER, group: 'direct'},
    {id: 5, name: 'families of end users', column: STAKEHOLDER, group: 'indirect'},
    {id: 6, name: 'regulators', column: STAKEHOLDER, group: 'indirect'},
    {id: 7, name: 'administrators', column: STAKEHOLDER, group: 'direct'},
    {id: 8, name: 'society at large', column: STAKEHOLDER, group: 'indirect'}
];


// Creates a colorScales for different types of variables
export function colorScale() {

    const scale = d3.scaleOrdinal()
        .domain([2, 4, 3, 1, 0])
        .range(["#0d0887", "#a41e9a", "#d35171", "#f0804e", "#000000"]);

    return scale;
}

export function getModelVariables(variables) {
    const { MODEL_VARIABLES } = MODEL_COLUMN_NAMES;
    const m = variables.filter((d) => d.column === MODEL_VARIABLES).map((d) => d.columnName);

    return m;
}

export const visStyles = {

    "darkMode": {
        "highlightColor": "#9A00FF",
        "secondaryHighlightColor": "#cbcbcb",
        "textColor": "#868B90",
        "textHighlightColor": "#cbcbcb",
        "borderColor": "#868B90",
        "borderColorPrimary": "#272B30",
        "borderWidth": 1.5,
        "fillColor": "#131517",
        "fontSize": 11,
        "fontWeight": 400,
        "fontHighlightWeight": 500,
        "letterSpacing": ".4px",
        "linkColor": "#343940",
        "linkWidth": 1
    },
    "colorMode": {
        "colors": ["#9A00FF", "#F50141", "#ea21ad", "#FE4002", "#FD7B03", "#F3C010"],
        "highlightColor": "#FFFFFF",
        "secondaryHighlightColor": "#cbcbcb",
        "textColor": "#868B90",
        "textHighlightColor": "#cbcbcb",
        "borderColor": "#868B90",
        "borderColorPrimary": "#272B30",
        "borderWidth": 1.5,
        "fillColor": "#131517",
        "fontSize": 11,
        "fontWeight": 400,
        "fontHighlightWeight": 500,
        "letterSpacing": ".4px",
        "linkColor": "#343940",
        "linkWidth": 1
    }

}

export function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.4, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");

        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }
        }
    });
}

export const terms = {

    "aidm": {
        "title": "algorithmically informed decision-making",
        "definition": "A system that uses automated reasoning to aid or replace a decision-making process that humans would otherwise perform (AINOW 2018)."
    },
    "stat-model": {
        "title": "statistical model",
        "definition": "A mathematical representation for making predictions based on data."
    },
    "data-variable": {
        "title": "data variable",
        "definition": "A variable which is recorded in a datasheet"
    },
    "model-variable": {
        "title": "model variable",
        "definition": "A variable which is included in a statistical model"
    },
    "algorithm": {
        "title": "algorithm",
        "definition": "A series of steps that allow you to perform a particular task (Onuoha and Nucera 2018)."
    },
    "mathematical-fairness": {
        "title": "mathematical-fairness",
        "definition": 'Formal mathematical constructions of legal concepts such as "equal protection" and "disparate impact" (Movva 2021).'
    },
    "calibration": {
        "title": "calibration",
        "definition": "The percentage of people at each risk score who are in the positive is approximately equal for different demographics."
    },
    "fpr": {
        "title": "false positive rate",
        "definition": "The false positive rate is the probability of falsely rejecting the truth, simply triggering a false alarm expressed as a statistical rate."
    },
    "fnr": {
        "title": "false negative rate",
        "definition": "The false negative rate is the failure to raise a valid alarm expressed as a statistical rate."
    },
    "stakeholders": {
        "title": "stakeholders",
        "definition": "People, individuals or groups, impacted directly, indirectly, or excluded from an algorithmic system (Bender and Friedman 2018)."
    },
    "direct stakeholders": {
        "title": "direct stakeholders",
        "definition": "Directly interact with the algorithmic system. Examples include end users, designers, engineers, hackers, or administrators (Ballard et al. 2019)."
    },
    "indirect stakeholders": {
        "title": "indirect stakeholders",
        "definition": "Do not directly interact with the algorithmic system, but are impacted by its use. Examples include advocacy groups, families of end users, regulators, society at large (Ballard et al. 2019)."
    },
    "excluded stakeholders": {
        "title": "excluded stakeholders",
        "definition": "Those who cannot interact with the algorithmic system. Reasons include physical, cognitive, social, or situational constraints. Examples include low-vision users of a technology which is primarily accessed through vision (Ballard et al. 2019)."
    },
    "recidivism": {
        "title": "recidivism or reoffense",
        "definition": "A tendency to relapse into a previous condition or mode of behavior, especially relapse into criminal behavior."
    },
    "accuracy": {
        "title": "model accuracy",
        "definition": "Accuracy is a percent of how many predicted values match the actual values."
    },
    "predictive-model": {
        "title": "predictive model",
        "definition": "A computational interpretation of an algorithm's rules."
    },
    "predictive-probability": {
        "title": "predictive probability",
        "definition": "The probability of belonging to the positive class."
    },
    "decision-threshold": {
        "title": "decision threshold",
        "definition": "A threshold to turn a predictive probability into a decision/classification."
    },
    "outcome-variable": {
        "title": "outcome variable",
        "definition": "The variable that is being predicted by a predictive model."
    },
    "proxy-variable": {
        "title": "proxy variable",
        "definition": "A variable that is used as a proxy for another variable. For example, to arrests is often used as a proxy for reoffense."
    },
    "population-base-rate": {
        "title": "equal base rates",
        "definition": "Two groups have the same fraction of members in the positive class (Kleinberg et al., 2016)"
    }
}

export const highlightColorScale = d3.scaleOrdinal()
    .domain(["predict", "fairness", "stakeholders", "deliberation"])
    .range(["#9A00FF", "#9A00FF", "#9A00FF", "#9A00FF"]);
