import React, { Component } from 'react';
import { Route, RouteComponentProps, withRouter, Redirect } from 'react-router-dom';
import { Searchbar } from 'react-native-paper';

import './Blog.css';

//import Posts from './Posts/Posts';
//import NewPost from './NewPost/NewPost';
import {NavLink, Switch} from 'react-router-dom';

interface IProps extends RouteComponentProps{}

interface IState{
    auth: boolean;
}

let activeStyle = {
    color: '#fa923f',
    textDecoration: 'underline'
}
let searchBarStyle ={
    justifyContent: 'flex-end'
}

class Blog extends Component<IProps, IState>{
    state = {
        auth: true
    };
    render(){
        return(
            <div className ="Blog">
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/posts" exact activeStyle={activeStyle}>
                                Posts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="" exact className="float-right"></NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );

    }
}

export default withRouter(Blog);