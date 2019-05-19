var table = "follow";
var model = require(rootPath+"/db/models/model")(table);
var auth = require(rootPath+"/middlewares/auth");
var pageName = require(rootPath+"/middlewares/auth");

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
        model.readAll(fields, clause, function (results, err) {
            if(!err && results.length > 0) {
                var page = pageName("followers");
                res.render(page, {
                    title: "Followers",
                    followers: results
                });
            } else {
                err.addMessage("404", "User not found");
                err.sendErrors(res, 404);
            }
        });
    };

    /**
     * inserts new row in table follow
     * 
     * action : user follows a follower back
     * 
     * insert into follow (followedId, followerId) 
     * values (req.idFollower, req.idUser)
     */
    followers.addFollower = function (req, res) {
        model.create(req.body, function(results, err) {
            if(!err && results.affectedRows > 0) {
                var page = pageName("followers");
                res.render(page, {
                    title: "Followers"
                });
            } else {
                err.addMessage("404", "User not found");
                err.sendErrors(res, 404);
            }
        });
    };

    /**
     * gets id of follower
     * 
     * select followerId from users u where u.pseudo = followerId
     */
    followers.getFollower = function (req, res) {
        let fields = ["*"];
        let clause = {"followerId": req.idFollower};
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
    };

    followers.deleteFollower = function (req, res) {
        let clause = {"followerId": req.idFollower};
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
    };

module.exports = followers;