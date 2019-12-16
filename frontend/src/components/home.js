import React, { Component } from "react";
import Navbar from './navbar'
import SearchBy from './searchBy'
import './home.css'

class Home extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    render() {
        return (
            <div className="with-background">
                <Navbar />
                <SearchBy />
            </div>
        )
    }
}

export default Home;