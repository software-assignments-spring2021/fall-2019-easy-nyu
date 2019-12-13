const express = require("express");
const router = express.Router();
let Professor = require('../models/professor.model');
let Course = require('../models/course.model')

// Find user by net id
router.route('/:query').get(async (req, res) => {
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

module.exports = router;