const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            // Trouver l'utilisateur par email
            const user = await User.findByEmail(email);
            
            if (!user) {
                return done(null, false);
            }

            // Vérifier le mot de passe
            const isMatch = await User.validatePassword(user, password);
            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.getUser(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};
