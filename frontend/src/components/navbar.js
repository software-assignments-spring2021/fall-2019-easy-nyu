import React, { Component } from "react";
import {Navbar, Nav, Button} from 'react-bootstrap';
import logo from'../img/logo.png';
import Login from './login';
import Signup from './signup';
import './navbar.css';
import Search from './search';


class NYUNavBar extends Component {
    constructor(props) {
        super(props);
		this._isMounted = false;
		this.signoutHandler = this.signoutHandler.bind(this);
	}
	
	signoutHandler(){
		this.setState({loggedIn:false});
		localStorage.setItem('jwtToken',null);
		localStorage.setItem('userID',null);
	}

    render () {
		if ((localStorage.getItem('jwtToken') + "") != "null") {
			return (
				<Navbar bg="nyu" variant="dark">
					<Navbar.Brand href="/">
						<img src={logo} height="42" width="200" alt="ez-nyu-logo">
						</img>
					</Navbar.Brand>
					<Nav className="my-nav">
						<Nav.Link href="/">Home</Nav.Link>
					</Nav>
					<Search/>
					<Button href={`/userprofile/${localStorage.getItem('userID')}`} variant="outline-light">My Profile</Button>
					<Button href={'/'} variant="outline-light" onClick={this.signoutHandler}>Sign Out</Button>
				</Navbar>
			)
		} else {
			return (
				<Navbar bg="nyu" variant="dark">
					<Navbar.Brand href="/">
						<img src={logo} height="42" width="200" alt="ez-nyu-logo">
						</img>
					</Navbar.Brand>
					<Nav className="my-nav">
						<Nav.Link href="/">Home</Nav.Link>
					</Nav>
					<Search/>
					<Login buttonLocation="navbar"/>
					<Signup onNavbar={true}/>
				</Navbar>
			)
		}
	}
}
  
export default NYUNavBar;

