import * as d3 from 'd3';

export const config = {
    "Introduction": {
        "id": "introduction",
        "title": "introduction",
        "descr": "Welcome to Risky Code, an interactive digital toolkit. Risky Code contains four modules meant to inform and to facilitate deliberation about algorithmically informed decision-making. The first module, Predict"
    },
    "About": {
        "id": "about",
        "title": "about",
        "descr": "About page"
    },
    "Glossary": {
        "id": "glossary",
        "title": "glossary",
        "descr": "Glossary of terms related to algorithmically informed decision-making. For some terms, more than one definition is given to show variety and similarity across term definition."
    },
    "Resources": {
        "id": "resources",
        "title": "resources",
        "descr": "This design builds on extensive research in the algorithmic fairness literature to help policymakers better understand the implications of having a just AI. A list of literature and precedent artifacts are referenced here for those interested in learning more."
    },
    "Contact": {
        "id": "contact",
        "title": "Contact",
        "descr": "Contact page"
    },
    "Optimize": {
        "id": "optimize",
        "title": "optimize",
        "subtitle": "optimize the algorithm for accuracy",
        "descr": "In this step of algorithm building, we will optimize the Laundry AID to be as accurate as possible. Convert the probability into a prediction by applying a threshold. Move the slider to adjust the threshold to maximize accuracy."
    },
    "Train": {
        "id": "train",
        "title": "train",
        "subtitle": "train the algorithm to predict the hot water load",
        "descr": "Drag the data variables from the variable list to the model list to add them to the algorithm. Add or remove variables from the model to see how the predicitive probabilities change."
    },
    "Calibration": {
        "id": "calibration",
        "title": "calibration",
        "subtitle": "learn about calibration definition of mathematical fairness",
        "descr": ""
    },
    "Error": {
        "id": "error",
        "title": "error rates",
        "subtitle": "minimize the error rates",
        "descr": "Adjust the slider to see how the false positive rate changes as you increase or decrease the threshold."
    },
    "Decision": {
        "id": "decision",
        "title": "decision aid",
        "descr": ""
    },
    "Risk": {
        "id": "risk",
        "title": "risk framework",
        "descr": ""
    },
    "Stakeholders": {
        "id": "stakeholders",
        "title": "stakeholder mapping",
        "subtitle": "brainstorm a policy scenario where algorithmically informed decision-making is or could be implemented.",
        "descr": "Who are the stakeholders of that policy scenario? What are their values? How could algorithmically informed decision-making lead to good or potentially bad outcomes for those stakeholders. Write your answers in the text box."
    },
    "COMPAS": {
        "id": "compas",
        "title": "compas",
        "subtitle": "explore different versions of mathematical fairness",
        "descr": "COMPAS was designed to help judges decide whether to set bail and release an individual prior to trial and sentencing (Hao and Stray 2019). The decision to keep an individual in jail awaiting trial can have vast implications in an individuals life; it can strain social and employment relationships. As of 2020, COMPAS was in use in four states at multiple points in the criminal justice system (Dipshan and Hudgins, 2020)."
    },
    "StreetBump": {
        "id": "street",
        "title": "street bump",
        "subtitle": "learn about the street bump application",
        "descr": "Street Bump was an application developed for the city of Boston in 2011 to identify potholes in need of repair. The application relied on people with smartphones to opt-in, download, and open the application during their daily commutes around Boston. The application recorded acceleration and GPS data to help the city identify problem roads."
    }
}

export const navigationData = [ {
        "name": "Introduction",
        "id": "introduction",
        "size": "Large",
        "navLink": "/Introduction"
    },
    {
        "name": "Predict",
        "id": "predict",
        "size": "Large",
        "navLink": "/Train"
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
        "name": "Mathematical Fairness",
        "id": "fairness",
        "size": "Large",
        "navLink": "/Calibration"
    },
    {
        "name": "Calibration",
        "id": "calibration",
        "size": "Small",
        "navLink": "/Calibration"
    }, {
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
        "name": "COMPAS",
        "id": "compas",
        "size": "Small",
        "navLink": "/COMPAS"
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
    {id: 4, name: 'soiled', columnName: 'soiled', column: DATA_VARIABLES },
    // {id: 5, name: 'Item color', columnName: 'item_color', column: DATA_VARIABLES },
    {id: 6, name: 'care type', columnName: 'cleanType', column: DATA_VARIABLES },
    {id: 7, name: 'white', columnName: 'white', column: DATA_VARIABLES },
];

export const CLASSIFY_COLUMN_NAMES = {
    ITEM_LIST: 'items',
    CASE_TRUE: 'hot water load',
    CASE_FALSE: 'save for later load'
}

const {ITEM_LIST} = CLASSIFY_COLUMN_NAMES;

export const CARDS = [
    {id: 0, name: 'Card 0', column: ITEM_LIST, item_type: "pants", print: false, pastel: false, soiled: false, item_color: "blue", cleanType: "Dry clean only", white: false},
    {id: 1, name: 'Card 1', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, soiled: true, item_color: "purple", cleanType: "Machine wash cold", white: false},
    {id: 2, name: 'Card 2', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, soiled: false, item_color: "black", cleanType: "Machine wash cold", white: false},
    {id: 3, name: 'Card 3', column: ITEM_LIST, item_type: "shirt", print: false, pastel: true, soiled: false, item_color: "green", cleanType: "Machine wash cold", white: false},
    {id: 4, name: 'Card 4', column: ITEM_LIST, item_type: "pants", print: false, pastel: false, soiled: false, item_color: "black", cleanType: "Machine wash cold", white: false},
    {id: 5, name: 'Card 5', column: ITEM_LIST, item_type: "shirt", print: false, pastel: true, soiled: false, item_color: "pink", cleanType: "Machine wash cold", white: false},
    {id: 6, name: 'Card 6', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, soiled: false, item_color: "white", cleanType: "Machine wash cold", white: true},
    {id: 7, name: 'Card 7', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, soiled: false, item_color: "green", cleanType: "Machine wash cold", white: false},
    {id: 8, name: 'Card 8', column: ITEM_LIST, item_type: "pants", print: false, pastel: false, soiled: true, item_color: "blue", cleanType: "Dry clean only", white: false},
    {id: 9, name: 'Card 9', column: ITEM_LIST, item_type: "hoodie", print: true, pastel: false, soiled: false, item_color: "blue", cleanType: "Machine wash cold", white: false},
    {id: 10, name: 'Card 10', column: ITEM_LIST, item_type: "shirt", print: true, pastel: false, soiled: false, item_color: "white", cleanType: "Machine wash cold", white: true},
    {id: 11, name: 'Card 11', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, soiled: false, item_color: "pink", cleanType: "Machine wash cold", white: false},
    {id: 12, name: 'Card 12', column: ITEM_LIST, item_type: "shorts", print: false, pastel: false, soiled: false, item_color: "white", cleanType: "Machine wash cold", white: true},
    {id: 13, name: 'Card 13', column: ITEM_LIST, item_type: "shirt", print: false, pastel: true, soiled: false, item_color: "yellow", cleanType: "Machine wash cold", white: false},
    {id: 14, name: 'Card 14', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, soiled: false, item_color: "blue", cleanType: "Machine wash cold", white: false},
    {id: 15, name: 'Card 15', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, soiled: false, item_color: "green", cleanType: "Machine wash cold", white: false},
    {id: 16, name: 'Card 16', column: ITEM_LIST, item_type: "shorts", print: false, pastel: false, soiled: false, item_color: "red", cleanType: "Dry clean only", white: false},
    {id: 17, name: 'Card 17', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, soiled: false, item_color: "white", cleanType: "Machine wash cold", white: true},
    {id: 18, name: 'Card 18', column: ITEM_LIST, item_type: "pants", print: true, pastel: false, soiled: false, item_color: "white", cleanType: "Machine wash cold", white: true},
    {id: 19, name: 'Card 19', column: ITEM_LIST, item_type: "shirt", print: false, pastel: false, soiled: false, item_color: "white", cleanType: "Machine wash cold", white: true}
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
        "definition": "A system that uses automated reasoning to aid or replace a decision-making process that would otherwise be performed by humans (AINOW 2018)"
    },
    "stat-model": {
        "title": "statistical model",
        "definition": "A mathematical representation for making predictions based on data"
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
        "definition": "A series of steps that allow you to perform a particular task (Onuoha and Nucera 2018)"
    },
    "mathematical-fairness": {
        "title": "mathematical-fairness",
        "definition": 'Formal mathematical constructions of legal concepts such as "equal protection" and "disparate impact" (Movva 2021)'
    },
    "calibration": {
        "title": "calibration",
        "definition": "The percentage of people at each risk score who are in the positive is approximately equal for different demographics."
    },
    "fpr": {
        "title": "false positive rate",
        "definition": "The false positive rate is the probability of falsely rejecting the truth, simply triggering a false alarm expressed as a statistical rate"
    },
    "fnr": {
        "title": "false negative rate",
        "definition": "The false negative rate is the failure to raise a valid alarm expressed as a statistical rate"
    },
    "stakeholders": {
        "title": "stakeholders",
        "definition": "People impacted directly or indirectly by a system (Bender and Friedman 2018)"
    },
    "recidivism": {
        "title": "recidivism",
        "definition": "A criminal reoffense"
    },
    "accuracy": {
        "title": "accuracy",
        "definition": "Accuracy is a percent of how many predicted values match the actual values"
    }
}