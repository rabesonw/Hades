var table = "users";
var model = require(rootPath+"/db/models/model")(table);
var errorHandler = require(rootPath+"/middlewares/error");
var jwt = require("jsonwebtoken");
var crypt = require("bcrypt");
var mail = require("email-validator");
var auth = require(rootPath+"/middlewares/auth");
var pageBuild = require(rootPath+"/middlewares/page");
var pseudo = require("validator");
var secret = require(rootPath+"/config/config").secret;

var users = {};

    /**
     * gets pseudo, user's name, user's surname and verified status
     * of all users
     * 
     * select u.pseudo, u.userName, u.userSurname, u.verified
     * from users
     */
    users.getAllUsers = function (req, res, next) {
        let fields = ["pseudo", "userSurname", "userName","verified"];
        model.readAll(fields, {}, function (results) {
            var page = pageBuild("users");
            res.render(page, {
                title: "Users", 
                users: results
            });          
        });
    };

    users.checkParams = function(req, res, next) {
        let error = errorHandler();
        
        if (!req.body.pseudo || !req.body.userEmail || !req.body.userPwd) {
            error.addMessage("400", "Bad Request : missing field");
        }

        /* pseudo rules */
        if (req.body.pseudo && pseudo.contains(req.body.pseudo, " ")) {
            error.addMessage("407", "Invalid pseudo : cannot contain spaces");
        }

        /* password rules */
        if(req.body.userPwd && req.body.userPwd.length < 8) {
            error.addMessage("407", "Password too short : min 8 characters");
        }

        /* email check */
        if(req.body.userEmail && !mail.validate(req.body.userEmail)) {
            error.addMessage("407", "Invalid email");
        }        
        
        if (error.defined()) {
            error.sendErrors(res, 400);
        }
        next();
    };

    users.checkUser = function (req, res, next) {
        let error = errorHandler();
        auth.checkToken(req, res, function(data) {
            if (data.user.pseudo != req.idUser) {
                error.addMessage(403, "Forbidden");
                error.sendErrors(res, 403);
            } else {
                next();
            }
        })
    };
    
    /**
     * creates a new user 
     * minimum fields : pseudo, userEmail, userPwd
     * pseudo rules : 1 character minimum, no spaces, no "special characters (to define)"
     * password rules : 8 characters minimum, no spaces
     * email : checked by email-validator, unique
     */
    users.addUser = function (req, res) {
        var error = errorHandler();
        users.checkParams(req, res, function() {
            // creating the user
            crypt.hash(req.body.userPwd, 10, function(err, hash) {
                req.body.userPwd = hash;
                model.create(req.body, {},function(results, err) {
                    if(!err && results.affectedRows != 0) {
                        console.log("crypted pwd : "+req.body[0]);
                        const userTok = {
                            pseudo: req.body.pseudo
                        }
                        jwt.sign({userTok}, secret.SECRET, function(error, token) {
                            // res.json({user, token});
                            res.render("user", {
                                info: req.body,
                                status: true,
                                token: {userTok, token}
                            })
                        });
                        // var page = pageBuild("user");
                        // res.render(page, {
                        //     info: results[0],
                        //     status: "connected"
                        // });  
                    } else if (err.code == "ER_DUP_ENTRY") {
                        error.addMessage("400", "Nickname or email already used");
                        error.sendErrors(res, 400);
                    } else {
                        error.sendErrors(res, 409);
                    }
                });
            });

        });
    };

    users.getUser = function (req, res, next) {
        let error = errorHandler();
        let fields = ["*"];
        var clause = {"pseudo": req.idUser};
        model.read(fields, clause, function(results, err) {
            if(!err && results.length > 0) {
                var page = pageBuild("user");
                res.render(page, {
                    info: results[0]
                });
            } else {
                error.addMessage("404", "User not found");
                error.sendErrors(res, 404);
            }
        });
    };

    users.updateUser = function (req, res, next) {
        let error = errorHandler();
        users.checkParams(req, res, function() {
            crypt.hash(req.body.userPwd, 10, function(err, hash) {
                req.body.userPwd = hash;
                var clause = {"pseudo": req.idUser};
                model.update(req.body, clause, function(results, err) {
                    if(!err && results.affectedRows != 0) {
                        var page = pageBuild("user");
                        res.render(page, {
                            title: results[0]
                        });
                    } else {
                        error.addMessage("404", "User not found");
                        error.sendErrors(res, 404);
                    }
                });
            });
        });
    };

    users.deleteUser = function (req, res) {
        let error = errorHandler();
        users.checkUser(req, res, function() {
            var clause = {"pseudo": req.idUser};
            model.delete(clause, function(results, err) {
                if(!err && results.affectedRows != 0) {
                    var page = pageBuild("index");
                    res.render(page, {
                        title: "Hades",
                        status: "disconnected"
                    });
                } else {
                    error.addMessage("404", "User not found");
                    error.sendErrors(res, 404);
                }
            });
        });
    };

module.exports = users;