import React, { useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MODEL_COLUMN_NAMES } from "../utils/global";
import { getBackgroundColor, getColor, getBorder } from "./DragAndDrop";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Modified from https://codesandbox.io/s/react-dnd-example-try06?file=/src/assets/styles/App.css:0-1002
const MovableItem = ({
  name,
  index,
  currentColumnName,
  moveCardHandler,
  setVariables
}) => {
  const changeItemColumn = (currentItem, columnName) => {
    setVariables((prevState) => {
      return prevState.map((e) => {
        return {
          ...e,
          column: e.name === currentItem.name ? columnName : e.column
        };
      });
    });
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "Our first type",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCardHandler(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "Our first type",
    item: { index, name, currentColumnName },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult;
        const { DATA_VARIABLES, MODEL_VARIABLES } = MODEL_COLUMN_NAMES;
        switch (name) {
          case MODEL_VARIABLES:
            changeItemColumn(item, MODEL_VARIABLES);
            break;
          case DATA_VARIABLES:
            changeItemColumn(item, DATA_VARIABLES);
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} className="Movable-Item Button Variable" style={{ opacity }}>
      {name}
    </div>
  );
};

const Column = ({ children, className, title }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "Our first type",
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    // Override monitor.canDrop() function
    canDrop: (item) => {
      const { DATA_VARIABLES, MODEL_VARIABLES } = MODEL_COLUMN_NAMES;
      const { currentColumnName } = item;
      return (
        currentColumnName === title ||
        (currentColumnName === DATA_VARIABLES && title === MODEL_VARIABLES) ||
        (currentColumnName === MODEL_VARIABLES &&
          (title === DATA_VARIABLES)) ||
        (currentColumnName === (title === MODEL_VARIABLES))
      );
    }
  });

  return (
    <div
      ref={drop}
      className={className}
      style={{ border: getBorder(isOver, canDrop),
        backgroundColor: getBackgroundColor(isOver, canDrop) }}
    >
      <h3 className="Small-Margin"
      style={{ color: getColor(isOver, canDrop) }}
      
      >{title}</h3>
        <div className="Moveable-Items">
          {children.length === 0 ? <p>Drop here</p>: children}
        </div>
    </div>
  );
};

export default function Model({variables, setVariables}) {

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = variables[dragIndex];

    if (dragItem) {
      setVariables((prevState) => {
        const coppiedStateArray = [...prevState];

        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  const returnItemsForColumn = (variables, columnName) => {
    return variables
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItem
          key={item.id}
          name={item.name}
          currentColumnName={item.column}
          setVariables={setVariables}
          index={index}
          moveCardHandler={moveCardHandler}
        />
      ));
  };

  const { DATA_VARIABLES, MODEL_VARIABLES } = MODEL_COLUMN_NAMES;

  return (
    <div className="Container">
      <h3>experience</h3>
      <p>Drag data variables to model variables to run the statistical model</p>
      <div className="Text-Align-Center">
        <DndProvider backend={HTML5Backend}>
          <Column title={DATA_VARIABLES} className="Card-Group Variables-Column Data-Variables">
            {returnItemsForColumn(variables, DATA_VARIABLES)}
          </Column>
          <ExpandMoreIcon className="Scale200"/>
          <Column title={MODEL_VARIABLES} className="Card-Group Variables-Column Model-Variables">
            {returnItemsForColumn(variables,MODEL_VARIABLES)}
          </Column>
        </DndProvider>
      </div>
    </div>
  );
};
