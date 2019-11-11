import React, { Component } from "react";
import NYUNavBar from "./navbar";
import { Container, Table, Row } from "react-bootstrap";
import { Link } from 'react-router-dom'

class CourseDetail extends Component {
    constructor(props) {
        super(props);
        this._isMounted = true;
        this.state = {
            professors: [],
            comments: [],
            description: "",
            coursename: "",
            semester: "",
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    componentDidMount() {
        fetch(`/courses?id=${this.props.match.params.id}`, { method: "GET" })
            .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
            })
            .then(response => {
            if (this._isMounted) {
                this.setState({ 
                    professors: response.prof,
                    comments: response.comments,
                    description: response.description,
                    coursename: response.coursename,
                    semester: response.semester
                })
            }
        }
            );
    }
    render() {
        return (
            <div>
                <NYUNavBar />
                <Container>
                    <Row className="justify-content-md-center">
                        <h1>{`${this.state.semester}`}</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <h1>{`${this.state.coursename}`}</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <h1>{`${this.state.description}`}</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <td>{`Professors Teaching ${this.state.description}`}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {this.state.professors.map((prof, i) => (
                                        <td key={i}><Link to={`//`}>{prof.professorname}</Link></td>
                                    ))}
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </div>
        )
    }
}
  
export default CourseDetail;
