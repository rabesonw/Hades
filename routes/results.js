var express = require("express");
var router = express.Router();

/*
    /results
    display search results from the homepage
*/
router.route("/")
.get(function (req, res) {
    res.send(`GET /results`)
});

module.exports = router;