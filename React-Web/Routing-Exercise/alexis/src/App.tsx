import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';


import Blog from './containers/Blog/Blog'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Blog />
      </div>
    </BrowserRouter>
  );
}

export default App;
