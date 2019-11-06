const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true,
        unique: false,
        trim: true, // trim whitespace
        minlength: 15
    },
    course_id: { type : mongoose.Schema.Types.ObjectId, ref: 'Course' },
    prof_id: { type : mongoose.Schema.Types.ObjectId, ref: 'Professor' },
    comment_id: mongoose.Schema.ObjectId
}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;