const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Load input validation
//const validateRegisterInput = require("../validation/register");
//const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/user.model");


// get user profile by user credentials; if not, create new profile
router.route('/profile/:nid').get((req, res) => {
    console.log(req.params)
    const nid = req.params.nid
    const description = 'nyu student'
    const score = 0
    User.findOne({ nid: nid }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            if (data === null) {
                //can't find user profile by nid
                const newUser = new User({
                    nid,
                    name,
                    description,
                    score
                });
    
                newUser.save((err, user) => {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.json({message: "User profile created!", user: user});
                    }
                });    
            } else {
                res.json({message: "User profile get!", data: data});
            }
        }
    })
});


// Post Request - Add a new course to database
router.route('/profile/update').post((req, res) => {
    const nid = req.body.nid;
    const name = req.body.name;
    const description = req.body.description;
    const score = req.body.score;

    User.findOne({ nid: req.body.nid }, (err, data) => {
        if (err) {
            res.status(400).json('Error: ' + err);
        } else {

            User.update({
                description: description,
                score: score
            });
            res.json({message: "User profile updated!", user: user});
        }
    })   
});

//basic backend: show info from database

//nicer functionality:
//update profile: class, college, major
//fetch anything from database and show, edit then submit;

module.exports = router;