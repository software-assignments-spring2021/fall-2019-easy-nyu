import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Course from './components/course';
import ProfessorDisplay from './components/professorDisplay'
import Home from './components/home';
import CourseDetail from './components/courseDetail'

function App() {
	return (
		<Router>
<<<<<<< HEAD
			<Switch>
				<Route path="/courses" component={Course}>
				</Route>
				<Route path="/professors" component={ProfessorDisplay}>
				</Route>
				<Route path="/" component={Home}>
				</Route>
			</Switch>
=======
			<Route exact path="/course">
				<Course />
			</Route>
			<Route path="/professor" component={ProfessorDisplay}>
			</Route>
			<Route exact path="/" component={Home}>
			</Route>
			<Route exact path="/course/:id" component={CourseDetail} />
>>>>>>> master
		</Router>
	);
}

export default App;