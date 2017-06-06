import React, { Component } from 'react';
import Script from 'react-load-script';

export class Asteroids extends Component {
  handleScriptCreate() {
  this.setState({ scriptLoaded: false })
  }
  handleScriptError() {
    this.setState({ scriptError: true })
  }
  handleScriptLoad() {
    this.setState({ scriptLoaded: true })
  }
  render() {
    return (
      <div>
        <center>
          <div>
            <h1>Game Title</h1>
            <canvas id="canvas" oncontextmenu="event.preventDefault()"></canvas>
            <canvas id="loadingCanvas" oncontextmenu="event.preventDefault()" width="800" height="600"></canvas>
          </div>
        </center>
        <Script url="./local_game.js"
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <Script url="./game.js" />
        <Script url="./love.js" />
        <footer>
          <p>Built with <a href="https://github.com/TannerRogalsky/love.js">love.js</a></p>
        </footer>
      </div>
    );
  }
}
