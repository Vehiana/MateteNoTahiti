const passport = require('passport');

module.exports = {
  loginView: (req, res) => {
    res.render('login');
  },

  loginUser: (req, res) => {
    passport.authenticate('local', {
      successRedirect: '/?loginsuccess',
      failureRedirect: '/login?error'
    })(req, res);
  },

  logoutUser: (req, res) => {
    req.logout(() => res.redirect('/login?loggedout'));
  }
}