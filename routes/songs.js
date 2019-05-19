var express = require("express");
var router = express.Router();
var songs = require(rootPath+"/controllers/songs");
var playlists = require(rootPath+"/controllers/playlists");
// var play = require("../controllers/play"); pour le futur controller play
var auth = require(rootPath+"/middlewares/auth");

/*
    idSong for other resources
*/
const routeIdSong = (req, res, next) => {
    req.IdSong = req.params.songId;
    next();
}
/*
    /songs
    display all songs
    adds idSong to idPlaylist of liked songs
*/
console.log("root/songs : START");
router.route("/")
.get(routeIdSong, songs.getAllSongs)
.put(routeIdSong, auth.readToken, songs.addSongToPlaylist);

/*
    /idSong
    displays song page
    edit song idSong info
    delete song idSong
*/
router.route("/:idSong")
.get(routeIdSong, songs.getSong)
.patch(routeIdSong, auth.readToken, songs.updateSong)
.delete(routeIdSong, auth.readToken, songs.deleteSong);
console.log("root/songs : OK");
module.exports = router;