
///!!! Using Radium

/*import Person from './Person/Person';
// importing React is very important to allow rendering, because behind the scenes the jsx uses React. methods
// render is the method called by react to render
import Radium , {StyleRoot} from 'radium';
import './App.css';

//This is a stateful way

///->CLASSIC WAY WITH CLASS 
/*import React, { Component } from 'react';
class App extends Component {
  //state only works when extending Component class, react hooks will be taught in the future
  state = {
    persons: [
      {name: 'Max', age:28},
      {name: 'Manu', age:29},
      {name: 'Miguel',age:19}
    ],
    otherState:'some other value'
  }; //state and props are special properties, because if state is changed the DOM is re-rendered

  switchNameHandler = () =>{
    //console.log('Was clicked');
    this.setState({
      persons: [
        {name: 'Maximilian',age:28},
        {name: 'Manu', age:29},
        {name: 'Miguel',age:19},
      ] //it is NOT necessary to manually set the other states, becuase it merges automatically
    });// to update the dom in Component based in classes, 
  };

  render() {
    // the jsx way: which allows syntatic sugar by writing pseudo html, because some html keywords are not allowed, like class,etc.
    return (
      //this code is jsx (a syntatic sugar), it works both in .js and jsx because it does not depend on the extension of the file
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button onClick={this.switchNameHandler}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>This is inside Manu</Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
      </div>
      //it is a very good practice to wrap everything into a root element, e.g. <div className="App"> ... </div>
    );//these parentheses is to avoid getting error messages
    //the manual way
    //return React.createElement('div',{className:'App'},React.createElement('h1',null,'Hi, I\'m a React App!!!'));
  }
}*/

///->NEW WAY WITH HOOK since React 16.8 version, using nested functions

/*import React, { useState } from 'react';

const App = props => {
  //With React Hooks we manage state with a lot of states slices
  // the first array element returns the state and the second returns are function to set the state
  // useState() function can be used multiple times
  const [personsState, setPersonsState] = useState({
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf11', name: 'Miguel', age: 19 }
    ],
  });
  const [otherState, setOtherState] = useState('some other value');
  const [showPersons,setShowPersons] = useState(false);
  console.log(personsState, otherState);
  //state only works when extending Component class, react hooks will be taught in the future
  // the jsx way: which allows syntatic sugar by writing pseudo html, because some html keywords are not allowed, like class,etc.
  const nameChangedHandler = (event,id) => {
    const personIndex = personsState.persons.findIndex(p=>{
      return p.id===id;
    });
    console.log('person: ',personIndex);
    const person = {...personsState.persons[personIndex]};//better practice
    person.name=event.target.value;
    const persons = [...personsState.persons];
    persons[personIndex]=person;
    setPersonsState({
      persons: persons
    });
  };
  const deletePersonHandler = (personIndex) =>{
    const persons = [...personsState.persons]; // good practice to create copy before modifying directly the state!!!
    persons.splice(personIndex,1);
    setPersonsState({persons: persons});
  }
  const togglePersonsHandler = () =>{
    setShowPersons(!showPersons);
    //in a class based it would moreless
    /*
    this.setState({showPersons:!this.state.showPersons});
    */
  //}
  // the hover selector (pseudo selector) is selected with :
  /*const style = {
    backgroundColor: 'green',
    color:'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'lightgreen',
      color: 'black'
    }
  };//inline styling
  //Rendering Content Conditionally:
  /*return (
    //this code is jsx (a syntatic sugar), it works both in .js and jsx because it does not depend on the extension of the file
    //calling myFunction.bind() is better than calling ()=> myFuncion (...) in terms of performance
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p>This is really working!</p>
      <button style={style} onClick={togglePersonsHandler}>Toogle Persons</button>
      {showPersons ? <div>
        <Person
          name={personsState.persons[0].name}
          age={personsState.persons[0].age}
          click={switchNameHandler.bind(this, 'Maximilian')}
        />
        <Person
          name={personsState.persons[1].name}
          age={personsState.persons[1].age}
          click={() => switchNameHandler('Master')}
          changed={nameChangedHandler}
        >
          This is inside Manu
        </Person>
        <Person
          name={personsState.persons[2].name}
          age={personsState.persons[2].age}
          click={switchNameHandler.bind(this, '')}
        />
      </div> : null }
    </div>
    //it is a very good practice to wrap everything into a root element, e.g. <div className="App"> ... </div>
  );//these parentheses is to avoid getting error messages*/
  //Rendering Dynamic Content "The Javascript Way" (Prefered way):
  /*let persons  = null;
  if(showPersons){
    persons = (
      <div>
        {personsState.persons.map((person,index) =>{
          return <Person
            name={person.name}
            age={person.age}
            click={deletePersonHandler.bind(this,index)}
            key={person.id}
            changed={(event) => nameChangedHandler(event,person.id)}
          />
        })}
      </div>
    ); // key is very important to give React a way of indentifying internally which element is each tag and to be very efficiente,
    //if not key is provided, a warning is logged out in the console  
    style.backgroundColor='red';
    style[':hover'] = {
      backgroundColor: 'salmon',
      color: 'black',
    };
  }
  let classes = []// string red bold
  if(personsState.persons.length<=2){
    classes.push('red');
  }
  if(personsState.persons.length<=1){
    classes.push('bold');
  }
  return (
    //this code is jsx (a syntatic sugar), it works both in .js and jsx because it does not depend on the extension of the file
    //calling myFunction.bind() is better than calling ()=> myFuncion (...) in terms of performance
    <StyleRoot>
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}> This is really working!</p>
        <button style={style} onClick={togglePersonsHandler}>Toogle Persons</button>
        {persons}
      </div>
    </StyleRoot>
    //it is a very good practice to wrap everything into a root element, e.g. <div className="App"> ... </div>
  );//these parentheses is to avoid getting error messages
  //the manual way
  //return React.createElement('div',{className:'App'},React.createElement('h1',null,'Hi, I\'m a React App!!!'));
}

export default Radium(App); //higher order component, 
//component inside component that injects extra functionality,
//that can be used with class and functional components
import Person from './Person/Person';
// importing React is very important to allow rendering, because behind the scenes the jsx uses React. methods
// render is the method called by react to render
import Radium , {StyleRoot} from 'radium';
import './App.css';

//This is a stateful way

///->CLASSIC WAY WITH CLASS 
/*import React, { Component } from 'react';
class App extends Component {
  //state only works when extending Component class, react hooks will be taught in the future
  state = {
    persons: [
      {name: 'Max', age:28},
      {name: 'Manu', age:29},
      {name: 'Miguel',age:19}
    ],
    otherState:'some other value'
  }; //state and props are special properties, because if state is changed the DOM is re-rendered

  switchNameHandler = () =>{
    //console.log('Was clicked');
    this.setState({
      persons: [
        {name: 'Maximilian',age:28},
        {name: 'Manu', age:29},
        {name: 'Miguel',age:19},
      ] //it is NOT necessary to manually set the other states, becuase it merges automatically
    });// to update the dom in Component based in classes, 
  };

  render() {
    // the jsx way: which allows syntatic sugar by writing pseudo html, because some html keywords are not allowed, like class,etc.
    return (
      //this code is jsx (a syntatic sugar), it works both in .js and jsx because it does not depend on the extension of the file
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button onClick={this.switchNameHandler}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>This is inside Manu</Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
      </div>
      //it is a very good practice to wrap everything into a root element, e.g. <div className="App"> ... </div>
    );//these parentheses is to avoid getting error messages
    //the manual way
    //return React.createElement('div',{className:'App'},React.createElement('h1',null,'Hi, I\'m a React App!!!'));
  }
}*/

///!!! Using styled components:

///->NEW WAY WITH HOOK since React 16.8 version, using nested functions
/*import Person from './Person/Person';
// importing React is very important to allow rendering, because behind the scenes the jsx uses React. methods
// render is the method called by react to render
//import {StyleRoot} from 'radium';
import './App.css';
import styled from 'styled-components';

import React, { useState } from 'react';

const App = props => {
  //With React Hooks we manage state with a lot of states slices
  // the first array element returns the state and the second returns are function to set the state
  // useState() function can be used multiple times
  const StyledButton = styled.button `
    background-color: ${props => props.alt ? 'red' : 'green'};
    color:white;
    font: inherit;
    border: 1px solid blue;
    padding: 8px;
    cursor: pointer;
    &:hover{
      background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
      color: black;
    }
  `
  const [personsState, setPersonsState] = useState({
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf11', name: 'Miguel', age: 19 }
    ],
  });
  const [otherState, setOtherState] = useState('some other value');
  const [showPersons,setShowPersons] = useState(false);
  console.log(personsState, otherState);
  //state only works when extending Component class, react hooks will be taught in the future
  // the jsx way: which allows syntatic sugar by writing pseudo html, because some html keywords are not allowed, like class,etc.
  const nameChangedHandler = (event,id) => {
    const personIndex = personsState.persons.findIndex(p=>{
      return p.id===id;
    });
    console.log('person: ',personIndex);
    const person = {...personsState.persons[personIndex]};//better practice
    person.name=event.target.value;
    const persons = [...personsState.persons];
    persons[personIndex]=person;
    setPersonsState({
      persons: persons
    });
  };
  const deletePersonHandler = (personIndex) =>{
    const persons = [...personsState.persons]; // good practice to create copy before modifying directly the state!!!
    persons.splice(personIndex,1);
    setPersonsState({persons: persons});
  }
  const togglePersonsHandler = () =>{
    setShowPersons(!showPersons);
    //in a class based it would moreless
    /*
    this.setState({showPersons:!this.state.showPersons});
    */
  //}
  // the hover selector (pseudo selector) is selected with :
  /*const style = {
    backgroundColor: 'green',
    color:'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'lightgreen',
      color: 'black'
    }
  };*/ //inline styling
  //Rendering Content Conditionally:
  /*return (
    //this code is jsx (a syntatic sugar), it works both in .js and jsx because it does not depend on the extension of the file
    //calling myFunction.bind() is better than calling ()=> myFuncion (...) in terms of performance
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p>This is really working!</p>
      <button style={style} onClick={togglePersonsHandler}>Toogle Persons</button>
      {showPersons ? <div>
        <Person
          name={personsState.persons[0].name}
          age={personsState.persons[0].age}
          click={switchNameHandler.bind(this, 'Maximilian')}
        />
        <Person
          name={personsState.persons[1].name}
          age={personsState.persons[1].age}
          click={() => switchNameHandler('Master')}
          changed={nameChangedHandler}
        >
          This is inside Manu
        </Person>
        <Person
          name={personsState.persons[2].name}
          age={personsState.persons[2].age}
          click={switchNameHandler.bind(this, '')}
        />
      </div> : null }
    </div>
    //it is a very good practice to wrap everything into a root element, e.g. <div className="App"> ... </div>
  );//these parentheses is to avoid getting error messages*/
  //Rendering Dynamic Content "The Javascript Way" (Prefered way):
  /*let persons  = null;
  if(showPersons){
    persons = (
      <div>
        {personsState.persons.map((person,index) =>{
          return <Person
            name={person.name}
            age={person.age}
            click={deletePersonHandler.bind(this,index)}
            key={person.id}
            changed={(event) => nameChangedHandler(event,person.id)}
          />
        })}
      </div>
    ); // key is very important to give React a way of indentifying internally which element is each tag and to be very efficiente,
    //if not key is provided, a warning is logged out in the console  
    /*style.backgroundColor='red';
    style[':hover'] = {
      backgroundColor: 'salmon',
      color: 'black',
    };*/
  /*}
  let classes = []// string red bold
  if(personsState.persons.length<=2){
    classes.push('red');
  }
  if(personsState.persons.length<=1){
    classes.push('bold');
  }
  return (
    //this code is jsx (a syntatic sugar), it works both in .js and jsx because it does not depend on the extension of the file
    //calling myFunction.bind() is better than calling ()=> myFuncion (...) in terms of performance
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}> This is really working!</p>
        <StyledButton alt={showPersons} onClick={togglePersonsHandler}>
          Toogle Persons
        </StyledButton>
        {persons}
      </div>
    //it is a very good practice to wrap everything into a root element, e.g. <div className="App"> ... </div>
  );//these parentheses is to avoid getting error messages
  //the manual way
  //return React.createElement('div',{className:'App'},React.createElement('h1',null,'Hi, I\'m a React App!!!'));
}*/

//export default App; //higher order component, 
//component inside component that injects extra functionality,
//that can be used with class and functional components

//!!!Using CSS Modules
///->NEW WAY WITH HOOK since React 16.8 version, using nested functions
/*import classes from './App.css' // supported now by the undelaying build scripts,because now it transforms every classname to a unique one and returns a map with the properties
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
// importing React is very important to allow rendering, because behind the scenes the jsx uses React. methods
// render is the method called by react to render
//import {StyleRoot} from 'radium';

import React, { useState } from 'react';

const App = props => {
  //With React Hooks we manage state with a lot of states slices
  // the first array element returns the state and the second returns are function to set the state
  // useState() function can be used multiple times
  const [personsState, setPersonsState] = useState({
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf11', name: 'Miguel', age: 19 }
    ],
  });
  //const [otherState, setOtherState] = useState('some other value');
  const [showPersons,setShowPersons] = useState(false);
  //console.log(personsState, otherState);
  //state only works when extending Component class, react hooks will be taught in the future
  // the jsx way: which allows syntatic sugar by writing pseudo html, because some html keywords are not allowed, like class,etc.
  const nameChangedHandler = (event,id) => {
    const personIndex = personsState.persons.findIndex(p=>{
      return p.id===id;
    });
    console.log('person: ',personIndex);
    const person = {...personsState.persons[personIndex]};//better practice
    person.name=event.target.value;
    const persons = [...personsState.persons];
    persons[personIndex]=person;
    setPersonsState({
      persons: persons
    });
  };
  const deletePersonHandler = (personIndex) =>{
    const persons = [...personsState.persons]; // good practice to create copy before modifying directly the state!!!
    persons.splice(personIndex,1);
    setPersonsState({persons: persons});
  }
  const togglePersonsHandler = () =>{
    setShowPersons(!showPersons);
    //in a class based it would moreless
    /*
    this.setState({showPersons:!this.state.showPersons});
    */
  /*}
  // the hover selector (pseudo selector) is selected with :
  /*const style = {
    backgroundColor: 'green',
    color:'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'lightgreen',
      color: 'black'
    }
  };*/ //inline styling
  //Rendering Content Conditionally:
  /*return (
    //this code is jsx (a syntatic sugar), it works both in .js and jsx because it does not depend on the extension of the file
    //calling myFunction.bind() is better than calling ()=> myFuncion (...) in terms of performance
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p>This is really working!</p>
      <button style={style} onClick={togglePersonsHandler}>Toogle Persons</button>
      {showPersons ? <div>
        <Person
          name={personsState.persons[0].name}
          age={personsState.persons[0].age}
          click={switchNameHandler.bind(this, 'Maximilian')}
        />
        <Person
          name={personsState.persons[1].name}
          age={personsState.persons[1].age}
          click={() => switchNameHandler('Master')}
          changed={nameChangedHandler}
        >
          This is inside Manu
        </Person>
        <Person
          name={personsState.persons[2].name}
          age={personsState.persons[2].age}
          click={switchNameHandler.bind(this, '')}
        />
      </div> : null }
    </div>
    //it is a very good practice to wrap everything into a root element, e.g. <div className="App"> ... </div>
  );//these parentheses is to avoid getting error messages*/
  //Rendering Dynamic Content "The Javascript Way" (Prefered way):
  /*let persons  = null;
  console.log('App persons: ',personsState.persons);
  if(showPersons){
    persons =
      <Persons 
        persons={personsState.persons}
        clicked={deletePersonHandler}
        changed={nameChangedHandler}/>; // key is very important to give React a way of indentifying internally which element is each tag and to be very efficiente,
    //if not key is provided, a warning is logged out in the console  
    /*style.backgroundColor='red';
    style[':hover'] = {
      backgroundColor: 'salmon',
      color: 'black',
    };*/
    
  /*}
  
  return (
    //this code is jsx (a syntatic sugar), it works both in .js and jsx because it does not depend on the extension of the file
    //calling myFunction.bind() is better than calling ()=> myFuncion (...) in terms of performance
      <div className={classes.App}>
        <Cockpit
          title = {props.appTitle}
          showPersons={showPersons}
          persons={personsState.persons}
          clicked={togglePersonsHandler}/>
        {persons}
      </div>
    //it is a very good practice to wrap everything into a root element, e.g. <div className="App"> ... </div>
  );//these parentheses is to avoid getting error messages
  //the manual way
  //return React.createElement('div',{className:'App'},React.createElement('h1',null,'Hi, I\'m a React App!!!'));
}

export default App; //higher order component, */

//!!!Using Lifecycle Hooks in Class Based Component and CSS Modules
///->NEW WAY WITH HOOK since React 16.8 version, using nested functions
import classes from './App.css' // supported now by the undelaying build scripts,because now it transforms every classname to a unique one and returns a map with the properties
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';//wrap all parts that need authentication 
// importing React is very important to allow rendering, because behind the scenes the jsx uses React. methods
// render is the method called by react to render
//import {StyleRoot} from 'radium';

import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    //for state initialization ONLY, NOT used cause side-effects, like http requests etc.!!
    super(props);
    console.log('[App.js] constructor');
  }
  
  //in the modern syntax, this is already executed in a constructor
  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf11', name: 'Miguel', age: 19 }
    ],
    showPersons: false,
    showCockpit: true,
    authenticated: false
  };

  static getDerivedStateFromProps(props,state){
    //for state syncying ONLY, NOT used for cause side-effects, like http requests etc.!!
    console.log('[App.js] getDerivedStateFromProps',props); 
    return state;
  }

  /*//legacy
  componentWillMount(){
    console.log('[App.js] componentWillMount');
  }*/

  //componentDidMount(), shouldComponentUpdate() and componentDidUpdate() are the most used lifecycle hooks


  componentDidMount(){
    console.log('[App.js] componentDidMount');
    //for Cause side effects ONLY, like http request etc., NOT used for state syncying!!!!
  }

  shouldComponentUpdate(){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
  }

  //state only works when extending Component class, react hooks will be taught in the future
  // the jsx way: which allows syntatic sugar by writing pseudo html, because some html keywords are not allowed, like class,etc.
  nameChangedHandler = (event,id) => {
    const personIndex = this.state.persons.findIndex(p=>{
      return p.id===id;
    });
    console.log('person: ',personIndex);
    const person = {...this.state.persons[personIndex]};//better practice
    person.name=event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex]=person;
    this.setState({
      persons: persons
    });
    //extra syntax to update the state that depends on the previous state
    /*
    this.setState((prevState,props)=>{ // prevState guarantees to be the previous state
      //returning new state
      return ({
        changeCounter: prevState.changeCounter + 1 
      });
    });
    */
  };
  deletePersonHandler = (personIndex) =>{
    const persons = [...this.state.persons]; // good practice to create copy before modifying directly the state!!!
    persons.splice(personIndex,1);
    this.setState({persons: persons});//setState is called asynchronously, not good when future setStates depend on the old state
  }
  togglePersonsHandler = () =>{
    this.setState({showPersons: !this.state.showPersons});
    //in a class based it would moreless
    /*
    this.setState({showPersons:!this.state.showPersons});
    */
  }
  loginHandler = () =>{
    this.setState({authenticated: true});
  }
  // the hover selector (pseudo selector) is selected with :
  /*const style = {
    backgroundColor: 'green',
    color:'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'lightgreen',
      color: 'black'
    }
  };*/ //inline styling
  //Rendering Content Conditionally:
  /*return (
    //this code is jsx (a syntatic sugar), it works both in .js and jsx because it does not depend on the extension of the file
    //calling myFunction.bind() is better than calling ()=> myFuncion (...) in terms of performance
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p>This is really working!</p>
      <button style={style} onClick={togglePersonsHandler}>Toogle Persons</button>
      {showPersons ? <div>
        <Person
          name={personsState.persons[0].name}
          age={personsState.persons[0].age}
          click={switchNameHandler.bind(this, 'Maximilian')}
        />
        <Person
          name={personsState.persons[1].name}
          age={personsState.persons[1].age}
          click={() => switchNameHandler('Master')}
          changed={nameChangedHandler}
        >
          This is inside Manu
        </Person>
        <Person
          name={personsState.persons[2].name}
          age={personsState.persons[2].age}
          click={switchNameHandler.bind(this, '')}
        />
      </div> : null }
    </div>
    //it is a very good practice to wrap everything into a root element, e.g. <div className="App"> ... </div>
  );//these parentheses is to avoid getting error messages*/
  //Rendering Dynamic Content "The Javascript Way" (Prefered way):
  render(){
    console.log('[App.js] render');
    let persons  = null;
    //console.log('App persons: ',this.state.persons);
    if(this.state.showPersons){
      persons =
        <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          /*isAuthenticated={this.state.authenticated}*//>; // key is very important to give React a way of indentifying internally which element is each tag and to be very efficiente,
      //if not key is provided, a warning is logged out in the console  
      /*style.backgroundColor='red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black',
      };*/
      
    }
    return (
      //this code is jsx (a syntatic sugar), it works both in .js and jsx because it does not depend on the extension of the file
      //calling myFunction.bind() is better than calling ()=> myFuncion (...) in terms of performance
        <Aux>
          <button
            onClick={()=>{
              this.setState({showCockpit: false});
            }}
          >Remove Cockpit</button>
          <AuthContext.Provider value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
            }}>
              {this.state.showCockpit ? (<Cockpit
                title = {this.props.appTitle}
                showPersons={this.state.showPersons}
                personsLength={this.state.persons.length}
                clicked={this.togglePersonsHandler}
                login={this.loginHandler}/>
              ):null}
              {persons}
          </AuthContext.Provider>
        </Aux>
      //it is a very good practice to wrap everything into a root element, e.g. <div className="App"> ... </div>
    );//these parentheses is to avoid getting error messages
  //the manual way
  //return React.createElement('div',{className:'App'},React.createElement('h1',null,'Hi, I\'m a React App!!!'));
  }
}

export default withClass(App,classes.App); //higher order component, this way of wrapping with a high order component is recommended for
//added logic