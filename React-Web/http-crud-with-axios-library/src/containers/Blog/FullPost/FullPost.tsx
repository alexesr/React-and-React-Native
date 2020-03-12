import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

import post , { initial } from '../../../interfaces/post/post.interface';
import { RouteComponentProps } from 'react-router';


interface IParams{
    id: string;
}

interface IProps extends RouteComponentProps<IParams>{
}

interface IState{
    loadedPost: post;
}

class FullPost extends Component<IProps,IState> {
    state = {
        loadedPost:{...initial} 
    }

    componentDidMount(){
        console.log('FullPost props:', this.props);
        //console.log('componentDidUpdate in fullpost ',this.props.id);
        if(this.props.match.params.id && this.state.loadedPost.id !== this.props.match.params.id){// check that the prop id is valid and is different from the last id
            console.log('id is different');
            axios.get('/posts/'+this.props.match.params.id)
                .then(response=>{
                    console.log('response in full post: ',response);
                    this.setState({loadedPost:response.data});
                })
                .catch(error=>{
                    console.log('error in fullpost: ',error);
                });
        }
    }

    deletePostHandler = () =>{
        axios.delete('/posts/'+this.props.match.params.id)
            .then(response =>{
                console.log('delete', response);
            });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.match.params.id!==''){
            post = <p style={{textAlign: 'center'}}>Loading...!</p>;
        }
        if(this.state.loadedPost.id!==''){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost?(this.state.loadedPost).title:''}</h1>
                    <p>{this.state.loadedPost?this.state.loadedPost.body:''}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }
}

export default FullPost;