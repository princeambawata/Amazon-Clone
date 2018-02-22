var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// session serializer deserializer
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


// Login middleware

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    userpasswordField: 'password',
    passReqToCallback: true 
}, function(req, email,password, done){
      User.findOne({email: email}, function(err,user){
           if(err) return done(err);

           if(!user) {
           	return done(null,false, req.flash('loginMessage',"User Does not exist."));
           }

           if(!user.comparePassword(password)){
           	 return done(null,false,req.flash('loginMessage',"password is Incorrect"));
           }
           return done(null,user);
      });
}));

// isAuthenticated
exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
