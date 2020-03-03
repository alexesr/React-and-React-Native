import React, { Component, ChangeEvent } from 'react';
import './App.css';

import Input from './components/Input/Input';
import Output from './components/Output/Output';

export default class  App extends Component {

  state = {
    inputValue: ''
  };

  inputHandler = (event: ChangeEvent<HTMLInputElement>): void =>{
    this.setState({
      inputValue: event.target.value
    })
  }

  render(){
    return (
      <div className="App">
        <Input value={this.state.inputValue} inputHandler={(event: ChangeEvent<HTMLInputElement>)=>this.inputHandler(event)}/>
        <Output value={this.state.inputValue}/>
      </div>
    );
  }
}

