import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import asteroids_logo from './games/asteroids/asteroids_logo.png';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>AnVo Games</h2>
          <h3>v0.1</h3>
        </div>
        <hr/>
        <div>
          <a href='/asteroids'><img src={asteroids_logo}
            width='128' height='128' alt='asteroids' target='_blank'></img></a>
        </div>
      </div>
    );
  }
}
