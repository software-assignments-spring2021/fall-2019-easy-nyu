const router = require('express').Router();
let Professor = require('../models/professor.model');
const jwt = require("jsonwebtoken");

// create professor 
router.route('/add').post((req, res) => {
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
            const name = req.body.name;
            const school = req.body.school;
            const courses = req.body.courses;
            const comments = req.body.comments;
            const newProfessor = new Professor({
                name,
                school,
                courses,
                comments
            });

            newProfessor.save((err, prof) => {
                if (err) {
                    res.send(err);
                }
                else {
                    console.log("Professor added!", prof.name)
                    res.json({message: "Professor added!", prof: prof});
                }
            })
        } else {
			res.status(401).json({unauthorized: '401 Unauthorized'});
        }
    });
});

// Get All Professor
router.route('/all').get((req, res) => {
    Professor.find({})
    .populate('courses')
    .exec((err, data) => {
        if (err) {
            res.status(400).json('Error: ' + err)
        } else {
            res.json(data);
        }
    })
});

router.route('/').get((req, res) => {
    Professor.findOne({ _id: req.query.id })
    .populate({path:'courses'})
    .exec((err, data) => {
        if (err) {
            res.status(400).json('Error: ' + err)
        } else {
            console.log(data)
            res.json(data);
        }
    })
});

module.exports = router;
