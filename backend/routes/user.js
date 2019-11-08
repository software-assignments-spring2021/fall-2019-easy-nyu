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
router.route('/profile').get((req, res) => {
    User.findOne({ nid: req.query.nid }, (err, data) => {
        if (err) {
            //can't find user profile by nid
            const newUser = new User({
                nid,
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
            res.json({message: "User profile get!", user: user});
        }
    })
});


// Post Request - Add a new course to database
router.route('/profile/update').post((req, res) => {
    const nid = req.body.nid;
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


/*
router.route('/add').post((req, res) => {
    const coursename = req.body.coursename;
    const description = req.body.description;
    const semester = req.body.semester;
    const prof = req.body.prof;
    const ta = req.body.ta;
    const newCourse = new Course({
        coursename,
        description,
        semester,
        prof,
        ta
    });

    newCourse.save((err, course) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({message: "Course added!", course: course});
        }
    })
});
*/

module.exports = router;