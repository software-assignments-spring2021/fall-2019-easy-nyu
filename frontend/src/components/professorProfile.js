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
                    console.log(response);
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
                    var k;
                    let comment_for_prof = [];
                    for (k = 0; k < response.comments.length; k++) {
                        if (response.comments[k].course_id == null) {
                            if (response.comments[k].prof_id != null) {
                                comment_for_prof.push(response.comments[j])
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
                            <tr>
                                <td key={course._id}>
                                    <Link to={`/${this.state.id}/${course._id}`}>{course.name}</Link>
                                </td>
                                {this.state.comments[i].map((comment, j) => (
                                    <td key={j}>
                                        <p>{this.state.comments[i][j]}</p>
                                    </td>
                                ))}
                            </tr>
                            ))}

                            {this.state.comments_for_prof.map((prof_comment, i) => (
                                <td key={i}>
                                    <p>{prof_comment}</p>
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
