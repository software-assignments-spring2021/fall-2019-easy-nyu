const router = require('express').Router();
let Professor = require('../models/professor.model');

// create professor 
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
    .populate({path:'courses', select:"name"})
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
