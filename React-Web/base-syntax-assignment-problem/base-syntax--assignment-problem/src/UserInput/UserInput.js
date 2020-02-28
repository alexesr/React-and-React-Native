import React from 'react';
import './UserInput.css';




const UserInput = (props)=>{
    let className = 'short';
    if(props.username.length>3){
        className= 'long';
    }
    return (
        <div>
            <input className={className} placeholder="User input" value={props.username} onChange = {props.inputHandler}></input>
        </div>
    );
}



export default UserInput;