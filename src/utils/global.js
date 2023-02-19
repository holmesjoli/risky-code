import * as d3 from 'd3';

export const config = {
    "Introduction": {
        "id": "introduction",
        "title": "introduction",
        "descr": "Welcome to Risky Code, an interactive digital toolkit to facilitate deliberation about algorithmically informed decision-making."
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
    "Classify": {
        "id": "classify",
        "title": "classify",
        "subtitle": "Classify each item as hot water load or save for later",
        "descr": "In this step of model building, we will classify each item to be run in the hot water load or save for later. For each item click hot water load or save for later. In the next step, we will use this data to train Laundry AID."
    },
    "Optimize": {
        "id": "optimize",
        "title": "optimize",
        "subtitle": "Optimize model to be as accurate as possible",
        "descr": "In this step of model building, we will optimize the Laundry AID to be as accurate as possible. Convert the probability into a prediction by applying a threshold. Move the slider to adjust the threshold to maximize accuracy."
    },
    "Train": {
        "id": "train",
        "title": "train",
        "subtitle": "Predict which items should be included in the hot water load",
        "descr": "In this step of model building, we will train the Laundry AID to predict whether new items should be added to the hot water load. Drag the data variables from the variable list to the model list to add them to the model. Add or remove variables from the model to see how the predicitive probabilities change."
    },
    "Calibration": {
        "id": "calibration",
        "title": "calibration",
        "subtitle": "Learn about calibration definition of mathematical fairness",
        "descr": ""
    },
    "Error": {
        "id": "error",
        "title": "error",
        "subtitle": "Minimize the error rates",
        "descr": "The false positive rate (FPR) is a measure of algorithmic error. It represents the probability of falsely rejecting the truth. It is calculated as the proportion of negative cases incorrectly predicted by the algorithm as positive cases. The negative cases are referred to as false positives and the positive cases are referred to as true positives. To calculate the false positive rate, we divide the number of false positives by the sum of the false positives and true positives. Adjust the slider to see how the false positive rate changes as you increase or decrease the threshold."
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
        "descr": ""
    },
    "COMPAS": {
        "id": "compas",
        "title": "compas",
        "subtitle": "Learn about the COMPAS recidivsm algorithm",
        "descr": "In Laundry AID, we looked at different measures of algorithmic accuracy and error across the population of washable items as a whole. However, an important step in algorithmic development is to consider how different measures of algorithmic accuracy may vary across sub-populations. In the case of laundry AID, we could consider if the measures of algorithmic fairness differ by item type or material. The idea of algorithmic bias stems directly from the idea of sub-group comparison. One of the first times algorithmic bias was publically recognized was when the investigative journalism network ProPublica published an article in 2016 titled Machine Bias: There's software used across the country to predict future criminals. It's biased against blacks (Angwin et al. 2016). The article sparked a vibrant debate among many academic disciples about what it meant for an algorithm to be fair. The ProPublica analysis showed that while the calibration rate, the average recidivism rate by risk score, is approximately equal between Black and White, the algorithm's error rates differed substantially. In response to this observation, several mathematicians proved that it is mathematically impossible for multiple definitions of mathematical fairness to simultaneously exist (Kleinberg et al. 2016; Chouldechova 2016) if a population's overall recidivism rates differ. "
    },
    "StreetBump": {
        "id": "street",
        "title": "street bump",
        "subtitle": "Learn about the Street Bump application",
        "descr": "Street Bump was an application developed for the city of Boston in 2011 to identify potholes in need of repair. The application relied on people with smartphones to opt-in, download, and open the application during their daily commutes around Boston. The application recorded acceleration and GPS data to help the city identify problem roads."
    }
}

export const navigationData = [ {
        "name": "Introduction",
        "id": "introduction",
        "size": "Large",
        "navLink": "/"
    }, {
        "name": "Predict",
        "id": "predict",
        "size": "Large",
        "navLink": "/Classify"
    }, {
        "name": "Classify",
        "id": "classify",
        "size": "Small",
        "navLink": "/Classify"
    }, {
        "name": "Train",
        "id": "train",
        "size": "Small",
        "navLink": "/Train"
        
    }, {
        "name": "Fairness",
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

export const highlightColor = "#40FF01";
export const textColor = "#cbcbcb";
export const borderColor = "#343940";
export const fillColor = "#131517";

export function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
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