import React, { Component } from "react";
import Popup from "reactjs-popup";
import './signup.css'

class Signup extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        name: "",
        email: "",
        nid: "",
        password: "",
        password2: "",
      };
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

    send() {
        fetch('/api/users/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                    password2: this.state.password2
                }
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network Error at /api/users/register');
                }
            });
        this.setState({
            name: "",
            email: "",
            nid: "",
            password: "",
            password2: "",
        });
    }

    render() {
        return (
            <Popup trigger={<button className="buttonLink"> Create Account </button>} modal>
                {close => (
                    <div className="modal">
                        <a className="close" onClick={close}>
                            &times;
                        </a>
                        <div className="header"> Create Account </div>
                        <label className="ilabel">
                            Name:
                                <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
                        </label>
                        <label className="ilabel">
                            Email:
                                <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange} />
                        </label>
                        <label className="ilabel">
                            Net ID:
                                <input type="text" name="nid" value={this.state.nidl} onChange={this.handleNidChange} />
                        </label>
                        <label className="ilabel">
                            Password:
                                <input type="text" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                        </label>
                        <label className="ilabel">
                            Confirm Password:
                                <input type="text" name="password2" value={this.state.password2} onChange={this.handlePassword2Change} />
                        </label>
                        <button className="signup-btn" onClick={(evt) => { this.send(); }}>Create Account</button>
                    </div>
                )}
            </Popup>
        )
    }
}
  
export default Signup;