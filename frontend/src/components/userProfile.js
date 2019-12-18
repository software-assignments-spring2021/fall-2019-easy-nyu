import React, { Component } from "react";
import Navbar from './navbar';
import axios from 'axios';
import { Row, Container, Table, Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import ChangePassword from "./changepassword";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.signoutHandler = this.signoutHandler.bind(this);
        this.state = {
            email: '',
            name: '',
            nid: '',
            password: '',
            role: '',
            banned: false,
            comments: [],
            score: 0,
            loggedIn: false,
            showModal: false
        }
    }

    handlePopup = () => {
        this.setState({ showModal: true });
    }

    handleClose = (event) => {
        this.setState({ showModal: false });
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    handleNidChange = (event) => {
        this.setState({ nid: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    // Set web token to be null after logout
    signoutHandler() {
        const { history } = this.props;
        this.setState({ loggedIn: false });
        localStorage.setItem('jwtToken', null);
        localStorage.setItem('userID', null);
        history.push('/');
    }

    // Func to update user profile
    updateProfile() {
        const modified_auth = {
            name: this.state.name,
            email: this.state.email,
            nid: this.state.nid,
            password: this.state.password,
        }

        axios.post('/userprofile/update', modified_auth)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => { console.log('Err' + err); });
    }

    changeRole() {
        switch (this.state.role) {
            case "student":
                axios.post('/api/auth/changestatus', {id: this.props.match.params.id, role: "admin", banned: this.state.banned}, { headers: { 'Authorization': localStorage.getItem('jwtToken') } })
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        role: "admin"
                    })
                })
                .catch(err => { console.log('Err' + err); });        
                break;
            case "admin":
                axios.post('/api/auth/changestatus', {id: this.props.match.params.id, role: "student", banned: this.state.banned}, { headers: { 'Authorization': localStorage.getItem('jwtToken') } })
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        role: "student"
                    })
                })
                .catch(err => { console.log('Err' + err); });    
                break;
        }
    }

    handleBan() {
        axios.post('/api/auth/changestatus', {id: this.props.match.params.id, role: this.state.role, banned: !this.state.banned}, { headers: { 'Authorization': localStorage.getItem('jwtToken') } })
        .then(res => {
            console.log(res.data);
            this.setState({
                banned: !this.state.banned
            })
        })
        .catch(err => { console.log('Err' + err); });
    }

    // Load a specific user profile
    componentDidMount() {
        let loggedin = (localStorage.getItem('jwtToken') === null) ? false : true;
        //if (loggedin) {
            const userID = this.props.match.params.id;
            axios.get('/userprofile/' + userID)
                .then(res => {
                    this.setState({
                        email: res.data.email,
                        name: res.data.name,
                        nid: res.data.nid,
                        score: res.data.score,
                        role: res.data.role,
                        banned: res.data.banned,
                        loggedIn: loggedin
                    });
                    axios.get('/userprofile/comments/' + userID, { headers: { 'Authorization': localStorage.getItem('jwtToken') }}).then(res =>  {
                        this.setState({comments: res.data});
                    }).catch(err => { console.log('Err' + err); });;
                })
                .catch(err => { console.log('Err' + err); });
        //}
    }

    // To display the user profile
    render() {
        return (
            <div>
                <Navbar />
                <Container>
                    <Row className="justify-content-md-center">
                        <h1>{this.state.name}{this.state.role == "admin" ? " (Administrator)" : ""}{this.state.banned ? <font color="red"> (Banned)</font> : ""}</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <h3>{this.state.nid}</h3>
                    </Row>
                    <Row className="justify-content-md-center">
                        <h5><a href={"mailto:" + this.state.email}>{this.state.email}</a></h5>
                    </Row>

                    <center>
                    <h3>Comments ({this.state.comments.length})</h3>
                    <Table striped bordered hover style={{width: "100%"}}>
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Professor</th>
                                <th>Rating</th>
                                <th>Would Recommend</th>
                                <th>Comment</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.comments.map((comment, i) => (
                                <tr>
                                    <td>{comment.course_id && <Link to={"/course/" + comment.course_id._id}>{comment.course_id.name}</Link>}</td>
                                    <td>{comment.prof_id && <Link to={"/professor/" + comment.prof_id._id}>{comment.prof_id.name}</Link>}</td>
                                    <td>{String.fromCharCode(9733).repeat(comment.rating)}{String.fromCharCode(9734).repeat(5 - comment.rating)}</td>
                                    <td>{comment.recommend ? "Yes" : "No"}</td>
                                    <td>{comment.comment}</td>
                                    <td>{comment.anonymous ? <strong>[anonymous comment - hidden from contributions]</strong> : ""}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Table bordered><tbody><tr>
                    {(window.localStorage.role == "admin" || window.localStorage.userID == this.props.match.params.id) &&
                        <td><Button onClick={this.handlePopup}>Edit Profile</Button></td>
                    }
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit User Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label className="ilabel">
                                Name:
                            <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
                            </label>
                            <label className="ilabel">
                                Net ID:
                            <input type="text" name="nid" value={this.state.nid} onChange={this.handleNidChange} />
                            </label>
                            <label className="ilabel">
                                Email:
                            <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange} />
                            </label>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="login-btn" onClick={(evt) => { this.updateProfile(); this.handleClose(); }}>Edit</button>
                        </Modal.Footer>
                    </Modal>                

                    {(window.localStorage.role == "admin" && window.localStorage.userID != this.props.match.params.id) &&
                        <td>
                            <ChangePassword id={this.props.match.params.id} type="reset" />
                        </td>
                    }
                    {window.localStorage.userID == this.props.match.params.id &&
                        <td>
                            <ChangePassword id={this.props.match.params.id} type="change" />
                        </td>
                    }
                    {window.localStorage.role == "admin" &&
                        <><td>
                            <Button onClick={(evt) => { this.changeRole(); }}>Change Role</Button>
                        </td><td>
                            <Button onClick={(evt) => { this.handleBan(); }} variant="danger">{this.state.banned ? "Unban User" : "Ban User"}</Button>
                        </td></>
                    }
                    </tr></tbody></Table>
                    </center>
                </Container>
            </div>
        )
    }
}

export default UserProfile;