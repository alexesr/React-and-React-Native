import React , { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

interface IProps{
    link: string;
    children: ReactNode;
    exact?: boolean
}

const NavigationItem = (props: IProps) =>
    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link}
            activeClassName={classes.active}
            exact={props.exact}
        >{props.children}</NavLink>
    </li>

export default NavigationItem;