var express = require("express");
var router = express.Router();
var following = require("../controllers/following");
var auth = require("../middlewares/auth");
var users = require("./index");

/*
    idFollowing for other resources
*/
const routeIdFollowed = (req, res, next) => {
    req.idFollowing = req.params.followedId;
    next();
}

/*
    Following routing
    /following
    display list of people followed by idUser
    unfollows 
*/
console.log("root/following : START");
router.route("/")
.get(auth.readToken, following.getAllFollowing)
.put(routeIdFollowed, auth.readToken, following.addFollowing);

/*
    /idFollower
    get idFollower's page
    follow idFollower back
*/
router.route("/:idFollowed")
.get(routeIdFollowed, following.getFollowing)
.put(routeIdFollowed, auth.readToken, following.addFollowing);
console.log("root/following : OK");

module.exports = router;