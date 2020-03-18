import React , { ReactNode } from 'react';

import classes from './Button.module.css';

interface IProps{
    children: ReactNode;
    clicked?: (...args: any[]) => void;
    btnType: 'Success' | 'Danger';
    disabled?: boolean;
}

const Button = (props: IProps) =>
    <button
        className={[classes.Button,classes[props.btnType]].join(' ')}
        onClick={props.clicked}
        disabled={props.disabled}>
            {props.children}
    </button>
export default Button;