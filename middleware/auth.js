const User = require('../models/user');

module.exports = {
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error', 'Vous devez être connecté pour accéder à cette page');
        res.redirect('/auth/login');
    },

    isAdmin: (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === User.ROLES.ADMIN) {
            return next();
        }
        req.flash('error', 'Accès non autorisé');
        res.redirect('/home');
    },

    isVendeurOrAdmin: (req, res, next) => {
        if (req.isAuthenticated() && 
            (req.user.role === User.ROLES.ADMIN || req.user.role === User.ROLES.VENDEUR)) {
            return next();
        }
        req.flash('error', 'Accès non autorisé');
        res.redirect('/home');
    },

    isVendeur: (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === User.ROLES.VENDEUR) {
            return next();
        }
        req.flash('error', 'Accès non autorisé');
        res.redirect('/home');
    }
};
