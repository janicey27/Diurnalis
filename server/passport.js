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
      manageNewUser(profile)
        .then((res) => {
          return done(err, res)
        });
    } else {
      return done(err, user);
    }
  });
}));

// create new user
manageNewUser = (profile) => {
  return new Promise(function(resolve, reject) {
    let username = profile.name.givenName + ((profile.name.familyName.length > 0) ? profile.name.familyName[0] : "");
    findValidUsername(username, 1)
      .then(res => {
        const user = new User({
          name: profile.name.givenName,
          username: res,
          googleid: profile.id,
          defaultPrivacy: "private"
        });
        user.save(function(err) {
          if (err) console.log(err);
  
          resolve(user);
        });
      });
  });
}

// find username that is not taken
findValidUsername = (username, i) => {
  return new Promise(function(resolve, reject) {
    const testUsername = username + i;
    User.findOne({ username: testUsername }, function(err, user) {
      if (err) {
        resolve("anonymous");
      }
      if (!user) {
        resolve(testUsername);
      } else {
        findValidUsername(username, i+1)
          .then(res => { resolve(res) });
      }
    });
  });
}

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = passport;