import React, { Component } from "react";
import Professor from './professor';
import './professorDisplay.css';

class ProfessorDisplay extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            professors: [],
        };
    }

    componentWillMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        fetch('/professors/all', { method: "GET" })
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
        return (
<<<<<<< HEAD
            <div>
                <div id="header" class="headerContent">
                    <img class="headerLogo" src="logo.png">
                    </img>
                </div>
                <div id="title" class="pageTitle">EasyNYU Professor Search</div>
                <div class="centerContent">
                    <div class="textBoxContainer shadow rounded">
                        <div id="show-prof-div" style={{ textAlign: "center" }}>
                            {this.state.professors.map((prof, i) => (
                                <Professor
                                    key={prof._id}
                                    id={prof._id}
                                    name={prof.professorname}
                                    description={prof.description}
                                >
                                </Professor>
                            ))}
                        </div>
                    </div>
                </div>
=======
            <div id="show-prof-div" style={{ textAlign: "center" }}>
                <h1>Professors in the Database:</h1>
				<table style={{margin: "5px auto"}}><thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
					</tr>
				</thead><tbody>
					{this.state.professors.map((prof, i) => (
						<Professor
							key={prof._id}
							id={prof._id}
							name={prof.professorname}
							description={prof.description}
						></Professor>
					))}
				</tbody></table>
>>>>>>> master
            </div>
        )
    }
}
<<<<<<< HEAD

export default ProfessorDisplay;
=======
  
export default ProfessorDisplay;
>>>>>>> master
