import React, { Component } from "react";
import Navbar from './navbar'
import {Grid, Paper, makeStyles, Button} from '@material-ui/core';

class Home extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    render() {
        let { classes } = this.props;
        console.log(classes)
        return (
            <div>
                <Navbar />
                <Grid container>
                    <Grid item xs={12}>
                        <Button variant="outlined" color="primary">Search by Major</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Home;