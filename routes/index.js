var express = require("express");
var router = express.Router();

/*
    /:idUser
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
    Subsources
*/
router.use("/:idUser/albums", routeIdUser, require("./albums"))
.use("./:idUser/followers", routeIdUser, require("./followers"))
.use("./:idUser/following", routeIdUser, require("./following"))
.use("./:idUser/playlists", routeIdUser, require("./playlists"))
.use("./:idUser/songs", routeIdUser, require("./songs"));

router.use("/auth", require("./auth"))
.use("./users", require("./users/users"))
.use("/playlists", require("./playlists"))
.use("/albums", require("./albums"))
.use("/followers", require("./followers"))
.use("/following", require("./following"))
.use("/songs", require("./songs"))
.use("/results", require("./results"));

module.exports = router;