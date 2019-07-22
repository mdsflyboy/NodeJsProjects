const express = require('express');
const passport_setup = require('./config/passport-setup');
const devRoute = require('./routes/dev');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 30 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/dev', require('./routes/dev'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));

app.get('/', (req, res) => {
    if(req.user){
        res.redirect('/profile');
    }
    res.render('home', {user: req.user});
});

app.listen(3250);