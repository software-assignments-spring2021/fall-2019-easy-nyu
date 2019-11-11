import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Course from './components/course';
import ProfessorDisplay from './components/professorDisplay'
import Home from './components/home';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/courses" component={Course}>
				</Route>
				<Route path="/professors" component={ProfessorDisplay}>
				</Route>
				<Route path="/" component={Home}>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;