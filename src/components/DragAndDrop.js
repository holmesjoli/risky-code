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
