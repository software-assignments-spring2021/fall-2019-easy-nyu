const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Auth = require("../models/auth.model");
const Comments = require("../models/comment.model");
const jwt = require("jsonwebtoken");

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

router.route('/comments/:nid').get((req, res) => {
	var authorized = false;
	var admin = false;
	var requesterNid;
	var token = req.headers['authorization'];
	if (token) {
		token = token.slice(7, token.length);
	}
	jwt.verify(token, process.env.secretOrKey, (err, decoded) => {
		if (err) {
			authorized = false;
		} else {
			authorized = true;
			requesterNid = decoded.id;
			admin = (decoded.role == "admin")
        }

        var query;

        if (requesterNid == req.params.nid || admin) {
            query = {user_id: req.params.nid};
        } else {
            query = {user_id: req.params.nid, anonymous: false};
        }

        Comments.find(query).populate("prof_id").populate("course_id").sort({createdAt: 1}).exec((err, data) => {                
            if (err) {
                res.status(500).json('Error: ' + err)
            } else {
                res.json(data);
            }
        });
    });
});

module.exports = router;
