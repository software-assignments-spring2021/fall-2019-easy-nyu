import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CourseSearch from './components/courseSearch';
import ProfessorSearch from './components/professorDisplay'

ReactDOM.render(
<Router>
    <Route exact path="/" component={App} >
    </Route>
    <Route path="/coursesearch" component={CourseSearch}>
    </Route>
    <Route path="/professorsearch" component={ProfessorSearch}>
    </Route>
</Router>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
