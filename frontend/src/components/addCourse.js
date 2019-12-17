import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'
import Login from './login'
import './login.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AddCourse extends Component {
    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.state = {
            name: "",
            major: "",
            school: "",
            number: "",
            level: "",
            unit: "",
            description: "",
            requirement: "",
            note: "",
            allProfs: [],
            profs: [],
            errorMsg: "",
            showModal: false
        };
    }
	
    handlePopup = () => {
        this.setState({ showModal: true });
    }
	
	handleClose = (event) => {
        this.setState({ name: "", major: "", school: "", number: "", level: "", unit: "", description: "", requirement: "", note: "", allProfs: [], profs: [], errorMsg: "", showModal: false });
    }
	
	handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleMajorChange = (event) => {
        this.setState({ major: event.target.value });
    }

    handleSchoolChange = (event) => {
        this.setState({ school: event.target.value });
    }

    handleNumberChange = (event) => {
        this.setState({ number: event.target.value });
    }

    handleLevelChange = (event) => {
        this.setState({ level: event.target.value });
    }

    handleUnitChange = (event) => {
        this.setState({ unit: event.target.value });
    }

    handleDescriptionChange = (event) => {
        this.setState({ description: event.target.value });
    }

    handleRequirementChange = (event) => {
        this.setState({ requirement: event.target.value });
    }

    handleNoteChange = (event) => {
        this.setState({ note: event.target.value });
    }

    handleProfChange = (event) => {
        var value = [];
        for (var i = 0; i < event.target.options.length; i++) {
            if (event.target.options[i].selected) {
                value.push(event.target.options[i].value);
            }
        }
        this.setState({ profs: value });
    }

    componentDidMount() {
        fetch('/professors/all', { method: "GET" })
            .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
            }).then(response => {
            //if (this._isMounted) {
                this.setState({ allProfs: response })
            //}
        });
    }

	send() {
		if (this.state.name.length > 0 || this.state.name.description > 0) {
			fetch('/courses/add', {
				method: "POST",
				headers: { "Content-Type": "application/json", 'Authorization': localStorage.getItem('jwtToken') },
				body: JSON.stringify({
                    name: this.state.name,
                    major: this.state.major,
                    school: this.state.school, 
                    number: this.state.number,
                    level: this.state.level,
                    unit: this.state.unit,
                    description: this.state.description,
                    requirement: this.state.requirement,
                    note: this.state.note,
                    profs: this.state.profs,
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
                this.setState({errorMsg: "There was an error adding the course"});
            });
		} else {
            this.setState({errorMsg: "Course name and description cannot be empty"});
        }
	}
	
    render() {
        const { history } = this.props;
        if (window.localStorage.role == "admin") {
            return (
                <div>
                    <Button onClick={this.handlePopup}>Add Course</Button>
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Course</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label className="ilabel">
                                Name:
                                <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
                            </label>
                            <label className="ilabel">
                                Major:
                                <input type="text" name="major" value={this.state.major} onChange={this.handleMajorChange} />
                            </label>
                            <label className="ilabel">
                                School:
                                <input type="text" name="school" value={this.state.school} onChange={this.handleSchoolChange} />
                            </label>
                            <label className="ilabel">
                                Number:
                                <input type="text" name="school" value={this.state.number} onChange={this.handleNumberChange} />
                            </label>
                            <label className="ilabel">
                                Level:
                                <input type="text" name="school" value={this.state.level} onChange={this.handleLevelChange} />
                            </label>
                            <label className="ilabel">
                                Unit:
                                <input type="text" name="school" value={this.state.unit} onChange={this.handleUnitChange} />
                            </label>
                            <label className="ilabel">
                                Description:
                                <input type="text" name="school" value={this.state.description} onChange={this.handleDescriptionChange} />
                            </label>
                            <label className="ilabel">
                                Requirement:
                                <input type="text" name="school" value={this.state.requirement} onChange={this.handleRequirementChange} />
                            </label>
                            <label className="ilabel">
                                Notes:
                                <input type="text" name="school" value={this.state.note} onChange={this.handleNoteChange} />
                            </label>
                            <label className="ilabel">
                                Professors teaching this course:
                                <select multiple name="courses" onChange={this.handleProfChange}>
                                {this.state.allProfs.map((prof, i) => (
                                    <option value={prof._id}>{prof.name}</option>
                                ))}
                                </select>
                            </label>
                            <p className='error-msg'>{this.state.errorMsg}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="" onClick={(evt) => { this.send();}}>Add Course</button>
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

export default AddCourse;
