import React , {FormEventHandler} from 'react';

interface inputType{
    value: string,
    alexis?: number,
    inputHandler: FormEventHandler<HTMLElement>
}
const input = (props: inputType)=> 
    <input value={props.value} onChange={props.inputHandler}></input>

export default input;