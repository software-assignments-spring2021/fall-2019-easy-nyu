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
            <div>
                <Navbar />
                show something
            </div>
        )
    }
}

export default UserProfile;