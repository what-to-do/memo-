var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('./models');
var User = require('./models/user');
var configAuth = require('./oauth/oauth');
var sequelize = require('sequelize');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    username : 'email',
    password: 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    console.log(email, password);
    process.nextTick(function() {

      db.User.findOne({ 'username' : email }, function(err, user) {
        if (err)
          return done(err);

        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          var newUser = new User();

          newUser.local.email   = email;
          newUser.local.password  = newUser.generateHash(password);

          newUser.save(function(err) {
            if (err) 
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
       console.log(email, password);
        db.Users.findOne({
          where: {username: req.body.email} 
        }).then(function(err, data){
            if (err)
              return done(err);
            if (username) 
              return done(null, false, req.flash('loginMessage', 'No user found.'));
            
            if (!user.validPassword(password))
              return done(null, false, req.flash('loginMessage', 'Invalid password.'));
            
            return done(null, user);
        });

  }));

  passport.use(new FacebookStrategy({
    clientID  : configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL : configAuth.facebookAuth.callbackURL
  },
  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
        if (err)
          return done(err);
        if (user) {
          return done(null, user);
        } else {
          var newUser = User();
          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;
          newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.facebook.email = profile.emails[0].value;

          newUser.save(function(err) {
            if (err)
              throw err;

            return done(null, newUser);
          });
        }
        
      });
    });

  }));
  
};