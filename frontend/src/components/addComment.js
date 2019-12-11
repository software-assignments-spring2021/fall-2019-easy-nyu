import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'
import Login from './login'
import './login.css'

class AddComment extends Component {
    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.state = {
            comment: "",
			course_id: this.props.courseid,
			prof_id: this.props.profid,
            showModal: false
        };
    }
	
    handlePopup = () => {
        this.setState({ showModal: true });
    }
	
	handleClose = (event) => {
        this.setState({ showModal: false });
    }
	
	handleChange = (event) => {
        this.setState({ comment: event.target.value });
    }
	
	send() {
		if (this.state.comment != "") {
			fetch('/comments/add', {
				method: "POST",
				headers: { "Content-Type": "application/json", 'Authorization': localStorage.getItem('jwtToken') },
				body: JSON.stringify({
					comment: this.state.comment,
					course_id: this.state.course_id,
					prof_id: this.state.prof_id
				})
			}).then(response => {
				return response.json();
			}).then(response => {
				this.handleClose();
				window.location.reload();
			});
		}
	}
	
    render() {
        const { history } = this.props;
	    if ((localStorage.getItem('jwtToken') + "") != "null") {
            return (
                <div>
                    <Button onClick={this.handlePopup}>Add Comment</Button>
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Comment</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label className="ilabel">
                                Comment:<br />
                                <textarea name="comment" value={this.state.comment} onChange={this.handleChange}/>
                            </label>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="" onClick={(evt) => { this.send();}}>Post Comment</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
            } else {
            return (
                <div>
                    Wanna add a comment? Please login or signup.
                    <Login>Login to add a comment</Login>
                </div>
            );
        }
    }
}

export default AddComment;
