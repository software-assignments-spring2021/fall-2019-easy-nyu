import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import ProfessorDisplay from './professorDisplay';
import './portal.css';

class Portal extends Component {
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
	const activeClass = (route) => { return this.props.location.pathname === route ? "megaMenuSelected" : null }
        return (
		<Router>
			<div>
				<div id="header" class="headerContent">
					<img class="headerLogo" src="/logo.png">
					</img>
				</div>

				<div id="title" class="pageTitle">EasyNYU Portal</div>
				<div id="IS_BB_HEADER_MENU">
						<nav role="navigation" aria-label="Site" class="megaMenu">
							<Route exact path="/portal/" render={() => <ul>
								<li selected="true" className={"megaMenuItem megaMenuSelected"}><Link to={"/portal/"}>Courses</Link></li>
								<li className={"megaMenuItem"}><Link to={"/portal/professors/"}>Professors</Link></li>
							</ul> } />
							<Route path="/portal/professors/" render={() => <ul>
								<li className={"megaMenuItem"}><Link to={"/portal/"}>Courses</Link></li>
								<li selected="true" className={"megaMenuItem megaMenuSelected"}><Link to={"/portal/professors/"}>Professors</Link></li>
							</ul> } />
						</nav>
				</div>
				<div class="centerContent">
					<div class="textBoxContainer shadow rounded">
						<Route exact path="/portal/" render={() => 
							<table style={{margin: "5px auto"}}><thead>
								<tr>
									<th>Course</th>
									<th>Professor</th>
								</tr>
							</thead><tbody>
								{this.state.courses.map((course, i) => (
									<tr>
										<td><Link to={"/portal/" + course._id}>{course.coursename}</Link></td>
										<td><Link to={"/portal/professors/" + course.prof}>{course.prof}</Link></td>
									</tr>
								))}
							</tbody></table>
						} />
						<Route exact path="/portal/professors/" component={ ProfessorDisplay } />
					</div>
				</div>
			</div>
		</Router>
        )
    }
}
  
export default Portal;
