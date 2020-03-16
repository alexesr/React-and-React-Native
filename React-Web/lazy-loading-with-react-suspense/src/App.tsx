import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

//import Posts from './containers/Posts';
import User from './containers/User';
import Welcome from './containers/Welcome';

const Posts = React.lazy(()=>import('./containers/Posts'));//ONLY default exports are supported

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/"> {/*from where the app is served and be sure than in deployment the server always returns the index.html page*/}
        <React.Fragment>
          <nav>
            <NavLink to="/user">User Page</NavLink> |&nbsp;
            <NavLink to="/posts">Posts Page</NavLink>
          </nav>
          <Route path="/" component={Welcome} exact />
          <Route path="/user" component={User} />
          <Route 
            path="/posts" 
            render={()=>
              <Suspense fallback={<div>Loading...</div>}> {/*ideal to also lazy load components which are not part of routing */}
                <Posts/>
              </Suspense>
            } />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
