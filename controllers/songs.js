var table = "songs";
var model = require(rootPath+"/db/models/model")(table);
var auth = require(rootPath+"/middlewares/auth");
var pageName = require(rootPath+"/middlewares/page");

var songs = {};

    /**
     * select songId, songTitle
     * from songs
     */
    songs.getAllSongs = function (req, res) {
        let fields = ["songId", "songTitle"];
        model.readAll(fields, {}, function (results) {
            var page = pageName("albums");
            res.render(page, {
                title: "Songs", 
                songs: results
            }); 
        });
    };

    /**
     * insert into songs (songTitle, songDetails, albumId, genreId)
     */
    songs.addSong = function (req, res) {
        model.create(req.body, function(results, err) {
            if(!err && results.affectedRows != 0) {
                var page = pageName("song");
                res.render(page, {
                    title: results[0],
                });  
            }
        });
    };

    /**
     * insert into play values (songId, playlistId)
     */
    songs.addSongToPlaylist = function(req, res) {
        model.create(req.body, function(results, err) {
            if(!err && results.affectedRows != 0) {
                next();  
            } else {
                errors.addMessage("400", "Failed to add song");
            }
        })
    };

    songs.getSong = function (req, res) {
        let fields = ["songId", "songTitle"];
        let clause = {"songId": req.idSong};
        model.read(fields, function (results, err) {
            if(!err && results.length > 0) {
                var page = pageName(song);
                res.render(page, {
                    title: results[1]
                });
            } else {
                err.addMessage("404", "Song not found");
                err.sendErrors(res, 404);
            }
        });
    };

   songs.updateSong = function (req, res) {
        var clause = {"songId": req.idSong};
        model.update(req.body, clause, function(results, err) {
            if(!err && results.length > 0) {
                var page = pageName(results[1]);
                res.render(page, {
                    title: results[1]
                });
            } else {
                err.addMessage("404", "Song not found");
                err.sendErrors(res, 404);
            }
        });
    };

    songs.deleteSong = function (req, res) {
        let clause = {"songId": req.idSong};
        model.delete(req.body, clause, function(results, err) {
            if(!err && results.length > 0) {
                var page = pageName("index");
                res.render(page, {
                    title: "Hades"
                });
            } else {
                err.addMessage("404", "Song not found");
                err.sendErrors(res, 404);
            }
        });
    };

module.exports = songs;