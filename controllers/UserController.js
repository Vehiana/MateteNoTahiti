const User = require('../models/User');

module.exports = {
  index: async (req, res) => {
    User.getUsers().then(function (users) {
      console.log('[UserController] index: render users/index.hbs with ' + users.length + ' users');
      res.render('users/index', { name: req.user.name, users: users });
    }).catch(function (err) {
      console.error('[ERROR] ' + err);
      res.render('users/index', { name: req.user.name, message: err });
    });
  },

  create: async (req, res) => {
    res.render('users/create', { name: req.user.name });
  },

  store: async (req, res) => {
    console.log("[UserController] store: req=", req.body);

    User.addUser(req.body).then(function (res2) {
      res.redirect('/users');
    }).catch(function (err) {
      console.error('[ERROR] ' + err);
      res.redirect('/users'); // TODO msg
    });
  },

  edit: async (req, res) => {
    console.log("[UserController] edit: req=", req.params);

    User.getUser(req.params.id).then(function (user) {
      res.render('users/edit', { name: req.user.name, user: user });
    }).catch(function (err) {
      console.error('[ERROR] ' + err);
      res.render('users/index', { name: req.user.name, message: err });  // TODO msg
    });
    
  },

  update: async (req, res) => {
    console.log("[UserController] update: req=", req.body);

    User.updateUser(req.body).then(function (res2) {
      res.redirect('/users');
    }).catch(function (err) {
      console.error('[ERROR] ' + err);
      res.redirect('/users'); // TODO msg
    });
  },

  destroy: async (req, res) => {
    console.log("[UserController] destroy: req=", req.body);

    User.delUser(req.body.id).then(function (res2) {
      res.redirect('/users');
    }).catch(function (err) {
      console.error('[ERROR] ' + err);
      res.redirect('/users'); // TODO msg
    });
  }
}