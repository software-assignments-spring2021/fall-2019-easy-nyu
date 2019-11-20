import React, { Component } from "react";
import Navbar from './navbar'

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    render() {
        return (
            <div>
                <Navbar />
            </div>
        )
    }
}

export default UserProfile;