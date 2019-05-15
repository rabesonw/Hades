var express = require("express");
var router = express.Router();

/*
    Following routing
    /following
    display list of people followed by idUser
    unfollows 
*/
router.route("/")
.get(function (req, res) {
    res.send(`GET /${req.idUser}/following`)
})
.delete(function (req, res) {
    res.send(`DELETE /${req.idUser}/following/${req.params.idFollowed}`)
})

/*
    /idUser/following
*/
router.route("/:idUser")
.get(function (req, res) {
    res.send(`GET /${req.params.idUser}/following`)
})
.put(function (req, res) {
    res.send(`PUT /${req.params.idUser}/following/${req.params.idFollowed}`)
});

/*
    /following/idFollowed
    display page of the person followed by idUser
    unfollows
*/
router.route("/:idFollowed")
.get(function (req, res) {
    res.send(`GET /${req.params.idFollowed}`)
})
.delete(function (req, res) {
    res.send(`DELETE /${req.params.idUser}/following/${req.params.idFollowed}`)
});

module.exports = router;