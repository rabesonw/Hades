var table = "users";
var model = require("../db/models/model")(table);
var error = require("../middlewares/error");
var crypt = require("bcrypt");
var mail = require("email-validator");
var auth = require("../middlewares/auth");

exports.users = {

    /**
     * gets pseudo, user's name, user's surname and verified status
     * of all users
     * 
     * select u.pseudo, u.userName, u.userSurname, u.verified
     * from users
     */
    getAllUsers = function (req, res) {
        let fields = ["pseudo", "userSurname", "userName","verified"];
        model.readAll(fields, {}, function (results) {
            res.json(results);
        });
    }

    .checkParams = function(req, res, next) {
        if (!req.body.idUser || !req.body.userEmail || !req.body.userPwd) {
            error.addMessage("400", "Bad Request : missing field");
        }

        /* pseudo rules */
        if (req.body.idUser && req.body.idUser.indexOf(" ") !== -1) {
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
    }

    .checkUser = function (req, res, next) {
        //TODO verify the token
        //error 403 if not the right user
        //else next
    }
    
    /**
     * creates a new user 
     * minimum fields : pseudo, userEmail, userPwd
     * pseudo rules : 1 character minimum, no spaces, no "special characters (to define)"
     * password rules : 8 characters minimum, no spaces
     * email : checked by email-validator, unique
     */
    .addUser = function (req, res) {
        checkParams(req, res, function() {
            // creating the user
            crypt.hash(req.body.userPwd, 10, function(err, hash) {
                req.body.userPwd = hash;
                model.create(req.body), function(results, err) {
                    if(!err && results.affectedRows != 0) {
                        res.status(201).json({"pseudo": req.body.idUser});
                    }
                };
            });
        })
    }

    .getUser = function (req, res) {
        let fields = ["pseudo"];
        var clause = {"pseudo": req.idUser};
        model.read(fields, clause, function(results, err) {
            if(!err && results.length > 0) {
                res.json(results[0]);
            } else {
                err.addMessage("404", "User not found");
                err.sendErrors(res, 404);
            }
        });
    }

    .updateUser = function (req, res) {
        
        checkParams(req, res, function() {
            crypt.hash(req.body.userPwd, 10, function(err, hash) {
                req.body.userPwd = hash;
                var clause = {"pseudo": req.idUser};
                model.update(req.body, clause, function(results, err) {
                    if(!err && results.affectedRows != 0) {
                        res.status(204);
                    }
                });
            });
        })

    }

    .deleteUser = function (req, res) {
        var clause = {"pseudo": req.idUser};
        model.delete(clause);
    }
};
