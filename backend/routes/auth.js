const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load Auth model
const Auth = require("../models/auth.model");

// setting up route register
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Auth.findOne({
        $or: [
            { email: req.body.email },
            { nid: req.body.nid }
        ]
    }).then(auth => {
        if (auth) {
            return res.status(403).json({ email: "Email or Netid already exists" });
        } else {
            const newAuth = new Auth({
                name: req.body.name,
                nid: req.body.nid,
                email: req.body.email,
                password: req.body.password,
                role: "student",
                banned: false
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newAuth.password, salt, (err, hash) => {
                    if (err) throw err;
                    newAuth.password = hash;
                    newAuth.save()
                        .then(auth => {
                            const reg_payload = {
                                id: auth._id,
                                name: auth.name,
                                role: auth.role
                            }

                             jwt.sign(
                                reg_payload,
                                process.env.secretOrKey,
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token,
                                        id: auth._id,
                                        role: auth.role
                                    });
                                },
                                {
                                    expiresIn: 31556926 // 1 year in seconds
                                },
                            );
                        })
                        .catch(err => console.log(err))
                        .then(console.log("auth added:", req.body.name));
                });
            });
        }
    });
});

// setting up route login
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const nid = req.body.nid;
    const password = req.body.password;
    // Find auth by email
    Auth.findOne({$or: [
        { email: req.body.email },
        { nid: req.body.nid }
    ]}).then(auth => {
        // Check if auth exists
        if (!auth) {
            return res.status(403).json({ emailnotfound: "Netid not found" });
        } else if (auth.banned) {
            return res.status(403).json({banned: "Banned user"});
        } else {
            // Check password
            bcrypt.compare(password, auth.password).then(isMatch => {
                if (isMatch) {
                    // Auth matched
                    // Create JWT Payload
                    const payload = {
                        id: auth.id,
                        name: auth.name,
                        role: auth.role
                    };
                
                    // Sign token
                    jwt.sign(
                        payload,
                        process.env.secretOrKey,
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token,
                                id: auth._id,
                                role: auth.role
                            });
                        },
                        {
                            expiresIn: 31556926 // 1 year in seconds
                        },
                    );
                } else {
                    return res
                        .status(403)
                        .json({ passwordincorrect: "Password incorrect" });
                }
            });
        }
    });
});

router.post("/changestatus", (req, res) => {
    var admin = false;
	var token = req.headers['authorization'];
	if (token) {
		token = token.slice(7, token.length);
	}
	jwt.verify(token, process.env.secretOrKey, (err, decoded) => {
		if (err) {
			admin = false;
		} else {
			admin = (decoded.role == "admin");
		}
        
        if (admin) {
            Auth.findOne({ _id: req.body.id }).then(auth => {
                auth.role = req.body.role;
                auth.banned = req.body.banned;
                auth.save()
                    .then(() => res.json('Auth updated!'))
                    .catch(err => res.status(500).json('Error: ' + err));
            });
        } else {
			res.status(401).json({unauthorized: '401 Unauthorized'});
        }
    });
});

router.post("/changepassword", (req, res) => {
    var admin = false;
	var token = req.headers['authorization'];
	if (token) {
		token = token.slice(7, token.length);
	}
	jwt.verify(token, process.env.secretOrKey, (err, decoded) => {
		if (err) {
			admin = false;
		} else {
			admin = (decoded.role == "admin");
        }
        
        if (admin) {
            //admin, don't verify password.
            Auth.findOne({ _id: req.body.id }).then(auth => {
                if (req.body.password.length >= 6 && req.body.password.length <= 30) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if (err) throw err;
                            auth.password = hash;
                            // Synchronous password generation 
                            auth.save()
                                .then(() => res.json('Password reset!'))
                                .catch(err => res.status(500).json('Error: ' + err));
                        })
                    })
                } else {
                    res.status(400).json('Error: Password must be at least 6 characters and no more than 30 characters');
                }
            });
        } else if (decoded.id == req.body.id) {
            //user, verify password.
            Auth.findOne({ _id: req.body.id }).then(auth => {
                bcrypt.compare(req.body.oldpassword, auth.password).then(isMatch => {
                    if (isMatch) {
                        if (req.body.password.length >= 6 && req.body.password.length <= 30) {
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(req.body.password, salt, (err, hash) => {
                                    if (err) throw err;
                                    auth.password = hash;
                                    // Synchronous password generation 
                                    auth.save()
                                        .then(() => res.json('Password changed!'))
                                        .catch(err => res.status(500).json('Error: ' + err));
                                })
                            })
                        } else {
                            res.status(400).json('Error: Password must be at least 6 characters and no more than 30 characters');
                        }
                    } else {
                        res.status(400).json('Error: Incorrect password');
                    }
                });
            });
        } else {
			res.status(401).json({unauthorized: '401 Unauthorized'});
        }
    });
});


// Create login credential for login for TESTING
router.post("/register-test", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Auth.findOne({
        $or: [
            { email: req.body.email },
            { nid: req.body.nid }
        ]
    }).then(auth => {
        if (auth) {
            return res.status(403).json({ email: "Email or Netid already exists" });
        } else {
            const newAuth = new Auth({
                name: req.body.name,
                nid: req.body.nid,
                email: req.body.email,
                password: req.body.password,
                role: "admin",
                banned: false
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newAuth.password, salt, (err, hash) => {
                    if (err) throw err;
                    newAuth.password = hash;
                    newAuth.save()
                        .then(auth => res.json(auth))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

module.exports = router;