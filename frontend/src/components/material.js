import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Material extends Component {
	
    constructor(props) {
        super(props);
			this.state = {
				name: "",
				filename: "Loading...",
				datePosted: "",
				canModify: false,
				showModal: false
			}
        this._isMounted = true;
	}
	

	componentDidMount() {
		fetch('/material/' + this.props.id, { method: "GET" }).then(response => {
			if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
		}).then(response => {
			try {
				if (response.user_id == window.localStorage.userID || window.localStorage.role == "admin") {
					this.setState({
						canModify: true
					});
				}
				this.setState({
					filename: response.filename,
					datePosted: new Date(response.createdAt).toString()
				});
					fetch ('/userprofile/' + response.user_id, { method: "GET" }).then(response => {
						if (response.ok) {
							return response.json();
						} else {
							throw new Error('Network response was not ok.');
						}
					}).then(response2 => {
							this.setState({
								name: <Link to={'/userprofile/' + response2._id}>{response2.name}</Link>
							});
					}).catch(error => {
						this.setState({
							comment: "Error loading file"
						});
					});
			} catch(err) {
				this.setState({
					comment: "Error loading file"
				});
			}
			
		})
	}

	edit() {
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
			fetch('/material/' + this.props.id, {
				method: "PUT",
				headers: { "Content-Type": "application/json", 'Authorization': localStorage.getItem('jwtToken') },
				body: JSON.stringify({
					filename: this.state.filename,
					course_id: this.state.course_id,
                    data: this.state.data,
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
			}).catch(error => {
				this.setState({errorMsg: "There was an error uploading the file."});
			});
		} else {
            this.setState({errorMsg: "You must select a file."});
        }
	}

	delete() {
		if (window.confirm('Are you sure you want to delete this file?')) {
			fetch('/material/' + this.props.id, { method: "DELETE", headers: { 'Authorization': localStorage.getItem('jwtToken') }, }).then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Network response was not ok.');
				}
			}).then(response => {
				window.location.reload();
			}).catch(error => {
				window.alert('There was an error deleting this file.')
			});
		}
	}
	
	render() {
		return (
			<div>
				<a href={"http://localhost:4000/material/" + this.props.id + "/download"}>{this.state.filename}</a>
				{this.state.canModify ? (
					<p><a href="javascript:void(0)" onClick={ () => this.edit()}>Reupload</a> | <a href="javascript:void(0)" onClick={ () => this.delete()}>Delete</a></p>
				):("")}
				<small><p style={{'text-align':'left','margin-bottom':'0px'}}>Uploaded on {this.state.datePosted} by {this.state.name}</p></small>
				<Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Reupload Course Material</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input type="file" name="file" id="file" onChange={this.handleChange}></input>
                            <p className='error-msg'>{this.state.errorMsg}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="" onClick={(evt) => { this.send();}}>Update File</button>
                        </Modal.Footer>
                    </Modal>
			</div>
		)
	}
}

export default Material;