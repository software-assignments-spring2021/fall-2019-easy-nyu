import React, { Component } from "react";
import { InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import './search.css'

class NYUNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }


    render() {
        return (
            <div className='search-div'>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search Professor/Course"
                        aria-label="Search Professor/Course"
                        aria-describedby="basic-addon2"
                    />
                </InputGroup>
                <Dropdown>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

export default NYUNavBar;

