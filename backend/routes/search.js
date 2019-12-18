const express = require("express");
const router = express.Router();
let Professor = require('../models/professor.model');
let Course = require('../models/course.model')

// Find user by net id
router.route('/dynamic/:query').get(async (req, res) => {
    console.log('searching for: ', req.params.query)
    console.log(req.params.query)
    const courseRes = await Course.find({
        $or: [{name: {
            $regex: req.params.query,
            $options: 'i'
        }},
        {topic: {
            $regex: req.params.query,
            $options: 'i'}}]
    }).select({ "name": 1, "_id": 1, "topic" : 1}).limit(10);
    const profRes = await Professor.find({
        name: {
            $regex: req.params.query,
            $options: 'i'
        }
    }).select({ "name": 1, "_id": 1}).limit(10);
    resArr = []
    console.log("course:" , courseRes)
    for (course of courseRes) {
        resArr.push(course)
    }
    for (prof of profRes) {
        resArr.push({
            name : prof.name,
            _id : prof._id,
            type : 'prof'
        })
    }
    console.log(resArr)
    res.json({ result: resArr})
});

router.route('/schools').get((req, res)=> {
    Course.find().distinct('school', (err, data) =>{
        if (err) {
            res.status(404).json("Can't get school")
        } else {
            res.json({ schools : data})
        }
    })
})

router.route('/schools/:query').get((req, res)=> {
    console.log(req.params.query)
    Course.find({school : req.params.query}).distinct('major', (err, data) =>{
        if (err) {
            res.status(404).json("Can't get major")
        } else {
            console.log("sending majors:", data)
            res.json({ major : data})
        }
    })
})

module.exports = router;