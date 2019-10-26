const router = require('express').Router();
let Course = require('../models/course.model');
const Professor = require('../models/professor.model');

function num_of_comments (course) {
    return course.comments.length;
}

function sort_courses_on_comments (course_array) {
    return course_array.sort(function(a, b){return num_of_comments(b) - num_of_comments(a)});
}

// Get Request
router.route('/').get((req, res) => {
    Course.find({}, (err, data) => {
        if (err) {
            res.status(400).json('Error: ' + err)
        } else {
            //res.json(data);
            //console.log(sort_courses_on_comments(data));
            res.json(sort_courses_on_comments(data));
        }
    })
});

// Post Request - Add a new course to database
router.route('/add').post((req, res) => {
    const coursename = req.body.coursename;
    const description = req.body.description;
    const semester = req.body.semester;
    const profId = req.body.prof; //should be an prf_id
    const ta = req.body.ta;

    if (!coursename || !description || !semester || !prof || !ta) {
        return res.status(400).send('ERROR: Invalid Input');
    }

    const newCourse = new Course({
        coursename,
        description,
        semester,
        profId: prof,
        ta
    });

    newCourse.save((err, course) => {
        if (err) {
            res.send(err);
        }
        else {
            // add course to professor
            // 1. look up the professor by id
            Professor.findById(profId, (err2, professor) => {
                if (err2){
                    res.send(err2);
                }
                else{
                    // 2. edit professor
                    professor.course_id.push(course.course_id);
                    // 3. save professor
                    professor.save((err3, professor) => {
                        if (err3) {
                            res.send(err3);
                        }
                        else{
                            res.json({message: "Course added!", course: course});
                        }
                    })
                }
            });
        }
    })

});
/*
// Get course by id
router.route('/:id').get((req,res) => {
    Course.findById(req.params.id)
        .then(course => res.json(course))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete course by id
router.route('/:id').delete((req,res) => {
    Course.findByIdAndDelete(req.params.id)
        .then(() => res.json('Course deleted.'))
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
*/
module.exports = router;
