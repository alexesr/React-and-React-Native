import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './Post.css';

interface IProps extends RouteComponentProps{
    title: string;
    author: string;
    clicked : () => void;
}

const Post = (props: IProps) => {
    console.log(props);
    return(
        <article className="Post" onClick={props.clicked}>
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="Author">{props.author}</div>
            </div>
        </article>
    );
};

export default withRouter(Post);//to add routing related props from the closest router props