import React, { Component } from "react";
import {Navbar, Nav, Button} from 'react-bootstrap'
import logo from'../img/logo.png';
import Login from './login'
import './navbar.css'

class NYUNavBar extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    render () {
        return (
            <Navbar bg="nyu" variant="dark">
				<Navbar.Brand href="/">
					<img src={logo} height="42" width="200" alt="ez-nyu-logo">
					</img>
				</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Nav.Link href="/professor">Professors</Nav.Link>
					<Nav.Link href="/course">Courses</Nav.Link>
				</Nav>
				<Login />
			</Navbar>
        )
    }
}
  
export default NYUNavBar;

