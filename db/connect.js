var mysql = require("mysql");

var dbdata = require(rootPath+"/config/config").db;

var connection = mysql.createConnection(
    {
        host: dbdata.HOST,
        user: dbdata.USER,
        password: dbdata.DB_KEY,
        database: dbdata.DB_NAME//path to database
    }
);

connection.connect(function (err) {
    if (err) {
        console.log("Connection to database unsuccessful");
        throw err;
    } else {
        console.log("Connection to database successful");
    }
});

module.exports = connection;