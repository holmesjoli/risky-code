import * as d3 from 'd3';

export const config = {
    "Introduction": {
        "id": "introduction",
        "title": "introduction",
        "descr": "Welcome to Risky Code, a digitial interactive toolkit to facilitate deliberation about algorithmically informed decision-making."
    },
    "about": {
        "id": "about",
        "title": "about",
        "descr": ""
    },
    "glossary": {
        "id": "glossary",
        "title": "glossary",
        "descr": ""
    },
    "resources": {
        "id": "resources",
        "title": "resources",
        "descr": ""
    },
    "Classify": {
        "id": "classify",
        "title": "Classify",
        "subtitle": "Classify each item as hot water load or save for later",
        "descr": "In this step of model building, we will classify each item to be run in the hot water load or save for later. For each item click hot water load or save for later. In the next step, we will use this data to train Laundry AID."
    },
    "Optimize": {
        "id": "optimize",
        "title": "Optimize",
        "subtitle": "Optimize model to be as accurate as possible",
        "descr": "In this step of model building, we will optimize the Laundry AID to be as accurate as possible. Convert the probability into a prediction by applying a threshold. Move the slider to adjust the threshold to maximize accuracy."
    },
    "Train": {
        "id": "train",
        "title": "Train",
        "subtitle": "Predict which items should be included in the hot water load",
        "descr": "In this step of model building, we will train the Laundry AID to predict whether new items should be added to the hot water load. Drag the data variables from the variable list to the model list to add them to the model. Add or remove variables from the model to see how the predicitive probabilities change."
    },
    "calibration": {
        "id": "calibration",
        "title": "calibration",
        "subtitle": "Learn about calibration definition of mathematical fairness",
        "descr": ""
    },
    "falsePositive": {
        "id": "falsePositive",
        "title": "false positive rate",
        "subtitle": "Minimize the false positive rate",
        "descr": "The false positive rate (FPR) is a measure of algorithmic error. It represents the probability of falsely rejecting the truth. It is calculated as the proportion of negative cases incorrectly predicted by the algorithm as positive cases. The negative cases are referred to as false positives and the positive cases are referred to as true positives. To calculate the false positive rate, we divide the number of false positives by the sum of the false positives and true positives. Adjust the slider to see how the false positive rate changes as you increase or decrease the threshold."
    },
    "falseNegative": {
        "id": "falseNegative",
        "title": "false negative rate",
        "subtitle": "Minimize the false negative rate",
        "descr": "The false negative rate (FNR) is another measure of algorithmic error. It represents the probability of falsely rejecting the truth. It is calculated as the proportion of negative cases incorrectly predicted by the algorithm as positive cases. The negative cases are referred to as false negatives and the positive cases are referred to as true negatices. To calculate the false negative rate, we divide the number of false negatives by the sum of the false negatives and true negatives. Adjust the slider to see how the false negative rate changes as you increase or decrease the threshold."
    },
    "decisionAid": {
        "id": "decisionAid",
        "title": "decision aid",
        "descr": ""
    },
    "riskFramework": {
        "id": "riskFramework",
        "title": "greene risk framework",
        "descr": ""
    },
    "stakeholderMapping": {
        "id": "stakeholderMapping",
        "title": "stakeholder mapping",
        "descr": ""
    },
    "compas": {
        "id": "compas",
        "title": "compas",
        "subtitle": "Learn about the COMPAS recidivsm algorithm and critiques of its use",
        "descr": "In Laundry AID, we looked at different measures of algorithmic accuracy and error across the population of washable items as a whole. However, an important step in algorithmic development is to consider how different measures of algorithmic accuracy may vary across sub-populations. In the case of laundry AID, we could consider if the measures of algorithmic fairness differ by item type or material. The idea of algorithmic bias stems directly from the idea of sub-group comparison. One of the first times algorithmic bias was publically recognized was when the investigative journalism network ProPublica published an article in 2016 titled Machine Bias: There's software used across the country to predict future criminals. It's biased against blacks (Angwin et al. 2016). The article sparked a vibrant debate among many academic disciples about what it meant for an algorithm to be fair. The ProPublica analysis showed that while the calibration rate, the average recidivism rate by risk score, is approximately equal between Black and White, the algorithm's error rates differed substantially. In response to this observation, several mathematicians proved that it is mathematically impossible for multiple definitions of mathematical fairness to simultaneously exist (Kleinberg et al. 2016; Chouldechova 2016) if a population's overall recidivism rates differ. "
    },
    "publicPolicy": {
        "id": "publicPolicy",
        "title": "algorithmic Decision-Making in Public Policy",
        "subtitle": "Learn about where algorithms are used in public policy",
        "descr": "Algorithms are increasingly being used to inform decision-making in public policy. They’re currently in use across policy sectors such as criminal justice, education, public health, and human services. "
    }
}

export const navigation = [ {
        "name": "Introduction",
        "id": "introduction",
        "size": "Large"
    }, {
        "name": "Prediction",
        "id": "prediction",
        "size": "Large"
    }, {
        "name": "Classify",
        "id": "classify",
        "size": "Small"
    }, {
        "name": "Train",
        "id": "train",
        "size": "Small"
    }, {
        "name": "Fairness",
        "id": "fairness",
        "size": "Large"
    }, {
        "name": "False Positive Rate",
        "id": "fpr",
        "size": "Small"
    }, {
        "name": "False Negative Rate",
        "id": "fnr",
        "size": "Small"
    }, {
        "name": "Case Study - COMPAS",
        "id": "compas",
        "size": "Small"
    }, {
        "name": "Deliberation",
        "id": "deliberation",
        "size": "Large"
    }, {
        "name": "Stakeholder Mapping",
        "id": "stakeholder",
        "size": "Small"
    }, {
        "name": "Risk Mapping",
        "id": "risk",
        "size": "Small"
    }, {
        "name": "Decision Aid",
        "id": "decision",
        "size": "Small"
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
    DATA_VARIABLES: 'Data variables',
    MODEL_VARIABLES: 'Model variables'
}

const {DATA_VARIABLES} = MODEL_COLUMN_NAMES;
export const VARIABLES = [
    {id: 1, name: 'Item type', columnName: 'item_type', column: DATA_VARIABLES},
    {id: 2, name: 'Print', columnName: 'print',  column: DATA_VARIABLES},
    {id: 3, name: 'Pastel', columnName: 'pastel', column: DATA_VARIABLES},
    {id: 4, name: 'Soiled', columnName: 'soiled', column: DATA_VARIABLES },
    // {id: 5, name: 'Item color', columnName: 'item_color', column: DATA_VARIABLES },
    {id: 6, name: 'Care type', columnName: 'cleanType', column: DATA_VARIABLES },
    {id: 7, name: 'White', columnName: 'white', column: DATA_VARIABLES },
];

export const CLASSIFY_COLUMN_NAMES = {
    ITEM_LIST: 'Items',
    CASE_TRUE: 'Hot water load',
    CASE_FALSE: 'Save for later load'
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
