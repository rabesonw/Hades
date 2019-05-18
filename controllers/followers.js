var table = "follow";
var model = require("../db/models/model")(table);
var auth = require("../middlewares/auth");

var followers = {};
    /*
        gets the pseudo, user's name, and user's surname
        of a all users who follow idUser

        select f.followerId, u.userName, u.userSurname
        from follow f, users u
        where f.followedId = u.pseudo
    */
    followers.getAllFollowers = function (req, res) {
        let table = ["follow", "users"];
        let model = require("../db/models/model")(table);
        let fields = ["followerId", "userSurname", "userName"];
        let clause = {"followedId": req.idUser};
        model.readAll(fields, clause, function (results) {
            res.json(results);
        });
    }

    /**
     * inserts new row in table follow
     * 
     * action : user follows a follower back
     * 
     * insert into follow (followedId, followerId) 
     * values (req.idFollower, req.idUser)
     */
    followers.addFollower = function (req, res) {
        model.create(req.body);
    }

    /**
     * gets id of follower
     * 
     * select followerId from users u where u.pseudo = followerId
     */
    followers.getFollower = function (req, res) {
        let fields = ["followerId"];
        let clause = {"followerId": req.idFollower};
        model.read(fields, clause, function (results) {
            res.json(results);
        });
    }

    followers.deleteFollower = function (req, res) {
        let clause = {"followerId": req.idFollower};
        model.delete(clause);
    }

module.exports = followers;