const mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "mdsflyboy",
    password: "password",
    database: "activities"
});

module.exports = con;