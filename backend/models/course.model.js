const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    coursename: {type: String, required: true},
    description: {type: String, required: true},
    semester: {type: String, required: true},
    prof: {type: String, required: true},
    ta: {type: String, required: false},
    date: {type: Date, required: true},
}, {
    timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);
model.exports = Course;