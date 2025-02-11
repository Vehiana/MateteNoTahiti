const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Identifiants admin en dur
const ADMIN_EMAIL = 'admin@cnam.pf';
const ADMIN_PASSWORD = 'admin1234';

module.exports = {
  loginView: (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect('/home');
    }
    const registered = req.query.registered === 'true';
    const error = req.query.error === 'true';
    res.render('login', { registered, error });
  },

  loginUser: (req, res, next) => {
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.redirect('/auth/login?error=true');
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.redirect('/home');
        });
      })(req, res, next);
    }
  },

  logoutUser: (req, res) => {
    req.logout(() => res.redirect('/auth/login?loggedout'));
  },

  registerView: (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect('/home');
    }
    res.render('register', {
      role_client: true
    });
  },

  registerUser: async (req, res) => {
    try {
      const { name, email, password, confirm_password, role } = req.body;

      // Validation de base
      if (!name || !email || !password || !confirm_password) {
        return res.render('register', {
          error: 'Tous les champs sont obligatoires',
          name,
          email
        });
      }

      if (password !== confirm_password) {
        return res.render('register', {
          error: 'Les mots de passe ne correspondent pas',
          name,
          email
        });
      }

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.render('register', {
          error: 'Cet email est déjà utilisé',
          name,
          email
        });
      }

      // Créer le nouvel utilisateur
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: role || 'client'
      });

      await user.save();
      res.redirect('/auth/login?registered=true');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      res.render('register', {
        error: 'Une erreur est survenue lors de l\'inscription',
        name: req.body.name,
        email: req.body.email
      });
    }
  }
};