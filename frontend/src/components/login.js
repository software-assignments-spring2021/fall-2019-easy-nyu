import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import Signup from './signup'
import './login.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.state = {
            name: "",
            email: "",
            nid: "",
            password: "",
            showModal: false,
            errorMsg: "",
            success: false,
            token: ''
        };
    }

    handlePopup = () => {
        this.setState({ showModal: true });
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

    handleClose = (event) => {
        this.setState({ showModal: false });
    }

    send() {
        const { history } = this.props;
        const auth = {
            name: this.state.name,
            email: this.state.email,
            nid: this.state.nid,
            password: this.state.password,
            password2: this.state.password2
        }
        axios.post('/api/auth/login', auth)
            .then(res => {
                //store jwt in Cookie
                localStorage.setItem('jwtToken', res.data.token);
                localStorage.setItem('userID', res.data.id);
                localStorage.setItem('role', res.data.role);
                // user id is not stored in localStorage.userID
                const { history } = this.props;
                if (history) history.push('/userprofile/' + res.data.id);
                this.handleClose()
            })
            .catch(err => {
                console.log(err.response.data);
                if (err.response.data.banned == "Banned user") {
                    this.setState({ errorMsg: 'You cannot log in because your account is banned.', success: false, password: "" });
                } else {
                    this.setState({ errorMsg: 'Incorrect NetID or password', success: false, password: "" });
                }
            });
    }

    render() {
        var buttonDisplay;
        switch (this.props.buttonLocation) {
            case "navbar":
                buttonDisplay = <Button variant="outline-light" onClick={this.handlePopup}>Login</Button>;
                break;
            case "homepage":
                buttonDisplay = <button className="buttonLink" onClick={this.handlePopup}> Login </button>;
                break;
            case "otherpage":
                buttonDisplay = <Button onClick={this.handlePopup}>Login</Button>;
                break;
            default:
                buttonDisplay = <a href="javascript:void(0)" className="display-login" onClick={this.handlePopup}>Log in</a>;
        }
        const { history } = this.props;
        return (
            <div>
                <Button variant="outline-light" onClick={this.handlePopup}>Login</Button>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="ilabel">
                            NetID:
                                <input autoFocus="true" type="text" name="nid" id="nid" value={this.state.nid} onChange={this.handleNidChange} />
                        </label>
                        <label className="ilabel">
                            Password:
                                <input type="password" name="password" id="password" value={this.state.password} onChange={this.handlePasswordChange} />
                        </label>
                        <div className="signup">
                            <p className="inline">Not Registered?</p>
                            <Signup onNavbar={false} />
                        </div>
                        <p className='error-msg'>{this.state.errorMsg}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="login-btn" onClick={this.send()}>Login</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Login);
