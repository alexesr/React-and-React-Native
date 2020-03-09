import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

import post from '../../interfaces/post/post.interface';

interface IProps{
}
interface IState{
    posts: post[],
    selectedPostId: number
}

class Blog extends Component<IProps,IState> {
    state = {
        posts: [] as post[],
        selectedPostId: -1
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')//after promise responses
            .then(response =>{
                const posts = response.data.slice(0,4) as post[];
                const updatedPosts = posts.map(post=>{
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
            });
    }

    postSelectedHandler = (id: number) =>{
        this.setState({selectedPostId: id});
    }

    render () {
        const posts = this.state.posts
            .map(post =>{
                return <Post 
                            key={post.id} 
                            title={post.title} 
                            author={post.author}
                            clicked ={this.postSelectedHandler.bind(this,post.id)} />        
            }
        );
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;