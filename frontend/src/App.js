import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import './App.css';
import Login from './components/login'
import Signup from './components/signup'

function App() {
	return (
		<div>
			<div id="header" class="headerContent">
				<img class="headerLogo" src="logo.png">
				</img>
			</div>

			<div id="title" class="pageTitle">Welcome to EasyNYU</div>
			
			<div class="centerContent">
				<div class="textBoxContainer shadow rounded">
					<div class="textBox">
						<Login /><br />
						<Signup /><br />
						<Link to='/coursesearch' className="buttonLink">Public Course Search</Link><br />
						<Link to='/professorsearch' className="buttonLink">Public Professor Search</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
