const express = require('express');
const passport_setup = require('./config/passport-setup');
const devRoute = require('./routes/dev');
const passport = require('passport');

const app = express();

app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());
// app.use(require('cookie-parser'));
app.use('/dev', require('./routes/dev'));
app.use('/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3250);