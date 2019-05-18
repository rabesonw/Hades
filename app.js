global.dotenv = require("dotenv");

var path = require("path");

global.rootPath = path.resolve(__dirname);

var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes");
var app = express();

const port = process.env.PORT || 8000;

// app.set("view engine", "ejs");

app.get("/", function (req, res, next) {
    res.sendFile(rootPath+"/public/index.html");
});

app.use(bodyParser.json());

//means that it supports encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", routes);

app.use("*", function (req, res) {
    res.status(404).send("404 not found");
});

app.listen(port);

module.exports = app;