import React, { Component } from "react";
import {useParams} from 'react-router'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './course.css';
import NYUNavBar from "./navbar";
import Table from 'react-bootstrap/Table';
import { Container, Row } from "react-bootstrap";

class CourseDetail extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            courses: [],
        };
    }

    componentWillMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    componentDidMount() {
        // fetch('/courses/', { method: "GET" })
        //     .then(response => {
        //     if (response.ok) {
        //         return response.json();
        //     } else {
        //         throw new Error('Network response was not ok.');
        //     }
        //     }).then(response => {
        //     if (this._isMounted) {
        //         console.log(response[0])
        //         this.setState({ courses: response })
        //     }
        // });
    }
    render() {
        return (
            <div>
                <NYUNavBar />
                <Container>
                </Container>
            </div>
        )
    }
}
  
export default CourseDetail;
