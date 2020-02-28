import React, { Component } from 'react';

import Person from './Person/Person';

class Persons extends Component {

  /*static getDerivedStateFromProps(props, state){
    console.log('[Person.js] getDerivedStateFromProps');
    return state;
  }*/

  //legacy
  /*componentWillReceiveProps(props){
    console.log('[Person.js] componentWillReceiveProps', props);
  }*/

  shouldComponentUpdate(nextProps, nextState){
    console.log('[Persons.js] shouldComponentUpdate');
    return true; //return true to tell React it should continue updating, false otherwise
  }

  getSnapshotBeforeUpdate(prevProps, prevState){ // to save data before update and then use it after the update in componentDidUpdate()
    console.log('[Person.js] getSnapshotBeforeUpdate');
    return { message: 'Snapshot!' };
  }

  //legacy
  /*componentWillUpdate(){

  }*/

  componentDidUpdate(prevProps,prevState,snapshot){ // most used hook
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
  }

  render() {
    console.log('[Persons.js] rendering ...');
    return this.props.persons.map((person, index) => {
      //console.log('props.person[index]: ',person);
      return <Person
        name={person.name}
        age={person.age}
        click={this.props.clicked.bind(this, index)}
        key={person.id}
        changed={(event) => this.props.changed(event, person.id)}
      />
    });
  }
};

export default Persons;