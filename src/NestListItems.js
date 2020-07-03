import React from 'react';
import'./NestListItems.css';
import FlipMove from 'react-flip-move';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function NestListItems(props){
    const nestedlist = props.nestitems;
    
    const nestlistitems = nestedlist.map(nest =>{
        return <div className = "nestedList">
            <form id = "sublist" >
            <p>
            <input type = "text" 
                id = {nest.nestedkey} 
                value = {nest.nestedtext}
                onChange = {
                    (e) =>{
                        props.nestUpdate(e.target.value,nest.key)    
                    }
                }
                />
            <span>
                <FontAwesomeIcon className = "faiconsn" icon = "trash"
                onClick = {
                    () => props.nestxdelete(nest.key)
                }
                />
            </span>

            </p>

            </form>
        </div>
    })
    return(
        <div>
            <FlipMove duration = {300} easing = "ease-in-out">
            {nestlistitems}
            </FlipMove>
        </div>
    )
    
    
    
}

export default NestListItems;