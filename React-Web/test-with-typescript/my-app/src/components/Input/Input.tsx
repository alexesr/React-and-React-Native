import React, { ChangeEvent } from 'react';

interface inputType{
    value: string,
    inputHandler: any
}
const input = (props: inputType)=> 
    <input value={props.value} onChange={props.inputHandler}></input>

export default input;