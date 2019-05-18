var table = "follow";
var model = require("../db/models/model")(table);
var auth = require("../middlewares/auth");
var pageName = require(rootPath+"/middlewares/auth");

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
        model.readAll(fields, clause, function (results, err) {
            if(!err && results.length > 0) {
                var page = pageName("following");
                res.render(page, {
                    title: "Following",
                    following: results
                });
            } else {
                err.addMessage("404", "User not found");
                err.sendErrors(res, 404);
            }
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
        model.create(req.body, function(results, err) {
            if(!err && results.affectedRows > 0) {
                var page = pageName("following");
                res.render(page, {
                    title: "Following"
                });
            } else {
                err.addMessage("404", "User not found");
                err.sendErrors(res, 404);
            }
        });
    }

    /**
     * gets info of followed
     * 
     * select * from users u where u.pseudo = followedId
     */
    following.getFollowing = function (req, res) {
        let fields = ["*"];
        let clause = {"followedId": req.idFollowed};
        model.read(fields, clause, function (results, err) {
            if(!err && results.length > 0) {
                var page = pageName("user");
                res.render(page, {
                    title: results[0],
                    info: results
                });
            } else {
                err.addMessage("404", "User not found");
                err.sendErrors(res, 404);
            }
        });
    }

    following.deleteFollowing = function (req, res) {
        let clause = {"followedId": req.idFollower};
        model.delete(clause, function(results, err) {
            if(!err && results.affectedRows > 0) {
                var page = pageName("following");
                res.render(page, {
                    title: "Following",
                    following: results
                });
            } else {
                err.addMessage("404", "User not found");
                err.sendErrors(res, 404);
            }
        });
    }

module.exports = following;