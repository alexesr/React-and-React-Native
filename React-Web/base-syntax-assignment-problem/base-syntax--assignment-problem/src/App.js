import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
class App extends Component {
  state = {username: 'User1'}
    
  render() {
    const style = {
      padding: '20px',
      marging: '8px 0',
      border: '3px solid #555'
    };
    return (
      <div className="App" style={style}>
        <UserInput inputHandler={(event)=>this.inputHandler(event)} username={this.state.username}/>
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
