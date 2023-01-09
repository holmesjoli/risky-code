export const config = {
    "introduction": {
        "id": "default",
        "title": "Introduction",
        "descr": ""
    },
    "about": {
        "id": "about",
        "title": "About",
        "descr": ""
    },
    "glossary": {
        "id": "glossary",
        "title": "Glossary",
        "descr": ""
    },
    "literature": {
        "id": "literature",
        "title": "Literature",
        "descr": ""
    },
    "classify": {
        "id": "classify",
        "title": "Classify",
        "subtitle": "Goal: Classify each item as hot water load or save for later",
        "descr": "In this step of model building, we will classify each item to be run in the hot water load or save for later. For each item click hot water load or save for later. In the next step, we will use this data to train Laundry AID."
    },
    "optimize": {
        "id": "optimize",
        "title": "Optimize",
        "subtitle": "Goal: Optimize model to be as accurate as possible",
        "descr": "In this step of model building, we will optimize the Laundry AID to be as accurate as possible. Convert the probability into a prediction by applying a threshold. Move the slider to adjust the threshold to maximize accuracy."
    },
    "train": {
        "id": "train",
        "title": "Train",
        "subtitle": "Goal: Predict which items should be included in the hot water load",
        "descr": "In this step of model building, we will train the Laundry AID to predict whether new items should be added to the hot water load. Drag the data variables from the variable list to the model list to add them to the model. Add or remove variables from the model to see how the predicitive probabilities change."
    },
    "calibration": {
        "id": "calibration",
        "title": "Calibration",
        "subtitle": "Goal: Learn about calibration definition of mathematical fairness",
        "descr": ""
    },
    "falsePositive": {
        "id": "falsePositive",
        "title": "False Positive Rate",
        "subtitle": "Goal: Minimize the false positive rate",
        "descr": "The false positive rate (FPR) is a measure of algorithmic error. It represents the probability of falsely rejecting the truth. It is calculated as the proportion of negative cases incorrectly predicted by the algorithm as positive cases. The negative cases are referred to as false positives and the positive cases are referred to as true positives. To calculate the false positive rate, we divide the number of false positives by the sum of the false positives and true positives. Adjust the slider to see how the false positive rate changes as you increase or decrease the threshold."
    },
    "falseNegative": {
        "id": "falseNegative",
        "title": "False Negative Rate",
        "subtitle": "Goal: Minimize the false negative rate",
        "descr": "The false negative rate (FNR) is another measure of algorithmic error. It represents the probability of falsely rejecting the truth. It is calculated as the proportion of negative cases incorrectly predicted by the algorithm as positive cases. The negative cases are referred to as false negatives and the positive cases are referred to as true negatices. To calculate the false negative rate, we divide the number of false negatives by the sum of the false negatives and true negatives. Adjust the slider to see how the false negative rate changes as you increase or decrease the threshold."
    },
    "decisionAid": {
        "id": "decisionAid",
        "title": "Decision Aid",
        "descr": ""
    },
    "riskFramework": {
        "id": "riskFramework",
        "title": "Greene Risk Framework",
        "descr": ""
    },
    "stakeholderMapping": {
        "id": "stakeholderMapping",
        "title": "Stakeholder Mapping",
        "descr": ""
    },
    "compas": {
        "id": "compas",
        "title": "COMPAS",
        "subtitle": "Goal: Learn about the COMPAS recidivsm algorithm and critiques of its use",
        "descr": "In Laundry AID, we looked at different measures of algorithmic accuracy and error across the population of washable items as a whole. However, an important step in algorithmic development is to consider how different measures of algorithmic accuracy may vary across sub-populations. In the case of laundry AID, we could consider if the measures of algorithmic fairness differ by item type or material. The idea of algorithmic bias stems directly from the idea of sub-group comparison. One of the first times algorithmic bias was publically recognized was when the investigative journalism network ProPublica published an article in 2016 titled Machine Bias: There's software used across the country to predict future criminals. It's biased against blacks (Angwin et al. 2016). The article sparked a vibrant debate among many academic disciples about what it meant for an algorithm to be fair. The ProPublica analysis showed that while the calibration rate, the average recidivism rate by risk score, is approximately equal between Black and White, the algorithm's error rates differed substantially. In response to this observation, several mathematicians proved that it is mathematically impossible for multiple definitions of mathematical fairness to simultaneously exist (Kleinberg et al. 2016; Chouldechova 2016) if a population's overall recidivism rates differ. "
    },
    "publicPolicy": {
        "id": "publicPolicy",
        "title": "Algorithmic Decision-Making in Public Policy",
        "subtitle": "Goal: Learn about where algorithms are used in public policy",
        "descr": "Algorithms are increasingly being used to inform decision-making in public policy. They’re currently in use across policy sectors such as criminal justice, education, public health, and human services. "
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

export const COLUMN_NAMES = {
    DATA_VARIABLES: 'Data variables',
    MODEL_VARIABLES: 'Model variables'
}

const {DATA_VARIABLES} = COLUMN_NAMES;
export const VARIABLES = [
    {id: 1, name: 'Item type', column: DATA_VARIABLES},
    {id: 2, name: 'Print', column: DATA_VARIABLES},
    {id: 3, name: 'Pastel', column: DATA_VARIABLES},
    {id: 4, name: 'Soiled', column: DATA_VARIABLES },
    {id: 5, name: 'Item color', column: DATA_VARIABLES },
    {id: 6, name: 'Care type', column: DATA_VARIABLES },
];


export const appTheme = {
    "theme": {
        typography: {
            fontFamily: "Plex, Verdana, Geneva, Tahoma, sans-serif",
            fontSize: 12
          },
          palette: {
            type: "dark",
            background: {
              paper: "#21252b"
            },
            primary: {
              main: "#03afbf"
            },
            secondary: {
              main: "#919295"
            }
          },
          overrides: {
            MuiPaper: {
              root: {
                elevation: 0,
                square: true,
                padding: 0,
                marginBottom: 0
              },
            }
          },
          shape: {
            borderRadius: 0
          }
    }
}
