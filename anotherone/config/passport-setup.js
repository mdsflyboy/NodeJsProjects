const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const Photos = require('googlephotos');

passport.serializeUser((cookieData,  done) => {
    done(null, cookieData);
});

passport.deserializeUser((cookieData, done) => {
    // User.findById(id).then((user) => {
    //     done(null, user);
    // });
    done(null, cookieData);
});

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientId,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // console.log(`User ${profile.username} logged in`);
        // console.log(profile);
        // console.log(accessToken);
        let photos = new Photos(accessToken);
        let id = photos.albums.list(1);
        // let photo = photos.mediaItems.get(id);
        console.log(id);
        done(null, {
            profile,
            photos
        });
    })
);