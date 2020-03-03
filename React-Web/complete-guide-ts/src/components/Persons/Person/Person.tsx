
import React, { Component, Fragment, RefObject } from 'react';
//import './Person.css'; // Because of web pack that is used by React we can import the css file. 
import classes from './Person.module.css';
import withClass from '../../../hoc/withClass';

import AuthContext from '../../../context/auth-context'
//Web pack takes care of injecting the css

interface type{
    click: ()=> void,
    name: string,
    age: number,
    changed: ()=>void
}
//This is an stateless way
class Person extends Component<type> {  // props holds all the attributes passed in the html tag
    // media query inline definition
    // IMPORTANT!:  to transform media query selectors and keyframe animations we need to wrap the application it with Style Root
    //this is not working
    /*const style={
        '@media (min-width: 500px)': {
            width: '450px'
        }
    };*/
    inputElementRef: RefObject<HTMLInputElement>;
    constructor(props: type) {
        super(props);
        //this approach is for class based components
        this.inputElementRef = React.createRef(); ///since 16.3
    }

    //for class based components
    static contextType = AuthContext; //alternative way for context since React 16.6

    componentDidMount() {
        if(this.inputElementRef.current)
            this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }
    render() {
        console.log('[Person..js] rendering...');
        
        return (
            //
            <Fragment>
                {this.context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>}
                <p key="i1" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p key="i2">{this.props.children}</p>
                <input key="i3" /*ref={(inputEl)=>{this.inputElement = inputEl}}*/ ref={this.inputElementRef} type="text" onChange={this.props.changed} value={this.props.name} />
            </Fragment>
        );
    }
    //props.children refers to the elements that are inside the html tag
}

export default withClass(Person, classes.Person);
