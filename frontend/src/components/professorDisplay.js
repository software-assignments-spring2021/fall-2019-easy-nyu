import React, { Component } from "react";
import Professor from './professor';
import { Link } from 'react-router-dom'
import './professorDisplay.css';
import NYUNavBar from "./navbar";
import Table from 'react-bootstrap/Table';
import { Container, Row } from "react-bootstrap";
import AddProfessor from "./addProfessor";

class ProfessorDisplay extends Component {
    constructor(props) {
        super(props);
        this._isMounted = true;
        this.state = {
            professors: [],
			status: "Loading..."
        };
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
					this.setState({ status: "Network response was not ok." })
                    throw new Error('Network response was not ok.');
                }
            }).then(response => {
                if (this._isMounted) {
                    this.setState({ professors: response, status: "" })
                }
            });
    }
    
    render() {
        return (
            <div id="show-prof-div" style={{ textAlign: "center" }}>
                <NYUNavBar />
                <Container>
                    <Row className="justify-content-md-center">
                        <h1>All Professors</h1>
                    </Row>
                    <Row className="justify-content-md-center"> 
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>School</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.professors.map((prof, i) => (
                                    <Professor
                                        key={prof._id}
                                        id={prof._id}
                                        name={prof.name}
                                        school={prof.school}
                                    ></Professor>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
					<Row className="justify-content-md-center">{this.state.status}</Row>
					<Row className="justify-content-md-center"><AddProfessor /></Row>
                </Container>
            </div>
        )
    }
}
  
export default ProfessorDisplay;
