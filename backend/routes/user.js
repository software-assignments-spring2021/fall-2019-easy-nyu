const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Auth = require("../models/auth.model");

// Find user by net id
router.route('/:nid').get((req, res) => {
    Auth.findById(req.params.nid, "_id name nid email")
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
});

// Update user profile by id
router.route('/update').post((req,res) => {
    Auth.findOne({
        $or: [
            { email: req.body.email },
            { nid: req.body.nid }
        ]
    })
    .then(auth => {
        auth.name = req.body.name;
        auth.nid = req.body.nid
        auth.email = req.body.email;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err;
                auth.password = hash;
                // Synchronous password generation 
                auth.save()
                    .then(() => res.json('Auth updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
        })
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;