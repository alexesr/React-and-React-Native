import React, { Component} from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts'; // every import informs webpack that this is going to be include in the global bundle
import AsyncComponent from '../../hoc/AsyncComponent';
//import NewPost from './NewPost/NewPost';
import { NavLink , Switch } from 'react-router-dom';
//NavLink instead of Link object to style depending on selected

interface IProps extends RouteComponentProps{}

interface IState{
    auth: boolean;
}

const AsyncNewPost = AsyncComponent(() => {
    return import ('./NewPost/NewPost');
})

class Blog extends Component<IProps,IState> {
    state = {
        auth:true
    };
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts"
                                    exact  //exact to validate not only as preffix
                                    activeStyle={{
                                        color:'#fa923f',
                                        textDecoration: 'underline'
                                    }}
                                >Posts</NavLink></li>
                                <li><NavLink to={{
                                    pathname:"/new-post",
                                    //activeClassName="my-active"
                                    /*pathname:this.props.match.url + "/new-post"/*,
                                    hash:'#submit',
                                    search:'?quick-submit=true'*/
                                }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/*<Route path="/" exact render={()=><h1>Home</h1>}/>*/}
                <Switch> {/* to only render 1 single route at the time */}
                    {this.state.auth?<Route path="/new-post" exact component ={AsyncNewPost}/>:null /*guard*/} 
                    <Route path="/posts" component ={Posts}/>
                    <Route render={()=><h1>Not found</h1>}/>
                    {/*<Redirect from="/" to="/posts"/>/*}
                    {/*<Route path="/" component ={Posts}/>*/}
                </Switch>
            </div>
        );
    }
}

export default withRouter(Blog);