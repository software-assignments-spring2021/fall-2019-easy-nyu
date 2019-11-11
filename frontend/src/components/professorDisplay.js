import React, { Component } from "react";
import Professor from './professor';
import './professorDisplay.css';
import NYUNavBar from "./navbar";
import Table from 'react-bootstrap/Table';
import { Container, Row } from "react-bootstrap";

class ProfessorDisplay extends Component {
    constructor(props) {
        super(props);
        this._isMounted = true;
        this.state = {
            professors: [],
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
                    throw new Error('Network response was not ok.');
                }
            }).then(response => {
                if (this._isMounted) {
                    this.setState({ professors: response })
                }
            });
    }
    render() {
        return (
            <div id="show-prof-div" style={{ textAlign: "center" }}>
                <NYUNavBar />
                <Container>
                    <Row className="justify-content-md-center">
                        <h1>Professors in the Database:</h1>
                    </Row>
                    <Row className="justify-content-md-center"> 
                        
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.professors.map((prof, i) => (
                                    <Professor
                                        key={prof._id}
                                        id={prof._id}
                                        name={prof.professorname}
                                        description={prof.description}
                                    ></Professor>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </div>
        )
    }
}
  
export default ProfessorDisplay;
