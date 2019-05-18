var express = require("express");
var router = express.Router();
var playlists = require(rootPath+"/controllers/playlists");
var auth = require(rootPath+"/middlewares/auth");
var users = require(rootPath+"/routes/index");

/*
    idPlaylist for other resources
*/
const routeIdPlaylist = (req, res, next) => {
    req.idPlaylist = req.params.playlistId;
    next();
}

/*
    /playlists
    display list of playlists of idUser
    create a new playlist for idUser
*/
console.log("/idUser/playlists : START");
router.route("/")
.get(routeIdPlaylist, playlists.getAllPlaylists)
.post(routeIdPlaylist, auth.readToken, playlists.addPlaylist);

/*
    /playlists/:idPlaylist
    display playlist page of idPlaylist
    modify playlist idPlaylist
    remove playlist idPlaylist
*/
router.route("/:idPlaylist")
.get(routeIdPlaylist, playlists.getPlaylist)
.patch(routeIdPlaylist, auth.readToken, playlists.updatePlaylist)
.delete(routeIdPlaylist, auth.readToken, playlists.deletePlaylist);
console.log("/idUser/playlists : OK");

module.exports = router;