import React , { ReactNode } from 'react';

import classes from './Button.module.css';

interface IProps{
    children?: ReactNode;
    clicked: () => void;
    btnType: 'Success' | 'Danger';
    disable: boolean;
    hidden?: boolean;
}

const Button = (props: IProps) =>
    <button hidden={props.hidden} disabled={props.disable}
        className={[classes.Button,classes[props.btnType]].join(' ')}
        onClick={props.clicked}>
            {props.children}
    </button>
export default Button;