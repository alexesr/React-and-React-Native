//!!!!using Radium:


/*import React from 'react';
import './Person.css'; // Because of web pack that is used by React we can import the css file. 
import Radium from 'radium';
//Web pack takes care of injecting the css

//This is an stateless way
const person = (props) => { // props holds all the attributes passed in the html tag
    // media query inline definition
    // IMPORTANT!:  to transform media query selectors and keyframe animations we need to wrap the application it with Style Root
    //this is not working
    const style={
        '@media (min-width: 500px)':{
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

export default Radium(person);*/

///!!! Using styled components:


import React from 'react';
//import './Person.css'; // Because of web pack that is used by React we can import the css file. 
import styled from 'styled-components';
//Web pack takes care of injecting the css

const StyledDiv = styled.div`
    width:60%;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;
    @media (min-width: 500px) {
        width: 450px
    }
`; // this is a valid react component 

//This is an stateless way
const person = (props) => { // props holds all the attributes passed in the html tag
    // media query inline definition
    // IMPORTANT!:  to transform media query selectors and keyframe animations we need to wrap the application it with Style Root
    //this is not working
    /*const style={
        '@media (min-width: 500px)': {
            width: '450px'
        }
    };*/
    return (
        <StyledDiv>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </StyledDiv>
    );
    //props.children refers to the elements that are inside the html tag
}

export default person;