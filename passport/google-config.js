
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require("../models/users")

require("../.env")



// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: oAuthKey,
    clientSecret: oAuthConsumerSecret,
    callbackURL: oAuthCallback
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log("=============This is the google profile==========")
  	console.log(profile.id);
       User.findOrCreate({ googleId: profile.id, displayName: profile.displayName }, function (err, user) {
         return done(err, user);
       });
  }
));
