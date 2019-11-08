import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

class CourseSearch extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            courses: [],
        };
    }

    componentWillMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    componentDidMount() {
        fetch('/courses/', { method: "GET" })
            .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
            }).then(response => {
            if (this._isMounted) {
                console.log(response)
                this.setState({ courses: response })
            }
        });
    }
    render () {
        return (
				<div>
					<div id="header" class="headerContent">
						<img class="headerLogo" src="logo.png">
						</img>
					</div>

					<div id="title" class="pageTitle">EasyNYU Course Search</div>
						<div class="centerContent">
							<div class="textBoxContainer shadow rounded">
							<table style={{margin: "5px auto"}}><thead>
								<tr>
									<th>Course</th>
									<th>Professor</th>
								</tr>
							</thead><tbody>
								{this.state.courses.map((course, i) => (
									<tr>
										<td><Link to={"/coursesearch/" + course._id}>{course.coursename}</Link></td>
										<td><Link to={"/coursesearch/professors/" + course.prof}>{course.prof}</Link></td>
									</tr>
								))}
							</tbody></table>
						</div>
					</div>
				</div>
        )
    }
}
  
export default CourseSearch;
