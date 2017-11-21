var connection = require("../config/connection.js");
// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(number) {
    var arr = [];
    for (var i = 0; i < number; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

var orm = {
    selectAll: function (tableInput, cb) {
        var queryThis = "SELECT * FROM " + tableInput + ";";
        connection.query(queryThis, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function (table, column, values, cb) {
        var queryThis = "INSERT INTO " + table;
        queryThis += " (" +column.toString() + ")";
        queryThis += " VALUES (" + printQuestionMarks(values.length) + ") ";
        connection.query(queryThis, values, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: function (table, objColVals, condition, cb) {
        var queryThis = "UPDATE " + table + " SET ";
        queryThis += objToSql(objColVals) + " WHERE " + condition;
        connection.query(queryThis, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    }
};

//  Export Orm Methods
module.exports = orm;

