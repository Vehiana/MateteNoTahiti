const users = require('../models/users.json')

module.exports = {
  contactView: (req, res) => {
    res.render('contact', { users: users });
  }
}