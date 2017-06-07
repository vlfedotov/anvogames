import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import asteroids_logo from './games/asteroids/asteroids_logo.png';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css';
import { Grid, Row, Col } from 'react-flexbox-grid';

export class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className="App">
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">AnVo Games</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/blog/">Blog</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/assets">Assets</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about/">About Us</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div style={{ height: 400 }} className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2 style={{'position': 'relative', 'top': '50%'}}>AnVo Games</h2>
        </div>
        <hr/>
        <div>
          <Grid fluid>
            <Row>
              <Col xs={4} md={2}>
                <a href='/asteroids'><img src={asteroids_logo}
                  width='128' height='128' alt='asteroids' target='_blank'></img></a>
              </Col>
              <Col xs={4} md={2}>
                <a href='/asteroids'><img src={asteroids_logo}
                  width='128' height='128' alt='asteroids' target='_blank'></img></a>
              </Col>
              <Col xs={4} md={2}>
                <a href='/asteroids'><img src={asteroids_logo}
                  width='128' height='128' alt='asteroids' target='_blank'></img></a>
              </Col>
            </Row>
          </Grid>
        </div>
        <hr/>
        <div className='footer'>
          <p>AnVo Games</p>
        </div>
      </div>
    );
  }
}
