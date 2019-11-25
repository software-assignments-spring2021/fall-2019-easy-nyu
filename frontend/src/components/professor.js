import React, { Component } from "react";
import { Link } from 'react-router-dom'
import './professor.css';

class Professor extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    render () {
        console.log(this.props.name)
        return (
            <tr>
                <td><Link to={"/professor/" + this.props.id}>{this.props.name}</Link></td>
                <td>{this.props.school}</td>
            </tr>
        )
    }
}
  
export default Professor;