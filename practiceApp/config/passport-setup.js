const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
})

passport.use(
    new GoogleStrategy(
        {
            // options for google strat
            callbackURL: '/auth/google/redirect',
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret
        }, 
        function (accessToken, refreshToken, profile, done) {
            //check if user already exists
            User.findOne({googleId: profile.id}).then(
                function (currentUser) {
                    //then
                    // console.log(profile);
                    if(currentUser){
                        //already have the user
                        console.log('user is: ', currentUser.username);
                        done(null, currentUser);
                    }else{
                        //if not, create user in our db
                        new User({
                            username: profile.displayName, 
                            googleId: profile.id,
                            thumbnail: profile._json.picture
                        }).save().then((newUser) => {
                            console.log('new user created: '+newUser.username);
                            done(null, newUser);
                        });
                    }
                }
            )
        }
    )
);