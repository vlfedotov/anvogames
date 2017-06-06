import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { Asteroids } from './games/asteroids/Asteroids';
import { Whoops404 } from './components/Whoops404';
// import { test } from './test';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import registerServiceWorker from './registerServiceWorker';
import './index.css';

render(
  <Router>
    <Switch>
      <Route exact path='/' component={App}/>
      <Route path='/404' component={Whoops404}/>
      <Route path='/asteroids' component={Asteroids}/>
      {/* <Route path='/test' component={test}/> */}
    </Switch>
  </Router>,
  document.getElementById('root')
);

// registerServiceWorker();
