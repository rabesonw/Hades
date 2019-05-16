var table = "songs";
var model = require("../db/models/model")(table);
var auth = require("../middlewares/auth");

exports.songs = {
    getAllSongs = function (req, res) {
        let fields = ["songId", "songTitle"];
        model.readAll(fields, {}, function (results) {
            res.json(results);
        });
    }

    .addSong = function (req, res) {
        model.create(req.body);
    }

    .getSong = function (req, res) {
        let fields = ["songId"];
        let clause = {"songId": req.idSong};
        model.read(fields, function (results) {
            res.json(results);
        });
    }

    .updateSong = function (req, res) {
        model.update(req.body);
    }

    .deleteSong = function (req, res) {
        let clause = {"songId": req.idSong};
        model.delete(req.body, clause);
    }
};