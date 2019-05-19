var express = require("express");
var router = express.Router();
var playlists = require(rootPath+"/controllers/playlists");
var auth = require(rootPath+"/middlewares/auth");


/*
    idPlaylist for other resources
*/
const routeIdPlaylist = (req, res, next) => {
    req.idPlaylist = req.params.playlistId;
    next();
}

/*
    /playlists
    display list of playlists of idUser
    create a new playlist for idUser
*/
console.log("root/playlists : START");
router.route("/")
.get(routeIdPlaylist, playlists.getAllPlaylists)
.post(routeIdPlaylist, auth.readToken, playlists.addPlaylist);
console.log("root/playlists : OK");
/*
    /playlists/:idPlaylist
    display playlist page of idPlaylist
    modify playlist idPlaylist
    remove playlist idPlaylist
*/
router.route("/:idPlaylist")
.get(routeIdPlaylist, playlists.getPlaylist)
.patch(routeIdPlaylist, auth.readToken, playlists.updatePlaylist)
.delete(routeIdPlaylist, auth.readToken, playlists.deletePlaylist);

// /*
//     idPlaylist for other resources
// */
// const routeIdPlaylist = (req, res, next) => {
//     req.idPlaylist = req.params.idAlbum;
//     next();
// }

// router.use("/users/:idUser/playlists/:idPlaylist", routeIdPlaylist, require("./songs"))

module.exports = router;