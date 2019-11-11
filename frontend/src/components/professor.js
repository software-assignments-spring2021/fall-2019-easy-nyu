import React, { Component } from "react";
import { Link } from 'react-router-dom'
import './professor.css';

class Professor extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    render () {
        return (
            <tr>
                <td><Link to={"/portal/professors/" + this.props.id}>{this.props.name}</Link></td>
                <td>{this.props.description}</td>
            </tr>
        )
    }
}
  
export default Professor;
