import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import './login.css'
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            nid: "",
            password: "",
            password2: "",
            showModal: false,
            errorMsg: "",

            loginStatus:'',
            success:false,
            token:''
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
        // fetch('http://localhost:4000/api/auth/login', {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         name: this.state.name,
        //         email: this.state.email,
        //         nid: this.state.nid,
        //         password: this.state.password,
        //         password2: this.state.password2
        //     })
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             console.log(response);
        //             this.setState({success:true,loginStatus:'Logged in!'});
        //             localStorage.setItem('jwt',response.data.token);
        //             localStorage.setItem('userID',response.data.id);
        //             return response.json();
        //         } else {
        //             console.log(response.data);
        //             response.json()
        //             .then(errors => {
        //                 this.setState({
        //                     errorMsg: Object.values(errors)[0]
        //                 })
        //             })
        //         }
        //     })
        //     .then(
        //         this.setState({
        //             nid: "",
        //             password: "",
        //         })
        //     );

       const auth={
                    name: this.state.name,
                    email: this.state.email,
                    nid: this.state.nid,
                    password: this.state.password,
                    password2: this.state.password2
        }
       
        axios.post('http://localhost:4000/api/auth/login', auth)
            .then(res => {
                //store jwt in Cookie
                localStorage.setItem('jwtToken',res.data.token);
                localStorage.setItem('userID',res.data.id);
                // user id is not stored in localStorage.userID
            })
            .catch(err => {
                console.log(err);
                this.setState({loginStatus:'Incorrect email or password',success:false});
            });

    }

    render() {
        return (
            <div>
                <button className="buttonLink" onClick={this.handlePopup}> Login </button>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="ilabel">
                            Net ID:
                            <input type="text" name="nid" value={this.state.nid} onChange={this.handleNidChange} />
                        </label>
                        <label className="ilabel">
                            Password:
                            <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                        </label>
                        <p className='error-msg'>{this.state.errorMsg}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="login-btn" onClick={(evt) => { this.send(); this.handleClose(); }}>Login</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Login;
