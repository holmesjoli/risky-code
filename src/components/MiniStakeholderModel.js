import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getBackgroundColor, getColor, getBorder, DndWrapper } from "./DragAndDrop";
import { STAKEHOLDER_COLUMN_NAMES, stakeholderGroups } from "../utils/global";
import { Fab, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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
    <div ref={ref} className="Movable-Item Variable Variable-LightOrange" style={{ opacity }}>
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
      style={{ border: getBorder(isOver, canDrop, "LightOrange"),
        backgroundColor: getBackgroundColor(isOver, canDrop, "LightOrange") }}
    >
      <h4 className="Small-Margin" style={{ color: getColor(isOver, canDrop) }}>{title}</h4>
      <div className="Card-Container Moveable-Items">
        {children.length === 0 ? <p className="Opacity">drop here</p>: children}
      </div>
    </div>
  );
};

export default function MiniModel() {
  const [items, setItems] = useState(stakeholderGroups);
  const [stakeholderName, setStakeholderName] = useState("");

  const add = () => {

    let dataNew = Object.assign([], items);
    const {STAKEHOLDER} = STAKEHOLDER_COLUMN_NAMES;
    let sk = {'id': 10, 'name': stakeholderName, 'column': STAKEHOLDER, 'group': ''};

    console.log(dataNew)
    dataNew.push(sk);

    setStakeholderName("");
    setItems(dataNew)
}

  const updateStakeholder = ev => {
    setStakeholderName(ev.target.value);
  }

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
    <div id="stakeholderMiniModel" className="Text-Align-Center Two-Column">
      <DndWrapper id="stakeholderMiniModel">
        <div>
          <Column title={STAKEHOLDER} className="Container Variables-Column Card-Group">
            {returnItemsForColumn(STAKEHOLDER)}
          </Column>
          <div className="Container2 Margin-Bottom">
            <h4 className="Small-Margin">add your own stakeholder</h4>
            <TextField className="LightOrange" value={stakeholderName} placeholder="stakeholder name" variant="outlined" onChange={updateStakeholder} />
            <div className="Add-Stakeholder-Button Margin-Top">
                <h4 className="Small-Margin">add stakeholder to the list</h4>
                <Fab color="primary" onClick={add} className="LightOrange">
                    <AddIcon />
                </Fab>
            </div>
          </div>
      </div>
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
      </DndWrapper>
    </div>
  );
};
