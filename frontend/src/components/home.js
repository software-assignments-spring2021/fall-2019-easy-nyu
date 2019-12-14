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
                <div class="centerContent">
                    <div class="textBoxContainer shadow rounded">
                        <div class="textBox">
                            <p><font size="+1"> 
                                EasyNYU is a web-based platform 
                                that allows NYU students to gain a better 
                                insight before selecting a class and to 
                                share information with his or her fellow 
                                schoolmates.
                            </font></p>
                            <p><font size="+1"> 
                                EasyNYU Team is dedicated to create 
                                a friendly and safe community for students 
                                to freely comment on 
                                the courses taken and on 
                                associated professors. 
                            </font></p>
                            <p><font size="+1"> 
                                Start by search your favorite course or professor
                                and share your opinions! 
                            </font></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;