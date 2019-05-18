var table = "albums";
var model = require("../db/models/model")(table);
var auth = require("../middlewares/auth");

var albums = {};

    /**
     * select *
     * from albums
     * where albumId = req.idAlbum
     */
    albums.getAllAlbums = function (req, res, next) {
        let fields = ["*"];
        let clause = {"albumId": req.idAlbum};
        model.readAll(fields, {}, function (results) {
            if(!err && results.length > 0) {
                res.sendFile(rootPath+"/public/album.html");
            } else {
                err.addMessage("404", "User not found");
                err.sendErrors(res, 404);
            }
        });
    }

    /**
     * insert into 
     */
    albums.addAlbum = function (req, res) {
        model.create(req.body, function(results, err) {
            if(!err && results.affectedRows != 0) {
                res.sendFile(rootPath+"/public/album.html");
            }
        });
    }

    albums.getAlbum = function (req, res) {
        let fields = ["albumId", "albumTitle"];
        let clause = {"albumId": req.idAlbum};
        model.read(fields, clause, function (results) {
            if(!err && results.length > 0) {
                res.sendFile(rootPath+"/public/album.html");
            } else {
                err.addMessage("404", "Album not found");
                err.sendErrors(res, 404);
            }
        });
    }

    albums.updateAlbum = function (req, res) {
        let clause = {"albumId": req.idAlbum};
        model.update(req.body, clause);
    }

    albums.deleteAlbum = function (req, res) {
        let clause = {"albumId": req.idAlbum};
        model.delete(clause);
    }

module.exports = albums;