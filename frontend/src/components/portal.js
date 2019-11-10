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
                console.log(response[0].prof)
                this.setState({ courses: response })
            }
        });
    }
    render () {
	const activeClass = (route) => { return this.props.location.pathname === route ? "megaMenuSelected" : null }
        return (
		<Router>
			<div>
				<div id="NYU_DEFAULT_HEADER" class="IS_BB_HEADER_CLASS row">
					<div id="Header_Container" class="IS_BB_HEADER_CONTAINER">
						<div id="IS_BB_HEADER_WRAPPER">
							<div id="IS_BB_HEADER" class="bb_header">
								<div id="IS_BB_HEADER_LOGO_CONTAINER" class="logo"></div>
								<div id="IS_BB_MENU_ROW" class="row showMenu">
									<div class="headerNav">
										<ul class="headerNavUL">
											<li class="IS_BB_LINKS_MENU_DESKTOP">
												{/* USERNAME AND LINK TO PROFILE GOES BELOW */}
												<h5><Link>My Name</Link></h5>
											</li>
											<li class='IS_BB_RSPV_HEADER_LINK'>
												{/* LOG OUT BUTTON GOES BELOW */}
												<h5><Link>LOG OUT</Link></h5>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class="ptbr-divider"></div>
						<div id="EASY_NYU_LOGO" class="">
							<h1><a>EasyNYU</a></h1>
						</div>
						<div class="ptbr-divider"></div>
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
					</div>
				</div>
				<div class="wrapper">
					<div id="ptcol1" class="isEdRow1Wrp row">
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
										<td><Link to={"/portal/professors/" + course.prof[0]._id}>{course.prof[0].professorname}</Link></td>
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
