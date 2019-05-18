dotenv.config();

var table = "users";
var model = require("../db/models/model");
var crypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var errorHandler = require("../middlewares/error");

var auth = {};

auth.readToken = function(req, res, next) {
    const header = req.headers["authorization"];

    if(typeof header !== "undefined") {
        const head = header.split(" ");
        const token = head[1];
        req.token = token;
        next();
    } else {
        errorHandler.addMessage("403", "Forbidden - Header Authorization was not defined");
        errorHandler.sendErrors(res, 403);
    }
};

auth.checkToken = function(req, res, next) {
    if(!req.token) {
        console.log("Notok");
    } else {
        jwt.verify(req.token, process.env.SECRET, function(err, data) {
            if(err) {
                errorHandler.addMessage("403", "Forbidden - Invalid token");
            } else {
                next(data);
            }
        })
    }
};

auth.validateToken = function(req, res, next) {
    auth.readToken(req, res, function() {
        auth.checkToken(req, res, function(data) {
            req.dataToken = data;
            next();
        })
    })
}

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

    model(table).read(columns, clause, function (results, error) {
        if (!error && results.length > 0) {
            // password is correct
            crypt.compare(pwd, results[0].userPwd, function(error, resCrypt) {
                if (resCrypt) {
                    jwt.sign({pseudo: results[0].pseudo}, process.env.SECRET, function(error, token) {
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

auth.logout = function(req, res, next) {
    next();
}

module.exports = auth;