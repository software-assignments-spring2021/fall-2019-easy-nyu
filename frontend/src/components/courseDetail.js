import React, { Component } from "react";
import NYUNavBar from "./navbar";
import { Container, Table, Row, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Comment from './comment';
import AddComment from './addComment';
import './courseDetail.css';

class CourseDetail extends Component {
    constructor(props) {
        super(props);
        this._isMounted = true;
        this.state = {
            code: '',
            profs: [],
            comments: [],
            description: '',
            level: '',
            major: '',
            requirement: '',
            school: '',
            topic: '',
            unit: ''
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
                        code: response.code,
                        profs: response.profs,
                        comments: response.comments,
                        description: response.description,
                        level: response.level,
                        major: response.major,
                        requirement: response.requirement,
                        school: response.school,
                        topic: response.topic,
                        unit: response.unit
                    })
                }
            }
        );
    }
    render() {
        return (
            <div>
                <NYUNavBar />
                <div align="left">
                    <Table striped bordered hover>
                        <tr>
                            <td>
                                Course ID
                            </td>
                            <td>
                                {this.state.code}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Major
                            </td>
                            <td>
                                {this.state.major}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                School
                            </td>
                            <td>
                                {this.state.school}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Level
                            </td>
                            <td>
                                {this.state.level}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Requirements
                            </td>
                            <td>
                                {this.state.requirement}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Topic
                            </td>
                            <td>
                                {this.state.topic}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Class Units
                            </td>
                            <td>
                                {this.state.unit}
                            </td>
                        </tr>
                    </Table>
                </div>
                <div align="right">
                    <Table striped bordered hover>
                        <tr>
                            <td>
                                Course Description
                            </td>
                            <td>
                                {this.state.description}
                            </td>
                        </tr>
                        <tr>
                            <td colspan = "2">
                                <AddComment profid={this.props.match.params.id}/>
                            </td>
                        </tr>
                    </Table>
                </div>
                
            </div>
        )
    }
}
  
export default CourseDetail;
