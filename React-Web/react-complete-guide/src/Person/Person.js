import React from 'react';
import './Person.css'; // Because of web pack that is used by React we can import the css file. 
//Web pack takes care of injecting the css

//This is an stateless way
const person = (props) => { // props holds all the attributes passed in the html tag
    return (
        <div className="Person">
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    );
    //props.children refers to the elements that are inside the html tag
}

export default person;