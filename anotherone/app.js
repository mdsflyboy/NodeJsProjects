const express = require('express');
const devRoute = require('./routes/dev');

const app = express();

app.set('view engine', 'ejs');

app.use('/dev', require('./routes/dev'));
app.use('/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.listen(3250);