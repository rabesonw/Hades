var path = require("path");

global.rootPath = path.resolve(__dirname);

var dbdata = require(rootPath+"/config/config").db;

var express = require("express");
var bodyParser = require("body-parser");
var routes = require(rootPath+"/routes");
var app = express();
var pageBuild = require(rootPath+"/middlewares/page");

app.use(express.static(path.join(__dirname, "public")));

const port = dbdata.PORT || 8000;


app.set("view engine", "ejs");
console.log("root/ : START");
app.get("/", function (req, res, next) {
    var page = pageBuild("index");
    res.render(page, {
        title: "Hades"
    });
});

app.use(bodyParser.json());

//means that it supports encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", routes);
console.log("root/ : OK");

app.use("*", function (req, res) {
    res.status(404).send("404 not found");
});

app.listen(port);
module.exports = app;