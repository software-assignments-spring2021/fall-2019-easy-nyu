const router = require('express').Router();
let User = require('../models/exercise.model');

router.route('/').get((req, res) => {
    User.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const coursename = req.body.coursename;
    const description = req.body.description;
    const semester = req.body.semester;
    const prof = req.body.prof;
    const ta = req.body.ta;
    const date = Date.parse(req.body.date);
    const newUser = new User({
        coursename,
        description,
        semester,
        prof,
        ta,
        date,
    });
    newUser.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

model.exports = router;
