import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'
import Login from './login'
import './login.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AddProfessor extends Component {
    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.state = {
            name: "",
			school: "",
			courses: this.props.profid,
            allCourses: [],
            courses: [],
            errorMsg: "",
            showModal: false
        };
    }
	
    handlePopup = () => {
        this.setState({ showModal: true });
    }
	
	handleClose = (event) => {
        this.setState({ name: "", school: "", courses: [], errorMsg: "", showModal: false });
    }
	
	handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleSchoolChange = (event) => {
        this.setState({ school: event.target.value });
    }

    handleCourseChange = (event) => {
        var value = [];
        for (var i = 0; i < event.target.options.length; i++) {
            if (event.target.options[i].selected) {
                value.push(event.target.options[i].value);
            }
        }
        this.setState({ courses: value });
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
            //if (this._isMounted) {
                this.setState({ allCourses: response })
            //}
        });
    }

	send() {
		if (this.state.name.length > 0) {
			fetch('/professors/add', {
				method: "POST",
				headers: { "Content-Type": "application/json", 'Authorization': localStorage.getItem('jwtToken') },
				body: JSON.stringify({
					name: this.state.name,
					school: this.state.school,
                    courses: this.state.courses,
                    comments: []
				})
			}).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Network response was not ok.")
                }
			}).then(response => {
				this.handleClose();
				window.location.reload();
			}).catch(err => {
                this.setState({errorMsg: "There was an error adding the professor"});
            });
		} else {
            this.setState({errorMsg: "Professor name cannot be empty"});
        }
	}
	
    render() {
        const { history } = this.props;
        if (window.localStorage.role == "admin") {
            return (
                <div>
                    <Button onClick={this.handlePopup}>Add Professor</Button>
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Professor</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label className="ilabel">
                                Name:
                                <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
                            </label>
                            <label className="ilabel">
                                School:
                                <input type="text" name="school" value={this.state.school} onChange={this.handleSchoolChange} />
                            </label>
                            <label className="ilabel">
                                Courses:
                                <select multiple name="courses" onChange={this.handleCourseChange}>
                                {this.state.allCourses.map((course, i) => (
                                    <option value={course._id}>{course.name}</option>
                                ))}
                                </select>
                            </label>
                            <p className='error-msg'>{this.state.errorMsg}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="" onClick={(evt) => { this.send();}}>Add Professor</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default AddProfessor;
