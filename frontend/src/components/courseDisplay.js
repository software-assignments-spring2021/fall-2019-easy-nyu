import React, { Component } from "react";
import { Link } from 'react-router-dom'
import './courseDisplay.css';
import NYUNavBar from "./navbar";
import Table from 'react-bootstrap/Table';
import { Container, Row } from "react-bootstrap";


class CourseDisplay extends Component {
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
        fetch('/courses/all', { method: "GET" })
            .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
            }).then(response => {
            if (this._isMounted) {
                this.setState({ courses: response })
            }
        });
    }
    render() {
        return (
            <div>
                <NYUNavBar />
                <Container>
                    <Row className="justify-content-md-center">
                        <h1>Courses in the Database:</h1>
                    </Row>
                    <Row className="justify-content-md-center"> 
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <th>Course Number</th>
                                    <th>Course Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.courses.map((course, i) => (
                                    <tr key={i}>
                                        <td key={"courseNum_" + i}><Link to={`/course/${course._id}`} key={i}>{course.coursename}</Link></td>
                                        <td key={"courseId_" + i}>{course.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </div>
        )
    }
}
  
export default CourseDisplay;
