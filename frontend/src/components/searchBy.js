import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const styles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        background: 'linear-gradient(45deg, #001B87 30%, #00A6D7 90%)',
        color: 'white',
        marginTop: '5%'
    },
    search: {
        color: 'white',
        borderWidth: "1px",
        borderColor: "yellow !important"
    },
    intro: {
        width: "50%",
        marginLeft: "25%"
    },
    prompt: {
        marginTop: "1%",
        width: "50%",
        marginLeft: "25%"
    }
}));

class SearchBy extends React.Component {
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

    render() {
        const { classes } = this.props;

        return (
            <Paper square='true' className={classes.root}>
                <Typography component="p" className={classes.intro}>
                    The EasyNYU Team is dedicated to creating
                    a safe and friendly community for students
                    to comment freely on the courses taken and on
                    associated professors.
                </Typography>
                <Typography className={classes.prompt}>
                    Start by searching for your favorite courses and professors
                    and sharing your opinion! You will need to login before
                    adding a comment.
                </Typography>
            </Paper>
        )
    }
}

export default withStyles(styles)(SearchBy);