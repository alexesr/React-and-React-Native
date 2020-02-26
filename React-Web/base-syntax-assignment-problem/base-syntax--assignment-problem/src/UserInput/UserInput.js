import React from 'react';





const UserInput = (props)=>{

    return (
        <div>
            <input placeholder="User input" onChange = {props.inputHandler}></input>
        </div>
    );
}



export default UserInput;