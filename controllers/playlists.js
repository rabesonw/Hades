var table = "playlists";
var model = require("../db/models/model")(table);
var auth = require("../middlewares/auth");

exports.playlists = {
    
    getAllPlaylists = function (req, res) {
        let fields = ["playlistId", "playlistName", "ownerId"];
        model.readAll(fields, {},function (results) {
            res.json(results);
        });
    }

    .addPlaylist = function (req, res) {
        model.create(req.body);
    }

    .getPlaylist = function (req, res) {
        let fields = ["playlistId"];
        let clause = {"playlistId": req.idPlaylist};
        model.read(fields, clause, function (results) {
            res.json(results);
        });
    }

    .updatePlaylist = function (req, res) {
        let clause = {"playlistId": req.idPlaylist};
        model.update(req.body, clause);
    }

    .deletePlaylist = function (req, res) {
        let clause = {"playlistId": req.idPlaylist};
        model.delete(clause);
    }
};