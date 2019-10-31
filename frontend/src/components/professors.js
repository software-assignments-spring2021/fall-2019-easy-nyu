import React, { Component } from "react";
import './login.css'

class Professors extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        name: ""
      };
    }

    render() {
        return (
            <div className="modal">
                <div className="header"> Professors </div>
            </div>
        )
    }
}
  
export default Professors;