import React, { useRef, useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CLASSIFY_COLUMN_NAMES } from "../utils/global";
import { getBackgroundColor, getColor, getBorder } from "./DragAndDrop";
import { addClass } from "./Card";
import { importImages } from "./Helper";
import { NextButtonOverlay } from './Button';

const images = importImages();
const {ITEM_LIST} = CLASSIFY_COLUMN_NAMES;
let totalClassify;

function bigCardClass(currentColumnName) {
  return currentColumnName === ITEM_LIST? " Card-Big": "Card";
}

// Modified from https://codesandbox.io/s/react-dnd-example-try06?file=/src/assets/styles/App.css:0-1002
const MovableItem = ({
  id,
  name,
  currentColumnName,
  setItems,
  index,
  item,
  moveCardHandler
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
    item: { index, name, currentColumnName, id },
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

  if(currentColumnName === ITEM_LIST) {
    return (
      <div id={"Card" + item.id} key={item.id} ref={ref} className={addClass(currentColumnName) + " Movable-Item" + bigCardClass(currentColumnName)} style={{ opacity }}>
         <img src={images[Object.keys(images)[item.id]]} alt="" height="100" width="100"></img>
         <div className="Label">
            <div className="Small-Margin">
              <h4 className="Small-Margin">care type</h4>
              <h6 className="Small-Margin">{item.cleanType}</h6>
            </div>
            <div className="Small-Margin">
              <h4 className="Small-Margin">soiled</h4>
              <h6 className="No-Margin-Bottom">{item.soiled ? "Yes": "No"}</h6>
            </div>
         </div>
      </div>
    );

  } else {
    return (
      <div id={"Card" + id} key={id} ref={ref} className={addClass(currentColumnName) + " Movable-Item " + bigCardClass(currentColumnName)} style={{ opacity }}>
         <img src={images[Object.keys(images)[id]]} alt="" width="100" height="55"></img>
      </div>
    );
  }
};

const Column = ({ children, className, title, nClassified }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "Our first type",
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  let instructions = title === ITEM_LIST?  "Congrats you created an algorithm!" : "Drop here";

  return (
    <div
      ref={drop}
      className={className}
      style={{ border: getBorder(isOver, canDrop),
               backgroundColor: getBackgroundColor(isOver, canDrop) }}
    >
      <h4 className="Small-Margin"
      style={{ color: getColor(isOver, canDrop) }}

      >{title}</h4>
        <div className={title !== ITEM_LIST? "Card-Container": ""}>
            {children.length === 0 ? <p>{instructions}</p>: children}
          <h5 className="Small-Margin">{className === "Container item-list-column Margin-Bottom"?`${nClassified}/${totalClassify} classified`: ""}</h5>
      </div>
    </div>
  );
};

export default function SortLaundry({ items, setItems, nClassified, setNClassified, toggleOverlay}) {

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

  const returnSingleItemForColumn = (items, columnName) => {

    const id = items.filter((d) => d.column === columnName).map((d) => d.id)[0];

    return items
      .filter((item) => item.column === columnName && item.id === id)
      .map((item, index) => (
        <MovableItem
          key={item.id}
          id={item.id}
          name={item.name}
          itemId={item.id}
          currentColumnName={item.column}
          setItems={setItems}
          index={index}
          item={item}
          moveCardHandler={moveCardHandler}
        />
      ));
  };

  const returnItemsForColumn = (items, columnName) => {

    return items
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItem
          key={item.id}
          id={item.id}
          name={item.name}
          currentColumnName={item.column}
          setItems={setItems}
          index={index}
          item={item}
          moveCardHandler={moveCardHandler}
        />
      ));
  };

  const { ITEM_LIST, CASE_TRUE, CASE_FALSE } = CLASSIFY_COLUMN_NAMES;

  totalClassify = items.length;

  useEffect(() => {

    setNClassified(totalClassify - items.filter((d) => d.column === CLASSIFY_COLUMN_NAMES.ITEM_LIST).length);

  }, [nClassified, items])

  return (
      <DndProvider backend={HTML5Backend}>
        <div>
          <div className="Two-Column">
              <div className="Classify-Container">
                <div className="">
                  <p>In this module, we will build a simple predictive algorithm to demonstrate how predictive modeling works. Simply, an algorithm is a series of steps that allow you to perform a particular task. One analogy here is laundry. You have an sorting algorithm for how laundry items get classified.</p>
                  <p>One variable in this algorithm is probably color. But variables such as type of machine load (e.g. regular wash, dry clean only), pastel, or print could impact your laundry sorting algorithm. And what do you do with gray clothes anyway?</p>
                </div>
                <h4>sort each item into the correct category</h4>
                <Column title={ITEM_LIST} className="Container item-list-column Margin-Bottom" nClassified={nClassified}>
                  {returnSingleItemForColumn(items, ITEM_LIST)}
                </Column>
                {toggleOverlay? <NextButtonOverlay toggleOverlay={toggleOverlay}/>: <></>}
              </div>
              <div className="Case-Container">
                  <Column title={CASE_TRUE} className="Container Case-True-Column Move-Column Margin-Bottom">
                    {returnItemsForColumn(items, CASE_TRUE)}
                  </Column>
                  <Column title={CASE_FALSE} className="Container Case-False-Column Move-Column">
                    {returnItemsForColumn(items, CASE_FALSE)}
                  </Column>
              </div>
            </div>
        </div>
      </DndProvider>
  );
};
