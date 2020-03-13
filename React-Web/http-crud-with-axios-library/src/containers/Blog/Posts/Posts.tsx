import React , { Component } from 'react';
import { Route } from 'react-router-dom';

import post from '../../../interfaces/post/post.interface';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import './Posts.css';
import { Link } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router';
import FullPost from '../FullPost/FullPost';


interface IState{
    posts: post[],
}
interface IProps extends RouteComponentProps{}

class Posts extends Component<IProps,IState>{
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
        //navigating programatically is mostly used after an operation is finished
        //this.setState({selectedPostId: id});
        this.props.history.push('/posts/'+id);
        //this.props.history.push({pathname: '/posts/'+id});
    }

    render() {
        let posts;
        posts = <p style={{textAlign:'center'}}>Something went wrong!</p>;
        posts = this.state.posts
            .map(post =>{
                return (//<Link key={post.id} to={'/' + post.id}>
                            <Post  
                                key={post.id}
                                title={post.title} 
                                author={post.author}
                                clicked ={this.postSelectedHandler.bind(this,post.id)} />
                        //</Link>
                );      
            }
        );
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url+'/:id'} exact component={FullPost}/> {/* nested route */}
            </div>
        );
    }
}

export default withRouter(Posts);