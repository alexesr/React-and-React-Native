import React from 'react';
import './App.css';
import PostsWindow from './containers/Posts/PostsWindow';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PostsWindow></PostsWindow>
      </BrowserRouter>
    </div>
  );
}

export default App;
