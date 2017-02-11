// passport.js
//
// for authenticating with Facebook
//

// load the appropriate dependencies
var passport = require('passport');
var config = require('./oauth/oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;

var initializedPassport = passport.initialize();
var passportSession = passport.session();

// configure Facebook Strategy for use by passport
// client ID, clientSecret, callbackURL come from ./oauth/oauth.js
passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    },
    function (accessToken, refreshToken, profile, cb) {
            console.log(profile);
            return cb(null, profile);
    }
));

passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});


// a test express application for passport

// var express = require('express');

// var app = express();

// app.use(require('morgan')('combined'));
// app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUnitialized: true }));
// var bodyParser = require('body-parser');
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.static("./public"));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// app.get('/',
// 	function(req, res) {
// 		res.render('index', { user: req.user });
// 	});
// app.get('/login',
// 	function(req, res) {
// 		res.render('login');
// 	});
// app.get('/login/facebook',
// 	passport.authenticate('facebook'));
// app.get('/login/facebook/return',
// 	passport.authenticate('facebook', { failureRedirect: '/login' }),
// 	function(req, res) {
// 		res.redirect('/');
// 	});
// app.get('/profile',
// 	require('connect-ensure-login').ensureLoggedIn(),
// 	function(req, res) {
// 		res.render('profile', { user: req.user });
// 	});
// app.listen(3000);