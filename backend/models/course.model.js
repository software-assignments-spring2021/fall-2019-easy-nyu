const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    coursename: {type: String, required: true},
    description: {type: String, required: true},
    semester: {type: String, required: true},
    prof: {type: String, required: true},
    ta: {type: String, required: false},
    comments: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    course_id: mongoose.Schema.ObjectId
}, {
    timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;