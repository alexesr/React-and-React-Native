import React , { Component } from 'react';

import post from '../../../interfaces/post/post.interface';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import './Posts.css';
import { Link } from 'react-router-dom';

interface IState{
    posts: post[],
}
interface IProps{}

export default class Posts extends Component<IProps,IState>{
    state = {
        posts: [] as post[],
    }

    componentDidMount(){
        console.log(this.props);
        axios.get('/posts')//after promise responses
            .then(response =>{
                const posts = response.data.slice(0,4) as post[];
                const updatedPosts = posts.map(post=>{
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
            })
            .catch(error=>{
                console.log(error);
            });
    }

    postSelectedHandler = (id: string) =>{
        //this.setState({selectedPostId: id});
    }

    render() {
        let posts;
        posts = <p style={{textAlign:'center'}}>Something went wrong!</p>;
        posts = this.state.posts
            .map(post =>{
                return <Link key={post.id} to={'/' + post.id}>
                            <Post  
                                title={post.title} 
                                author={post.author}
                                clicked ={this.postSelectedHandler.bind(this,post.id)} />
                        </Link>        
            }
        );
        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}