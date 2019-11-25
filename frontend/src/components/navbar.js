import React, { Component } from "react";
import {Navbar, Nav, Button} from 'react-bootstrap';
import logo from'../img/logo.png';
import Login from './login';
import Signup from './signup'
import { Link } from 'react-router-dom';
import './navbar.css';



class NYUNavBar extends Component {
    constructor(props) {
        super(props);
		this._isMounted = false;
		this.signoutHandler = this.signoutHandler.bind(this);
	}
	
	signoutHandler(){
		this.setState({loggedIn:false});
		localStorage.setItem('jwtToken',undefined);
		localStorage.setItem('userID',undefined);
	}

    render () {
		if (localStorage.getItem('jwtToken').trim() != "undefined") {
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
					<Button href={`/userprofile/${localStorage.getItem('userID')}`} variant="outline-light">My Profile</Button>
					<Button variant="outline-light" onClick={this.signoutHandler}>Sign Out</Button>
				</Navbar>
			)
		} else {
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
					<Signup onNavbar={true}/>
				</Navbar>
			)
		}
	}
}
  
export default NYUNavBar;

