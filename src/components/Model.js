import { useState, useRef } from 'react';
// import arrow from "./utils/img/arrow.svg";
import { DragDropContext } from 'react-beautiful-dnd';

// dragging action adapted from https://rootstack.com/en/blog/how-do-i-use-drag-and-drop-react
export default function Model() {
    
    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState(['Item type','Print','Soiled','Pastel','Item color','Care type']);

    const dragStart = (e, position) => {
        dragItem.current = position;
        console.log(e.target.innerHTML);
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
    };

    const drop = (e) => {
        const copyListItems = [...list];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setList(copyListItems);
    };

    return(

        <div className="Model">
            <div className="Variables">
               <h5>Data Variables</h5>
               <div className="Variable-Container">
               <>
                    {
                    list&&
                    list.map((item, index) => (
                    <span 
                        className="Variable" 
                        key={index} 
                        onDragStart={(e) => dragStart(e, index)}
                        onDragEnter={(e) => dragEnter(e, index)}
                        onDragEnd={drop}
                        draggable> 
                        {item}
                    </span>
                    ))}
                    </>
               </div>
            </div>
            {/* <div></div> */}
            {/* <img src={arrow} alt="Your SVG" /> */}
            <div className="Selected-Variables">
                <h5>Model Variables</h5>
            </div>
        </div>
    )
}
