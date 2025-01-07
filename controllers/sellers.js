const sellers = require('../models/sellers.json');

module.exports = {
  sellersView: (req, res) => {
    res.render('sellers', { sellers: sellers });
  }
}