var express = require("express");
var router = express.Router();
var albums = require(rootPath+"/controllers/albums");
var auth = require(rootPath+"/middlewares/auth");
var users = require(rootPath+"/routes/index");

/*
    idAlbum for other resources
*/
const routeIdAlbum = (req, res, next) => {
    req.idAlbum = req.params.idAlbum;
    next();
}

/*
    /albums
    display list of albums of idUser
    create a new album
*/
console.log("/idUser/albums : START");
router.route("/")
.get(routeIdAlbum, albums.getAllAlbums)
.post(routeIdAlbum, auth.readToken, albums.addAlbum);

/*
    /albums/idAlbum
    display idAlbum page
    adds a song to an album
    modify idAlbum
    remove idAlbum 
*/
router.route("/:idAlbum")
.get(routeIdAlbum, albums.getAlbum)
.patch(routeIdAlbum, auth.readToken, albums.updateAlbum)
.delete(routeIdAlbum, auth.readToken, albums.deleteAlbum);
console.log("/idUser/albums : OK");

module.exports = router;