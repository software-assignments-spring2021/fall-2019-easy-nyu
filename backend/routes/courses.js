const router = require('express').Router();
let Course = require('../models/course.model');
const jwt = require("jsonwebtoken");

function num_of_comments (course) {
    return course.comments.length;
}

function sort_courses_on_comments (course_array) {
    return course_array.sort(function(a, b){return num_of_comments(b) - num_of_comments(a)});
}

router.route('/searchby').post((req, res) => {
    console.log(req.body)
    Course.find({school : req.body.sel_school, major : req.body.sel_major}, (err, data) => {
        if (err) {
            res.status(400).json('Error: ' + err)
        } else {
            res.send(data)
        }
    })
})

// Get Request
router.route('/all').get((req, res) => {
    Course.find()
    .populate('prof')
    .exec((err, data) => {
        if (err) {
            res.status(400).json('Error: ' + err)
        } else {
            const courses = sort_courses_on_comments(data)
            res.json(courses);
        }
    })
});

// Post Request - Add a new course to database
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
            const major = req.body.major;
            const school = req.body.school;
            const level = req.body.level;
            const number = req.body.number;
            const unit = req.body.unit;
            const description = req.body.description;
            const requirement = req.body.requirement;
            const note = req.body.note;
            const profs = req.body.profs;
            const comments = req.body.comments;
            const newCourse = new Course({
                name,
                major,
                school,
                level,
                number,
                unit,
                description,
                requirement,
                note,
                profs,
                comments
            });

            newCourse.save((err, course) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json({message: "Course added!", course: course});
                }
            })
        } else {
			res.status(401).json({unauthorized: '401 Unauthorized'});
        }
    });
});

router.route('/').get((req, res) => {
    Course.findOne({ _id:req.query.id })
    .populate({path:'profs', select:"name"})
    .exec((err, data) => {
        if (err) {
            res.status(400).json('Error: ' + err)
        } else {
            res.json(data);
        }
    })
});

// // Delete course by id
// router.route('/:id').delete((req,res) => {
//     Course.findByIdAndDelete(req.params.id)
//         .then(() => res.json('Course deleted.'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// // Update course by id
// router.route('/update/:id').post((req,res) => {
//     Course.findById(req.params.id)
//         .then(course => {
//             course.coursename = req.body.coursename;
//             course.description = req.body.description;
//             course.semester = req.body.semester;
//             course.prof = req.body.prof;
//             course.ta = req.body.ta;

//             course.save()
//                 .then(() => res.json('Course updated!'))
//                 .catch(err => res.status(400).json('Error: ' + err));
//         })
//         .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;
