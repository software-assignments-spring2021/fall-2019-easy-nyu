import React, { Component } from "react";
import NYUNavBar from "./navbar";
import { Container, Table, Row, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Comment from './comment';

class CourseDetail extends Component {
    constructor(props) {
        super(props);
        this._isMounted = true;
        this.state = {
            professors: [],
            comments: [],
            description: "",
            coursename: "",
            semester: "",
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    componentDidMount() {
        fetch(`/courses?id=${this.props.match.params.id}`, { method: "GET" })
            .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
            })
            .then(response => {
            if (this._isMounted) {
                this.setState({ 
                    professors: response.prof,
                    comments: response.comments,
                    description: response.description,
                    coursename: response.coursename,
                    semester: response.semester
                })
            }
        }
            );
    }
    render() {
        return (
            <div>
                <NYUNavBar />
                <Container>
                    <Row className="justify-content-md-center">
                        <h1>{`${this.state.semester}`}</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <h1>{`${this.state.coursename}`}</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <h1>{`${this.state.description}`}</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <td>{`Professors Teaching ${this.state.description}`}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {this.state.professors.map((prof, i) => (
                                        <td key={i}><Link to={`//`}>{prof.professorname}</Link></td>
                                    ))}
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
					<Row className="justify-content-md-center">
						<h3>Comments ({this.state.comments.length})</h3>
					</Row>
						{this.state.comments.map((comment, i) => (
					<Row className="justify-content-md-center"><Table striped bordered hover ><tbody><tr><td>
							<Comment id={comment} />
					</td></tr></tbody></Table></Row>
						))}
						
						{/* SHOW THIS ROW ONLY IF LOGGED IN*/}
					<Row className="justify-content-md-center">
						<Button>Add Comment</Button>
					</Row>
                </Container>
            </div>
        )
    }
}
  
export default CourseDetail;
