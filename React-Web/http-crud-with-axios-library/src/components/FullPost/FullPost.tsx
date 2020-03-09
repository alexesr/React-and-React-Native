import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

import post , { initial } from '../../interfaces/post/post.interface';

interface IProps{
    id: number;
}

interface IState{
    loadedPost: post;
}

class FullPost extends Component<IProps,IState> {
    state = {
        loadedPost:initial 
    }

    componentDidUpdate(){
        if(this.props.id>-1 && this.state.loadedPost.id !== this.props.id) // check that the prop id is valid and is different from the last id
            axios.get('https://jsonplaceholder.typicode.com/posts/'+this.props.id)
                .then(response=>{
                    this.setState({loadedPost:response.data});
                });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.id > -1){
            post = <p style={{textAlign: 'center'}}>Loading...!</p>;
        }
        if(this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost?(this.state.loadedPost).title:''}</h1>
                    <p>{this.state.loadedPost?this.state.loadedPost.body:''}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }
}

export default FullPost;