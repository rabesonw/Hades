var express = require("express");
var router = express.Router();
var search = require("../controllers/search");

// /*
//     idPlaylist for other resources
// */
// const routeSearch = (req, res, next) => {
//     req.idPlaylist = req.params.playlistId;
//     next();
// }

/*
    /results
    display search results from the homepage
*/
console.log("search : START");
router.route("/")
.get(search.search);
console.log("search : OK");
module.exports = router;