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
      let username = profile.name.givenName + ((profile.name.familyName.length > 0) ? profile.name.familyName[0] : "");
      username = findValidUsername(username, 1);
      console.log(username);
      const user = new User({
        name: profile.name.givenName,
        username: username,
        googleid: profile.id,
        defaultPrivacy: "private"
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
  console.log("Testing: " + i);
  const testUsername = username + i;
  console.log("Test username: " + testUsername);
  User.findOne({ username: testUsername }, function(err, user) {
    if (err) return "no_username";
    if (!user) {
      return testUsername;
    }
    console.log("Shouldn't reach here?");
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