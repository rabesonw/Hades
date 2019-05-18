var express = require("express");

var app = express();

port = process.env.PORT || 8000;

app.get("/", function (req, res, next) {
    res.send("Homepage");
});

app.set("view engine", "ejs");

var routes = require("./routes");
app.use("/", routes);

app.use("*", function (req, res) {
    res.status(404).send("404 not found");
});

app.listen(port);

module.exports = app;