import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { shallow, mount, render } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});


it('renders all pages without crashing', () => {
    var wrapper = mount(<App />);
    wrapper.find('.nav-link').at(1).simulate('click');
    expect(wrapper.find('CourseDisplay').length).toEqual(1);
    wrapper.find('.nav-link').at(2).simulate('click');
    expect(wrapper.find('ProfessorDisplay').length).toEqual(1);
});
