import React, { useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getBackgroundColor, getColor, getBorder } from "./DragAndDrop";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { STAKEHOLDER_COLUMN_NAMES, stakeholderGroups } from "../utils/global";

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
        const { STAKEHOLDER, DIRECT, INDIRECT, EXCLUDED } = STAKEHOLDER_COLUMN_NAMES;
        switch (name) {
          case STAKEHOLDER:
            changeItemColumn(item, STAKEHOLDER);
            break;
          case DIRECT:
            changeItemColumn(item, DIRECT);
            break;
          case INDIRECT:
            changeItemColumn(item, INDIRECT);
            break;
          case EXCLUDED:
              changeItemColumn(item, EXCLUDED);
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
    <div ref={ref} className="Movable-Item Card Variable" style={{ opacity }}>
      {item.name}
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
      const { STAKEHOLDER, DIRECT, INDIRECT, EXCLUDED } = STAKEHOLDER_COLUMN_NAMES;
      const { currentColumnName } = item;
      return (
        currentColumnName === title || title === DIRECT || title === INDIRECT || title === EXCLUDED || title === STAKEHOLDER
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
      <h4 className="Small-Margin" style={{ color: getColor(isOver, canDrop) }}>{title}</h4>
      <div className="Card-Container Moveable-Items">
        {children.length === 0 ? <p className="Opacity">drop here</p>: children}
      </div>
    </div>
  );
};

export default function SortStakeholders() {
  const [items, setItems] = useState(stakeholderGroups);

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

  const { STAKEHOLDER, DIRECT, INDIRECT, EXCLUDED } = STAKEHOLDER_COLUMN_NAMES;

  return (
    <div className="Text-Align-Center Two-Column">
      <DndProvider backend={HTML5Backend}>
        <Column title={STAKEHOLDER} className="Container Variables-Column Card-Group">
          {returnItemsForColumn(STAKEHOLDER)}
        </Column>
        {/* <ExpandMoreIcon className="Scale200"/> */}
        <div className="Three-Row-Equal">
          <Column title={DIRECT} className="Container Variables-Column Margin-Bottom Card-Group">
            {returnItemsForColumn(DIRECT)}
          </Column>
            <Column title={INDIRECT} className="Container Variables-Column Margin-Bottom Card-Group">
            {returnItemsForColumn(INDIRECT)}
            </Column>
            <Column title={EXCLUDED} className="Container Variables-Column Margin-Bottom Card-Group">
            {returnItemsForColumn(EXCLUDED)}
            </Column>
        </div>
      </DndProvider>
    </div>
  );
};