const express = require('express');
const passport_setup = require('./config/passport-setup');
const devRoute = require('./routes/dev');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path');
const keys = require('./config/keys');

const db = require('./db');

const app = express();


app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 30 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dev', require('./routes/dev'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/ajax', require('./routes/ajax'));

app.get('/', (req, res) => {
    if(req.user){
        res.redirect('/profile');
    }
    res.render('home', {user: req.user});
});

db.connect((err)=>{
    if(err){
        console.log('could not connect to db');
        process.exit(1);
    }else{
        app.listen(3250, ()=>{
            console.log('connected to db, app listening');
        });
    }
});