import React, { Component } from "react";
import './home.css';
import Login from './login'
import Signup from './signup'
import Navbar from './navbar'
import UserProfile from './userProfile'

class Home extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    render() {
        return (
            <div>
                <Navbar />
                <div id="title" class="pageTitle">Welcome to EasyNYU</div>
                <div class="centerContent">
                    <div class="textBoxContainer shadow rounded">
                        <div class="textBox">
                            <Login /><br />
                            <Signup />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;