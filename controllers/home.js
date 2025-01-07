const sellers = require('../models/sellers.json')
const products = require('../models/products.json');

module.exports = {
  homeView: (req, res) => {
    res.render('home', { products: products, sellers: sellers });
  }
}