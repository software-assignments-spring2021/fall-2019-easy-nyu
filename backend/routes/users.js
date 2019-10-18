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
    User.findOne({
        $or: [
            { email: req.body.email },
            { nid: req.body.nid }
        ]
    }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email or Netid already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                nid: req.body.nid,
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
router.post("/login", (req, res) => {
    // Form validation
    console.log(req.body)
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const nid = req.body.nid;
    const password = req.body.password;
    // Find user by email
    User.findOne({$or: [
        { email: req.body.email },
        { nid: req.body.nid }
    ]}).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    process.env.secretOrKey,
                    (err, token) => {
                        console.log(123)
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    },
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;