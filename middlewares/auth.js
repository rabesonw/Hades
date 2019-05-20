var table = "users";
var model = require(rootPath+"/db/models/model")(table);
var crypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var errorHandler = require(rootPath+"/middlewares/error");
var secret = require(rootPath+"/config/config").secret;

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
    } else {
        jwt.verify(req.token, secret.SECRET, function(err, data) {
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
    let errors = errorHandler();

    var pseudo = req.body.pseudo;
    var pwd = req.body.userPwd;
    
    /**
     * query parts :
     * select pseudo, email, pwd
     * from users u
     * where u.pseudo = pseudo
     */
    var columns = ["*"];
    var clause = {"pseudo": pseudo};

    model.read(columns, clause, function (results, error) {

        if (error == null && results.length > 0) {
            const userTok = {
                pseudo: results[0].pseudo
            }

            // check if password is correct
            crypt.compare(pwd, results[0].userPwd, function(error, resCrypt) {
                if (resCrypt) {
                    jwt.sign({userTok}, "moqziehbmoi543efqsoiQSDFEhbqmzjfDQSDF", function(error, token) {
                        // res.json({user, token});
                        res.render("user", {
                            info: results[0],
                            status: true,
                            token: {userTok, token}
                        })
                    });
                } else {
                    errors.addMessage("407", "Invalid Password");
                    errors.sendErrors(res, 403);
                }
            });
        } else {
            errors.addMessage("406", "Invalid Pseudo");
            errors.sendErrors(res, 403);
        }
    })
};

auth.logout = function(req, res, next) {
    next();
}

module.exports = auth;