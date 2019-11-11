import React, { Component } from "react";
import './course.css';
import NYUNavBar from "./navbar";
import { Container, Row } from "react-bootstrap";

class CourseDetail extends Component {
    constructor(props) {
        super(props);
        this._isMounted = true;
        this.state = {
            courses: [],
        };
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
