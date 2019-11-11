import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Course from './components/course';
import ProfessorDisplay from './components/professorDisplay'
import Home from './components/home';
import CourseDetail from './components/courseDetail'

//import ProfessorDisplay from './components/professorDisplay';

function App() {
	return (
		<Router>
			<Route exact path="/course">
				<Course />
			</Route>
			<Route path="/professor" component={ProfessorDisplay}>
			</Route>
			<Route exact path="/" component={Home}>
			</Route>
			<Route exact path="/course/:id" component={CourseDetail} />
		</Router>
	);
}

export default App;