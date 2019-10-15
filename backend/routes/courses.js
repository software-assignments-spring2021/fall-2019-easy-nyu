const router = require('express').Router();
let Course = require('../models/course.model');

router.route('/').get((req, res) => {
    Course.find()
        .then(courses => res.json(courses))
        .catch(err => res.status(400).json('Error: ' + err));
});

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

module.exports = router;
