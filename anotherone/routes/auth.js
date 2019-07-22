const router = require('express').Router();
const passport = require('passport');
const Photos = require('googlephotos');

router.get('/login', (req, res) => {
    res.render('login', { user: req.user});
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', Photos.Scopes.READ_AND_APPEND]
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.redirect('/');
    // console.log(req.user);
    // res.send(`Here is the access object: <br> ${JSON.stringify(req.user)}`);
    res.redirect('/profile')
});

module.exports = router;