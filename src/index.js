import React from "react";
import ReactDOM from "react-dom/client";
import "./utils/styles/style.scss";

import { createTheme, ThemeProvider } from "@material-ui/core";
import App from "./App"
import { visStyles } from "./utils/global";

const style = "darkMode";

const theme = createTheme({
  typography: {
    fontFamily: "Plex, Verdana, Geneva, Tahoma, sans-serif",
    fontSize: 12,
    lineHeight: 1.3
  },
  palette: {
    type: "dark",
    background: {
      paper: "#000000"
    },
    primary: {
      main: "#9A00FF"
    },
    secondary: {
      main: "#cbcbcb"
    }
  },
  overrides: {
    MuiPaper: {
      root: {
        elevation: 0,
        square: true,
        padding: 0,
        marginBottom: 0
      }
    },
    MuiTypography: {
      root: {
        fontSize: 12,
      },
      body1: {
        fontSize: 12,
      }
    },
    MuiFormGroup: {
      root: {
        display: "flex",
        flexDirection: "row"
      }
    },
    MuiMenuItem: {
      root: {
        fontSize: 12,
      }
    },
    MuiListItem: {
      root: {
        fontSize: 12,
      }
    },
    MuiAccordionSummary: {
      root: {
        position: "relative",
        paddingLeft: 0,
        borderColor: visStyles[style]["borderColorPrimary"],
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: ".25rem",
        minHeight: "none",
        "&$expanded": {
          minHeight: "none"
        },
        backgroundColor: "#131517"
      },
      content: {
        color: visStyles[style]["secondaryHighlightColor"],
        margin: 0,
        "&$expanded": {
          margin: 0
        },
        '&:hover': {
          borderColor: visStyles[style]["highlightColor"],
          color: visStyles[style]["highlightColor"]
       }
      },
      expandIcon: {
        position: "relative",
        color: visStyles[style]["secondaryHighlightColor"],
        '&:hover': {
          borderColor: visStyles[style]["highlightColor"],
          color: visStyles[style]["highlightColor"]
       }
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: "#131517"
      }
    },
    MuiAccordionDetails: {
      root: {
        padding: 0,
        flexDirection: "column"
      }
    },
    Mui: {
        "root": {
          "&$disabled": {
            "backgroundColor": "rgb(127, 194, 67, .12)"
          }
        }
    },
    MuiFormControl: {
      root: {
        width: "100%"
      }
    },
    MuiInputBase: {
      input: {
        fontSize: 12,
        padding: "14px",
        lineHeight: 1.3
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: ".25rem"
      },
      input: {
        fontSize: 12,
        padding: "14px",
        lineHeight: 1.3
      },
      multiline: {
        fontSize: 12,
        padding: "14px"
      }
    },
    MuiButtonBase: {
      root: {
        '&:hover': {
          borderColor: visStyles[style]["highlightColor"],
          color: visStyles[style]["highlightColor"]
       }
      }
    },
    PrivateSwitchBase: {
      root: {
          padding: "3px"
      }
    },
    MuiCollapse: {
      wrapperInner: {
        color: "#cbcbcb"
      }
    },
    MuiStepIcon: {
      "root": {
        "&$active": {
          "color": "#ea21ad"
        },
        "&$completed": {
          "color": "#ea21ad"
        }
      }
    },
    MuiButton: {
      root: {
        borderRadius: "0.25rem",
        width: "100%"
      },
      label: {
        fontVariant: "small-caps",
        fontWeight: 500,
        letterSpacing: ".6px",
        textTransform: "none",
        fontSize: "1.05rem"
      },
      contained: {
        backgroundColor: visStyles[style]["highlightColor"],
        color: "#fff",
        '&:hover': {
          backgroundColor: visStyles[style]["secondaryHighlightColor"],
          color: "#131517"
       }
      },
      outlinedSecondary: {
        borderColor: visStyles[style]["highlightColor"],
        color: visStyles[style]["highlightColor"],
        backgroundColor: "#131517",
        '&:hover': {
          borderColor: visStyles[style]["textHighlightColor"],
          color: visStyles[style]["secondaryHighlightColor"]
       }
      }
    }
  },
  shape: {
    borderRadius: 0
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
);
