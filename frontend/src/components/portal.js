import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import {Navbar, Nav, Button, Form, FormControl}  from 'react-bootstrap'
import ProfessorDisplay from './professorDisplay';
import './portal.css';

class Portal extends Component {
	constructor(props) {
		super(props);
		this._isMounted = false;
		this.state = {
			courses: [],
		};
	}

	componentWillMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	componentDidMount() {
		fetch('/courses/', { method: "GET" })
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Network response was not ok.');
				}
			}).then(response => {
				if (this._isMounted) {
					console.log(response[0].prof)
					this.setState({ courses: response })
				}
			});
	}
	render() {
		return (
			<div>
				<Navbar bg="primary" variant="dark">
					<Navbar.Brand href="#home">Navbar</Navbar.Brand>
					<Nav className="mr-auto">
						<Nav.Link href="#home">Home</Nav.Link>
						<Nav.Link href="#features">Features</Nav.Link>
						<Nav.Link href="#pricing">Pricing</Nav.Link>
					</Nav>
					<Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-light">Search</Button>
					</Form>
				</Navbar>
			</div>
		)
	}
}

export default Portal;
