import React, { Component } from "react";
import Navbar from './navbar'
import SearchBy from './searchBy'

class Home extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    render() {
        let { styles } = this.props;
        return (
            <div>
                <Navbar />
                <SearchBy />
            </div>
        )
    }
}

export default Home;