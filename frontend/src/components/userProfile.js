import React, { Component } from "react";
import Navbar from './navbar';
import axios from 'axios';
import {Row, Container, Table, Button} from "react-bootstrap";
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

    handleNameChange(e){
        this.setState({name:e.target.value})
    }

    handlePasswordChange(e){
        this.setState({password:e.target.value})
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
                console.log(res.data);
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

    render() {
        return (
            <div>
                <Navbar />
                <container>
                    <Row className="justify-content-md-center">
                        <h1>{this.state.name}'s Profile</h1>
                    </Row>

                    <center><Table striped bordered hover>
                        <tr>
                            <td>
                                Name
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
                                Edit Profile?
                            </td>
                            <td>
                                <Button onClick={this.handlePopup}>Edit</Button>
                                <Modal show={this.state.showModal} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit UserName</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <input value={this.state.name} type="text" onChange={this.handleNameChange} className="form-control" placeholder="Name" required />
                                    </Modal.Body>
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