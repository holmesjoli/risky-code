import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const DndWrapper = React.memo((props) => {
  const [context, setContext] = useState(null);

  useEffect(() => {
    setContext(document.getElementById(props.id))
  },[props.id])

  return context ? (
      <DndProvider backend={HTML5Backend} options={{ rootElement: context}}>
          {props.children}
      </DndProvider>
  ) : null;
});

export const getBackgroundColor = (isOver, canDrop, className) => {
    if (isOver) {
      if (canDrop) {
        if (className === "Purple") {
          return "rgb(154, 0, 255, .12)"; 
        } else if(className === "Pink") {
          return "rgb(234, 33, 173, .12)"; 
        } else if (className === "DarkOrange") {
          return "rgb(254, 64, 2, .12)"; 
        } else if (className === "LightOrange") {
          return "rgb(253, 123, 3, .12)";
        }

      } else {
        return "rgb(255,188,188)"
      }
    } else {
      return "";
    }
};

export const getColor = (isOver, canDrop) => {
    if (isOver) {
      if (canDrop) {
        return "rgb(255,255,255)"; 
      } else if (!canDrop) {
        return "rgb(255,255,255)";
      }
    } else {
      return "";
    }
};

export const getBorder = (isOver, canDrop, className) => {
  if (isOver) {
    if (canDrop) {
      if (className === "Purple") {
        return "1.5pt dotted rgb(154, 0, 255)"; 
      } else if (className === "Pink") {
        return "1.5pt dotted rgb(234, 33, 173)"
      } else if (className === "DarkOrange") {
        return "1.5pt dotted rgb(254, 64, 2)"
      } else if (className === "LightOrange") {
        return "1.5pt dotted rgb(253, 123, 3)"
      }
    } else if (!canDrop) {
      return "none";
    }
  } else {
    return "";
  }
};
