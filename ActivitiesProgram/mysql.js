const mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "mdsflyboy",
    password: "password",
    database: "activities",
    dateStrings: true
});

module.exports = con;