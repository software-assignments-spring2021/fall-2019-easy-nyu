import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'
import Login from './login'
import './login.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AddMaterial extends Component {
    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.state = {
            filename: "",
            data: "",
			course_id: this.props.courseid,
            showModal: false,
            errorMsg: ""
        };
    }
	
    handlePopup = () => {
        this.setState({ showModal: true });
    }
	
	handleClose = (event) => {
        this.setState({ showModal: false });
    }
	
	handleChange = (event) => {
        var file = event.target.files[0];
        file.text().then(text => {
            this.setState({ filename: file.name, data: text });
        });
    }
	
	send() {
		if (this.state.filename.length > 0) {
			fetch('/material/add', {
				method: "POST",
				headers: { "Content-Type": "application/json", 'Authorization': localStorage.getItem('jwtToken') },
				body: JSON.stringify({
                    filename: this.state.filename,
                    data: this.state.data,
					course_id: this.state.course_id
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
			});
		} else {
            this.setState({errorMsg: "You must select a file."});
        }
	}
	
    render() {
        const { history } = this.props;
        if ((localStorage.getItem('jwtToken') + "") != "null") {
            return (
                <div>
                    <Button onClick={this.handlePopup}>Add Course Material</Button>
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Course Material</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input type="file" name="file" id="file" onChange={this.handleChange}></input>
                            <p className='error-msg'>{this.state.errorMsg}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="" onClick={(evt) => { this.send();}}>Upload File</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        } else {
            return (
                <div>
                    Want to add course materials? Please log in or sign up.
                    <center><Login /></center>
                </div>
            );
        }
    }
}

export default AddMaterial;
