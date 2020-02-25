import React from 'react';
import './Person.css'; // Because of web pack that is used by React we can import the css file. 
import Radium from 'radium';
//Web pack takes care of injecting the css

//This is an stateless way
const person = (props) => { // props holds all the attributes passed in the html tag
    // media query inline definition
    // IMPORTANT!:  to transform media query selectors and keyframe animations we need to wrap the application it with Style Root
    //this is not working
    const style={
        '@media (mix-width: 500px)':{
            width: '450px'
        }
    };
    return (
        <div className="Person" style={style}>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    );
    //props.children refers to the elements that are inside the html tag
}

export default Radium(person);