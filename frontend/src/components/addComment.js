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
                                Comment:<br /></label>
                                <textarea name="comment" value={this.state.comment} onChange={this.handleChange}/><br />
                                <label for="rating" className="ilabel">Rating:</label><input name="rating" id="rating" type="range" min="1" max="5" list="stars" value={this.state.rating} onChange={this.handleRate}/>
                                <datalist id="stars">
                                    <option value="1" label="*"></option>
                                    <option value="2" label="**"></option>
                                    <option value="3" label="***"></option>
                                    <option value="4" label="****"></option>
                                    <option value="5" label="*****"></option>
                                </datalist>
                                Would you recommend to others? <input type="radio" id="recommendyes" value="true" name="recommend" onChange={this.handleRecommendYes} style={{'display':'inline-block', 'width':'10%'}} checked/><label for="recommendyes" className="ilabel" style={{'display':'inline-block'}}>Yes</label> <input type="radio" id="recommendno" value="false" name="recommend" style={{'display':'inline-block', 'width':'10%'}} onChange={this.handleRecommendNo}/><label for="recommendno"  className="ilabel" style={{'display':'inline-block'}}>No</label><br />
                                <input type="checkbox" id="anonymous" name="anonymous" onChange={this.handleAnonymous} style={{'display':'inline-block', 'width':'10%'}}/> <label className="ilabel" for="anonymous" style={{'display':'inline-block'}}>Hide name from comment</label>
                                <p className='error-msg'>{this.state.errorMsg}</p>
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
                    Want to add a comment? Please log in or sign up.
                    <center><Login /></center>
                </div>
            );
        }
    }
}

export default AddComment;
