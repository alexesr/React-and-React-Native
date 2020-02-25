import Person from './Person/Person';
// importing React is very important to allow rendering, because behind the scenes the jsx uses React. methods
// render is the method called by react to render
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
  }
  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer',
  }; //inline styling
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
  let persons  = null;
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
  }
  return (
    //this code is jsx (a syntatic sugar), it works both in .js and jsx because it does not depend on the extension of the file
    //calling myFunction.bind() is better than calling ()=> myFuncion (...) in terms of performance
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p>This is really working!</p>
      <button style={style} onClick={togglePersonsHandler}>Toogle Persons</button>
      {persons}
    </div>
    //it is a very good practice to wrap everything into a root element, e.g. <div className="App"> ... </div>
  );//these parentheses is to avoid getting error messages
  //the manual way
  //return React.createElement('div',{className:'App'},React.createElement('h1',null,'Hi, I\'m a React App!!!'));
}

export default App;
