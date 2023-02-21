import React, { useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getBackgroundColor, getColor, getBorder } from "./DragAndDrop";
import { ReactComponent as Arrow } from '../assets/images/arrow.svg';
import { importTransitImages } from "./Helper";

const images = importTransitImages();

export const COLUMN_NAMES = {
    TRANSIT: 'transit',
    BUMP: 'bump',
    NO_BUMP: 'no bump'
}

const {TRANSIT} = COLUMN_NAMES;
export const transitMethods = [
    {id: 1, name: 'Item 1', column: TRANSIT},
    {id: 2, name: 'Item 2', column: TRANSIT},
    {id: 3, name: 'Item 3', column: TRANSIT},
    {id: 4, name: 'Item 4', column: TRANSIT},
    {id: 5, name: 'Item 5', column: TRANSIT},
    {id: 6, name: 'Item 6', column: TRANSIT},
    {id: 7, name: 'Item 7', column: TRANSIT},
    {id: 8, name: 'Item 8', column: TRANSIT},
    {id: 9, name: 'Item 9', column: TRANSIT},
    {id: 10, name: 'Item 10', column: TRANSIT},
    {id: 11, name: 'Item 11', column: TRANSIT},
];

const MovableItem = ({
  id,
  name,
  index,
  item,
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
    item: { index, name, currentColumnName },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult;
        const { TRANSIT, BUMP, NO_BUMP } = COLUMN_NAMES;
        switch (name) {
          case BUMP:
            changeItemColumn(item, BUMP);
            break;
          case NO_BUMP:
            changeItemColumn(item, NO_BUMP);
            break;
          case TRANSIT:
            changeItemColumn(item, TRANSIT);
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
    <div ref={ref} className="Movable-Item Card" style={{ opacity }}>
        <img src={images[Object.keys(images)[item.id]]} alt="" width="200"></img>
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
      const { TRANSIT, BUMP, NO_BUMP } = COLUMN_NAMES;
      const { currentColumnName } = item;
      return (
        currentColumnName === title ||
        (currentColumnName === TRANSIT && title === BUMP) ||
        (currentColumnName === BUMP &&
          (title === TRANSIT || title === NO_BUMP)) ||
        (currentColumnName === NO_BUMP &&
          (title === BUMP )) ||
        ( title === NO_BUMP)
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
      <h3 className="Small-Margin" style={{ color: getColor(isOver, canDrop) }}>{title}</h3>
      <div className="Card-Container Moveable-Items">
        {children.length === 0 ? <p>drop here</p>: children}
      </div>
    </div>
  );
};

export default function SortBump() {
  const [items, setItems] = useState(transitMethods);

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

  const returnItemsForColumn = (columnName) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItem
          id={item.id}
          key={item.id}
          name={item.name}
          currentColumnName={item.column}
          setItems={setItems}
          index={index}
          item={item}
          moveCardHandler={moveCardHandler}
        />
      ));
  };

  const { TRANSIT, BUMP, NO_BUMP } = COLUMN_NAMES;

  return (
    <div className="Model-Container">
      <DndProvider backend={HTML5Backend}>
        <Column title={TRANSIT} className="Container Variables-Column">
          {returnItemsForColumn(TRANSIT)}
        </Column>
        <Arrow/>
        <div className="Two-Column">
            <Column title={BUMP} className="Container Variables-Column">
            {returnItemsForColumn(BUMP)}
            </Column>
            <Column title={NO_BUMP} className="Container Variables-Column">
            {returnItemsForColumn(NO_BUMP)}
            </Column>
        </div>
      </DndProvider>
    </div>
  );
};
