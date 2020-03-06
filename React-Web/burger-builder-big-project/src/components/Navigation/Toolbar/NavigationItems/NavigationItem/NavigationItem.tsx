import React , { ReactNode } from 'react';

import classes from './NavigationItem.module.css';

interface IProps{
    active?: boolean;
    link: string;
    children: ReactNode;
}

const NavigationItem = (props: IProps) =>
    <li className={classes.NavigationItem}>
        <a 
            className={props.active ? classes.active : undefined}
            href={props.link}>
                {props.children}
        </a>
    </li>

export default NavigationItem;