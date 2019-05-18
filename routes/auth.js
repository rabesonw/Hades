var express = require("express");
var router = express.Router();
var auth = require("../middlewares/auth");

/*
    /auth
    log in
    log out
*/
router.route("/")
.post(auth.login, () => {
    res.sendFile(rootPath+"/public/user.html");
})
.delete(auth.logout, () => {
    res.sendFile(rootPath+"/public/index.html");
});

module.exports = router;