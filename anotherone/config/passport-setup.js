const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy();
const keys = require('./keys');

passport.serializeUser((user,  done) => {
    done(null, user.id);
});

passport.deserializeUser((user, done) => {
    // User.findById(id).then((user) => {
    //     done(null, user);
    // });
    done(null, user);
});

passport.use(
    new GoogleStrategy({
        clientId: keys.google.clientId,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // console.log(`User ${profile.username} logged in`);
        console.log(profile);
    })
)