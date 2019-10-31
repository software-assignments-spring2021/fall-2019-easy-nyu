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
        fetch('/courses', { method: "GET" })
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
    render () {
        // For now, will display course infor, since prof route is not finished.
        return (
            <div id="show-prof-div" style={{ textAlign: "center" }}>
                <h1>Professors in the Database:</h1>
                {this.state.professors.map((prof, i) => (
                    <Professor
                        key={prof._id}
                        id={prof._id}
                        name={prof.coursename}
                        description={prof.description}
                        prof={prof.prof}
                        ta={prof.ta}
                    >
                    </Professor>
                ))}
            </div>
        )
    }
}
  
export default ProfessorDisplay;