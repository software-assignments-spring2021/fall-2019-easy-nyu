import React, { Component } from "react";
import './professor.css';

class Professor extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    render () {
        return (
            <div id="show-prof-div" style={{ textAlign: "center" }}>
                <p>
                    Course Name: {this.props.name} <br />
                    Description: {this.props.description} <br />
                    Professor: {this.props.prof} <br />
                    TA: {this.props.ta} <br />
                    <br />
                </p>
            </div>
        )
    }
}
  
export default Professor;