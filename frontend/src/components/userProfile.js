import React, { Component } from "react";
import Navbar from './navbar';
import axios from 'axios';
import {Row, Table, Button} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.signoutHandler =this.signoutHandler.bind(this);
        this.state = {
            email: '',
            name: '',
            nid : '',
            password: '',
            score : 0,
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
    signoutHandler(){
        const {history} = this.props;
        this.setState({loggedIn:false});
        localStorage.setItem('jwtToken',null);
        localStorage.setItem('userID',null);
        history.push('/');
    }

    // Func to update user profile
    updateProfile() {
        const modified_auth={
            name: this.state.name,
            email: this.state.email,
            nid: this.state.nid,
            password: this.state.password,
        }

        axios.post('http://localhost:4000/userprofile/update', modified_auth)
            .then(res =>{
                console.log(res.data);
            })
            .catch(err => {console.log('Err' + err);});
    }

    // Load a specific user profile
    componentDidMount() {
        let loggedin = (localStorage.getItem('jwtToken') === null) ? false:true;
        if(loggedin){
            const userID = localStorage.getItem('userID');
            axios.get('http://localhost:4000/userprofile/' + userID)
            .then(res =>{
                this.setState({
                    email: res.data.email,
                    name: res.data.name,
                    nid: res.data.nid,
                    score: res.data.score,
                    loggedIn: loggedin
                });
            })
            .catch(err => {console.log('Err' + err);});
        }
    }
    
    // To display the user profile
    render() {
        return (
            <div>
                <Navbar />
                <container>
                    <Row className="justify-content-md-center">
                        <h1>{this.state.name}'s User Profile</h1>
                    </Row>
                    
                    <center><Table striped bordered hover>
                        <tr>
                            <td>
                                UserName
                            </td>
                            <td>
                                {this.state.name}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Email
                            </td>
                            <td>
                                {this.state.email}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Net ID
                            </td>
                            <td>
                                {this.state.nid}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Want to Edit Your Profile?
                            </td>
                            <td>
                            <Button onClick={this.handlePopup}>Let's do it!</Button>
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
                                    <label className="ilabel">
                                        Password:
                                        <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                                    </label>    
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className="login-btn" onClick={(evt) => { this.updateProfile(); this.handleClose();}}>Edit</button>
                                </Modal.Footer>
                            </Modal>
                            </td>
                        </tr>
                    </Table></center> 
                </container>
            </div>
        )
    }
}

export default UserProfile;