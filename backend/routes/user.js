const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../models/auth.model");
const User = require("../models/user.model");

// get user profile by user credentials; if not, create new profile
// router.route('/:nid').get((req, res) => {
//     console.log(req.params.nid);
//     const nid = req.params.nid
//     const description = 'Affilated NYU'
//     const score = 0
//     User.findOne({ nid: nid }, (err, data) => {
//         if (err) {
//             res.send(err);
//         } else {
//             if (data === null) {
//                 //can't find user profile by nid
//                 const newUser = new User({
//                     nid,
//                     description,
//                     score
//                 });
    
//                 newUser.save((err, user) => {
//                     if (err) {
//                         res.send(err);
//                     }
//                     else {
//                         res.json({message: "User profile created!", user: user});
//                     }
//                 });    
//             } else {
//                 res.json({message: "User profile get!", data: data});
//             }
//         }
//     })
// });

router.route('/:nid').get((req, res) => {
    Auth.findById(req.params.nid)
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
});

// Update course by id
router.route('/update/:nid').post((req,res) => {
    Auth.findById(req.params.nid)
        .then(auth => {
            auth.name = req.body.name;
            auth.email = req.body.email;
            auth.semester = req.body.semester;

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err;
                    auth.password = hash;
                });
            });

            auth.save()
                .then(() => res.json('Auth updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;