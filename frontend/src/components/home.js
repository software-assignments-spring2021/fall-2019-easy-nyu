import React, { Component } from "react";
import './home.css';
import Login from './login'
import Signup from './signup'
import Navbar from './navbar'

class Home extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    render() {
        return (
            <div>
                <Navbar />
                <div id="title" className="pageTitle">Welcome to EasyNYU</div>
            </div>
        )
    }
}

export default Home;