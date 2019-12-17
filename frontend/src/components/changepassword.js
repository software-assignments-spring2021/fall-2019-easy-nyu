import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'
import './login.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.state = {
            id: this.props.id,
            oldpassword: "",
            password: "",
            password2: "",
            showModal: false,
            errorMsg: ""
        };
    }

    handlePopup = () => {
        this.setState({ showModal: true });
    }

    handleOldPasswordChange = (event) => {
        this.setState({ oldpassword: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }
    
    handlePassword2Change = (event) => {
        this.setState({ password2: event.target.value });
    }

    handleClose = (event) => {
        this.setState({ showModal: false, oldpassword: "", password: "", password2: "", errorMsg: "" });
    }

    send() {
        if (this.state.password2 == this.state.password) {
            const { history } = this.props;
            const auth={
                        id: this.state.id,
                        oldpassword: this.state.oldpassword,
                        password: this.state.password
            }
            axios.post('/api/auth/changepassword', auth, { headers: { 'Authorization': localStorage.getItem('jwtToken') } })
                .then(res => {

                    this.handleClose()
                })
                .catch(err => {
                    console.log(err.response.data);
                });
        } else {
            this.setState({errorMsg: "Passwords do not match."})
        }
    }

    render() { 
        const { history } = this.props;
        return (
            <div>
                <Button onClick={this.handlePopup}>{ this.props.type == "change" ? "Change Password" : ""}{ this.props.type == "reset" ? "Reset Password" : ""}</Button>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{ this.props.type == "change" ? "Change Password" : ""}{ this.props.type == "reset" ? "Reset Password" : ""}</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={(evt) => { this.send();evt.preventDefault();}}>
                        <Modal.Body>
                            { this.props.type == "change" ?
                                <label className="ilabel">
                                    Old Password:
                                    <input autoFocus="true" type="text" name="nid" id="nid" value={this.state.nid} onChange={this.handleNidChange} />
                                </label>
                            : "" }
                            <label className="ilabel">
                                New Password:
                                <input type="password" name="password" id="password" value={this.state.password} onChange={this.handlePasswordChange} />
                            </label>
                            <label className="ilabel">
                                Confirm New Password:
                                <input type="password" name="password2" id="password2" value={this.state.password2} onChange={this.handlePassword2Change} />
                            </label>
                            <p className='error-msg'>{this.state.errorMsg}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="submit" className="login-btn" >{ this.props.type == "change" ? "Update" : ""}{ this.props.type == "reset" ? "Reset" : ""}</button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default withRouter(ChangePassword);
