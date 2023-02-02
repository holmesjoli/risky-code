export const getBackgroundColor = (isOver, canDrop) => {
    if (isOver) {
      if (canDrop) {
        return "rgb(247, 212, 120)"; // TODO change the highlight background color
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
      return "2px dashed rgb(49, 54, 60)"; 
    } else if (!canDrop) {
      return "none";
    }
  } else {
    return "";
  }
};
