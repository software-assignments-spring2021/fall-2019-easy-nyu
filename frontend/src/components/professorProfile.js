import React, { Component } from "react";
import NYUNavBar from "./navbar";
import { Container, Table, Row } from "react-bootstrap";
import { Link } from 'react-router-dom'
import './professorProfile.css';
import Comment from './comment';
import AddComment from './addComment';

class ProfessorProfile extends Component {
    constructor(props) {
        super(props);
        this._isMounted = true;
        this.state = {
            professorname: '',
            _id: '',
            description: '',
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
        fetch(`/professors?id=${this.props.match.params.id}`, { method: "GET" })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            }).then(response => {
                if (this._isMounted) {
                    console.log(response);
                    this.setState(
                        {
                            professorname: response.name,
                            id: response._id,
                            school: response.school,
                            courses: response.courses, 
                            comments: response.comments
                        }
                    )
                }
            });
    }

    render() {
        return (
            <div>
                <NYUNavBar />
                <center><container>
                    <Row className="justify-content-md-center">
                        <h1>Prof. {this.state.professorname}</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <h3>School: {this.state.school}</h3>
                    </Row>
                    <Row className="justify-content-md-center">
                        <AddComment profid={this.props.match.params.id}/>
                    </Row>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>{`Courses Taught By ${this.state.professorname}`}</th>
                                <th>{`Comments on Course`}</th>
                                <th>{`Comments on Prof`}</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                {this.state.courses.map((course, i) => (
                                    <td key={i}>
                                        <Link to={`/${this.state.id}/${course._id}`}>{course.name}</Link>
                                    </td>
                                ))}
                            </tr> 
                        </tbody>
                    </Table>
                </container></center>
            </div>
        )
    }
}
  
export default ProfessorProfile;
