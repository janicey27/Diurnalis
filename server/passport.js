const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./models/user');

// set up passport configs
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, function(accessToken, refreshToken, profile, done) {
  User.findOne({
    googleid: profile.id
  }, function(err, user) {
    if (err) return done(err);

    if (!user) {
      let username = profile.name.givenName + profile.name.familyName;
      username = findValidUsername(username, 1);
      const user = new User({
        name: profile.name.givenName,
        username: username, // TODO set username upon first login
        googleid: profile.id,
        defaultPrivacy: "private" // TODO set upon first login
      });

      user.save(function(err) {
        if (err) console.log(err);

        return done(err, user);
      });
    } else {
      return done(err, user);
    }
  });
}));

findValidUsername = (username, i) => {
  const testUsername = username + i;
  User.findOne({ username: testUsername }, function(err, user) {
    if (err) return "no_username";
    if (!user) {
      return testUsername;
    }
    return findValidUsername(username, i+1);
  });
}

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = passport;