var mysql = require("mysql");
var config = require("./config.js");
var connection;

//	If Heroku link
if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
//	else deploy Locally
    connection = mysql.createConnection({
        port: 4040,
        host: "localhost",
        user: config.user,
        password: config.password,
        database: "burgers_db"
    });
}

// Make connection.
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err);
        return;
    }
    console.log("Connected ID: " + connection.threadId);
});

module.exports = connection;
