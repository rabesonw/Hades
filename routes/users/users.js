var express = require("express");
var router = express.Router();
var users = require(rootPath + "/controllers/users");
var auth = require(rootPath + "/middlewares/auth");

/*
    idUser for other resources
*/
const routeIdUser = (req, res, next) => {
    req.idUser = req.params.idUser;
    next();
}

/*
    /users/
    display all users
    create a new user
*/
router.route("/")
.get(users.getAllUsers)
.post(users.addUser);

/*
    /users/:idUser
    routing for a user idUser
    display page of user idUser
    modify info about user idUser
    delete user idUser
*/
router.route("/:idUser")
.get(routeIdUser, users.getUser)
.patch(routeIdUser, auth.readToken, users.updateUser)
.delete(routeIdUser, auth.readToken, users.deleteUser);

/*
    Resources that need IdUser :
    Albums
    Follows
    Playlists
    
    eg
    /users/:idUser/albums
*/
console.log("root/idUser/subsources : START");
router.use("/:idUser/albums", routeIdUser, require("./albums"))
.use("/:idUser/followers", routeIdUser, require("./followers"))
.use("/:idUser/following", routeIdUser, require("./following"))
.use("/:idUser/playlists", routeIdUser, require("./playlists"))
.use("/:idUser/songs", routeIdUser, require("./songs"));
console.log("root/idUser/subsources : OK");
module.exports = router;