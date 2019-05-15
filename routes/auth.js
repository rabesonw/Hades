var express = require("express");
var router = express.Router();

/*
    /auth
    log in
    log out
*/
router.route("/")
.post(function (req, res, next) {
    res.send('POST /auth')
})
.delete(function (req, res) {
    res.send('DELETE /auth')
});

module.exports = router;