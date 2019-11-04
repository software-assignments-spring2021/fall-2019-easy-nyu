import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import './App.css';
import Login from './components/login'
import Signup from './components/signup'
import ProfessorDisplay from './components/professorDisplay';

function App() {
	return (
		<div>
			<div id="header" class="headerContent">
				<img class="headerLogo" src="logo.png">
				</img>
			</div>

			<div id="title" class="pageTitle">Welcome to EasyNYU</div>

			<Router>
				<Link to='/professors' className='btn-left'>Professors</Link>
				<Route exact path='/professors' component = {ProfessorDisplay} />
			</Router>
			
			<div class="centerContent">
				<div class="textBoxContainer shadow rounded">
					<div class="textBox">
						<Login />
						<Signup />
						<Router><Link to='/coursesearch' className="buttonLink">Public Course Search</Link></Router>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
