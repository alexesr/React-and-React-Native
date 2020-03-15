import React , { ReactNode } from 'react';

import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import classes from './PostModal.module.css';

interface IProps{
    cancelAction: () => void;
    continueAction: () => void;
    modalClosed: () => void;
    showModal: boolean;
    children: ReactNode;
    actionName: string;
    actionDescription: string;
    disableActions: boolean;
}

const PostModal = (props: IProps) =>
    <Modal className={classes.PostModal} show={props.showModal} disable={props.disableActions} modalClosed={props.modalClosed}>
        <header className="w3-blue w3-container">
            <h3>{props.actionName}</h3>
        </header>
        <p className="w3-container">{props.actionDescription}</p>
        <ul>
            {props.children}
        </ul>
        <footer className="w3-container">
            <Button hidden btnType="Danger" disable={true} clicked={()=>{}}></Button>
            <Button btnType="Danger" disable={props.disableActions} clicked={props.cancelAction}>CANCEL</Button>
            <Button btnType="Success" disable={props.disableActions} clicked={props.continueAction}>CONTINUE</Button>
        </footer>
    </Modal>

export default PostModal;