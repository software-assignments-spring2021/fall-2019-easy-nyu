const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nid: { type: String, required: true },
    description: { type: String, required: true },
    score: { type: Number, required: true},
    starprof: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Professor' }],
    starcourse: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
