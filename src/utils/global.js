import * as d3 from 'd3';

export const config = {
    "About": {
        "id": "about",
        "title": "about",
        "descr": "About page"
    },
    "Glossary": {
        "id": "glossary",
        "title": "glossary"
    },
    "Resources": {
        "id": "resources",
        "title": "resources"
    },
    "Contact": {
        "id": "contact",
        "title": "Contact",
        "descr": "Contact page"
    },
    "Classify": {
        "id": "classify",
        "title": "classify",
        "subtitle": "",
    },
    "Optimize": {
        "id": "optimize",
        "title": "optimize",
        "subtitle": "optimize the algorithm for accuracy"
    },
    "Train": {
        "id": "train",
        "title": "train",
        "subtitle": "train the algorithm to predict the hot water load"
    },
    "Calibration": {
        "id": "calibration",
        "title": "calibration",
        "subtitle": "learn about calibration definition of algorithmic fairness",
        "descr": ""
    },
    "Error": {
        "id": "error",
        "title": "error rates",
        "subtitle": "minimize the error rates"
    },
    "Decision": {
        "id": "decision",
        "title": "decision aid"
    },
    "Risk": {
        "id": "risk",
        "title": "risk framework"
    },
    "Stakeholders": {
        "id": "stakeholders",
        "title": "stakeholder mapping",
        "subtitle": "brainstorm a policy scenario where algorithmically informed decision-making is or could be implemented."
    },
    "COMPAS": {
        "id": "compas",
        "title": "compas",
        "subtitle": "explore different versions of algorithmic fairness",
    },
    "StreetBump": {
        "id": "street",
        "title": "street bump",
        "subtitle": "learn about the street bump application"
    },
    "Health": {
        "id": "health",
        "title": "health",
        "subtitle": "learn about the street bump application"
    }
}

export const navigationData = [ 
    {
        "name": "Predict",
        "id": "predict",
        "size": "Large",
        "navLink": "/Classify"
    },
    {
        "name": "Classify",
        "id": "classify",
        "size": "Small",
        "navLink": "/Classify"
    },
    {
        "name": "Train",
        "id": "train",
        "size": "Small",
        "navLink": "/Train" 
    },
    {
        "name": "Optimize",
        "id": "optimize",
        "size": "Small",
        "navLink": "/Optimize"
    },
    {
        "name": "Algorithmic Fairness",
        "id": "fairness",
        "size": "Large",
        "navLink": "/COMPAS"
    },
    {
        "name": "COMPAS",
        "id": "compas",
        "size": "small",
        "navLink": "/COMPAS"
    },
    {
        "name": "Calibration",
        "id": "calibration",
        "size": "Small",
        "navLink": "/Calibration"
    },
    {
        "name": "Error Rates",
        "id": "error",
        "size": "Small",
        "navLink": "/Error"
    },
    {
        "name": "Case Studies",
        "id": "cases",
        "size": "Large",
        "navLink": "/StreetBump"
    },
    {
        "name": "Street Bump",
        "id": "street",
        "size": "Small",
        "navLink": "/StreetBump"
    },
    {
        "name": "Health",
        "id": "health",
        "size": "Small",
        "navLink": "/Health"
    }, {
        "name": "Deliberation",
        "id": "deliberation",
        "size": "Large",
        "navLink": "/Stakeholders"
    }, {
        "name": "Stakeholder Mapping",
        "id": "stakeholders",
        "size": "Small",
        "navLink": "/Stakeholders"
    }, {
        "name": "Risk Framework",
        "id": "risk",
        "size": "Small",
        "navLink": "/Risk"
    }, {
        "name": "Decision Aid",
        "id": "decision",
        "size": "Small",
        "navLink": "/Decision"
    }
]

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
    {id: 1, name: 'item type', columnName: 'item_type', column: DATA_VARIABLES},
    {id: 2, name: 'print', columnName: 'print',  column: DATA_VARIABLES},
    {id: 3, name: 'pastel', columnName: 'pastel', column: DATA_VARIABLES},
    {id: 4, name: 'delicate', columnName: 'delicate', column: DATA_VARIABLES },
    // {id: 5, name: 'Item color', columnName: 'item_color', column: DATA_VARIABLES },
    {id: 6, name: 'care type', columnName: 'cleanType', column: DATA_VARIABLES },
    {id: 7, name: 'white', columnName: 'white', column: DATA_VARIABLES },
];

export const CLASSIFY_COLUMN_NAMES = {
    ITEM_LIST: '',
    CASE_TRUE: 'hot water load',
    CASE_FALSE: 'save for later load'
}

const {ITEM_LIST} = CLASSIFY_COLUMN_NAMES;

export const CARDS = [
    {id: 0, name: 'Card 0', column: ITEM_LIST, item_type: "pants", print: false, pastel: false, delicate: false, item_color: "blue", cleanType: "Dry clean only", white: false},
    {id: 1, name: 'Card 1', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, delicate: true, item_color: "purple", cleanType: "Machine wash", white: false},
    {id: 2, name: 'Card 2', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, delicate: false, item_color: "black", cleanType: "Machine wash", white: false},
    {id: 3, name: 'Card 3', column: ITEM_LIST, item_type: "shirt", print: false, pastel: true, delicate: false, item_color: "green", cleanType: "Machine wash", white: false},
    {id: 4, name: 'Card 4', column: ITEM_LIST, item_type: "pants", print: false, pastel: false, delicate: false, item_color: "black", cleanType: "Machine wash", white: false},
    {id: 5, name: 'Card 5', column: ITEM_LIST, item_type: "shirt", print: false, pastel: true, delicate: false, item_color: "pink", cleanType: "Machine wash", white: false},
    {id: 6, name: 'Card 6', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, delicate: false, item_color: "white", cleanType: "Machine wash", white: true},
    {id: 7, name: 'Card 7', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, delicate: false, item_color: "green", cleanType: "Machine wash", white: false},
    {id: 8, name: 'Card 8', column: ITEM_LIST, item_type: "pants", print: false, pastel: false, delicate: true, item_color: "blue", cleanType: "Dry clean only", white: false},
    {id: 9, name: 'Card 9', column: ITEM_LIST, item_type: "hoodie", print: true, pastel: false, delicate: false, item_color: "blue", cleanType: "Machine wash", white: false},
    {id: 10, name: 'Card 10', column: ITEM_LIST, item_type: "shirt", print: true, pastel: false, delicate: false, item_color: "white", cleanType: "Machine wash", white: true},
    {id: 11, name: 'Card 11', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, delicate: false, item_color: "pink", cleanType: "Machine wash", white: false},
    {id: 12, name: 'Card 12', column: ITEM_LIST, item_type: "shorts", print: false, pastel: false, delicate: false, item_color: "white", cleanType: "Machine wash", white: true},
    {id: 13, name: 'Card 13', column: ITEM_LIST, item_type: "shirt", print: false, pastel: true, delicate: false, item_color: "yellow", cleanType: "Machine wash", white: false},
    {id: 14, name: 'Card 14', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, delicate: false, item_color: "blue", cleanType: "Machine wash", white: false},
    {id: 15, name: 'Card 15', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, delicate: false, item_color: "green", cleanType: "Machine wash", white: false},
    {id: 16, name: 'Card 16', column: ITEM_LIST, item_type: "shorts", print: false, pastel: false, delicate: false, item_color: "red", cleanType: "Dry clean only", white: false},
    {id: 17, name: 'Card 17', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, delicate: false, item_color: "white", cleanType: "Machine wash", white: true},
    {id: 18, name: 'Card 18', column: ITEM_LIST, item_type: "pants", print: true, pastel: false, delicate: false, item_color: "white", cleanType: "Machine wash", white: true},
    {id: 19, name: 'Card 19', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, delicate: false, item_color: "white", cleanType: "Machine wash", white: true}
];

export const TRANSIT_COLUMN_NAMES = {
    TRANSIT: 'transit',
    BUMP: 'bump',
    NO_BUMP: 'no bump'
}

const {TRANSIT} = TRANSIT_COLUMN_NAMES;

export const transitMethods = [
    {id: 1, name: 'Item 1', column: TRANSIT, bump: true, previous_bump_recorded: true},
    {id: 2, name: 'Item 2', column: TRANSIT, bump: false, previous_bump_recorded: false},
    {id: 3, name: 'Item 3', column: TRANSIT, bump: false, previous_bump_recorded: false},
    {id: 4, name: 'Item 4', column: TRANSIT, bump: true, previous_bump_recorded: true},
    {id: 5, name: 'Item 5', column: TRANSIT, bump: false, previous_bump_recorded: false},
    {id: 6, name: 'Item 6', column: TRANSIT, bump: false, previous_bump_recorded: true},
    {id: 7, name: 'Item 7', column: TRANSIT, bump: false, previous_bump_recorded: false},
    {id: 8, name: 'Item 8', column: TRANSIT, bump: true, previous_bump_recorded: true},
    {id: 9, name: 'Item 9', column: TRANSIT, bump: false, previous_bump_recorded: false},
    {id: 10, name: 'Item 10', column: TRANSIT, bump: false, previous_bump_recorded: false},
    {id: 11, name: 'Item 11', column: TRANSIT, bump: true, previous_bump_recorded: true},
    {id: 12, name: 'Item 12', column: TRANSIT, bump: false, previous_bump_recorded: false},
    {id: 13, name: 'Item 13', column: TRANSIT, bump: false, previous_bump_recorded: false},
    {id: 14, name: 'Item 14', column: TRANSIT, bump: true, previous_bump_recorded: true},
    {id: 15, name: 'Item 15', column: TRANSIT, bump: false, previous_bump_recorded: true},
    {id: 16, name: 'Item 16', column: TRANSIT, bump: true, previous_bump_recorded: true},
    {id: 17, name: 'Item 17', column: TRANSIT, bump: false, previous_bump_recorded: false},
    {id: 18, name: 'Item 18', column: TRANSIT, bump: false, previous_bump_recorded: false},
    {id: 19, name: 'Item 19', column: TRANSIT, bump: false, previous_bump_recorded: true},
    {id: 20, name: 'Item 20', column: TRANSIT, bump: true, previous_bump_recorded: false},
    {id: 11, name: 'Item 21', column: TRANSIT, bump: false, previous_bump_recorded: true},
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
        "warningColor": "#F50141",
        "highlightColor": "#9A00FF",
        "secondaryHighlightColor": "#cbcbcb",
        "textColor": "#868B90",
        "textHighlightColor": "#cbcbcb",
        "borderColor": "#868B90",
        "borderColorPrimary": "#272B30",
        "borderWidth": 1.5,
        "fillColor": "#131517",
        "fontSize": 13,
        "fontWeight": 400,
        "fontHighlightWeight": 500,
        "letterSpacing": ".4px",
        "linkColor": "#343940",
        "linkWidth": 1
    },
    "colorMode": {
        "colors": ["#9A00FF", "#F50141", "#FE4002", "#FD7B03", "#F3C010"],
        "warningColor": "#F50141",
        "highlightColor": "#FFFFFF",
        "secondaryHighlightColor": "#cbcbcb",
        "textColor": "#868B90",
        "textHighlightColor": "#cbcbcb",
        "borderColor": "#868B90",
        "borderColorPrimary": "#272B30",
        "borderWidth": 1.5,
        "fillColor": "#131517",
        "fontSize": 13,
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
        "definition": "People, individuals or groups, impacted directly or indirectly by a system (Bender and Friedman 2018)."
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
        "title": "recidivism",
        "definition": "A criminal reoffense."
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
        "title": "population base rare",
        "definition": "TODO."
    }
}