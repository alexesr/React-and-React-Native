import React from 'react';
import classes from './DrawerToggle.module.css';

interface IProps{
    clicked : () => void;
}

const DrawerToggle = (props: IProps) =>{
    const times=['1','2','3'];
    return(
        <div onClick={props.clicked}>
            {
                times.map(element=><div key={element} className={classes.hamLine}></div>)
            }
        </div>
    );
}

export default DrawerToggle;