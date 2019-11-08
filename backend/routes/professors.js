const router = require('express').Router();
let Professor = require('../models/professor.model');

<<<<<<< HEAD
// create course 
=======
// create professor 
>>>>>>> 4c26d457c8228c40edd3c1605dccf2898dfbab73
router.route('/add').post((req, res) => {
    const professorname = req.body.professorname;
    const description = req.body.description;
    const course_id = req.body.course_id;
    const comments = req.body.comments;
    const newProfessor = new Professor({
        professorname,
        description,
        course_id,
        comments
    });

    newProfessor.save((err, prof) => {
        if (err) {
            res.send(err);
        }
        else {
            console.log("Professor added!", prof.professorname)
            res.json({message: "Professor added!", prof: prof});
        }
    })
});

// Get All Professor
router.route('/all').get((req, res) => {
    Professor.find({}, (err, data) => {
        if (err) {
            res.status(400).json('Error: ' + err)
        } else {
<<<<<<< HEAD
            //res.json(data);
            //console.log(sort_professors_on_comments(data));
=======
>>>>>>> 4c26d457c8228c40edd3c1605dccf2898dfbab73
            res.json(data);
        }
    })
});

// Get Prof info by Professor id
<<<<<<< HEAD
router.route('/:id').get((req, res) => {
    Professor.find({ professor_id: req.body.professor_id }, (err, data) => {
        if (err) {
            res.status(400).json('Error: ' + err)
        } else {
            //res.json(data);
            //console.log(sort_professors_on_comments(data));
=======
router.route('/id').get((req, res) => {
    Professor.findOne({ _id: req.query.professor_id }, (err, data) => {
        if (err) {
            res.status(400).json('Error: ' + err)
        } else {
>>>>>>> 4c26d457c8228c40edd3c1605dccf2898dfbab73
            res.json(data);
        }
    })
});

module.exports = router;
