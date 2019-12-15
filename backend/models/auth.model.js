const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    nid: { type: String, required: true },
    role: String,
    banned: Boolean
}, {
    timestamps: true,
});

const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;
