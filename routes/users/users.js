var express = require("express");
var router = express.Router();

/*
    /users/
    display all users
    create a new user
*/
router.route("/")
.get(function (req, res, next) {
    res.send('GET /users')
})
.post(function (req, res) {
    res.send('POST /users')
});

/*
    /users/:idUser
    routing for a user idUser
    display page of user idUser
    modify info about user idUser
    delete user idUser
*/
router.route("/:idUser")
.get(function (req, res, next) {
    if (isNaN(req.params.idUser)) {
        res.send(`GET user ${req.params.idUser}`);
    } else {
        res.status(400).send('Bad request');
    }
})
.patch(function (req, res, next) {
    if (isNaN(req.params.idUser)) {
        res.send(`PATCH user ${req.params.idUser}`);
    } else {
        res.status(400).send('Bad request');
    }
})
.delete(function (req, res) {
    if (isNaN(req.params.idUser)) {
        res.send(`DELETE user ${req.params.idUser}`);
    } else {
        res.status(400).send('Bad request');
    }
});

/*
    idUser for other resources
*/
const routeIdUser = (req, res, next) => {
    req.idUser = req.params.idUser;
    next();
}

/*
    Resources that need IdUser :
    Albums
    Follows
    Playlists
*/
router.use("/:idUser/albums", routeIdUser, require("./albums"))
.use("/:idUser/followers", routeIdUser, require("./followers"))
.use("/:idUser/following", routeIdUser, require("./following"))
.use("/:idUser/playlists", routeIdUser, require("./playlists"))
.use("/:idUser/songs", routeIdUser, require("./songs"));

module.exports = router;