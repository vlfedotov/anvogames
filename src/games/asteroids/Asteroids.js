import React, { Component } from 'react';
import Script from 'react-load-script';

// import test from './test.js'

export class Asteroids extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = './js/love.js'
    // s.innerHTML = 'var loadingContext = document.getElementById(\'loadingCanvas\').getContext(\'2d\');';
    this.instance.appendChild(s);
  }
  // handleScriptCreate() {
  //   this.setState({ scriptLoaded: false })
  // }
  render() {
    return (
        <div ref={(el) => (this.instance = el)}>
          {/* <Script src="games/asteroids/test.js" onCreate={this.handleScriptCreate.bind(this)}/> */}
        <center>
          <div>
            <h1>Game Title</h1>
            <canvas id="canvas" oncontextmenu="event.preventDefault()"></canvas>
            <canvas id="loadingCanvas" oncontextmenu="event.preventDefault()" width="800" height="600"></canvas>
          </div>
        </center>
        {/* <Script url='./js/love.js' /> */}

        <Script url='./js/local_game.js' />
        <Script url='./js/game.js' />
        <footer>
          <p>Built with <a href="https://github.com/TannerRogalsky/love.js">love.js</a></p>
        </footer>
      </div>
    );
  }
}
