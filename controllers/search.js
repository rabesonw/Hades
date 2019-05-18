var table = ["songs", "albums"];
var model = require("../db/models/model")(table);
var error = require("../middlewares/error");
var auth = require("../middlewares/auth");

/**
 * add tables when ambiguity as albums.albumId
 */

var search = {};

    /**
     * select songId, songTitle, albumId, albumAuthor
     * from songs, albums
     * where songTitle like req.body
     * and songs.albumId = albums.albumId
     */
    search.searchSongs = function(req, res, next) {
        let fields = ["songId", "songTitle", "albumId", "albumAuthor"];
        let clause = {"songTitle": req.body, "songs.albumId": "albums.albumId"};
        model.readSearch(fields, clause, function(results, err) {
            if(!err && results.length >= 0) {
                res.json(results);
            } else {
                error.addMessage("409", "Query failed");
                error.sendErrors(res, 404);
            }
        });
    }

    /**
     * select pseudo
     * from users
     * where pseudo like req.body
     */
    search.searchUsers = function(req, res, next) {
        let table = ["users"];
        let model = require("../db/models/model")(table);
        let fields = ["pseudo"];
        let clause = {"pseudo": req.body};
        model.readSearch(fields, clause, function(results, err) {
            if(!err && results.length >= 0) {
                res.json(results);
            } else {
                error.addMessage("409", "Query failed");
                error.sendErrors(res, 404);
            }
        });
    }

    /**
     * select *
     * from albums
     * where albumTitle like req.body
     */
    search.searchAlbums = function(req, res, next) {
        let table = ["albums"];
        let model = require("../db/models/model")(table);
        let fields = ["*"];
        let clause = {"albumTitle": req.body};
        model.readSearch(fields, clause, function(results, err) {
            if(!err && results.length >= 0) {
                res.json(results);
            } else {
                error.addMessage("409", "Query failed");
                error.sendErrors(res, 404);
            }
        });
    }

    /**
     * 
     */
    search.search = function(req, res) {
        let jsonResults = {};
        searchAlbums(req, res, function(results, err) {
            jsonResults["albumResults"] = results;
            searchUsers(req, res, function(results, err) {
                jsonResults["userResults"] = results;
                searchSongs(req, res, function(results, err) {
                    jsonResults["songResults"] = results;
                    if(!err && results.length >= 0) {
                        res.json(jsonResults);
                    } else {
                        error.addMessage("409", "Query failed");
                        error.sendErrors(res, 404);
                    }
                });
            });
        });
    }

module.exports = search;