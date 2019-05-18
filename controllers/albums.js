var table = "albums";
var model = require("../db/models/model")(table);
var auth = require("../middlewares/auth");
var pageName = require("../middlewares/page");

var albums = {};

    /**
     * what?
     * select *
     * from albums
     * where albumId = req.idAlbum
     */
    albums.getAllAlbums = function (req, res, next) {
        let fields = ["*"];
        let clause = {"albumId": req.idAlbum};
        model.readAll(fields, {}, function (results, err) {
            if(!err && results.length > 0) {
                var page = pageName("albums");
                res.render(page, {
                    title: "Albums",
                    albums: results
                })
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
                var page = pageName("album");
                res.render(page, {
                    title: results[1]
                });
            }
        });
    }

    /**
     * select albumId, albumTitle
     * from albums
     * where albumId = req.idAlbum
     */
    albums.getAlbum = function (req, res) {
        let fields = ["*"];
        let clause = {"albumId": req.idAlbum};
        model.read(fields, clause, function (results, err) {
            if(!err && results.length > 0) {
                var page = pageName("album");
                res.render(page, {
                    title: results[1],
                    info: results
                });
            } else {
                err.addMessage("404", "Album not found");
                err.sendErrors(res, 404);
            }
        });
    }

    albums.updateAlbum = function (req, res) {
        let clause = {"albumId": req.idAlbum};
        model.update(req.body, clause, function(results, err) {
            if(!err && results.affectedRows > 0) {
                var page = pageName("album");
                res.render(page, {
                    title: results[1]
                });
            } else {
                err.addMessage("404", "Album not found");
                err.sendErrors(res, 404);
            }
        });
    }

    albums.deleteAlbum = function (req, res) {
        let clause = {"albumId": req.idAlbum};
        model.delete(clause, function(results, err) {
            if(!err && results.affectedRows > 0) {
                var page = pageName("index");
                res.render(page, {
                    title: "Hades"
                });
            } else {
                err.addMessage("404", "Album not found");
                err.sendErrors(res, 404);
            }
        });
    }

module.exports = albums;