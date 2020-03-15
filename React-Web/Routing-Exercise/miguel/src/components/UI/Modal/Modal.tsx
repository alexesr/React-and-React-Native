import React , { ReactNode , memo } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

interface IProps{
    children: ReactNode
    show: boolean,
    modalClosed: () => void
    disable: boolean;
    className: string;
}

const Modal = (props: IProps) =>
    <div className={props.className}>
        <Backdrop show={props.show} disable={props.disable} clicked={props.modalClosed}/>
        <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </div>
export default memo(Modal);