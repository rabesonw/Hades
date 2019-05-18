var table = "playlists";
var model = require(rootPath+"/db/models/model")(table);
var auth = require(rootPath+"/middlewares/auth");

var playlists = {};

    /**
     * select all playlists of idUser
     */
    playlists.getAllPlaylists = function (req, res, next) {
        let fields = ["playlistId", "playlistName", "ownerId"];
        model.readAll(fields, {}, function (results) {
            res.sendFile(rootPath+"/public/playlist.html");
        });
    }

    playlists.addPlaylist = function (req, res) {
        model.create(req.body, function(results, err) {
            if(!err && results.affectRows != 0) {
                res.sendFile(rootPath+"/public/user.html");
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
        let fields = ["playlistId"];
        let clause = {"playlistId": req.idPlaylist};
        model.read(fields, clause, function (results) {
            res.sendFile(rootPath+"/public/user.html");
        });
    }

    /**
     * update playlist set playlistName = :new, playlistDesc = :new
     */
    playlists.updatePlaylist = function (req, res, next) {
        let clause = {"playlistId": req.idPlaylist};
        model.update(req.body, clause );
    }

    /**
     * delete from playlist where playlistId = value
     */
    playlists.deletePlaylist = function (req, res) {
        let clause = {"playlistId": req.idPlaylist};
        model.delete(clause);
    }

module.exports = playlists;