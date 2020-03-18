import React from 'react';

import classes from './Input.module.css';
import { elementConfigSelector } from '../../../interfaces/input.interface';
import { FormChangeEventType }  from '../../../types/form.type';

interface TProps {
    elementType: string;
    elementConfig: Object;
    value: string;
    changed: (event: FormChangeEventType) => void;
    invalid: boolean;
    shouldValidate: boolean;
    touched: boolean;
    label?:string;
};

const input = (props:TProps) =>{
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    let defaultInput = 
        <input 
            className={inputClasses.join(' ')}  
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed}/>;
    switch(props.elementType){
        case 'input':
            inputElement = defaultInput;
            break;
        case 'textarea':
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
            break;
        case 'select':
            inputElement = 
                <select 
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {(props.elementConfig as elementConfigSelector).options.map(option=>
                        <option 
                            key={option.value} 
                            value={option.value}>
                        {option.displayValue}</option>
                    )}
                </select>;
            break;
        default:
            inputElement = defaultInput;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;