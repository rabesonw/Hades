var express = require("express");
var router = express.Router();
var auth = require(rootPath+"/middlewares/auth");

/*
    /auth
    log in
    log out
*/
router.route("/")
.post(auth.login, () => {
    // res.sendFile(rootPath+"/public/user.html");
    res.render("index", {
        title: "Hades",
        status: true
    });
})
.delete(auth.logout, () => {
    res.render("index", {
        title: "Hades",
        status: false
    });
});

module.exports = router;