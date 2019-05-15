var express = require("express");
var router = express.Router();

/*
    /playlists
    display list of playlists of idUser
    create a new playlist for idUser
*/
router.route("/:idUser")
.get(function (req, res, next) {
    res.send(`GET /${req.params.idUser}/playlists`)
})
.post(function (req, res) {
    res.send(`POST /${req.params.idUser}/playlists`)
});

/*
    /playlists/:idPlaylist
    display playlist page of idPlaylist
    modify playlist idPlaylist
    remove playlist idPlaylist
*/
router.route("/:idPlaylist")
.get(function (req, res, next) {
    res.send(`GET /playlists/${req.params.idPlaylist}`)
})
.patch(function (req, res, next) {
    res.send(`PATCH /playlists/${req.params.idPlaylist}`)
})
.delete(function (req, res) {
    res.send(`DELETE /playlists/${req.params.idPlaylist}`)
});

/*
    /playlists/idPlaylist/idSong
    display album page that contains idSong (from idPlaylist)
    adds song idSong to another playlist idPlaylist (i hope)
    remove song idSong from playlist idPlaylist
*/
router.route("/:idPlaylist/:idSong")
.get(function (req, res, next) {
    res.send(`GET /albums/${req.params.idAlbum}`)
})
.put(function (req, res, next) {
    res.send(`PUT /users/${req.idUser}/playlists/${req.params.idPlaylist}/${req.params.idSong}`)
})
.delete(function (req, res) {
    res.send(`DELETE /users/${req.idUser}/playlists/${req.params.idPlaylist}/${req.params.idSong}`)
});

/*
    idPlaylist for other resources
*/
const routeIdPlaylist = (req, res, next) => {
    req.idPlaylist = req.params.idAlbum;
    next();
}

router.use("/users/:idUser/playlists/:idPlaylist", routeIdPlaylist, require("./songs"))

module.exports = router;