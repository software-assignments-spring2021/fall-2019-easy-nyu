const express = require("express");
const router = express.Router();
let Professor = require('../models/professor.model');

// Find user by net id
router.route('/:query').get((req, res) => {
    console.log(req.params.query)
    res.send([])
});

module.exports = router;