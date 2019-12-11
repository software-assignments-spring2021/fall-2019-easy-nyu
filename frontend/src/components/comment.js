import React, { Component } from "react";

class Comment extends Component {
	
    constructor(props) {
        super(props);
			this.state = {
				name: "",
				comment: ""
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
			
			fetch ('/userprofile/' + response.user_id, { method: "GET" }).then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Network response was not ok.');
				}
			}).then(response => {
				this.setState({
					name: response.name
				});
			});
			if (response.anonymous == true) {
				this.setState({
					name: "Anonymous",
					comment: response.comment
				});
			} else {
				this.setState({
					comment: response.comment
				});
			}
		})
	}
	
	render() {
		return (
			<div>
				<strong>{this.state.name}</strong><br />
				<p>{this.state.comment}</p>
				<a>Edit</a> | <a>Delete</a>
			</div>
		)
	}
}

export default Comment;