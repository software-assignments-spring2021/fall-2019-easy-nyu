import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import App from './App';
import CourseSearch from './components/courseSearch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router>
<Route exact path="/" component={App} >
</Route>
<Route path="/coursesearch" component = {CourseSearch}>
</Route>
</Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
