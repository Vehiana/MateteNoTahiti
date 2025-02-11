const passport = require('passport');
const User = require('../models/user');

module.exports = {
  loginView: (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect('/dashboard');
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
        return res.redirect('/dashboard');
      });
    })(req, res, next);
  },

  logoutUser: (req, res) => {
    req.logout(() => res.redirect('/auth/login?loggedout'));
  },

  registerView: (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect('/dashboard');
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
          email,
          role_client: role === 'client',
          role_vendeur: role === 'vendeur'
        });
      }

      if (password !== confirm_password) {
        return res.render('register', {
          error: 'Les mots de passe ne correspondent pas',
          name,
          email,
          role_client: role === 'client',
          role_vendeur: role === 'vendeur'
        });
      }

      if (password.length < 8) {
        return res.render('register', {
          error: 'Le mot de passe doit contenir au moins 8 caractères',
          name,
          email,
          role_client: role === 'client',
          role_vendeur: role === 'vendeur'
        });
      }

      // Vérifier si l'email existe déjà
      const existingUser = await User.findByEmail(email);

      if (existingUser) {
        return res.render('register', {
          error: 'Cet email est déjà utilisé',
          name,
          role_client: role === 'client',
          role_vendeur: role === 'vendeur'
        });
      }

      // Valider le rôle
      if (role !== User.ROLES.CLIENT && role !== User.ROLES.VENDEUR) {
        return res.render('register', {
          error: 'Type de compte invalide',
          name,
          email,
          role_client: true
        });
      }

      // Créer le nouvel utilisateur
      const result = await User.addUser({
        name,
        email,
        password,
        role
      });

      console.log('User created:', result);

      // Rediriger vers la page de connexion avec un message de succès
      res.redirect('/auth/login?registered=true');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      res.render('register', {
        error: 'Une erreur est survenue lors de l\'inscription',
        name: req.body.name,
        email: req.body.email,
        role_client: req.body.role === 'client',
        role_vendeur: req.body.role === 'vendeur'
      });
    }
  }
};