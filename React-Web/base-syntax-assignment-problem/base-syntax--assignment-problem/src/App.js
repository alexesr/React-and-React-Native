import React, { Component } from 'react';
import './App.css';

import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
class App extends Component {
  state = {username: 'User1'}
    
  render() {
    return (
      <div className="App">
      <UserInput inputHandler={(event)=>this.inputHandler(event)}/>
      <UserOutput username={this.state.username}/>
      <UserOutput username={this.state.username}/> 
      <UserOutput username={this.state.username}/> 
      </div>
    );
  }
  inputHandler = (event) =>{
    this.setState({ username: event.target.value });
  }
}

export default App;
