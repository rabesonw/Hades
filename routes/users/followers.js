var express = require("express");
var router = express.Router();
var follower = require(rootPath+"/controllers/followers");
var auth = require(rootPath+"/middlewares/auth");
// var users = require("./index");

/*
    idFollower for other resources
*/
const routeIdFollower = (req, res, next) => {
    req.idFollower = req.params.followerId;
    next();
}

/*
    Followers routing
    /followers
    display list of people who follow idUser
    follows back idFollower
*/
console.log("/idUser/followers : START");
router.route("/")
.get(routeIdFollower, auth.readToken, follower.getAllFollowers)
.put(routeIdFollower, auth.readToken, follower.addFollower);

/*
    /idFollower
    get idFollower's page
    follow idFollower back
*/
router.route("/:idFollower")
.get(routeIdFollower, follower.getFollower)
.put(routeIdFollower, auth.readToken, follower.addFollower);
console.log("/idUser/followers : OK");


module.exports = router;