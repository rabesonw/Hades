var express = require("express");
var router = express.Router();

/*
    Followers routing
    /followers
    display list of people who follow idUser
    follows back (should be /users/${req.params.idUser}/following/${idFollower} ???)
*/
router.route("/")
.get(function (req, res) {
    res.send(`GET /${req.idUser}/followers`)
})
.put(function (req, res) {
    res.send(`PUT /${req.idUser}/following/${req.params.idFollower}`)
});

/*
    /idUser/followers
*/
router.route("/:idUser")
.get(function (req, res) {
    res.send(`GET /${req.params.idUser}/followers`)
})
.put(function (req, res) {
    res.send(`PUT /${req.params.idUser}/following/${req.params.idFollower}`)
});

router.route("/:idFollower")
.get(function (req, res, next) {
    res.send(`GET /${req.params.idFollower}`)
})
.put(function (req, res) {
    res.send(`PUT /${req.idUser}/following/${req.params.idFollower}`)
});

module.exports = router;