import React, { Component } from "react";
import NYUNavBar from "./navbar";
import { Container, Table, Row } from "react-bootstrap";
import { Link } from 'react-router-dom'

import headshot1 from'../img/headshot1.png';
import { SSL_OP_CIPHER_SERVER_PREFERENCE } from "constants";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this._isMounted = true;
        this.state = {
            username: "Dongyu Zhou",
            class: "Senior",
            major: "Computer Science",
            college: "CAS",
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
    }

    render() {
        return (
            <div class="app">
                <NYUNavBar />

                <div class="text-center">
                    <img headshot1 class="rounded" alt="..."></img>
                </div>

                <Container>
                    <Row className="justify-content-md-center">
                        <h1>{`${this.state.username}`}</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <h2>{`${this.state.class}`}</h2>
                    </Row>
                    <Row className="justify-content-md-center">
                        <h3>{`${this.state.major}`}</h3>
                    </Row>
                    <Row className="justify-content-md-center">
                        <h4>{`${this.state.college}`}</h4>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Table striped bordered hover >
                            <thead>
                                
                            </thead>
                            <tbody>
                                <tr>
                                    {console.log(this.state.courses)}
                                    {this.state.courses.map((course, i) => (
                                        <td key={i}><Link to={`//`}>{course.coursename}</Link></td>
                                    ))}
                                </tr>
                            </tbody>
                            {/* <tbody>
                                <tr>
                                    {console.log(this.state.comments)}
                                    {this.state.comments.map((comment, i) => (
                                        <td key={i}><Link to={`//`}>{comment.comment}</Link></td>
                                    ))}
                                </tr>
                            </tbody> */}
                        </Table>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default UserProfile;
