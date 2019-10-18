const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.nid = !isEmpty(data.nid) ? data.nid : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    // Email/Nid checks
    if (Validator.isEmpty(data.email) && Validator.isEmpty(data.nid)) {
        errors.email = "Email or NYU Netid is required";
    } else if (!Validator.isEmail(data.email) && Validator.isEmpty(data.nid)) {
        errors.email = "Email is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};