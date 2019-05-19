var express = require("express");
var router = express.Router();
var follower = require(rootPath+"/controllers/followers");
var auth = require(rootPath+"/middlewares/auth");

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
console.log("root/followers : START");
router.route("/")
.get(auth.readToken, follower.getAllFollowers)
.put(routeIdFollower, auth.readToken, follower.addFollower);

/*
    /idFollower
    get idFollower's page
    follow idFollower back
*/
router.route("/:idFollower")
.get(routeIdFollower, follower.getFollower)
.put(routeIdFollower, auth.readToken, follower.addFollower);
console.log("root/followers : OK");
module.exports = router;