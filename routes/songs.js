var express = require("express");
var router = express.Router();

/*
    /songs
    display album page that contains idSong (from idPlaylist)
    adds idSong to idPlaylist of liked songs
*/
router.route("/")
.get(function (req, res) {
    res.send(`GET /users/${req.idUser}/albums/${req.params.idAlbum}`)
})
.put(function (req, res) {
    res.send(`PUT /users/${req.idUser}/playlists/${req.idPlaylist}/${req.params.idSong}`)
});

module.exports = router;