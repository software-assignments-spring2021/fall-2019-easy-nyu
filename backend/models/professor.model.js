  
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const professorSchema = new Schema({
    professorname: {type: String, required: true},
    description: {type: String, required: true},
	course_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    professor_id: mongoose.Schema.ObjectId
}, {
    timestamps: true,
});

const Professor = mongoose.model('Professor', professorSchema);
module.exports = Professor;