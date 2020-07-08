import React, { Component } from 'react';

import './Courses.css';
import { RouteComponentProps,Route } from 'react-router-dom';

import Course from '../Course/Course';

interface IState{
    courses: {id: number, title: string}[]
}
interface IProps extends RouteComponentProps{}

class Courses extends Component<IProps,IState> {

    courseSelectedHandler = (id: number,title: string) =>{
        this.props.history.push({
            pathname:'/courses/'+id,
            search:`?title=${title}`
        });
    }

    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    }

    render () {
        return (
            <div>
                <h1 style={{textAlign:'center'}}>Amazing Udemy Courses</h1>
                <section className="Courses">
                    {
                        this.state.courses.map( course => {
                            return <article onClick={()=>this.courseSelectedHandler(course.id,course.title)} className="Course" key={course.id}>{course.title}</article>;
                        } )
                    }
                </section>
                <Route path={this.props.match.url+'/:id'} component={Course}/>
            </div>
        );
    }
}

export default Courses;