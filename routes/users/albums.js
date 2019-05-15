var express = require("express");
var router = express.Router();

/*
    /idUser/albums
    display list of albums of idUser
    create a new album
*/
router.route("/:idUser")
.get(function (req, res, next) {
    res.send(`GET /${req.params.idUser}/albums`)
})
.post(function (req, res) {
    res.send(`POST /${req.params.idUser}/albums`)
});

/*
    /albums/idAlbum
    display idAlbum page
    adds a song to an album
    modify idAlbum
    remove idAlbum 
*/
router.route("/:idAlbum")
.get(function (req, res, next) {
    res.send(`GET /albums/${req.params.idAlbum}`)
})
.post(function (req, res, next) {
    res.send(`POST /albums/${req.params.idAlbum}`) 
})
.patch(function (req, res, next) {
    res.send(`PATCH /albums/${req.params.idAlbum}`)
})
.delete(function (req, res) {
    res.send(`DELETE /albums/${req.params.idAlbum}`)
});

/*
    /albums/idAlbum/idSong
    plays song idSong in idAlbum ??? useless ???
    edit song idSong info
    remove song idSong from idAlbum
*/
router.route("/:idAlbum/:idSong")
.get(function (req, res, next) {
    res.send(`GET /albums/${req.params.idAlbum}/${req.params.idSong}`)
})
.patch(function (req, res, next) {
    res.send(`PATCH /albums/${req.params.idAlbum}/${req.params.idSong}`)
})
.delete(function (req, res) {
    res.send(`DELETE /users/${req.idUser}/albums/${req.params.idAlbum}/${req.params.idSong}`)
});

/*
    idAlbum for other resources
*/
const routeIdAlbum = (req, res, next) => {
    req.idAlbum = req.params.idAlbum;
    next();
}

router.use("./:idUser/albums/:idAlbum", routeIdAlbum, require("./songs"))
.use("./:idUser/albums/:idAlbum", routeIdAlbum, require("./playlists"))

module.exports = router;