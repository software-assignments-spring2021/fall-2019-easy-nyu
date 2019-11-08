import React, { Component } from "react";
import './professor.css';

class Professor extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    render () {
        return (
            <tr>
                <td><Link to={"/coursesearch/professors/" + this.props.id}>{this.props.name}</Link></td>
                <td>{this.props.description}</td>
            </tr>
        )
    }
}
  
export default Professor;
