import React, { Component } from "react";
import NYUNavBar from "./navbar";
import Table from 'react-bootstrap/Table';
import { Container, Row } from "react-bootstrap";
import './professorProfile.css';

class ProfessorProfile extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            comments: [],
            courses: []
        };
    }

    componentWillMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        fetch('/professors/id', { method: "GET" })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            }).then(response => {
                if (this._isMounted) {
                    console.log(response)
                    this.setState
                    (
                        {
                            comments: response,
                            courses: response
                        }
                    )
                }
            });
    }
    render() {
        return (
            <div id="show-prof-profile-div" style={{ textAlign: "center" }}>
                <NYUNavBar />
            </div>
        )
    }
}
  
export default ProfessorProfile;
