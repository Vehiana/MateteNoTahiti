const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

module.exports = {
  init: () => {
    passport.use(
      new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        if(email !== 'admin@cnam.pf') return done(null, false);
        if(password !== 'admin1234') return done(null, false);
        return done(null, {id:1,name:'MockAdmin',email:'admin@cnam.pf'});
      })
    );

    passport.serializeUser((user, done) => {;
      done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
      done(null, {id:0,name:'TODO',email:'TODO',password:'TODO'});
    });

  },
  protectRoute: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/auth/login');
  },

  isAdmin: (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === User.ROLES.ADMIN) {
      return next();
    }
    res.status(403).render('error', {
      title: 'Accès refusé',
      message: 'Cette page est réservée aux administrateurs.'
    });
  },

  isVendeur: (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === User.ROLES.VENDEUR) {
      return next();
    }
    res.status(403).render('error', {
      title: 'Accès refusé',
      message: 'Cette page est réservée aux vendeurs.'
    });
  },

  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/auth/login');
  }
};