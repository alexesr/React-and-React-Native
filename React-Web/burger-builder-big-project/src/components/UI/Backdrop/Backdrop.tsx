import React from 'react';

import classes from './Backdrop.module.css';

interface IProps {
    show: boolean;
    clicked: () => void
}

const Backdrop = (props: IProps) =>
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null


export default Backdrop;