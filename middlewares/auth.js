var table = "users";
var model = require("../db/models/model")(table);
var crypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var errorHandler = require("../middlewares/error");

var auth = {};

auth.login = function(req, res, next) {
    var pseudo = req.body.idUser;
    var pwd = req.body.userPwd;

    /**
     * query parts :
     * select pseudo, email, pwd
     * from users u
     * where u.pseudo = pseudo
     */
    var columns = ["pseudo", "userEmail", "userPwd"];
    var clause = {"pseudo": pseudo};

    model.read(columns, clause, function (results, error) {
        if (!error && results.length > 0) {
            // password is correct
            crypt.compare(pwd, results[0].userPwd, function(error, resCrypt) {
                if (resCrypt) {
                    // token TODO SECRET
                    jwt.sign({pseudo: results[0].pseudo}, secret, function(error, token) {
                        res.json({token});
                    });
                } else {
                    errorHandler.addMessage("407", "Invalid Password");
                    errorHandler.sendError(res, 403);
                }
            })
        } else {
            errorHandler.addMessage("406", "Invalid Pseudo");
            errorHandler.sendError(res, 403);
        }
    })
};