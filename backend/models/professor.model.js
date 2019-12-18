  
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const professorSchema = new Schema({
    name: {type: String, required: true},
    school: {type: String},
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    comments: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, {
    timestamps: true,
});

const Professor = mongoose.model('Professor', professorSchema);
module.exports = Professor;