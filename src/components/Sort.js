import React, { useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CLASSIFY_COLUMN_NAMES } from "../utils/global";
import { getBackgroundColor, getColor } from "./DragAndDrop";
import { addClass } from "./Card";
import { importImages } from "./Helper";

const images = importImages();

// Modified from https://codesandbox.io/s/react-dnd-example-try06?file=/src/assets/styles/App.css:0-1002
const MovableItem = ({
  name,
  index,
  itemId,
  currentColumnName,
  moveCardHandler,
  setItems
}) => {
  const changeItemColumn = (currentItem, columnName) => {
    setItems((prevState) => {
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
    item: { index, name, currentColumnName, itemId },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult;
        const { ITEM_LIST, CASE_TRUE, CASE_FALSE } = CLASSIFY_COLUMN_NAMES;

        switch (name) {
          case CASE_TRUE:
            changeItemColumn(item, CASE_TRUE);
            break;
          case CASE_FALSE:
            changeItemColumn(item, CASE_FALSE);
            break;
          case ITEM_LIST:
            changeItemColumn(item, ITEM_LIST);
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
    <div ref={ref} className={addClass(currentColumnName)+" Movable-Item Card"} style={{ opacity }}>
       <img src={images[Object.keys(images)[itemId]]} alt="An item of clothing" width="100" height="50" ></img>
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
    })
  });

  return (
    <div
      ref={drop}
      className={className}
      style={{ backgroundColor: getBackgroundColor(isOver, canDrop) }}
    >
      <h4 className="Small-Margin"
      style={{ color: getColor(isOver, canDrop) }}
  
      >{title}</h4>
      <div className="Card-Container">
        {children}
      </div>
    </div>
  );
};


export default function Sort({items, setItems}) {

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];

        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  const returnItemsForColumn = (items, columnName) => {

    return items
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItem
        key={item.id+"Sort-Id"}
          name={item.name}
          itemId={item.id}
          currentColumnName={item.column}
          setItems={setItems}
          index={index}
          moveCardHandler={moveCardHandler}
        />
      ));
  };

  const { ITEM_LIST, CASE_TRUE, CASE_FALSE } = CLASSIFY_COLUMN_NAMES;

  return (
      <DndProvider backend={HTML5Backend}>
        <div className="Two-Column">
            <div className="Classify-Container">
                <Column title={ITEM_LIST} className="Container item-list-column">
                  {returnItemsForColumn(items, ITEM_LIST)}
                </Column>
            </div>
            <div className="Case-Container">
                <Column title={CASE_TRUE} className="Container case-true-column">
                  {returnItemsForColumn(items, CASE_TRUE)}
                </Column>
                <Column title={CASE_FALSE} className="Container case-false-column">
                  {returnItemsForColumn(items, CASE_FALSE)}
                </Column>
            </div>
        </div>
      </DndProvider>
  );
};
