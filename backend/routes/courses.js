const router = require('express').Router();
let Course = require('../models/course.model');

// Get Request
router.route('/').get((req, res) => {
    Course.find()
        .then(courses => res.json(courses))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Post Request - Add a new course to database
router.route('/add').post((req, res) => {
    const coursename = req.body.coursename;
    const description = req.body.description;
    const semester = req.body.semester;
    const prof = req.body.prof;
    const ta = req.body.ta;
    const newCourse = new Course({
        coursename,
        description,
        semester,
        prof,
        ta
    });
    newCourse.save()
        .then(() => res.json('Course added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get course by id
router.route('/:id').get((req,res) => {
    Course.findById(req.params.id)
        .then(course => res.json(course))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete course by id
router.route('/:id').delete((req,res) => {
    Course.findByIdAndDelete(req.params.id)
        .then(course => res.json('Course deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update course by id
router.route('/update/:id').post((req,res) => {
    Course.findById(req.params.id)
        .then(course => {
            course.coursename = req.body.coursename;
            course.description = req.body.description;
            course.semester = req.body.semester;
            course.prof = req.body.prof;
            course.ta = req.body.ta;

            course.save()
                .then(() => res.json('Course updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
