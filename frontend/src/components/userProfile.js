import React, { Component } from "react";
import Navbar from './navbar';
import axios from 'axios';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.signoutHandler =this.signoutHandler.bind(this);
        this.state = {
            nid : '',
            score : 0,
            loggedIn: false,        
        }
    }

    
    signoutHandler(){
        const {history} = this.props;
        this.setState({loggedIn:false});
        localStorage.setItem('jwtToken',null);
        localStorage.setItem('userID',null);
        history.push('/');
    }

    componentDidMount() {
        let loggedin = (localStorage.getItem('jwtToken') === null) ? false:true;
        if(loggedin){
            const userID = localStorage.getItem('userID');
            axios.get('http://localhost:4000/userprofile/' + userID)
            .then(res =>{
                this.setState({
                    nid: res.data.data.nid,
                    score: res.data.data.score,
                    loggedIn: loggedin
                });
            })
            .catch(err => {console.log('Err' + err);});
        }
    }

    render() {
        return (
            return (
                <div>
                    <NYUNavBar />
                    <center><container>
                        <Row className="justify-content-md-center">
                            <h1>N-id: {this.state.nid}</h1>
                        </Row>
                        <Row className="justify-content-md-center">
                            <h3>Score: {this.state.scorel}</h3>
                        </Row>
                        <Row className="justify-content-md-center">
                            <AddComment profid={this.props.match.params.id}/>
                        </Row>
                        <Table striped bordered hover>
                            <tr>
                                <th>Comments for the Professor</th>
                            </tr>
                            <tr>
                                {this.state.comments_for_prof.map((prof_comment, i) => (
                                    <td key={i}>
                                        <p>{prof_comment}</p>
                                    </td>
                                ))}
                            </tr>
                        </Table>
    
                        {/* {Option One for Display} */}
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>{`Courses Taught By ${this.state.professorname}`}</th>
                                    <th>{`Comments on Course`}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.courses.map((course, i) => (
                                    <tr key={course._id}>
                                            <td>
                                                <Link to={`/course/${course._id}`}>{course.name}</Link>
                                            </td>
                                            <td>
                                            {this.state.comments[i].map((comment, j) => (
                                                <p key={j}>{this.state.comments[i][j]}</p>
                                            ))}
                                            </td>
                                    </tr>
                                    ))}
                            </tbody>
                        </Table>
                        
                        {/* {Option Two for Display} */}
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>{`Courses Taught By ${this.state.professorname}`}</th>
                                    <th>{`Comments on Course`}</th>
                                </tr>
                            </thead>
                                {this.state.courses.map((course, i) => (
                                    <tr>
                                        <td key={course._id}>
                                            <Link to={`/course/${course._id}`}>{course.name}</Link>
                                        </td>
                                        <td>
                                            <table>
                                                <tr>
                                                    {this.state.comments[i].map((comment, j) => (
                                                        <td key={j}>
                                                            <p>{this.state.comments[i][j]}</p>
                                                        </td>
                                                    ))}
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                ))}
                        </Table>
                    </container></center>
                </div>
            )
        )
    }
}

export default UserProfile;