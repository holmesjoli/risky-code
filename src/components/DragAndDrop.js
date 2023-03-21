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

export const getBackgroundColor = (isOver, canDrop) => {
    if (isOver) {
      if (canDrop) {
        return "rgb(154, 0, 255, .12)"; // TODO change the highlight background color
      } else if (!canDrop) {
        return "rgb(255,188,188)";
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

export const getBorder = (isOver, canDrop) => {
  if (isOver) {
    if (canDrop) {
      return "1.5pt dotted rgb(154, 0, 255)"; 
    } else if (!canDrop) {
      return "none";
    }
  } else {
    return "";
  }
};
