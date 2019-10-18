const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/user.model");

// setting up route register
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({$or: [
        {email: req.body.email},
        {nid: req.body.nid}
    ]}).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email or Netid already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                nid : req.body.nid,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// setting up route login
router