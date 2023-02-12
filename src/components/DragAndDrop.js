export const getBackgroundColor = (isOver, canDrop) => {
    if (isOver) {
      if (canDrop) {
        return "rgb(127, 194, 67, .12)"; // TODO change the highlight background color
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
      return "1.5px dashed rgb(127, 194, 67)"; 
    } else if (!canDrop) {
      return "none";
    }
  } else {
    return "";
  }
};
