const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nid: { type: String, required: true },
    description: { type: String, required: true },
    score: { type: Number, required: true}
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
