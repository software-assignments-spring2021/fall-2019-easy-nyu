import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';

class Comment extends Component {
	
    constructor(props) {
        super(props);
			this.state = {
				name: "",
				comment: "Loading comment...",
				rating: 0,
				recommend: false,
				datePosted: "",
				canModify: false,
				showModal: false
			}
        this._isMounted = true;
	}
	

	componentDidMount() {
		fetch('/comments/' + this.props.id, { method: "GET" }).then(response => {
			if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
		}).then(response => {
			try {
				fetch ('/userprofile/' + response.user_id, { method: "GET" }).then(response => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error('Network response was not ok.');
					}
				}).then(response2 => {
					this.setState({
						name: response2.name
					});
					if (response.anonymous == true) {
						this.setState({
							name: "Anonymous"
						});
					}
					if (response.user_id == window.localStorage.userID) {
						this.setState({
							canModify: true
						});
					}
					this.setState({
						comment: response.comment,
						rating: response.rating,
						recommend: response.recommend,
						datePosted: new Date(response.createdAt).toString()
					});
				}).catch(error => {
					this.setState({
						comment: "Error loading comment"
					});
				});
			} catch(err) {
				this.setState({
					comment: "Error loading comment"
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
        this.setState({ comment: event.target.value });
    }

    handleRate = (event) => {
        this.setState({ rating: event.target.value });
    }

    handleRecommendYes = (event) => {
        this.setState({ recommend: true });
    }

    handleRecommendNo = (event) => {
        this.setState({ recommend: false });
    }

    handleAnonymous = (event) => {
        this.setState({ anonymous: event.target.checked });
	}
	
	send() {
		if (this.state.comment.length >= 15) {
			fetch('/comments/' + this.props.id, {
				method: "PUT",
				headers: { "Content-Type": "application/json", 'Authorization': localStorage.getItem('jwtToken') },
				body: JSON.stringify({
					comment: this.state.comment,
					course_id: this.state.course_id,
                    prof_id: this.state.prof_id,
                    rating: this.state.rating,
                    recommend: this.state.recommend,
                    anonymous: this.state.anonymous
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
				this.setState({errorMsg: "There was an error updating the comment."});
			});
		} else {
            this.setState({errorMsg: "Comment must be at least 15 characters"});
        }
	}

	delete() {
		if (window.confirm('Are you sure you want to delete this comment?')) {
			fetch('/comments/' + this.props.id, { method: "DELETE", headers: { 'Authorization': localStorage.getItem('jwtToken') }, }).then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Network response was not ok.');
				}
			}).then(response => {
				window.location.reload();
			}).catch(error => {
				window.alert('There was an error deleting this comment.')
			});
		}
	}
	
	render() {
		return (
			<div>
				<strong>{this.state.name}</strong><br />
				<h3>{String.fromCharCode(9733).repeat(this.state.rating)}{String.fromCharCode(9734).repeat(5 - this.state.rating)}</h3>
				<p>{this.state.comment}</p>
				<p>Would Recommend: {this.state.recommend ? "Yes" : "No"}</p>
				{this.state.canModify ? (
					<p><a href="javascript:void(0)" onClick={ () => this.edit()}>Edit</a> | <a href="javascript:void(0)" onClick={ () => this.delete()}>Delete</a></p>
				):("")}
				<small><p style={{'text-align':'left','margin-bottom':'0px'}}>Commented on {this.state.datePosted}</p></small>
				<Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Comment</Modal.Title>
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
                            <button className="" onClick={(evt) => { this.send();}}>Update Comment</button>
                        </Modal.Footer>
                    </Modal>
			</div>
		)
	}
}

export default Comment;