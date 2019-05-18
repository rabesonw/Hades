var table = "follow";
var model = require("../db/models/model")(table);
var auth = require("../middlewares/auth");

var following = {};
    /*
        gets pseudo, user's name and user's surname
        of all users who are followed by idUser

        select f.followedId, u.userName, u.userSurname
        from follow f, users u
        where f.followerId = u.pseudo
    */
    following.getAllFollowing = function (req, res) {
        let table = ["follow", "users"];
        let model = require("../db/models/model")(table);
        let fields = ["followedId", "userSurname", "userName"];
        let clause = {"followerId": "pseudo"};
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
     * values (followerId, idUser)
     */
    following.addFollowing = function (req, res) {
        model.create(req.body);
    }

    /**
     * gets id of followed
     * 
     * select followedId from users u where u.pseudo = followedId
     */
    following.getFollowing = function (req, res) {
        let fields = ["followedId"];
        let clause = {"followedId": req.idFollower};
        model.read(fields, clause, function (results) {
            res.json(results);
        });
    }

    following.deleteFollowing = function (req, res) {
        let clause = {"followedId": req.idFollower};
        model.delete(clause);
    }

module.exports = following;