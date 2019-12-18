var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var materialSchema = new Schema({
    filename: {type : String, required: true},
    data: {type: Buffer, required: true},
    course_id: { type : mongoose.Schema.Types.ObjectId, ref: 'Course' },
	user_id: { type : mongoose.Schema.Types.ObjectId, ref: 'Auth' },

}, {
    timestamps: true,
});

var Material = mongoose.model('Material', materialSchema);
module.exports = Material;