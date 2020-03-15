import React, { Fragment } from 'react';
import Post from './Post/Post';
import post from '../../interfaces/Post.interface';
import classes from './Posts.module.css';

interface IProps{
    posts: post[]
    editHandler: (index: number) =>void;
    deleteHandler: (index: number) => void;
    filterString: string;
}

const Posts = (props:IProps) => {
    let  posts = props.posts.filter(element=>
        element.title.toLocaleLowerCase().includes(props.filterString.toLocaleLowerCase())
    );
    return(
        <Fragment>
            {posts.map((post,index)=>
                <Post
                    className={classes.Post} 
                    editHandler={()=>props.editHandler(index)} 
                    deleteHandler={()=>props.deleteHandler(index)}
                    title={post.title}
                    description={post.description}
                    key={post._id}/>
                )
            }
        </Fragment>
    );
}

export default Posts;