import React, { Component } from 'react';

import Person from './Person/Person';
// importing React is very important to allow rendering, because behind the scenes the jsx uses React. methods
// render is the method called by react to render
import './App.css';

class App extends Component {
  render() {
    // the jsx way: which allows syntatic sugar by writing pseudo html, because some html keywords are not allowed, like class,etc.
    return (
      //this code is jsx (a syntatic sugar), it works both in .js and jsx because it does not depend on the extension of the file
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <Person/>
        <Person/>
        <Person/>
      </div>
      //it is a very good practice to wrap everything into a root element, e.g. <div className="App"> ... </div>
    );//these parentheses is to avoid getting error messages
    //the manual way
    //return React.createElement('div',{className:'App'},React.createElement('h1',null,'Hi, I\'m a React App!!!'));
  }
}

export default App;
