import React, { Component} from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import { NavLink } from 'react-router-dom';
import FullPost from './FullPost/FullPost';
//NavLink instead of Link object to style depending on selected

interface IProps extends RouteComponentProps{}

class Blog extends Component<IProps> {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/"
                                    exact  //exact to validate not only as preffix
                                    activeStyle={{
                                        color:'#fa923f',
                                        textDecoration: 'underline'
                                    }}
                                >Home</NavLink></li>
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
                <Route path="/" exact component ={Posts}/>
                <Route path="/new-post" exact component ={NewPost}/>
                <Route path="/:id" exact component={FullPost}></Route>
                
            </div>
        );
    }
}

export default withRouter(Blog);