import React from 'react';

import classes from './Post.module.css';

interface IProps {
    className: string;
    editHandler: () => void;
    deleteHandler: () => void;
    title: string;
    description: string;
}

const Post = (props: IProps) => 
    <div className={props.className}>
        <div className={"w3-card-4 "+classes.Card} >
            <header className="w3-container w3-blue">
                <h1>{props.title}</h1>
            </header>
            <div className="w3-container">
                <p>{props.description}</p>
            </div>
            <footer className="w3-container w3-blue">
                <i className="fa fa-trash" onClick={props.deleteHandler}></i>
                <i className="fa fa-edit" onClick={props.editHandler}></i>
            </footer>
        </div>
    </div>

export default Post;