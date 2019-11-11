import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Course from './components/course';
import ProfessorDisplay from './components/professorDisplay'
import Home from './components/home';

//import ProfessorDisplay from './components/professorDisplay';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/course" component={Course}>
				</Route>
				<Route path="/professor" component={ProfessorDisplay}>
				</Route>
				<Route path="/" component={Home}>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;