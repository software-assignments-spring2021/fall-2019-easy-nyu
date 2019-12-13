import React, { Component } from "react";
import NYUNavBar from "./navbar";
import { Container, Table, Row } from "react-bootstrap";
import { Link } from 'react-router-dom'
import './professorProfile.css';
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
            courses: [], 
            comments_for_prof: []
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
                    // Prepossess comment based on prof and course ids
                    var i;
                    var j;
                    var counter = 0;
                    let comment_for_course = [];
                    for (i = 0; i < response.courses.length; i++) {
                        let entry = [];
                        for (j = 0; j < response.comments.length; j++) {
                            if (response.comments[j].course_id == response.courses[i]._id) {
                                if (response.comments[j].prof_id != null) {
                                    if (counter <= 2) {
                                        entry.push(response.comments[j]);
                                        counter++;
                                    }
                                }
                            }
                        }
                        comment_for_course.push(entry);
                    }
                    // Comment that belongs to a specific prof
                    var k;
                    let comment_for_prof = [];
                    for (k = 0; k < response.comments.length; k++) {
                        console.log(response.comments[0].course_id);
                        console.log(response.comments[0].prof_id);
                        if (response.comments[k].course_id == null) {
                            if (response.comments[k].prof_id != null) {
                                comment_for_prof.push(response.comments[k])
                            }
                        }
                    }
                    this.setState(
                        {
                            professorname: response.name,
                            id: response._id,
                            school: response.school,
                            courses: response.courses, 
                            comments: comment_for_course,
                            comments_for_prof: comment_for_prof
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
                        <tr>
                            <th>Comments for the Professor</th>
                        </tr>
                        <tr>
                            {this.state.comments_for_prof.map((prof_comment, i) => (
                                <td key={i}>
                                    <p>{prof_comment}</p>
                                </td>
                            ))}
                        </tr>
                    </Table>

                    {/* {Option One for Display} */}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>{`Courses Taught By ${this.state.professorname}`}</th>
                                <th>{`Comments on Course`}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.courses.map((course, i) => (
                                <tr key={course._id}>
                                        <td>
                                            <Link to={`/course/${course._id}`}>{
                                                course.topic === undefined ? 
                                                course.name : 
                                                course.name + " " + course.topic
                                            }</Link>
                                        </td>
                                        <td>
                                        {this.state.comments[i].map((comment, j) => (
                                            <p key={j}>{this.state.comments[i][j]}</p>
                                        ))}
                                        </td>
                                </tr>
                                ))}
                        </tbody>
                    </Table>
                </container></center>
            </div>
        )
    }
}
  
export default ProfessorProfile;
