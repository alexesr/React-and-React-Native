import React from 'react';

import classes from './Backdrop.module.css';

interface IProps {
    show: boolean;
    clicked: () => void;
    disable: boolean;
}

const Backdrop = (props: IProps) =>
    props.show ? <div className={classes.Backdrop} onClick={()=>{if(!props.disable)props.clicked()}}></div> : null


export default Backdrop;