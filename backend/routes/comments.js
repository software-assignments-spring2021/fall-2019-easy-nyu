const router = require('express').Router();
const Comment = require('../models/comment.model');
const Course = require('../models/course.model');
const Prof = require('../models/professor.model');

// Post Request - Add a new course to database
router.route('/add').post((req, res) => {
    const user_comment = req.body.comment;
    let course_id;
    let prof_id;
    let newComment;

    try {
        course_id = req.body.course_id;
    } catch (err) {
        course_id = null;
    }
    try {
        prof_id = req.body.prof_id;
    }
    catch (err) {
        prof_id = null;
    }
    if (!prof_id) {
        newComment = new Comment({'comment' : user_comment, 'course_id' : course_id});
        newComment.save((err, data) => {
            if (err) {
                res.send(err);
            }
            else {
                Course.findById(course_id)
                    .then(course => {
                        course.comments.push(data._id);
                        course.save()
                            .catch(err => res.status(400).json('Error: ' + err));
                    })
                .catch(err => res.status(400).json('Error: ' + err));
                res.json({message: "Comment added!", course_id: data.course_id});
            }
        })
    } else if (!course_id) {
        newComment = new Comment({'comment' : user_comment, 'prof_id' : prof_id});
        newComment.save((err, data) => {
            if (err) {
                res.send(err);
            }
            else {
                Prof.findById(prof_id)
                    .then(prof => {
                        prof.comments.push(data._id);
                        prof.save()
                            .catch(err => res.status(400).json('Error: ' + err));
                    })
                .catch(err => res.status(400).json('Error: ' + err));
                res.json({message: "Comment added!", prof_id: data.prof_id});
            }
        })
    }
});

module.exports = router;
