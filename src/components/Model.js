import { useState } from 'react';
// import arrow from "./utils/img/arrow.svg";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const modelVariables = [
    {
      id: 'type',
      name: 'Item type'
    },
    {
      id: 'print',
      name: 'Print'
    },
    {
      id: 'soiled',
      name: 'Soiled'
    },
    {
      id: 'pastel',
      name: 'Pastel'
    },
    {
      id: 'color',
      name: 'Item color'
    },
    {
      id: 'care',
      name: 'Care type'
    }
  ]

// dragging action adapted from https://rootstack.com/en/blog/how-do-i-use-drag-and-drop-react
// https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/
export default function Model() {

    const [variables, updateVariables] = useState(modelVariables);

    function handleOnDragEnd(result) {
        if (!result.destination) return;
    
        const items = Array.from(variables);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        updateVariables(items);
      }

    return(
        <div className="Model">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="droppable-variable">
                    {(provided) => (
                    <div className="droppable-variable" {...provided.droppableProps} ref={provided.innerRef}>
                        <div className="Data-Variables">
                            <h5>Data Variables</h5>
                            <div>
                                {variables.map(({id, name}, index) => {

                                return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="Variable">
                                                { name }
                                            </div>
                                        )}
                                    </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        </div>
                        <div className="droppable-variable" {...provided.droppableProps} ref={provided.innerRef}>
                            <h5>Model Variables</h5>
                        </div> 
                        {/* {provided.placeholder} */}
                    </div>
                )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
