const express = require('express');
let sql = require('./mysql');

let app = express();

app.use(express.json());

app.use('/ajax/', require('./routes/ajax'));

app.get('/', function(req, res){
    res.redirect('/html/index.html');
});

app.use(express.static('public'));

sql.connect(function(err) {
    if(err) throw err;
    console.log("Connected");
    app.listen(3250, function(){
        console.log("Listening on Port 3250")
    });
});