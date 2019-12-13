import React, { Component } from "react";
import './search.css'
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

class NYUNavBar extends Component {
    constructor(props) {
        super(props);
        this._isMounted = true;
        this.state = {
            result: [{id: "123123", name: "jack"}]
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange(event) {
        console.log(event.target.value)
        if (event.target.value.length > 0) {
            fetch(`/search/${event.target.value}`, { method: "GET" })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                }).then(response => {
                    console.log("response: ", response.result)
                    if (this._isMounted) {
                        this.setState({ result: response.result })
                    }
                });
        }
    }

    render() {
        return (
            <div className='search-div'>
                <Autocomplete
                    id="combo-box-demo"
                    options={this.state.result}
                    renderOption={option=> {
                        console.log(option.topic)
                        let path, name;
                        option.type === "prof" ?  path = "/professor/" : path = "/course/";
                        option.topic === undefined ? name = option.name : name = option.name + " " + option.topic
                        return(
                            <a href={ path + option._id}>{name}</a>
                        )
                    }}
                    renderInput={params => (
                        <TextField {...params} 
                            color="primary" 
                            label="Search Professor/Course" 
                            variant="filled" 
                            fullWidth 
                            onChange={this.handleChange.bind(this)}
                            filter={(searchText, key) => true}
                        />
                    )}
                />
            </div>
        )
    }
}

export default NYUNavBar;

