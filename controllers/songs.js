var table = "songs";
var model = require("../db/models/model")(table);
var auth = require("../middlewares/auth");

var songs = {};
    songs.getAllSongs = function (req, res) {
        let fields = ["songId", "songTitle"];
        model.readAll(fields, {}, function (results) {
            res.json(results);
        });
    }

    /**
     * insert into songs (songTitle, songDetails, albumId, genreId)
     */
    songs.addSong = function (req, res) {
        model.create(req.body);
    }

    /**
     * insert into play values (songId, playlistId)
     */
    songs.addSongToPlaylist = function(req, res) {
        model.create(req.body)
    }

    songs.getSong = function (req, res) {
        let fields = ["songId"];
        let clause = {"songId": req.idSong};
        model.read(fields, function (results) {
            res.json(results);
        });
    }

   songs.updateSong = function (req, res) {
        model.update(req.body);
    }

    songs.deleteSong = function (req, res) {
        let clause = {"songId": req.idSong};
        model.delete(req.body, clause);
    }

module.exports = songs;