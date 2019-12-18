const router = require('express').Router();
const Material = require('../models/material.model');
const Course = require('../models/course.model');
const Prof = require('../models/professor.model');
const Auth = require('../models/auth.model');
const jwt = require("jsonwebtoken");

router.route('/:id').get((req, res) => {
    Material.findOne({ _id:req.params.id }, "_id filename course_id user_id createdAt")
    .exec((err, data) => {
        if (err) {
            res.status(400).json('Error: ' + err)
        } else {
            res.json(data);
        }
    })
});

router.route('/:id/download').get((req, res) => {
    Material.findOne({ _id:req.params.id })
    .exec((err, data) => {
        if (err) {
            res.status(400).json('Error: ' + err)
        } else {
            res.set('Content-Type', 'application/octet-stream');
            res.set('Content-Disposition', 'attachment; filename="' + data.filename + '"');
            res.send(data.data);
        }
    })
});

router.route('/:id').put((req, res) => {
    var user_filename = req.body.filename;
	var user_data = req.body.data;
	var authorized = false;
	var admin = false;
	var requesterNid;
	var token = req.headers['authorization'];
	if (token) {
		token = token.slice(7, token.length);
	}
	jwt.verify(token, process.env.secretOrKey, (err, decoded) => {
		if (err) {
			authorized = false;
		} else {
			authorized = true;
			requesterNid = decoded.id;
			admin = (decoded.role == "admin");
		}
		
		if (authorized) {
			Material.findOne({ _id:req.params.id })
				.exec((err, data) => {
				if (err) {
					res.status(500).json('Error: ' + err)
				} else {
					var commenter;
					Auth.findOne({ _id:data.user_id }).exec((err, data2) => {
						if (err) {
							commenter = null;
						} else {
							commenter = data2;
						}
						if (commenter == null) {
							res.status(500).json('Error: Cannot find associated uploader')
						} else if (commenter._id == requesterNid || admin) {
							 Material.findByIdAndUpdate(req.params.id, {'filename' : user_filename, 'data': user_data})
								.then((comment) => {
									res.json({message: "Material updated!"});
								})
								.catch(err => res.status(500).json('Error: ' + err));
						} else {
							res.status(401).json({unauthorized: '401 Unauthorized'});
						}
					});

				}
			});
		} else {
			res.status(401).json({unauthorized: '401 Unauthorized'});
		}
	});
});


router.route('/add').post((req, res) => {
    var course_id = req.body.course_id;
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
        var newMaterial = new Material({'filename': req.body.filename, 'data': req.body.data, 'course_id': req.body.course_id, 'user_id': commenter});
        newMaterial.save((err, data) => {
			if (err) {
				res.send(err);
			} else {
                Course.findById(course_id)
                    .then(course => {
                        course.materials.push(data._id);
                        course.save()
                            .catch(err => res.status(500).json('Error: ' + err));
                    })
                .catch(err => res.status(500).json('Error: ' + err));
                res.json({message: "Material uploaded!", course_id: data.course_id});
            }
        });
    } else {

    }
});

router.route('/:id').delete((req, res) => {
	var authorized = false;
	var admin = false;
	var requesterNid;
	var token = req.headers['authorization'];
	if (token) {
		token = token.slice(7, token.length);
	}
	jwt.verify(token, process.env.secretOrKey, (err, decoded) => {
		if (err) {
			authorized = false;
		} else {
			authorized = true;
			requesterNid = decoded.id;
			admin = (decoded.role == "admin")
		}
		
		if (authorized) {
			Material.findOne({ _id:req.params.id })
				.exec((err, data) => {
				if (err) {
					res.status(500).json('Error: ' + err)
				} else {
					var commenter;
					Auth.findOne({ _id:data.user_id }).exec((err, data2) => {
						if (err) {
							commenter = null;
						} else {
							commenter = data2;
						}
						if (commenter == null) {
							res.status(500).json('Error: Cannot find associated commenter')
						} else if (commenter._id == requesterNid || admin) {
							Material.findByIdAndDelete(req.params.id)
								.then(() => {
									if (data.course_id) {
										Course.findById(data.course_id).then(course => {
											course.materials = course.materials.filter(el => el != req.params.id);
											course.save()
												.catch(err => res.status(500).json('Error: ' + err));
										})
									.catch(err => res.status(500).json('Error: ' + err));
									}
									res.json('Material deleted.');
								})
								.catch(err => res.status(500).json('Error: ' + err));
						} else {
							res.status(401).json({unauthorized: '401 Unauthorized'});
						}
					});

				}
			});
		} else {
			res.status(401).json({unauthorized: '401 Unauthorized'});
		}
	});
});

module.exports = router;
