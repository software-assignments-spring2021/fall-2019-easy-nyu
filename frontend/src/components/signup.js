import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'
import './signup.css';
import { withRouter } from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        name: "",
        email: "",
        nid: "",
        password: "",
        password2: "",
        showModal: false,
        errorMsg: ""
      };
    }
    
    handlePopup = () => {
        this.setState({showModal : true});
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

    handlePassword2Change = (event) => {
        this.setState({ password2: event.target.value });
    }

    handleClose = (event) => {
        this.setState({ 
            name: "",
            email: "",
            nid: "",
            password: "",
            password2: "",
            errorMsg: "",
            showModal: false 
        });
    }
    
    send() {
        fetch('/api/auth/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                nid: this.state.nid,
                password: this.state.password,
                password2: this.state.password2
            })
        }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    response.json()
                        .then(errors => {
                            this.setState({
                                errorMsg: Object.values(errors)[0]
                            })
                        })
                }
            }).then((res) => {
                if (res !== undefined) {
                    this.setState({
                        name: "",
                        email: "",
                        nid: "",
                        password: "",
                        password2: "",
                        errorMsg: "",
                        showModal: false
                    })
                    console.log(res);
                    localStorage.setItem('jwtToken',res.token);
                    localStorage.setItem('userID',res.id);
                    // user id is not stored in localStorage.userID
                    //const { history } = this.props;
                    //if(history) history.push('/userprofile/'+res.id);
                    window.location.reload();
                }
            });
    }

    render() {
        let buttonDisplay;
        switch (this.props.buttonLocation) {
            case "navbar":
                buttonDisplay = <Button variant="outline-light" onClick={this.handlePopup}>Signup</Button>;
                break;
            case "homepage":
                buttonDisplay = <button className="buttonLink" onClick={this.handlePopup}> Create an Account </button>;
                break;
            case "otherpage":
                buttonDisplay = <Button onClick={this.handlePopup}>Signup</Button>;
                break;
            default:    
                buttonDisplay = <p className="display-signup" onClick={this.handlePopup}>Create Account</p>
        }
        /*
        if (this.props.onNavbar) {
            buttonDisplay = <Button variant="outline-light" onClick={this.handlePopup}>Signup</Button>
        } else {
            buttonDisplay = <p className="display-signup" onClick={this.handlePopup}>Create Account</p>
        } 
        */
        return (
            <>
                {buttonDisplay}
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Account</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={(evt) => { this.send();evt.preventDefault();}}>
                        <Modal.Body>
                            <label className="ilabel">
                                Name:
                                <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
                            </label>
                            <label className="ilabel">
                                Email:
                                <input type="email" name="email" value={this.state.email} onChange={this.handleEmailChange} />
                            </label>
                            <label className="ilabel">
                                NetID:
                                <input type="text" name="nid" value={this.state.nid} onChange={this.handleNidChange} />
                            </label>
                            <label className="ilabel">
                                Password:
                                <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                            </label>
                            <label className="ilabel">
                                Confirm Password:
                                <input type="password" name="password2" value={this.state.password2} onChange={this.handlePassword2Change} />
                            </label>
                            <p className='error-msg'>{this.state.errorMsg}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="submit" className="signup-btn">Create Account</button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        )
    }
}
  
export default withRouter(Signup);
