import React, { Component } from "react";
import {Navbar, Nav, Button} from 'react-bootstrap'
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
					<img class="headerLogo" src="logo.png" height="42" width="200">
					</img>
				</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Nav.Link href="/professors">Professors</Nav.Link>
					<Nav.Link href="/courses">Courses</Nav.Link>
				</Nav>
				<Button variant="outline-light">My Profile</Button>
                <Button variant="outline-light">Log out</Button>
			</Navbar>
        )
    }
}
  
export default NYUNavBar;

