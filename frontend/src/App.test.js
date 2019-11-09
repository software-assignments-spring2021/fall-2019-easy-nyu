import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import App from './App';
import Portal from './components/portal';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router>
        <Route exact path="/" component={App} ></Route>
        <Route path="/portal" component = {Portal}></Route>
        </Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});
