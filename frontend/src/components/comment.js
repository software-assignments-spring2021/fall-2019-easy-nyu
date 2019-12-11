import React, { Component } from "react";

class Comment extends Component {
	
    constructor(props) {
        super(props);
			this.state = {
				name: "",
				comment: "",
				rating: 0,
				recommend: false
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
					name: "Anonymous"
				});
			}
			this.setState({
				comment: response.comment,
				rating: response.rating,
				recommend: response.recommend
			});
			
		})
	}
	
	render() {
		return (
			<div>
				<strong>{this.state.name}</strong><br />
				<h3>{String.fromCharCode(9733).repeat(this.state.rating)}</h3>
				<p>{this.state.comment}</p>
				<p>Would Recommend: {this.state.recommend ? "Yes" : "No"}</p>
				<a>Edit</a> | <a>Delete</a>
			</div>
		)
	}
}

export default Comment;