export const getBackgroundColor = (isOver, canDrop) => {
    if (isOver) {
      if (canDrop) {
        return "rgb(253, 171, 51)"; // TODO change the highlight background color
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
        return "rgb(0, 0, 0)"; 
      } else if (!canDrop) {
        return "rgb(255,255,255)";
      }
    } else {
      return "";
    }
};