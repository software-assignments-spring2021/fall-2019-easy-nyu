import React, { Component } from "react";

class Course extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {};
    }

    componentWillMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        console.log(this.props.match.params)
        fetch('/courses/:id', { method: "GET" })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            }).then(response => {
                if (this._isMounted) {
                    console.log(response)
                    this.setState({ professors: response })
                }
            });
    }
    render() {
        console.log(this.props.match.params)
        return (
            <div id="show-prof-div" style={{ textAlign: "center" }}>
                <h1>Professors in the Database:</h1>
            </div>
        )
    }
}
  
export default Course;
