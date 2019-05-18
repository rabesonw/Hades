dotenv.config();

var mysql = require("mysql");

var connection = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_KEY,
        database: process.env.DB_URL //path to database
    }
);

connection.connect(process.env.DB_URL,function (err) {
    if (err) throw err;
});

module.exports = connection;