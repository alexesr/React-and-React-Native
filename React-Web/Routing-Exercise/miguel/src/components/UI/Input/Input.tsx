import React, {FormEventHandler} from 'react';
import classes from './Input.module.css';

interface IProps{
    placeholder: string;
    value: string;
    onChange: FormEventHandler<HTMLElement>;
    onKeyUp?: any; 
}

const Input = (props: IProps) =>
    <input className={classes.Input} value={props.value} placeholder={props.placeholder} onChange={props.onChange} onKeyUp={props.onKeyUp}/>

export default Input;