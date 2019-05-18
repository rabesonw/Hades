var table = "playlists";
var model = require(rootPath+"/db/models/model")(table);
var auth = require(rootPath+"/middlewares/auth");
var pageName = require(rootPath+"/middlewares/auth");

var playlists = {};

    /**
     * select all playlists of idUser
     */
    playlists.getAllPlaylists = function (req, res, next) {
        let fields = ["playlistId", "playlistName", "ownerId"];
        let clause = {"ownerId": req.idUser};
        model.readAll(fields, clause, function (results, err) {
            if(!err && results.length > 0) {
                var page = pageName("playlists");
                res.render(page, {
                    title: "Your Playlists",
                    playlists: results
                });
            } else {
                err.addMessage("404", "Playlist not found");
                err.sendErrors(res, 404);
            }
        });
    }

    playlists.addPlaylist = function (req, res) {
        model.create(req.body, function(results, err) {
            if(!err && results.affectRows != 0) {
                var page = pageName("playlist");
                res.render(page, {
                    title: results[1]
                });  
            }
        });
    }

    /**
     * get all songIds from playlist playlistId
     * 
     * select songId
     * from playlists, play
     * where playlists.playlistId = req.idPlaylist
     * and playlists.playlistId = play.playlistId
     */
    playlists.getPlaylist = function (req, res, next) {
        let fields = ["*"];
        let clause = {"playlistId": req.idPlaylist};
        model.read(fields, clause, function (results, err) {
            if(!err && results.length > 0) {
                var page = pageName("playlist");
                res.render(page, {
                    title: results[1],
                    info: results
                });
            } else {
                err.addMessage("404", "Playlist not found");
                err.sendErrors(res, 404);
            }
        });
    }

    /**
     * update playlist set playlistName = :new, playlistDesc = :new
     */
    playlists.updatePlaylist = function (req, res, next) {
        let clause = {"playlistId": req.idPlaylist};
        model.update(req.body, clause, function(results, err) {
            if(!err && results.affectedRows > 0) {
                var page = pageName("playlist");
                res.render(page, {
                    title: results[1]
                });
            } else {
                err.addMessage("404", "Playlist not found");
                err.sendErrors(res, 404);
            }
        });
    }

    /**
     * delete from playlist where playlistId = req.idPlaylist
     */
    playlists.deletePlaylist = function (req, res) {
        let clause = {"playlistId": req.idPlaylist};
        model.delete(clause, function(results, err) {
            if(!err && results.affectedRows > 0) {
                var page = pageName("index");
                res.render(page, {
                    title: "Hades"
                });
            } else {
                err.addMessage("404", "Playlist not found");
                err.sendErrors(res, 404);
            }
        });
    }

module.exports = playlists;