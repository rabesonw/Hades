var express = require("express");
var router = express.Router();
var users = require(rootPath+"/controllers/users");
var auth = require(rootPath+"/middlewares/auth");
var pageBuild = require(rootPath+"/middlewares/page");

/*
    idUser for other resources
*/
const routeIdUser = (req, res, next) => {
    req.idUser = req.params.idUser;
    next();
}

/**
 * access to log and join pages
 */
router.get("/connect", function(req, res, next) {
    var page = pageBuild("log");
    res.render(page, {
        title: "Log in",
    });  
});

router.get("/join", function(req, res, next) {
    var page = pageBuild("join");
    res.render(page, {
        title: "Sign in",
    });  
});

router.route("/users")
.get(users.getAllUsers)
.post(users.addUser);


console.log("root/idUser : START");

/**
 * /
 * 
 * creates a user
 */

router.route("/")
.post(users.addUser)
.delete(auth.logout, () => {
    res.render("index", {
        title: "Hades",
        status: false
    });
});
/*
    /:idUser
    routing for a user idUser
    display page of user idUser
    modify info about user idUser
    delete user idUser
*/

router.route("/:idUser")
.get(routeIdUser, users.getUser)
.patch(routeIdUser, auth.readToken, users.updateUser)
.delete(routeIdUser, auth.readToken, users.deleteUser);
console.log("root/idUser : OK")
/*
    Subsources
*/
// router.use("/:idUser/albums", routeIdUser, require("./albums"))
// .use("./:idUser/followers", routeIdUser, require("./followers"))
// .use("./:idUser/following", routeIdUser, require("./following"))
// .use("./:idUser/playlists", routeIdUser, require("./playlists"))
// .use("./:idUser/songs", routeIdUser, require("./songs"));

console.log("subsources call : START");
router.use("/auth", require("./auth"))
.use("/playlists", require("./playlists"))
.use("/albums", require("./albums"))
.use("/followers", require("./followers"))
.use("/following", require("./following"))
.use("/songs", require("./songs"))
.use("/results", require("./results"))
.use("./users", require("./users/users"));
console.log("subsources call : OK");
module.exports = router;