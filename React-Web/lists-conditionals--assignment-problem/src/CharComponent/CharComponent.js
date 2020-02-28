import React from 'react';
import './CharComponent.css';
const CharComponent = (props)=>{
    return (
        <div onClick={props.DeleteHandler} className ='text-box'>
            <p >{props.letter}</p>
        </div> 
    );
}
export default CharComponent;