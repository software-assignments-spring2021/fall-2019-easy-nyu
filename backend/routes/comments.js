const router = require('express').Router();
const Comment = require('../models/comment.model');
const Course = require('../models/course.model');

// Post Request - Add a new course to database
router.route('/add').post((req, res) => {
    const user_comment = req.body.comment;
    const course_id = req.body.course_id;
    const newComment = new Comment({'comment' : user_comment, 'course_id' : course_id});
    
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
});

module.exports = router;
