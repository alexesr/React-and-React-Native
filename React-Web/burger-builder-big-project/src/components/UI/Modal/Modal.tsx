import React , { ReactNode , Fragment , memo } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

interface IProps{
    children: ReactNode
    show: boolean,
    modalClosed: () => void
}

const Modal = (props: IProps) =>
    <Fragment>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Fragment>
export default memo(Modal);