const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Auth = require("../models/auth.model");

// Find user by net id
router.route('/:nid').get((req, res) => {
    Auth.findById(req.params.nid, "_id name nid email role banned")
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
                auth.save()
                    .then(() => res.json('Auth updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;