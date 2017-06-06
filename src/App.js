import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import asteroids_logo from '../games/asteroids/asteroids_logo.png'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>AnVo Games</h2>
          <h3>v0.1</h3>
        </div>
        <div>
          <a href='../games/asteroids/index.html'><img src={asteroids_logo} width=64 height=64></img></a>
        </div>
      </div>
    );
  }
}

export default App;
