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

    componentDidMount() {
        if ((localStorage.getItem('jwtToken') + "") != "null") {
            const { history } = this.props;
            if(history) history.push('/course/');
        }
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
                                The EasyNYU Team is dedicated to creating 
                                a safe and friendly community for students 
                                to freely comment on 
                                the courses taken and on 
                                associated professors. 
                            </font></p>
                            <p><font size="+1"> 
                                Start by searching for your favorite courses and professors
                                and sharing your opinion! You will need to login before
                                adding a comment.
                            </font></p>
                        </div>
                        <div class="textBox">
                            <Login buttonLocation={"homepage"}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;