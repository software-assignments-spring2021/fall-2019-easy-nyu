const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nid: { type: String, required: true },
    name: { type: String, required: true },
    class: { type: String, required: false},
    college: { type: String, required: false},
    major: { type: String, required:false},
    description: { type: String, required: true },
    score: { type: Number, required: true}
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
