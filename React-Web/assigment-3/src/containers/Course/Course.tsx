import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';


interface IParams{
    id: string;
}

interface IState{
    title: string | null;
}

interface IProps extends RouteComponentProps<IParams>{
}

export class Course extends Component<IProps,IState> {
    state={title:null};

    componentDidMount(){
        this.parseQueryParams();
    }
    componentDidUpdate(){
        this.parseQueryParams();
    }

    parseQueryParams(){
        let title = new URLSearchParams(this.props.location.search).get('title');
        if(this.state.title!==title){
            this.setState({
                title:title
            });
        }
    }

    render () {
        return (
            <div style={{textAlign:'center'}}>
                <h1>{this.state.title?this.state.title:"Invalid course title!"}</h1>
                <p>You selected the Course with ID: {this.state.title?this.props.match.params.id:"Invalid course id!"}</p>
            </div>
        );
    }
}

export default Course;