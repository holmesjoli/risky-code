import React, { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { CLASSIFY_COLUMN_NAMES } from "../utils/global";
import { getBackgroundColor, getColor, getBorder, DndWrapper } from "./DragAndDrop";
import { addClass } from "./Card";
import { importImages } from "./Helper";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
              <h6 className="Small-Margin">{item.dryCleanOnly? "Dry clean only": "Machine wash"}</h6>
            </div>
            <div className="Small-Margin">
              <h4 className="Small-Margin">delicate</h4>
              <h6 className="No-Margin-Bottom">{item.delicate ? "Yes": "No"}</h6>
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

  let instructions = title === ITEM_LIST?  <span className="Instructions Opacity1 Semi-Bold White">Congrats you created an algorithm!</span> : <span className="Instructions Opacity">drop here</span>;

  return (
    <div
      ref={drop}
      className={className}
      style={{ border: getBorder(isOver, canDrop, "Pink"),
               backgroundColor: getBackgroundColor(isOver, canDrop, "Pink") }}
    >
      <h4 className="Small-Margin"
      style={{ color: getColor(isOver, canDrop) }}

      >{title}</h4>
        <div className={title !== ITEM_LIST? "Card-Container2": ""}>
          {children.length === 0 ? <p>{instructions}</p>: children}
      </div>
    </div>
  );
};

export default function SortLaundry({ items, setItems, nClassified, setNClassified, setDisabled}) {

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
    nClassified === totalClassify? setDisabled(false): setDisabled(true);

  }, [nClassified, items])

  return (
    <div id="laundryModel" className='Container'>
      <h3 className="No-Margin-Bottom">interact</h3>
      <div className="Text-Align-Center">
        <DndWrapper id="laundryModel">
        <Column title={ITEM_LIST} className="Margin-Bottom Center-Card" nClassified={nClassified}>
          {returnSingleItemForColumn(items, ITEM_LIST)}
        </Column>
        <ExpandMoreIcon/>
        <div className="Two-Column">
          <Column title={CASE_TRUE} className="Container2 Case-True-Column Move-Column No-Margin-Bottom">
            {returnItemsForColumn(items, CASE_TRUE)}
          </Column>
          <Column title={CASE_FALSE} className="Container2 Case-False-Column Move-Column No-Margin-Bottom">
            {returnItemsForColumn(items, CASE_FALSE)}
          </Column>
        </div>
        </DndWrapper>
        <h5 className="Text-Align-Right Small-Margin White Semi-Bold">{`${nClassified}/${totalClassify} classified`}</h5>
      </div>
    </div>
  );
};
