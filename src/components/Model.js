import { useState } from 'react';

export default function Model() {
    
    const [list, setList] = useState(['Item type','Print','Soiled','Pastel','Item color','Care type']);

    return(

        <div className="Model">
            <div className="Variables">
               <h5>Data Variables</h5>
               <div className="Variable-Container">
               <>
                    {
                    list&&
                    list.map((item, index) => (
                    <span className="Variable" key={index} draggable> {item}</span>
                    ))}
                    </>
               </div>
            </div>
            <div className="Selected-Variables">
                <h5>Model Variables</h5>
            </div>
        </div>
    )
}