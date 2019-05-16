var table = "albums";
var model = require("../db/models/model")(table);
var auth = require("../middlewares/auth");

exports.albums = {

    getAllAlbums = function (req, res) {
        let fields = ["albumId", "albumTitle", "albumAuthor"];
        let clause = {"albumId": req.idAlbum};
        model.readAll(fields, {}, function (results) {
            res.json(results);
        });
    }

    .addAlbum = function (req, res) {
        model.create(req.body);
    }

    .getAlbum = function (req, res) {
        let fields = ["albumId"];
        let clause = {"albumId": req.idAlbum};
        model.read(fields, clause, function (results) {
            res.json(results);
        });
    }

    .updateAlbum = function (req, res) {
        let clause = {"albumId": req.idAlbum};
        model.update(req.body, clause);
    }

    .deleteAlbum = function (req, res) {
        let clause = {"albumId": req.idAlbum};
        model.delete(clause);
    }
};