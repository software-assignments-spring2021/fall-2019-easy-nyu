const router = require('express').Router();
const Comment = require('../models/comment.model');
const Course = require('../models/course.model');
const Prof = require('../models/professor.model');
const jwt = require("jsonwebtoken");

// Post Request - Add a new course to database
router.route('/add').post((req, res) => {
    const user_comment = req.body.comment;
    let course_id;
    let prof_id;
    let newComment;
	var user_rating = req.body.rating;
	var user_recommend = req.body.recommend;
	var authorized = false;
	
	var token = req.headers['authorization'];
	token = token.slice(7, token.length);
	var commenter;
	jwt.verify(token, process.env.secretOrKey, (err, decoded) => {
		if (err) {
			authorized = false;
		} else {
			authorized = true;
			commenter = decoded.id;
		}
	});
	
	if (authorized) {
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

		if (prof_id == null) {
			newComment = new Comment({'comment' : user_comment, 'course_id' : course_id, 'user_id' : commenter, 'rating': user_rating, 'recommend': user_recommend});
			newComment.save((err, data) => {
				if (err) {
					res.send(err);
				}
				else {
					Course.findById(course_id)
						.then(course => {
							course.comments.push(data._id);
							course.save()
								.catch(err => res.status(500).json('Error: ' + err));
						})
					.catch(err => res.status(500).json('Error: ' + err));
					res.json({message: "Comment added!", course_id: data.course_id});
				}
			})
		} else if (course_id == null) {
			newComment = new Comment({'comment' : user_comment, 'prof_id' : prof_id, 'user_id' : commenter, 'rating': user_rating, 'recommend': user_recommend});
			newComment.save((err, data) => {
				if (err) {
					res.send(err);
				}
				else {
					Prof.findById(prof_id)
						.then(prof => {
							prof.comments.push(data._id);
							prof.save()
								.catch(err => res.status(500).json('Error: ' + err));
						})
					.catch(err => res.status(500).json('Error: ' + err));
					res.json({message: "Comment added!", prof_id: data.prof_id});
				}
			})
		}   else {
				newComment = new Comment
				(
					{
					'comment' : user_comment, 
					'course_id' : course_id,
					'prof_id' : prof_id, 
					'rating': user_rating, 
					'reccomend': user_recommend
					}
				);
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
					res.json({message: "Comment added!", course_id: data.course_id, prof_id: data.prof_id});
				}
			})
		}
	} else {
		res.status(401).json({unauthorized: '401 Unauthorized'});
	}
});

router.route('/:id').get((req, res) => {
    Comment.findOne({ _id:req.params.id })
    .exec((err, data) => {
        if (err) {
            res.status(400).json('Error: ' + err)
        } else {
            res.json(data);
        }
    })
});

module.exports = router;
