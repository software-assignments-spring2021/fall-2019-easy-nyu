import React, { Component } from "react";

class Comment extends Component {
	
    constructor(props) {
        super(props);
			this.state = {
				name: "",
				comment: "",
				rating: 0,
				recommend: false,
				datePosted: ""
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
			}).then(response2 => {
				this.setState({
					name: response2.name
				});
				if (response.anonymous == true) {
					this.setState({
						name: "Anonymous"
					});
				}
				this.setState({
					comment: response.comment,
					rating: response.rating,
					recommend: response.recommend,
					datePosted: new Date(response.createdAt).toString()
				});
			});

			
		})
	}

	delete() {
		window.confirm('Are you sure you want to delete this comment?');
	}
	
	render() {
		return (
			<div>
				<strong>{this.state.name}</strong><br />
				<h3>{String.fromCharCode(9733).repeat(this.state.rating)}{String.fromCharCode(9734).repeat(5 - this.state.rating)}</h3>
				<p>{this.state.comment}</p>
				<p>Would Recommend: {this.state.recommend ? "Yes" : "No"}</p>
				<a href="javascript:void(0)">Edit</a> | <a href="javascript:void(0)" onClick={ () => this.delete()}>Delete</a><br />
				<small><p style={{'text-align':'left','margin-bottom':'0px'}}>Commented on {this.state.datePosted}</p></small>
			</div>
		)
	}
}

export default Comment;