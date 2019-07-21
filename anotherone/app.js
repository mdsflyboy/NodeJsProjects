const express = require('express');
const passport_setup = require('./config/passport-setup');
const devRoute = require('./routes/dev');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/dev', require('./routes/dev'));
app.use('/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.render('home', {user: req.user});
});

app.get('/profile', (req, res) => {
    if(!req.user){
        res.redirect('/');
    }
    // let yourPhotos = await req.user.photos.albums.list(1);
    // res.send(JSON.stringify(yourPhotos));
    res.render('profile', {user: req.user});
});

app.listen(3250);